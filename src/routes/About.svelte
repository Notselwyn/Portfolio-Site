<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';
    import SlateToSvelte from '../lib/SlateToSvelte.svelte';
    import { GetData }  from '../util/api'

    import { gql } from 'graphql-request';
    
    export let url = "https://shitdev.nl";

    const query = gql`
        {

            posts {
                id
                title
                content {
                    document
                }
                author {
                    name
                }
                tags {
                    name
                }
            }
        }       
    `

    const data_promise = GetData(url + "/api/v1/graphql", query);

</script>

<main>
    <TextHeader />
    <TextTitle pagename={"About Me"} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    {#await data_promise then data}
        {#each data.posts as post}
            <SlateToSvelte document={post.content.document} />
        {/each}
    {/await}
</main>