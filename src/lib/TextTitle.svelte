<script>
    export let pagename = "";
    export let subtitle = [];
    export let title = [];
    export let url = "";

    function rainbow_c() {

    }
</script>

<div class="title">
    <b>
        {#each title as elem}
            {#if elem.startsWith("!")}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="red pointer" on:click={() => rainbow_c()}>
                    {elem.slice(1)}
                </a>
            {:else} 
                <!-- svelte-ignore a11y-missing-attribute -->
                <a>
                    {elem}
                </a>
            {/if}
        {/each}
    </b>
</div>

<div class="subtitle">
    {#if pagename === "Home"}
        {#each subtitle as topic, index} 
            <b class="hover-shrink">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a>
                    {topic}
                </a>
            </b>
            {#if index < subtitle.length - 1}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a> | </a>
            {/if}
        {/each}
    {:else}
        {#if url != "/404"}
            {#each subtitle as topic, index} 
                <b class="hover-shrink">
                    <a class="pointer no-decoration" href="#{topic.toLowerCase().replace(" ", "_")}">
                        {topic}
                    </a>
                </b>
                {#if index < subtitle.length - 1}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a> | </a>
                {/if}
            {/each}
        {/if}
    {/if}
</div>

<style>
    .pointer {
        cursor: pointer;
    }

    .title {
        font-size: calc(10px + 5vw);
        text-align: center;
        margin-top: calc(20px + 8vh);
        user-select: none;
    }

    .subtitle {
        user-select: none;
        text-align: center;
        font-size: calc(5px + 2vw);
    }
    
    .red {
        color: #f03333;
    }

    .hover-shrink a {
        transition: 0.4s;
    }

    .hover-shrink:hover a {
        font-size: 90%;
    }

    .no-decoration {
        text-decoration: none;
        color: #f0f0f0;
    }
</style>