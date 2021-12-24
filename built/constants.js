"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titles = exports.subtitles = exports.posts = exports.aboutmes = exports.pagenames = exports.projects = void 0;
exports.projects = {
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
        "readme": {
            "title": "Github Readme",
            "description": "There are two groups of people in this world: those that do not have a Github profile readme and those that do. I'm a part of the latter. I've been trying to make my Github profile readme as aesthetically pleasing and advanced as possible both for showing off and to learn more. For the current version I wrote BASH scripts, a JavaScript API and a lot of math to generate fully dynamic ASCII circle graphs with a ginormous configuration. It's more complicated than it sounds, but the best part is that it's free to use and customize! I wrote many prototypes for the circle graph in Python because it's easier to debug, although coming up and Googling math formulas took the most time. I'm stilling writing a documentation for the API including a deprecated endpoint I used when I first started this project back in july of 2021. I really enjoyed making this project and I'm now capable of creating BASH scripts and Github workflows - although one may be more difficult than the other - because I learned a lot about Math, Github and BASH while making this project.",
            "github": "https://github.com/Notselwyn/Notselwyn",
            "banner": "/static/img/readme.png",
            "tags": ["API", "BASH", "JavaScript", "Math"]
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
exports.pagenames = {
    "/": "Home",
    "/index": "Home",
    "/about": "About Me",
    "/projects": "Projects",
    "/blogs": "Blogs",
    "/404": "404 (not found)",
    "/sudoku": "Sudoku Solver"
};
exports.aboutmes = {
    "About Me": {
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
            "description": "Back when I was in middle school I always looked up to the h4xors, real or fake. Nowadays I've picked it up and I'm still practising and learning interesting ways to exploit computers to this day. As of writing I'm in the top 0.01% leaderboard of TryHackMe, the largest platform for Capture-The-Flags and other Ethical Hacking events. Capture-The-Flags are usually machines set up by members with the sole purpose of being hacked. This is legal ofcourse and I spend a lot of time doing these CTFs to practise and up my hacking game to outperform the best.",
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
            "description": "I've always been a big fan of the Linux OS, especially on servers. I've always liked the concept and I've always wanted to learn more about how it works and how to build my own distrubition of Linux. The reason why I love the OS is because the same technology that I use in my daily life is the same that makes up the Linux OS. I really enjoy programming and configuring Linux as it's way more fun because most of the files are plain text. Another reason I like Linux is that it has a giant community made of developers who always like to chat about the Linux OS.",
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
exports.posts = {
    "Writeups": {
        "picklerick": {
            "title": "[THM] Pickle Rick",
            "description": "A Rick and Morty CTF. Help turn Rick back into a human!",
            "banner": "https://tryhackme-images.s3.amazonaws.com/room-icons/47d2d3ade1795f81a155d0aca6e4da96.jpeg",
            "posturl": "/blogs/picklerick"
        }
    },
    "Experiences": {},
    "Stories": {}
};
exports.subtitles = {
    "projects": ["Finished", "In Development", "Coming Soon"],
    "index": ["Software Developer", "CTF Player", "OSINT Enthusiast"],
    "about": ["About Me", "My Skills", "My Interests"],
    "blogs": ["Writeups", "Experiences", "Stories"]
};
exports.titles = {
    "index": ["I'm ", "!Lau", " and I'm a.."],
    "projects": ["My ", "!Projects"],
    "about": ["About ", "!Me"],
    "blogs": ["My ", "!Blogs"]
};
