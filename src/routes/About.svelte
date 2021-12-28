<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';
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
    

    const data = GetData(url + "/api/v1/graphql", query);

    console.log(">>> ", data)

</script>

<main>
    <TextHeader />
    <TextTitle pagename={"About Me"} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    
</main>