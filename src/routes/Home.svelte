<script>
    import TextTitle from '../lib/TextTitle.svelte';
    import ButtonSocial from '../lib/ButtonSocial.svelte';

    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';

    const pagename = "Home";
</script>

<div>
    <WrapperHead pagename={pagename} />
    <WrapperBody />
    <TextTitle pagename={pagename} title={["I'm ", "!Lau", " and I'm a.."]} subtitle={["Software Developer", "CTF Player", "OSINT Enthusiast"]} />
    <div class="socials">
        <p> Where you can find me: </p>
        <ButtonSocial hover_color="#797979" text={"Github"} url={"https://github.com/Notselwyn"} />
        <ButtonSocial hover_color="#1c2538" text={"TryHackMe"} url={"https://tryhackme.com/p/notselwyn"} />
        <ButtonSocial hover_color="#e2ae12" text={"CodinGame"} url={"https://www.codingame.com/profile/295bd8e2b5e1c553cc4cbbacc9bde1f50218214"} />
    </div>
</div>

<style>
    .socials {
        text-align: center;
        font-size: calc(1.7vw + 8px);
        margin-top: calc(30vh - 20px);
    }
</style>