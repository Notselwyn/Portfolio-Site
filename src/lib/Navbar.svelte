<script>
    import { Link } from "svelte-navigator"
    import { titleCase } from '../util/misc'
</script>

<div class="nav-container">
    <nav class="nav-options link-root">
        <Link to="/">{titleCase(window.location.hostname)}</Link>
    </nav>

    <nav class="nav-options link-pages">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About Me</Link>
    </nav>
</div>

<style>
    .nav-container {
        background-color: #0f0f0f;
        overflow: hidden;
        padding: calc(10px + 1vh) calc(10px + 0.4vw);
     }

    .nav-options :global(a) {
        padding: 1.2vh calc(20px + 0.4vw);
        font-size: calc(20px + 1.2vw);
    }

    .link-pages {
        float: right;
    }
    
    .link-root {
        float: left;
        font-weight: bold;
    }

    @media only screen and (max-width: 779px) {
        .nav-options :global(a) {
            font-size: calc(8px + 3vw);
        }

        .nav-options {
            float: none;
            text-align: center;
        }
        
        .link-root {
            display: none;
        }
    }
</style>