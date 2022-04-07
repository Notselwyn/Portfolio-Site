<script>
    export let pagename = "";
    export let subtitle = [];
    export let title = [];
    export let url = "";

    let rainbow_count = 0;

    function RGB_to_hex(list_rgb_color) {
        let hex_color = "#";
        for (let i = 0; i < list_rgb_color.length; i++) {
            let hex = list_rgb_color[i].toString(16);
            if (hex.length == 1) {
                hex = "0" + hex;
            }
            hex_color += hex;
        }
        return hex_color;
    }

    function rainbow_loop() {
        let active_rgb = [255, 0, 0];
        let active_rgb_index = 0;
        let increments = 10;

        // 255,0,0 -> 255,255,0 -> 0,255,0 -> 0,255,255 -> 0,0,255 -> 255,0,255 -> 255,0,0
        let timer = setInterval(function(){ 
            if (active_rgb[active_rgb_index] == 255) {
                if (active_rgb[active_rgb_index-1] > 0) {
                    active_rgb[active_rgb_index] -= increments;
                } else {
                    active_rgb_index = (active_rgb_index + 1) % 3;
                }
            } else {
                active_rgb[active_rgb_index] += increments;
            }

            console.log(active_rgb)
        }, 50);
    }

    function rainbow_c() {
        if (rainbow_count < 3) {
            rainbow_count += 1;
            console.log(rainbow_count);
            if (rainbow_count == 3) {
                rainbow_loop();
            }
        }
    }
</script>

<div class="title">
    <b class="p-container">
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
</style>