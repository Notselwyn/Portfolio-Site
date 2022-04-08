<script>
    import { Link } from "svelte-navigator"
    import { titleCase } from '../util/misc'
</script>

<div class="nav-container">
    <div class="nav-options link-root">
        <b>
            <Link to="/">{titleCase(window.location.hostname)}</Link>
        </b>
    </div>

    <div class="nav-options link-pages">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About Me</Link>
    </div>
</div>

<style>
    .nav-container {
        background-color: #0f0f0f;
        overflow: hidden;
        padding: calc(10px + 1vh) calc(10px + 0.4vw);
     }

    .nav-options :global(a) {
        text-align: center;
        padding: 1.2vh calc(20px + 0.4vw);
        font-size: calc(20px + 1.2vw);
        vertical-align: baseline;
    }

    .link-pages {
        float: right;
    }
    
    .link-root {
        float: left;
    }

    @media only screen and (max-width: 779px) {
        .nav-options :global(a) {
            padding: 0 calc(8px + 0.3vw);
            font-size: calc(15px + 1.4vw);
        }

        .nav-options {
            float: none;
            display: block;
            text-align: center;   
        }

        .link-pages {
            margin-top: calc(3px + 1.2vh);
        }
    }
</style>