<script lang="ts">
    import TextTitle from '../lib/TextTitle.svelte';
    import { GetData }  from '../util/api'

    import { gql } from 'graphql-request';

    export let url = "";
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
    <TextTitle pagename={"Projects"} title={["My ", "!Projects"]} subtitle={["Finished", "In Development", "Coming Soon"]} />    
</main>