let express = require('express');
let app = express();

app.use("/static/css", express.static('static/css'));
app.use("/static/img", express.static('static/img'));
app.use("/static/js", express.static('static/js'));
app.set('view engine', 'pug');
app.set('views','./views/pages');

// Constants
const projects = {
   "Finished": {"sudoku_solver": {"title": "Sudoku Solver", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa sed elementum. Tincidunt augue interdum velit euismod in. Pulvinar sapien et ligula ullamcorper. In iaculis nunc sed augue lacus viverra vitae congue eu. Ipsum suspendisse ultrices gravida dictum fusce ut. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Venenatis urna cursus eget nunc. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla. Aliquet eget sit amet tellus cras adipiscing enim. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Amet mauris commodo quis imperdiet. Sit amet mattis vulputate enim nulla.", "github": "https://github.com/Notselwyn/SudokuSolver", "banner": "/static/img/sudoku_solver.gif", "tags": ["Python", "C++", "Ruby", "JavaScript", "Go"]}},
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


app.listen(8080, );