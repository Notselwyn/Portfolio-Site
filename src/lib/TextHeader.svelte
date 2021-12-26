<script>
    import { Link } from "svelte-navigator"
</script>

<div class="topnav">
    <div class="tab">
        <b>
            <Link to="/">Shitdev.nl</Link>
        </b>
    </div>

    <div class="tab fr">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
    </div>
</div>

<style>
    .topnav {
        background-color: #0f0f0f;
        overflow: hidden;
        margin: 0;
        padding-top: 0.7vh;
        padding-bottom: 0.7vh;
        user-select: none;
     }
     
    .tab {
        float: left;
        color: #f2f2f2;
        padding: 1vh calc(10px + 0.4vw);
        text-decoration: none;
        font-size: calc(10px + 1.2vw);
        margin: 0;
        border: 0;
        outline: 0;
        vertical-align: baseline;
        background: transparent;
        user-select: none;
    }

    .fr {
        float: right;
    }
</style>