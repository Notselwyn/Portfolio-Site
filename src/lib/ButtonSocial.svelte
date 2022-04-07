<script>
    import { redirect } from '../util/misc'

    export let text = "";
    export let url = "";
    export let hover_color = "";
</script>

<!--<button on:click={() => redirect(url)} style="--hover-color: {hover_color}">
    {text}
</button>-->

<div style="--hover-color: {hover_color}">
    <a href="{url}">
        {text}
    </a>
</div>

<style>

    div {
        text-align: center;
        display: inline-block;
        width: calc(60px + 5.8vw);
        height: calc(30px + 2vw);

        transition: width 0.4s, height 0.4s, border 0.4s, background-color 0.2s;
        
        border: 2px solid #f0f0f0;
        border-radius: 1337px;
    }
    
    div:hover {
        width: calc(50px + 5.8vw);
        height: calc(25px + 2vw);
        
        background-color: var(--hover-color);
        border: 5px solid var(--hover-color);
    }

    a {
        cursor: pointer;
        font-size: calc(1vw + 7px);
    }

    
    @media only screen and (max-width: 1079px) {
        a {
            margin-left: calc(1px + 0.5vw);
            margin-right: calc(1px + 0.5vw);
        }

        a:hover {
            margin-left: calc(1px + 0.5vw);
            margin-right: calc(1px + 0.5vw);
        }
    }
</style>