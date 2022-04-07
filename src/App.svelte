<script lang="ts">
    // External packages
    import { Router, Route } from "svelte-navigator";

    // Pages
    import Home from "./routes/Home.svelte";
    import Projects from "./routes/Projects.svelte";
    import About from "./routes/About.svelte";
    import NotFound_404 from "./routes/errors/NotFound_404.svelte";

    // global JS & CSS
    import "./assets/css/global.css";

    const dev_server = true;

    let url = ""
    if (dev_server === true) {
        url = `${window.location.hostname}:80`; // used for overwriting the url in the dev server, so it gets passed to nginx
    } 
</script>

<Router>
    <Route path="/">
        <Home />
    </Route>

    <Route path="/projects">
        <Projects url={url} />
    </Route>

    <Route path="/about">
        <About url={url} />
    </Route>

    <Route path="*">
        <NotFound_404 />
    </Route> 
</Router>