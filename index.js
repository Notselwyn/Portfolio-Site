let express = require('express');
let app = express();

app.use("/static/css", express.static('static/css'));
app.use("/static/img", express.static('static/img'));
app.use("/static/js", express.static('static/js'));
app.set('view engine', 'pug');
app.set('views','./views/pages');

// Constants
const projects = {
   "Finished": {"sudoku_solver": {"title": "Sudoku Solver", "description": "blahblah", "github": "https://github.com/Notselwyn/SudokuSolver", "banner": "/static/img/...", "tags": ["Python", "C++", "Ruby", "JavaScript", "GO"]}},
   "In Development": {},
   "Coming Soon": {},
};
const subtitles = {"projects": ["Finished", "In Development", "Coming Soon"],
                   "index": ["Software Developer", "Pentester", "OSINT Enthusiast"]};

const titles = {
   "index": ["I'm ", "!Lau", " and I'm a.."],
   "projects": ["My ", "!Projects"]
}

// LOG
app.use(function(req, res, next) {
   console.log(`${req.method} ${req.url} from ${req.ip}`);
   next();
});

app.get(['/', '/index'], function(req, res){
   let args = {"url": req.url, "browser_title": "Home", "title": titles["index"], "subtitles": subtitles["index"]};
   res.render('index', args);
});

app.get('/projects', function(req, res){
   let args = {"url": req.url, "browser_title": "Projects", "title": titles["projects"], "subtitles": subtitles["projects"], "projects": projects};
   res.render('projects', args);
});


app.listen(8080);