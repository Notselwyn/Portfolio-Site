<script lang="ts">
    import { redirect } from '../util/misc'

    export let text = "";
    export let url = "";
    export let hover_color = "";
</script>

<div class="parent" style="--hover-color: {hover_color}" on:click={() => redirect(url)}>
    <div class="child">
        <p>
            {text}
        </p>
    </div>  
</div>

<style>
    .parent {
        padding: 10px;
    }

    .child  {
        width: calc(140px + 3vw);

        cursor: pointer;

        border: 2px solid #f0f0f0;
        border-radius: 1337px;
        transition: width 0.4s, height 0.4s, border 0.4s, background-color 0.2s ease;
    }
    
    .parent:hover > .child  {
        width: calc(130px + 3vw);
        
        background-color: var(--hover-color);
        border: 2px solid var(--hover-color);
    }

    p {
        font-size: 80%;
    }

    /*
        desk: 20px + 1.2vw
        mobile: 15px + 1.4vw
    */
    @media only screen and (max-width: 779px) {
        .child {
            width: calc(200px + 3vw);
        }

        .parent {
            margin-left: auto;
            margin-right: auto;
        }
        
        .parent:hover > .child  {
            width: calc(180px + 3vw);
        }
        
        p {
            font-size: 90%;
        }
    }
</style>