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

    console.log(">>>>", document);
</script>

{#each document as element}
    <div>
    {#if element.type == "paragraph"}
        {#each element.children as child}
            <a class={GetClasses(child)}>{child.text}</a>
        {/each}
    {/if}
    </div>
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