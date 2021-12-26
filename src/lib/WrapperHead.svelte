<script>
    export let url = "";
    export let pagename = "";
    export let seo_keywords = ""; // Optional SEO keywords

    export let embed_description = "Portfolio website for Lau, including personal info and writeups.";
    export let seo_description = `The ${pagename} page of Lau's portfolio website. Website about coding, hacking (writeups), and reverse engineering.`;
</script>

<svelte:head>
    <!-- Embed information -->
    <meta charset="UTF-8">
    <meta property="og:title" content="Shitdev.nl">
    <meta property="og:description" content={embed_description}>
    <meta property="og:url" content="https://www.shitdev.nl{url}">
    <meta property="og:image" content="https://www.shitdev.nl/favicon.ico">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">

    <!-- SEO -->
    <meta name="url" content="https://www.shitdev.nl{url}">
    <meta name="title" content="Shitdev | {pagename}">
    <meta name="description" content={seo_description}>
    <meta name="theme-color" content="#1c1c1c">
    <meta name="type" content="website">
    <meta name="keywords" content="shitdev, shitdev.nl, shitdev.nl/{pagename}, {pagename}, lau{seo_keywords}">

    <!-- General -->
    <title> 
        {pagename}
    </title>
</svelte:head>
