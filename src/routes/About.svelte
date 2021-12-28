<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';

    import { request, gql } from 'graphql-request'
    
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
    
    let data_obj = {}

    request(url + "/api/v1/graphql", query).then(data => {
        console.log(data)
        data_obj = data
    })

    console.log(">>> ", data_obj)

</script>

<main>
    <TextHeader />
    <TextTitle pagename={"About Me"} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    
</main>