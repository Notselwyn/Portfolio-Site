<script lang="ts">
    import TextTitle from '../lib/TextTitle.svelte';
    import SlateToSvelte from '../lib/SlateToSvelte.svelte';
    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';
    import { getData }  from '../util/api'

    import { gql } from 'graphql-request';

    export let api_host = "";
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

    const data_promise = getData(api_host + "/api/v1/graphql", query);
</script>

<div>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    {#await data_promise then data}
        {#each data.posts as post, i }
            <b>
                <p class="title">
                    {post.title}
                </p>
            </b>
            {#if i % 2 == 0}
                <SlateToSvelte document={post.content.document} />
            {/if}
        {/each}
    {/await}
</div>