// EXPRESS SETTINGS
const express = require('express');
const CryptoJS = require("crypto-js");
const request = require('request');
let app = express();
const ip = "0.0.0.0"
const port = 80

console.log(__dirname);
app.use("/static", express.static(__dirname + '/static'));
app.use('/files', express.static(__dirname + '/static/files'));
app.set('view engine', 'pug');
app.set('views',  __dirname + '/views/pages');

// CONSTANTS
const projects = {
   "Finished": {
      "sudoku_solver": {
         "title": "Sudoku Solver",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/SudokuSolver",
         "demo": "overlay-sudoku",
         "banner": "/static/img/sudoku_solver.gif",
         "tags": ["CPP", "Go", "JavaScript", "Python", "Ruby", "Algorithms"]},
      "asciify": {
         "title": "ASCII Filter",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/ASCII-Footage/blob/main/ascii.cpp",
         "banner": "",
         "tags": ["CPP", "Python"]
      }
   },
   "In Development": {
      "car_racing": {
         "title": "N.E.A.T. Car Racing",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/NEAT-Car-Racing",
         "banner": "",
         "tags": ["Python", "AI"]},
      "portfolio_website": {
         "title": "Portfolio Website",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/Portfolio-Site",
         "banner": "",
         "tags": ["CSS", "HTML", "JavaScript"]
      }
   },
   "Coming Soon": {},
};
const subtitles = {"projects": ["Finished", "In Development", "Coming Soon"],
                   "index": ["Software Developer", "Pentester", "OSINT Enthusiast"]};

const titles = {
   "index": ["I'm ", "!Lau", " and I'm a.."],
   "projects": ["My ", "!Projects"]
}

function gen_code() {
   return Math.abs(CryptoJS.SHA256(Math.abs(Math.floor(Date.now() / 100000) * Math.exp(10) / Math.PI * Math.floor(CryptoJS.SHA256(Date.now()).words[0] / 100)).toString()).words[0]);
}

// LOG
app.use(function(req, res, next) {
   console.log(`${req.method} ${req.url} from ${req.ip}`);
   next();
});

// PAGE REGISTRATION
app.get(['/', '/index'], function(req, res){
   let args = {"url": req.url, "browser_title": "Home", "title": titles["index"], "subtitles": subtitles["index"]};
   res.render('index', args);
});

app.get(['/', '/sudoku'], function(req, res){
   let args = {"url": req.url, "browser_title": "Sudoku Solver"};
   res.render('sudoku', args);
});

app.get('/projects', function(req, res){
   let tags = null;
   if ("filter" in req.query) {
      tags = req.query["filter"].split(" ");
      if (tags[0] === '') {
         tags = null;
      } else {
         tags = tags.filter((e, i) => tags.indexOf(e) === i).sort();
      }
   }
   let args = {"url": req.url, "browser_title": "Projects", "title": titles["projects"], "subtitles": subtitles["projects"], "projects": projects, "tags": tags};
   res.render('projects', args);
});

app.get(['/admin', '/dashboard', '/secret', '/config', '/hidden', '/code_exec'], function(req, res) {
   res.render('rickroll')
});


// PENTESTING
app.get("/pentest", function(req, res) {
   return res.send({"/pentest/xss": "perform xss"})
});

app.get("/pentest/xss", function(req, res) {
   return res.render('pentest/xss')
});

app.get("/pentest/get_code", function(req, res) {
   if (req.ip.startsWith("192.168.178.")) {
      res.status(200);
      return res.send(gen_code().toString());
   }
   res.status(404);
   return res.send("404: Page not found.");

});
app.get("/pentest/relay", function(req, res) {
   if ("msg" in req.query && "auth" in req.query) {
      let msg = req.query["msg"].replace(";", "").replace("'", "").replace('"', "").replace("<", "").replace(">", "").replace("&", "").replace("\\", "").replace("?", "").replace("{", "").replace(":", "").replace("}").replace("@", "").replace("$", "");
      let code = req.query["auth"];
      if (code.toString() === gen_code().toString()) {
         request.get({"url": "http://192.168.178.40:9172", "body": msg});
      }
   }
   res.status(404);
   return res.send("404: Page not found.");
});

// API
app.get("/api", function(req, res) {
   res.status(200);
   return res.send({"/api/calc": "solve a math problem (Parameter p)"})
});

app.get("/api/calc", function(req, res) {
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

// START WEBSERVER
app.listen(port, ip);
console.log(`Started webserver on http://${ip}:${port}`);