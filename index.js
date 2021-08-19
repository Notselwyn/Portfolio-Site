// EXPRESS SETTINGS
const express = require('express');
const CryptoJS = require("crypto-js");
const request = require('request');
const fetch = require('node-fetch');
const directory = require('serve-index');
const app = express();
const ip = "0.0.0.0";
const port = 80;

console.log(__dirname);
app.use("/static", express.static(__dirname + '/static'));
app.use('/files', express.static(__dirname + '/static/files'));
app.use('/files', directory(__dirname + '/static/files'));
app.set('view engine', 'pug');
app.set('views',  __dirname + '/views/pages');

//function readFile(path) {
//   return fs.readFileSync(__dirname + path, {encoding:'utf8'});
//}

// CONSTANTS
const projects = {
   "Finished": {
      "sudoku_solver": {
         "title": "Sudoku Solver",
         "description": "I made this sudoku solver project in the spring of 2021 to practise my skills in other languages than Python. It uses a backtracking algorithm to solve a sudoku puzzle. It solves the puzzle by checking if the value is valid. If there is a value in the same 3x3 grid or in any of the straight lines it is not valid. If it is valid it will go to the next value, if it it is not valid it will go back to the previous value and increment it. By continueing this process until the puzzle is solved you can solve any valid sudoku puzzle. I find this an incredibly good example of what simple algorithms can accomplish in the real world. The exact reason that I decided to code this in multiple languages is that I wanted to test speeds and coding difficulty across languages. This concluded that JavaScript (Node.js) is indeed faster than Python and that Go is faster than C++. The knowledge I acquired from this project will definitly have an impact on my future projects as I know what language is most likely better for which tasks.",
         "github": "https://github.com/Notselwyn/SudokuSolver",
         "demo": "overlay-sudoku",
         "banner": "/static/img/sudoku_solver.gif",
         "tags": ["CPP", "Go", "JavaScript", "Python", "Ruby"]
      },
      "car_racing": {
         "title": "N.E.A.T. Car Racing",
         "description": "This is not some regular car racing game, it's.. well not a game. This is an simulation of reinforced neural networks driving on tracks based on several sensors. This project is definitly one of the more complex ones I've made, primarily because it involves machine learning and a whole bunch of PyGame and configuration. For the machine learning part I used the famous NEAT framework which is basically a wrapper for reinforced machine learning. I've learned quite a lot from this project, which is why I like it so much (aside from the fact that it's cool to watch). One of the things I have learned is how to set up a local listener for statistics and how to display those statistics with a live updating graph. Another thing I have learned is more complex concepts with general machine learning",
         "github": "https://github.com/Notselwyn/NEAT-Car-Racing",
         "banner": "/static/img/carracing.gif",
         "tags": ["AI", "Graphics", "Python"]
      },
      "asciify": {
         "title": "ASCII Filter",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/ASCII-Footage",
         "banner": "/static/img/badapple.gif",
         "tags": ["CPP", "Graphics", "Python"]
      }
   },
   "In Development": {
      "portfolio_website": {
         "title": "Portfolio Website",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/Portfolio-Site",
         "banner": "",
         "tags": ["CSS", "HTML", "JavaScript"]
      }
   },
   "Coming Soon": {
      "assaultcube": {
         "title": "AssaultCube Trainer",
         "description": "coolio",
         "github": "https://github.com/Notselwyn/AssaultCubeInternal",
         "banner": "",
         "tags": ["CPP", "RE", "Trainer"]
      }
   },
};

