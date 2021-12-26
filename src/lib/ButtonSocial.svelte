<script>
    import { redirect } from '../util/misc'

    export let text = "";
    export let url = "";
    export let hover_color = "";
</script>

<button on:click={() => redirect(url)} style="--hover-color: {hover_color}">
    {text}
</button>

<style>
    button {
        background-color: transparent;
        border: 2px solid #ffffff;
        color: #ffffff;
        width: calc(60px + 5.8vw);
        height: calc(30px + 2vw);
        border-radius: 1337px;
        outline: none;
        cursor: pointer;
        margin-left: calc(1px + 0.2vw);
        margin-right: calc(1px + 0.2vw);
        font-size: calc(1vw + 7px);
        transition: color 0.2s,width 0.4s,height 0.4s,border 0.4s,background-color 0.2s;
    }
    
    button:hover {
        width: calc(50px + 5.8vw);
        height: calc(25px + 2vw);
        background-color: var(--hover-color);
        border: 0px solid var(--hover-color);
    }

    
    @media only screen and (max-width: 1079px) {
        button {
            margin-left: calc(1px + 0.5vw);
            margin-right: calc(1px + 0.5vw);
        }

        button:hover {
            margin-left: calc(1px + 0.5vw);
            margin-right: calc(1px + 0.5vw);
        }
    }
</style>