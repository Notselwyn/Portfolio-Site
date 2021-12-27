<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import * as dotenv from "dotenv";

    import Home from "./routes/Home.svelte";
    import Projects from "./routes/Projects.svelte";
    import About from "./routes/About.svelte";
    import NotFound_404 from "./routes/errors/NotFound_404.svelte";

    import WrapperHead from "./lib/WrapperHead.svelte";

    dotenv.config();

    let url = process.env.PUB_URL;
    console.log(url);
</script>

<Router>
    <Route path="/">
        <WrapperHead url="/" pagename="Home" />
        <Home />
    </Route>

    <Route path="/projects">
        <WrapperHead url="/projects" pagename="Projects" />
        <Projects url={url} />
    </Route>

    <Route path="/about">
        <WrapperHead url="/about" pagename="About Me" />
        <About url={url}/>
    </Route>

    <Route path="*">
        <WrapperHead url="404" pagename="404 - Not Found" />
        <NotFound_404 />
    </Route> 
</Router>

<style>
    :global(body) {
        background-color: #1c1c1c;
        padding: 0;
        margin: 0;
        min-height: 100%;
        height: 100%;
    }

    :global(a, p) {
        font-family: sans-serif;
        color: #f0f0f0;
        text-decoration: none;
    }
</style>