import express = require("express");
import fetch from "node-fetch";
import directory = require("serve-index");
import circleGraph = require("./utility_modules/circlegraph");
import fs = require("fs");
import keystone = require("@keystone-next/keystone");
import { projects, pagenames, aboutmes, posts, subtitles, titles } from "./utility_modules/constants";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import schedule = require("node-schedule");
console.log("Imported all requirements...")

const ip = "0.0.0.0";
const port = 80;
const env_path = '/../.env';

const app = express();
const prisma = new PrismaClient();
app.use("/static", express.static(__dirname + '/static'));
app.use('/files', express.static(__dirname + '/static/files'));
app.use('/files', directory(__dirname + '/static/files'));
app.use('/', express.static(__dirname + '/static/public'));
app.set('view engine', 'pug');
app.set('views',  __dirname + '/views/pages');
dotenv.config({ path: __dirname+'/../.env' });
console.log("Configured app constants...")

//keystone.init({
//    'name': 'Website Name',
//    'brand': 'Website Brand',
//    'session': false,
//    'updates': 'updates',
//    'auth': true,
//    'user model': 'User',
//    'auto update': true,
//    'port': ip,
//    'cookie secret': process.env.COOKIE_SECRET
//});
console.log("Configured KeystoneJS...")


const refresh_env = schedule.scheduleJob('*/5 * * * *', async () => {
   require('dotenv').config(__dirname+env_path);
});
refresh_env.start();	
console.log("Configured cron jobs...")

function wakatime_to_text(property: any, bar_length: any, bool_time: any) {
   let activity_ratio = Math.round(property["percent"] / 100 * bar_length);
   return property["name"] + " ".repeat(13 - property["name"].length) + "[" + "#".repeat(activity_ratio) + "-".repeat(bar_length - activity_ratio) + "]" + " (" + property["percent"] + "%) " + " ".repeat(5 - property["percent"].toString().length) + (bool_time ? property["text"] : "");
}

async function get_posts() {
   const all_posts = await prisma.post.findMany();
   console.log(all_posts);
}

