<script>
    import { Link } from "svelte-navigator"
    import { titleCase } from '../util/misc'
</script>

<div class="topnav">
    <div class="tab">
        <b>
            <Link to="/">{titleCase(window.location.hostname)}</Link>
        </b>
    </div>

    <div class="tab fr">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About Me</Link>
    </div>
</div>

<style>
    .topnav {
        background-color: #0f0f0f;
        overflow: hidden;
        padding-top: 0.7vh;
        padding-bottom: 0.7vh;
     }
     
    .tab {
        float: left;
        padding: 1vh calc(10px + 0.4vw);
        font-size: calc(10px + 1.2vw);
    }

    .fr {
        float: right;
    }

    .tab :global(a) {
        float: left;
        text-align: center;
        padding: 1vh calc(10px + 0.4vw);
        font-size: calc(10px + 1.2vw);
        vertical-align: baseline;
    }
</style>