// EXPRESS SETTINGS
<<<<<<< HEAD
const express = require('express');
const CryptoJS = require("crypto-js");
const request = require('request');
const directory = require('serve-index');
const fs = require('fs');
const app = express();
const ip = "0.0.0.0";
const port = 80;

console.log(__dirname);
app.use("/static", express.static(__dirname + '/static'));
app.use('/files', express.static(__dirname + '/static/files'));
app.use('/files', directory(__dirname + '/static/files'));
app.set('view engine', 'pug');
app.set('views',  __dirname + '/views/pages');

function readFile(path) {
   return fs.readFileSync(__dirname + path, {encoding:'utf8'});
}
=======
let express = require('express');
let app = express();
const ip = "192.168.178.42"
const port = 80

app.use("/static/css", express.static('static/css'));
app.use("/static/img", express.static('static/img'));
app.use("/static/js", express.static('static/js'));
app.set('view engine', 'pug');
app.set('views','./views/pages');
>>>>>>> main

// CONSTANTS
const projects = {
   "Finished": {
      "sudoku_solver": {
         "title": "Sudoku Solver",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.",
         "github": "https://github.com/Notselwyn/SudokuSolver",
         "demo": "overlay-sudoku",
         "banner": "/static/img/sudoku_solver.gif",
<<<<<<< HEAD
         "tags": ["CPP", "Go", "JavaScript", "Python", "Ruby", "Algorithms"]},
=======
         "tags": ["CPP", "Go", "JavaScript", "Python", "Ruby", "Algorithm"]},
>>>>>>> main
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
<<<<<<< HEAD
const aboutmes = {
   "About Me": {
      "story": {
         "title": "My Story",
         "description": "placeholder???",
         "banner": "/static/img/doggo.jfif"
      },
      "summary": {
         "title": "A Short Summary",
         "description": "I'm primarily a backend developer who enjoys to code and learn about computer science. I code in plenty of interesting programming languages although most of my published projects are made using only a few. One of these coding languages is Python of which I would say I master it for 90% as I spent 2 years dedicated to learning it and I'm currently learning the language C++. I have many other skills and hobbies such as reverse engineering, ethical hacking and gambling using the stock market. I'm not creative as you can see based on the design of this website, but I am skilled in the backend / programming side of things. Below this text are some of my statistics regarding programming.",
         "banner": "https://github-readme-stats.vercel.app/api/top-langs/?username=Notselwyn&theme=dark&langs_count=3"
      },
      "stats": {
         "title": "Some Statistics",
         "banner": ["https://github-readme-stats.vercel.app/api/wakatime?username=notselwyn&theme=dark", "https://github-readme-stats.vercel.app/api?username=notselwyn&show_icons=true&theme=dark"]
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
         "description": "Ever since my childhood I've been truly inspired by development. Wether it was building something small like a sand castle on a long beach or experimenting with electric circuits, I was absolutely in love with it. When I started learning to code in elementary school with Scratch I could feel the possibilities flowing through my blood and spent day and night programming in Scratch. Ever since then I've been truly in love with the concept of development and I keep getting more excited to learn because of the endless possibilities that can be archieved with the art of software developing.",
         "banner": "/static/img/swengineering.jpg"
      }, 
      "linux": {
         "title": "Linux Operating System",
         "description": "In the beginnings of 2019 I wanted to try a new OS, so I picked Linux and started using the infamous Kali Linux distribution. I sticked with this for a very long time until I switched to Arch Linux and got used to CLIs which really helped me with my journey on development. After a while I discovered how all files in Linux are just text files and are easy to modify. This discovery led to me experimenting with a bunch of settings and interesting configurations. As of 2021 I'm still using Linux as my main OS and it really satisfies me with it's characteristic ways of customizability and accessibility.",
         "banner": "/static/img/linux.png"
      },
      "cryptography": {
         "title": "Cryptography",
         "description": "When I was young I was absolutely in love with high-difficulty puzzle books and I kept puzzling in those books every week until I quit elementary school. This has left me with a lifelong joy for puzzling and trying to find answers in all sorts of questions. My lust for puzzles has resulted into me being a very enthusiastic cryptography nerd who wants to find the answers. I absolutely love spending half a day trying to figure out what a piece of encoded text means and decoding images based on algorithms. There are endless ways to encode and encrypt things and I'm always looking for new ways to explore them. ",
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

function gen_code() {
   return Math.abs(CryptoJS.SHA256(Math.abs(Math.floor(Date.now() / 100000) * Math.exp(10) / Math.PI * Math.floor(CryptoJS.SHA256(Date.now()).words[0] / 100)).toString()).words[0]);
};
=======
const subtitles = {"projects": ["Finished", "In Development", "Coming Soon"],
                   "index": ["Software Developer", "Pentester", "OSINT Enthusiast"]};

const titles = {
   "index": ["I'm ", "!Lau", " and I'm a.."],
   "projects": ["My ", "!Projects"]
}
>>>>>>> main

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

<<<<<<< HEAD
app.get('/sudoku', function(req, res){
=======
app.get(['/', '/sudoku'], function(req, res){
>>>>>>> main
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

<<<<<<< HEAD
app.get('/about', function(req, res){
   let args = {"url": req.url, "browser_title": "About Me", "title": titles["about"], "subtitles": subtitles["about"], "aboutmes": aboutmes};
   res.render('about', args)
});


=======
>>>>>>> main
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

<<<<<<< HEAD
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
=======
>>>>>>> main

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