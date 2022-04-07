<script>
    import TextTitle from '../../lib/TextTitle.svelte';
    import WrapperBody from '../../lib/WrapperBody.svelte';
    import WrapperHead from '../../lib/WrapperHead.svelte';

    const pagename = "404 - Not Found";
</script>

<main>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["!Page", " not found"]} subtitle={[]} />
</main>