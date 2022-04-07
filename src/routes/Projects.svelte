<script lang="ts">
    import TextTitle from '../lib/TextTitle.svelte';
    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';
    import { GetData }  from '../util/api'

    import { gql } from 'graphql-request';

    export let url = "";
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

    const projects = GetData(url + "/api/v1/graphql", query);
    console.log(projects);
</script>

<main>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["My ", "!Projects"]} subtitle={["Finished", "In Development", "Coming Soon"]} />    
</main>