<script lang="ts">
    import TextTitle from '../lib/TextTitle.svelte';
    import SlateToSvelte from '../lib/SlateToSvelte.svelte';
    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';
    import { GetData }  from '../util/api'

    import { gql } from 'graphql-request';

    export let url = "";
    const pagename = "About Me";
    const query = gql`
        {

            posts {
                id
                title
                content {
                    document
                }
                tags {
                    name
                }
            }
        }       
    `;

    const data_promise = GetData(url + "/api/v1/graphql", query);
    console.log(data_promise);
</script>

<main>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    {#await data_promise then data}
        {#each data.posts as post}
            <SlateToSvelte document={post.content.document} />
        {/each}
    {/await}
</main>