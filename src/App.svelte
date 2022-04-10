<script lang="ts">
    // External packages
    import { Router, Route } from "svelte-navigator";

    // Pages
    import Home from "./routes/Home.svelte";
    import Projects from "./routes/Projects.svelte";
    import About from "./routes/About.svelte";

    // global JS & CSS
    import "./assets/css/global.css";

    const dev_server = true;

    let api_host = "";
    if (dev_server) {
        api_host = `//${window.location.hostname}:80`; // used for overwriting the url in the dev server, so it gets passed to nginx
    } 
</script>

<Router primary={false}>
    <main>
        <Route>
            <Home />
        </Route>

        <Route path="projects">
            <Projects api_host={api_host} />
        </Route>

        <Route path="about">
            <About api_host={api_host} />
        </Route>
    </main>
</Router>