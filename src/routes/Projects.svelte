<script lang="ts">
    import TextTitle from '../lib/TextTitle.svelte';
    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';
    import { getData }  from '../util/api'

    import { gql } from 'graphql-request';
    import { useFocus } from 'svelte-navigator';

    const registerFocus = useFocus();

    export let api_host = "";
    const pagename = "My Projects"
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

    const projects = getData(api_host + "/api/v1/graphql", query);
</script>

<div use:registerFocus>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["My ", "!Projects"]} subtitle={["Finished", "In Development", "Coming Soon"]} />    
</div>