// Get the current time and date
function get_date() {
   let date = new Date();
   let hours = date.getHours();
   let minutes = date.getMinutes();
   let seconds = date.getSeconds();
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();
   return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

// LOG
app.use(function(req: any, res: any, next) {
   if (!process.env.BLOCKED_IPS.includes(req.ip) && !req.get('User-Agent').includes("curl/")) {	
      console.log(`${req.method} ${req.url} from ${req.ip}`);
      next();
   } else {
      // log all relevant information about the blocked request to a file called blocked.log
      fs.appendFile(__dirname + '/blocked.log', `[BLOCKED] ${req.method} ${req.url} from ${req.ip}\n| User-Agent: ${req.get('User-Agent')}\n| Date: ${get_date()}\n| Timestamp: ${Date.now()}\n\n`, function (err) {
         if (err) throw err;
      });
   }
});

// PAGE REGISTRATION
app.get(['/', '/index'], function(req: any, res: any){
   let args = {"url": req.url, "browser_title": "Home", "title": titles["index"], "subtitles": subtitles["index"], "pagename": pagenames["/"]};
   res.render('index', args);
});

app.get('/sudoku', function(req: any, res: any){
   let args = {"url": req.url, "browser_title": "Sudoku Solver", "pagename": pagenames["/sudoku"]};
   console.log(req.url);
   res.render('sudoku', args);
});

app.get('/projects', function(req: any, res: any){
   let tags = null;
   if ("filter" in req.query) {
      tags = req.query["filter"].split(" ");
      if (tags[0] === '') {
         tags = null;
      } else {
         tags = tags.filter((e, i) => tags.indexOf(e) === i).sort();
      }
   }
   let args = {"url": req.url, "browser_title": "Projects", "title": titles["projects"], "subtitles": subtitles["projects"], "projects": projects, "tags": tags, "pagename": pagenames["/projects"]};
   res.render('projects', args);
});

app.get('/about', function(req: any, res: any){
   let args = {"url": req.url, "browser_title": "About Me", "title": titles["about"], "subtitles": subtitles["about"], "aboutmes": aboutmes, "pagename": pagenames["/about"]};
   res.render('about', args)
});


app.get('/blogs', function(req: any, res: any){
   let args = {"url": req.url, "browser_title": "Blogs", "title": titles["blogs"], "subtitles": subtitles["blogs"], "posts": posts, "pagename": pagenames["/blogs"]};
   res.render('blogs', args);
});


app.get(['/admin', '/dashboard', '/secret', '/config', '/hidden', '/code_exec'], function(req: any, res: any) {
   res.render('rickroll')
});

// API
app.get("/api", function(req: any, res: any) {
   res.status(200);
   return res.send({"/api/calc": {
                        "description": "solve a math problem", 
                        "parameters": 
                           {"p": "The math problem"}
                     }, "/api/wakatime_text": {
                        "description": "CLI look for wakatime API", 
                        "parameters": {
                           "username": "the username to be used",
                           "editors": "the amount of editors to be used",
                           "languages": "the amount of languages to be used",
                           "bar_length": "the length of the progress bar"
                        }
                     }
                  })
});

app.get("/api/calc", function(req: any, res: any) {
   if ("p" in req.query) {
      let p = req.query["p"].replace(" ", "+")
      if (/^[0-9()+\-*\/]+$/.test(p)) {
         res.status(200);
         return res.send({"solution": eval(p)});
      } else {
         res.status(500);
         return res.send({"solution": "Internal Error."});
      }
   } else {
      res.status(500);
      return res.send({"solution": "Parameter (p) not included."});
   }
});


app.get(["/api/wakatime/circle"], function(req: any, res: any) {
    try {
        if (!("username" in req.query) || !(/^[a-zA-Z0-9_-]+$/.test(req.query["username"]))) {
            res.status(500);
            return res.send("Internal error.");
        };

        let username = req.query["username"];
        let edge_width = 1;
        let diameter = 18;
        let x_stretch = 2.4;
        let min_percent = 0.10;
        let edge = "#";
        let border = "~";
        let bg = " ";
        let graph_chars = " .'`,!+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
        let labels = true;
        let label_offset = 4;
        let label_width = 5;
        let start_angle = 47;
        let min_labels_x_dist = 20;
        let min_labels_y_dist = 4;
        let min_labels_x = 2;
        let min_labels_y = 2;
        let label_marker = "#";
        let label_seperator = "-";
        let label_line = ["\\", "/"];
        let label_lines = true;

        if ("edge_width" in req.query && /^[0-9]{1,2}$/.test(req.query["edge_width"])) {
            edge_width = parseInt(req.query["edge_width"]);
        }

        if ("diameter" in req.query && /^[0-9]{1,2}$/.test(req.query["diameter"])) {
            if (5 < parseInt(req.query["diameter"]) && parseInt(req.query["diameter"]) < 35) {
                diameter = parseInt(req.query["diameter"]);
            }
        }

        if ("min_share" in req.query && /^[0-9]{1,2}$/.test(req.query["min_share"])) {
            if (4 < parseInt(req.query["min_share"]) && parseInt(req.query["min_share"]) < 100) {
                min_percent = parseInt(req.query["min_share"]) / 100;
            }
        }

        if ("label_offset" in req.query && /^[0-9]{1,2}$/.test(req.query["label_offset"])) {
            label_offset = parseInt(req.query["label_offset"]) / 100;
        }

        if ("label_width" in req.query && /^[0-9]{1,2}$/.test(req.query["label_width"])) {
            label_width = parseInt(req.query["label_width"]);
        }

        if ("min_labels_y" in req.query && /^[0-9]{1,2}$/.test(req.query["min_labels_y"])) {
            min_labels_y = parseInt(req.query["min_labels_y"]);
        }

        if ("start_angle" in req.query && /^[0-9]{1,3}$/.test(req.query["start_angle"])) {
            start_angle = parseInt(req.query["start_angle"]) % 360 ;
        }

        if ("edge" in req.query && req.query["edge"].length == 1) {
            edge = req.query["edge"];
        }

        if ("border" in req.query && req.query["border"].length == 1) {
            border = req.query["border"];
        }

        if ("bg" in req.query && req.query["bg"].length == 1) {
            bg = req.query["bg"];
        }

        if ("label_marker" in req.query && req.query["label_marker"].length == 1) {
            label_marker = req.query["label_marker"];
        }

        if ("label_seperator" in req.query && req.query["label_seperator"].length == 1) {
            label_seperator = req.query["label_seperator"];
        }

        //if ("label_line" in req.query && req.query["label_line"].length == 2) {
        //    label_line = req.query["label_line"];
        //}

        if ("labels" in req.query && req.query["labels"] === "false") {
            labels = false;
        }

        if ("label_lines" in req.query && req.query["label_lines"] === "false") {
            label_lines = false;
        }

        if ("double_backslashes" in req.query && req.query["double_backslashes"] === "true") {
            label_line[0] = "\\\\"
        }

        fetch(`https://wakatime.com/api/v1/users/${username}/stats`).then(wakatime_res => wakatime_res.text()).then(wakatime_body => {   
            if (JSON.stringify(wakatime_body).includes("!DOCTYPE") || !!wakatime_body["error"] || !(JSON.stringify(wakatime_body).includes('\\"languages\\"') && JSON.stringify(wakatime_body).includes('\\"Coding\\"'))) {
               res.status(500);
               return res.send("WakaTime API Error. Username most likely not recognised.");
            }
            wakatime_body = wakatime_body.replace("Visual Studio", "VS 2019");
            let data = JSON.parse(wakatime_body)["data"];

            if (!data["languages"]) {
               res.status(500);
               return res.send("Internal Error.");
            }

            res.status(200);
            return res.send(circleGraph.circleGraph(data["languages"], edge_width, diameter, x_stretch, min_percent, edge, border, bg, graph_chars, labels, label_offset, label_width, start_angle, min_labels_x_dist, min_labels_y_dist, min_labels_x, min_labels_y, label_marker, label_seperator, label_line, label_lines));
        });
    } catch (e) {
        res.status(500);
        return res.send("Internal Error.");
    }
});

app.get(["/api/wakatime_text", "/api/wakatime/text"], function(req: any, res: any) {
   if ("username" in req.query) {
      let count_editors = 4;
      let count_languages = 6;
      let bar_length = 10;
      let bool_time = true;
      let total_time = false;
      
      if ("editors" in req.query && /^[0-9]+$/.test(req.query["editors"])) {
         count_editors = parseInt(req.query["editors"]);
      }

      if ("languages" in req.query && /^[0-9]+$/.test(req.query["languages"])) {
         count_languages = parseInt(req.query["languages"]);
      }

      if ("bar_length" in req.query && /^[0-9]+$/.test(req.query["bar_length"])) {
         bar_length = parseInt(req.query["bar_length"]);
      }

      if ("time" in req.query && req.query["time"] == "false") {	
         bool_time = false;
      }

      if ("total_time" in req.query && req.query["total_time"] == "true") {	
         total_time = true;
      }
      
      let username = req.query["username"];
      if (/^[a-zA-Z0-9_-]+$/.test(username)) {
         fetch(`https://wakatime.com/api/v1/users/${username}/stats`).then(wakatime_res => wakatime_res.text()).then(wakatime_body => {   
            if (JSON.stringify(wakatime_body).includes("!DOCTYPE") || !!wakatime_body["error"] || !(JSON.stringify(wakatime_body).includes('\\"categories\\"') && JSON.stringify(wakatime_body).includes('\\"Coding\\"'))) {
               res.status(500);
               return res.send("WakaTime API Error. Username most likely not recognised.");
            }
            wakatime_body = wakatime_body.replace("Visual Studio", "VS 2019");
            let data = JSON.parse(wakatime_body)["data"];

            if (!data["categories"]) {
               res.status(500);
               return res.send("Internal Error.");
            }

            let coding_info;
            for (let i=0; i<data["categories"].length; i++) {
               if (data["categories"][i]["name"] === "Coding") {
                  coding_info = data["categories"][i];
                  break;
               }
            }
            if (!coding_info) {
               res.status(500);
               return res.send("Internal Error.");
            }

            let editors = [];
            let languages = [];
            
            for (let i=0; i < data["editors"].length && i < count_editors; i++) {
               editors.push(wakatime_to_text(data["editors"][i], bar_length, bool_time));
            }
            for (let i=0; i < data["languages"].length && i < count_languages; i++) {
               languages.push(wakatime_to_text(data["languages"][i], bar_length, bool_time));
            }
            
            let response_string = "";
            if (count_languages > 0) {
               response_string += "\nlanguages";
               if (count_editors > 0) {
                  response_string += " ".repeat(45) + "editors\n---------" + " ".repeat(45) + "-------\n";
               } else {
                  response_string += "\n---------\n";
               }
               for (let i=0; (i < count_languages || i < count_editors) && (i < languages.length || i < editors.length) ; i++) {
                  if (i >= languages.length) {
                     languages[i] = "";
                  }
                  if (i >= editors.length) {
                     editors[i] = "";
                  }
                  if (i < count_languages) {
                     response_string += languages[i];
                     if (i < count_editors) {
                        response_string += " ".repeat(54-languages[i].length) + editors[i];
                     }
                     response_string += "\n";
                  } else {
                     response_string += " ".repeat(54) + editors[i] + "\n";
                  }
               }
               if (total_time) {
                  response_string += "---------\n" + wakatime_to_text(coding_info, bar_length, bool_time).replace("Coding", "total ") + "\n";
               }
            } else {
               if (count_editors > 0) {
                  response_string += "\neditors\n-------\n";
                  for (let i=0; i < count_editors; i++) {  
                     response_string += editors[i] + "\n";
                  }
                  if (total_time) {
                     response_string += "-------\n" + wakatime_to_text(coding_info, bar_length, bool_time).replace("Coding", "total ") + "\n";
                  }
               }
            }
            res.status(200);
            return res.send(response_string);
         });
      } else {
         res.status(500);
         return res.send("Internal error.");
      }
   } else {
      res.status(500);
      return res.send("Internal error.");
   }
});

app.get("*", function(req: any, res: any) {
   let args = {"url": "/404", "browser_title": "404", "title": ["!Page", " not found"]};
   res.status(404);
   return res.render('errors/404', args)
});

// START WEBSERVER
app.listen(port, ip);
//keystone.app = app;
//keystone.init();
console.log(`Started webserver on http://${ip}:${port}`);