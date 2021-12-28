<script>
    export let document = [];

    function GetClasses(child) {
        let classes = [];
        for (let k of Object.keys(child)) {
            if (k != 'text') {
                classes.push(k);
            }
        }

        return classes.join(" ");
    }
</script>

{#each document as element}
    <!--{#if element.type == "paragraph"}
        {#each element.children as child}
            <p class={GetClasses(child)}>{child.text}</p>
        {/each}
    {/if}-->
{/each}

<style>
    .italic {
        font-style: italic;
    }

    .bold {
        font-weight: bold;
    }

    .underline {
        text-decoration: underline;
    }

    .strikethrough {
        text-decoration: line-through;
    }

    .small {
        font-size: small;
    }

    .large {
        font-size: large;
    }
</style>