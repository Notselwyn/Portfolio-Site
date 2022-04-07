<script lang="ts">
    // External packages
    import { Router, Route } from "svelte-navigator";

    // Pages
    import Home from "./routes/Home.svelte";
    import Projects from "./routes/Projects.svelte";
    import About from "./routes/About.svelte";
    import NotFound_404 from "./routes/errors/NotFound_404.svelte";

    // Components
    import WrapperHead from "./lib/WrapperHead.svelte";

    // JS & CSS
    import "./assets/css/global.css";

    const dev_server = true;

    let url = ""
    if (dev_server === true) {
        url = "localhost:80"; // used for overwriting the url in the dev server, so it gets passed to nginx
    } 
</script>

<Router>
    <Route path="/">
        <WrapperHead page_url="/" page_name="Home" />
        <Home />
    </Route>

    <Route path="/projects">
        <WrapperHead page_url="/projects" page_name="Projects" />
        <Projects url={url} />
    </Route>

    <Route path="/about">
        <WrapperHead page_url="/about" page_name="About Me" />
        <About url={url} />
    </Route>

    <Route>
        <WrapperHead page_url="/404" page_name="404 - Not Found" />
        <NotFound_404 />
    </Route> 
</Router>