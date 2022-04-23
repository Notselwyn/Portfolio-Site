<script lang="ts">
    import SlateToSvelte from '../lib/SlateToSvelte.svelte';
    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';
    import { getData }  from '../util/api'

    import { gql } from 'graphql-request';

    export let api_host = "";
    const pagename = "About Me";
    const query = gql`
{
    aboutMes {
        title
        content {
            document
        }
      	imageurl{
          url
        }
    }
}   
    `;

    const data_promise = getData(api_host + "/api/v1/graphql", query);

    data_promise.then(x => console.log(x));
</script>

<div>
    <WrapperHead pagename={pagename} />
    <WrapperBody pagename={pagename} title={["About ", "!Me"]} subtitle={["About Me", "My Skills", "My Interests"]} />

    {#await data_promise then data}
        {#each data.aboutMes as aboutMe, i }
            <div class="info-container">
                <div class="info-row">
                    <p class="info-topic">
                        {aboutMe.title}
                    </p>
                    {#if i % 2 == 0}
                        <div class="info-column info-description">
                            <SlateToSvelte element={aboutMe.content.document[0]} />
                        </div>

                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img class="info-column" src={aboutMe.imageurl.url.replace("/images", "/assets/img")} alt="image about me" />
                    {:else}
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img class="info-column" src={aboutMe.imageurl.url.replace("/images", "/assets/img")} alt="image about me" />
                        
                        <div class="info-column info-description">
                            <SlateToSvelte element={aboutMe.content.document[0]} />
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    {/await}
</div>

<style>
    @media (min-width: 1400px) {
        .info-container {
            max-width: 1320px;
        }
    }

    .info-container {
        width: 100%;
        padding-right: var(--bs-gutter-x,.75rem);
        padding-left: var(--bs-gutter-x,.75rem);
        margin-right: auto;
        margin-left: auto;
    }

    .info-description {
        width: 100%;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .info-row {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: 0.75rem;
        padding-left: 0.75rem;
        margin-top: 0;
    }

    .info-column {
        flex: 0 0 auto;
        width: 50%;
    }

    .info-topic {
        font-weight: bold;
    }
</style>