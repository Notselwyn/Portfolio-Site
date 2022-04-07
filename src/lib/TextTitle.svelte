<script lang="ts">
    export let pagename = "";
    export let subtitle = [];
    export let title = [];
    export let url = "";

    let rainbow_count = 0;
    function rainbow() {
        if (rainbow_count < 2) {
            rainbow_count += 1;
            if (rainbow_count == 2) {
                let rgb = [240, 50, 50];
                let i = 0;

                setInterval(() => { 
                    if (rgb[i] == 240) {
                        let index = i > 0 ? i-1 : 2; 
                        if (rgb[index] > 50) {
                            rgb[index] = Math.max(rgb[index] - 10, 50);
                        } else {
                            i = (i + 1) % 3;
                        }
                    } else {
                        rgb[i] = Math.min(rgb[i] + 10, 240);
                    }
                    for (let e of document.getElementsByClassName("red")) {
                        (<HTMLElement>e).style.color = "rgb(" + rgb.join(",") + ")";
                    }
                }, 50);
            }
        }
    }
</script>

<div class="title">
    <b class="p-container">
        {#each title as elem}
            {#if elem.startsWith("!")}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="red pointer" on:click={() => rainbow()}>
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
</style>