const aboutmes = {
   "About Me": {
      //"story": {
      //   "title": "My Story",
      //   "description": "I'm a ",
      //   "banner": "/static/img/doggo.jfif"
      //},
      "summary": {
         "title": "A Short Summary",
         "description": "I'm primarily a backend developer who enjoys to code and learn about computer-science. I code in plenty of interesting programming languages although most of my published projects are made using only a few. One of these coding languages is Python of which I would say I master it for 90% as I spent 2 years dedicated to learning it and I'm currently learning the language C++. I have many other skills and hobbies such as reverse engineering, ethical hacking and gambling using the stock market. I'm not creative as you can see based on the design of this website, but I am skilled in the backend / programming side of things. Below this text are some of my statistics regarding programming.",
         "banner": "https://github-readme-stats.vercel.app/api/top-langs/?username=Notselwyn&theme=dark&langs_count=3"
      },
      "stats": {
         "title": "Some Statistics",
         "banner": ["https://github-readme-stats.vercel.app/api/wakatime?username=notselwyn&theme=dark&langs_count=5", "https://github-readme-stats.vercel.app/api?username=notselwyn&show_icons=true&theme=dark"]
      }
   },
   "My Skills": {
      "programming": {
         "title": "Programming",
         "description": "I have been programming a ton in several languages for the past 3 years. I'm personally a really big fan of dynamic but secure programming as it is the most efficient for my style of coding. As a result of this is the most used language is Python, which I used for a large fraction of my scripts and small programs. Another language I've used a ton would be C++ for the low-level side of things. I have listed several projects I've worked on in the past on the projects page. I like everything related to programming, except for web development. The reason I dislike web development has to do with the fact that I'm usually not creative, which results in under average designs.",
         "banner": "/static/img/programming.jpg"   
      },
      "reversing": {
         "title": "Reverse Engineering",
         "description": "From the very first time I ran a modified APK of a game back in the day, I've been inspired by people who try to reverse engineer a program and modify it or just inspect its' code. When I was 15 I got into reverse engineering and malware analysis, which has really helped me in the long run with both trying to see if an application is malicious and doing things that are against the ethics of programming. Nowadays I participate in a lot of CrackMes and Capture-The-Flags related to reverse engineering. I believe that everyone is capable of reverse engineering, but that they need the right toolset",
         "banner": "/static/img/reversing.png"
      }, 
      "ethical hacking": {
         "title": "Ethical Hacking",
         "description": "Back when I was in middle school I always looked up to the h4xors, real or fake. Nowadays I've picked it up and I'm still practising and learning interesting ways to exploit computers to this day. As of writing I'm in the top 0.1% leaderboard of TryHackMe, the largest platform for Capture-The-Flags and other Ethical Hacking events. Capture-The-Flags are usually machines set up by members with the sole purpose of being hacked. This is legal ofcourse and I spend a lot of time doing these CTFs to practise and up my hacking game to outperform the best.",
         "banner": "/static/img/haxor.jpg"
      }
   },
   "My Interests": {
      "development": {
         "title": "Software Development",
         "description": "Ever since my childhood I've been truly inspired by development and I was absolutely in love with it. When I started learning to code in elementary school with Scratch I could feel the possibilities flowing through my blood and spent day and night programming in Scratch. Ever since then I've been truly in love with the concept of development and I keep getting more excited to learn because of the endless possibilities that can be archieved with the art of software developing. I'm currently developing several small-scaled projects to practise my skills.",
         "banner": "/static/img/swengineering.jpg"
      }, 
      "linux": {
         "title": "Linux Operating System",
         // A 500 character text of why I like the Linux OS
         "description": "I've always been a big fan of the Linux OS, especially on servers. I've always liked the concept and I've always wanted to learn more about how it works and how to build my own distrubition of Linux. The reason why I love the OS is because the same technology that I use in my daily life is the same that makes up the Linux OS. I really enjoy programming and configuring Linux as it's way more fun because most of the files are plain text. Another reason I like Linux is that it has a giant community made of developers who always like to chat about the Linux OS.",
         //"description": "In the beginnings of 2019 I wanted to try a new OS, so I picked Linux and started using the infamous Kali Linux distribution. The fact that Linux is incredibly open-source and that most files are plain text files, led me to experimenting with a bunch of settings and interesting configurations. As of 2021 I'm still using the Linux kernel for my main operating systems and it really satisfies me with it's characteristic ways of customizability and accessibility. ",
         "banner": "/static/img/linux.png"
      },
      "cryptography": {
         "title": "Cryptography",
         "description": "Cryptography is a very important skill to have in my opinion. It's a subject that I've always had much fun with before, but I was completed unknown with its exact details when I started. I started learning it after a friend recommended a cryptography book to me. For the past year I've been very interested in it and I've been practising it ever since. The book was very informative and I feel like I now have a great understanding of some of the specifics now. It's been quite a challenge for me as such and I'm really wanting to continue to get better at it. I've been talking a lot to people who know a lot about cryptography so I can learn from them. I like being the dumbest person in the room.",
         "banner": "/static/img/crypto.jpg"
      },
      "stocks": {
         "title": "Advanced Gambling",
         "description": "After a long time waiting, I finally got chance to enter the stock market at age 16. I got addicted to the feeling of making money and I absolutely loved it. At this point I decided I wanted to learn a lot more about not only day trading, but also the general stock market and FOREX. I enrolled in a ton of courses and classes so that I could be able to become a better trader or even a better investor. The stock market inspires me and I treat it like life advice, because it teaches me things I never knew before. One of these is that I should not get attached to things and that I have to cut losses quickly while getting the best results.",
         "banner": "/static/img/stonks.png"
      }
   }
};

