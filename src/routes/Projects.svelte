<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';

    export let url = "https://shitdev.nl";

    let projects = fetch(url + "/api/v1/graphql");
</script>

<main>
    <TextHeader />
    <TextTitle pagename={"Projects"} title={["My ", "!Projects"]} subtitle={["Finished", "In Development", "Coming Soon"]} />

    
</main>