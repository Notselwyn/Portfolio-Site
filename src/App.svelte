<script lang="ts">
    import { Router, Link, Route } from "svelte-navigator";
    import Home from "./routes/Home.svelte";
    import Projects from "./routes/Projects.svelte";
    import About from "./routes/About.svelte";
    import WrapperHead from "./lib/WrapperHead.svelte";
</script>

<Router>
    <Route path="/">
        <WrapperHead url="/" pagename="Home" />
        <Home />
    </Route>

    <Route path="/projects">
        <WrapperHead url="/projects" pagename="Projects" />
        <Projects />
    </Route>

    <Route path="/about">
        <WrapperHead url="/about" pagename="About" />
        <About />
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