const subtitles = {"projects": ["Finished", "In Development", "Coming Soon"],
                   "index": ["Software Developer", "Pentester", "OSINT Enthusiast"],
                   "about": ["About Me", "My Skills", "My Interests"]
                  };

const titles = {"index": ["I'm ", "!Lau", " and I'm a.."],
                "projects": ["My ", "!Projects"],
                "about": ["About ", "!Me"]
               };

function wakatime_to_text(property, bar_length, bool_time) {
   let activity_ratio = Math.round(property["percent"] / 100 * bar_length);
   return property["name"] + " ".repeat(13 - property["name"].length) + "[" + "#".repeat(activity_ratio) + "-".repeat(bar_length - activity_ratio) + "]" + " (" + property["percent"] + "%) " + " ".repeat(5 - property["percent"].toString().length) + (bool_time ? property["text"] : "");
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

app.get('/sudoku', function(req, res){
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

app.get('/about', function(req, res){
   let args = {"url": req.url, "browser_title": "About Me", "title": titles["about"], "subtitles": subtitles["about"], "aboutmes": aboutmes};
   res.render('about', args)
});


app.get(['/admin', '/dashboard', '/secret', '/config', '/hidden', '/code_exec'], function(req, res) {
   res.render('rickroll')
});

// API
app.get("/api", function(req, res) {
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



app.get("/api/wakatime_text", function(req, res) {
   if ("username" in req.query) {
      let count_editors = 4;
      let count_languages = 6;
      let bar_length = 10;
      let bool_time = true;
      
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
      
      let username = req.query["username"];
      if (/^[a-zA-Z0-9_-]+$/.test(username)) {
         fetch(`https://wakatime.com/api/v1/users/${username}/stats?is_including_today=true`).then(wakatime_res => wakatime_res.text()).then(wakatime_body => {   
            if ("error" in JSON.parse(wakatime_body)) {
               res.status(500);
               return res.send("Internal Error.");
            }
            let data = JSON.parse(wakatime_body)["data"];
            let coding_info;
            data = data;
            for (let i=0; i<data["categories"].length; i++) {
               if (data["categories"][i]["name"] === "Coding") {
                  coding_info = data["categories"][i];
                  break;
               }
            }
            if (coding_info === undefined) {
               res.status(500);
               return res.send("Internal Error.");
            }

            let total_seconds = coding_info["total_seconds"];
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
            } else {
               if (count_editors > 0) {
                  response_string += "\neditors\n-------\n";
                  for (let i=0; i < count_editors; i++) {  
                     response_string += editors[i] + "\n";
                  }
               }
            }
            res.status(200);
            return res.send(response_string);
         });
      } else {
         res.status(200);
         return res.send("Internal error.");
      }
   } else {
      res.status(200);
      return res.send("Internal error.");
   }
});


app.get("*", function(req, res) {
   let args = {"url": "/404", "browser_title": "404", "title": ["!Page", " not found"]};
   return res.render('errors/404', args)
});

// START WEBSERVER
app.listen(port, ip);
console.log(`Started webserver on http://${ip}:${port}`);