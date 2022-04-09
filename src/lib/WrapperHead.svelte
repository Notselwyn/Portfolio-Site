<script>
    import { titleCase } from '../util/misc'

    export let pagename = "";
    export let seo_keywords = ""; // Optional SEO keywords
    export let seo_description = `The ${pagename} page of Lau's portfolio website. Website about coding, hacking (writeups), and reverse engineering.`;

    // stop animations on resize for 400ms. .resize-animation-stopper is defined in /src/assets/css/general.css
    let resizeTimer;
    window.addEventListener("resize", () => {
        document.body.classList.add("resize-animation-stopper");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove("resize-animation-stopper");
        }, 400);
    });
</script>

<svelte:head>
    <meta name="robots" content="index,follow">
    <meta name="googlebot" content="index,follow">
    <meta name="description" content={seo_description}>
    <meta name="keywords" content="shitdev, shit dev, coding, programming, writeups, web development, localhost, localhost/My Projects, My Projects, lau{seo_keywords}">
    <meta property="og:title" content="{pagename} | {titleCase(window.location.hostname)}">
    <meta property="og:description" content="Portfolio website for Lau, including personal info and writeups.">
    <meta property="og:url" content={window.location.toString()}>
    <meta property="og:image" content="{window.location.protocol}//{window.location.hostname}/favicon.ico">
    <meta property="og:image:alt" content={window.location.pathname}>

    <title> 
        {pagename} | {titleCase(window.location.hostname)}
    </title>
</svelte:head>
