let extend_text = {"sd":"I've been developing software since 2019, when I started coding basic things like tic tac toe in C++. 9 months later, April 2020, I decided that I wanted to pickup coding again because I truly enjoyed it. I picked up the famous programming language Python. This would turn out to be true a game-changer.",
                   "pt":"Ever since middle school I was severely interested in \"Hacking\", despite the fact that I didn't know where to start. In the spring of 2021 I found TryHackMe to learn from and started to learn from there, at the cost of school. 3 months in, and I was addicted to CTFs and privilege escalation on Linux.",
                   "os":"Since the time I started to look at TryHackMe as a serious learning platform I started to like OSINT a lot. From geolocating images to landmark recognition to people investigations. I try to do an OSINT challenge every week because I feel like it boosts my skills to research."};

function extend(type) {
    if (document.getElementById("extend_text").type == type) {
        document.getElementById("extend_text").text = "";
        document.getElementById("extend_text").type = "none";
    } else {
        document.getElementById("extend_text").text = extend_text[type];
        document.getElementById("extend_text").type = type;
    }
}