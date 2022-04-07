<script>
    import TextHeader from '../lib/TextHeader.svelte';
    import TextTitle from '../lib/TextTitle.svelte';
    import ButtonSocial from '../lib/ButtonSocial.svelte';
</script>

<main>
    <header>
        <TextHeader />
        <TextTitle pagename={"Home"} title={["I'm ", "!Lau", " and I'm a.."]} subtitle={["Software Developer", "CTF Player", "OSINT Enthusiast"]} />
        <div class="socials">
            <p> Where you can find me: </p>
            <ButtonSocial hover_color="#797979" text={"Github"} url={"https://github.com/Notselwyn"} />
            <ButtonSocial hover_color="#1c2538" text={"TryHackMe"} url={"https://tryhackme.com/p/notselwyn"} />
            <ButtonSocial hover_color="#e2ae12" text={"CodinGame"} url={"https://www.codingame.com/profile/295bd8e2b5e1c553cc4cbbacc9bde1f50218214"} />
        </div>
    </header>
</main>

<style>
    .socials {
        text-align: center;
        font-size: calc(1.7vw + 8px);
        user-select: none;
        margin-top: calc(30vh - 20px);
    }
</style>