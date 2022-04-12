<script lang="ts">
    import "../assets/css/global.css";

    export let pagename = "";
    export let subtitle = [];
    export let title = [];

    let rainbow_count = 0;

    function rainbow() {
        if (rainbow_count < 2) {
            rainbow_count += 1;
            if (rainbow_count == 2) {
                for (let e of document.getElementsByClassName("red")) {
                    e.classList.add("rainbow-animation")
                }
            }
        }
    }
</script>

<div class="title">
    <b>
        {#each title as elem}
            {#if elem[0] == "!"}
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="red" on:click={() => rainbow()}>
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
    {#each subtitle as subt, i} 
        <b class="hover-shrink">
            {#if pagename != "Home"}
            <a href="#{subt.toLowerCase().replace(" ", "_")}">
                {subt}
            </a>
            {:else}
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
                {subt}
            </a>
            {/if}
        </b>
        {#if i < subtitle.length - 1}
            <!-- svelte-ignore a11y-missing-attribute -->
            <a> | </a>
        {/if}
    {/each}
</div>

<style>
    .title {
        font-size: calc(10px + 5vw);
        margin-top: calc(20px + 8vh);
    }

    .subtitle {
        font-size: calc(5px + 2vw);
    }
    
    .red {
        color: #f03333;
        cursor: pointer;
    }

    .hover-shrink a {
        transition: 0.4s;
    }

    .hover-shrink:hover a {
        font-size: 90%;
    }

    div {
        text-align: center;
    }
</style>