<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';
    import GetData from '../util/api.ts'
    
    export let url = "https://shitdev.nl";

    function getData() {
        return request(url, query)
    }

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
    

    const data = await (async () => request(url + "/api/v1/graphql", query))

    console.log(">>> ", data)

</script>

<main>
    <TextHeader />
    <TextTitle pagename={"About Me"} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    
</main>