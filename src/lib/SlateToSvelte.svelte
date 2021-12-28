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
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class={GetClasses(child)}>{child.text}</a>
        {/each}
    {:else if element.type == "heading"}
        {#if element.level == 1}
            {#each element.children as child}
                <h1>{child.text}</h1>
            {/each}
        {:else if element.level == 2}
            {#each element.children as child}
                <h2>{child.text}</h2>
            {/each}
        {:else if element.level == 3}
            {#each element.children as child}
                <h3>{child.text}</h3>
            {/each}
        {:else if element.level == 4}
            {#each element.children as child}
                <h4>{child.text}</h4>
            {/each}
        {:else if element.level == 5}
            {#each element.children as child}
                <h5>{child.text}</h5>
            {/each}
        {:else if element.level == 6}
            {#each element.children as child}
                <h6>{child.text}</h6>
            {/each}
        {/if}
    {:else if element.type == "unordered-list"}
        {#each element.children as child}
            <ul>
                {#each child.children as item}
                    <li>{item.text}</li>
                {/each}
            </ul>
        {/each}
    {:else if element.type == "ordered-list"}
        {#each element.children as child}
            <ol>
                {#each child.children as item}
                    <li>{item.text}</li>
                {/each}
            </ol>
        {/each}
    {:else if element.type == "divider"}
        {#each element.children as child}
            <hr />
        {/each}
    {:else if element.type == "blockquote"}
        {#each element.children as child}
            <p>Haven't added blockquotes yet :> #TODO (just imagine there's one here)</p>
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

    .code {
        font-family: monospace;
        background-color: #f0f0f0;
        color: #1c1c1c;
    }

    .superscript {
        vertical-align: super;
    }

    .subscript {
        vertical-align: sub;
    }
</style>