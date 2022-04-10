<script>
    import Navbar from "./Navbar.svelte";
    import TextTitle from "./TextTitle.svelte";

    export let pagename = "";
    export let title = [];
    export let subtitle = [];
</script>

<Navbar />
<TextTitle pagename={pagename} title={title} subtitle={subtitle} />