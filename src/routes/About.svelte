<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';
    
    export let url = "https://shitdev.nl";

    let aboutmes = fetch(url + "/api/v1/graphql");
</script>

<main>
    <TextHeader />
    <TextTitle pagename={"About Me"} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    
</main>