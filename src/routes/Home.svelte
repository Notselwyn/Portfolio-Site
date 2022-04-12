<script>
    import ButtonSocial from '../lib/ButtonSocial.svelte';

    import WrapperBody from '../lib/WrapperBody.svelte';
    import WrapperHead from '../lib/WrapperHead.svelte';

    const pagename = "Home";
</script>

<div>
    <WrapperHead pagename={pagename} />
    <div>
        <WrapperBody pagename={pagename} title={["I'm ", "!Lau", " and I'm a.."]} subtitle={["Software Developer", "CTF Player", "OSINT Enthusiast"]} />
    </div>
    <div class="socials-container">
        <p> Where you can find me: </p>
        <div class="socials-buttons">
            <ButtonSocial hover_color="#797979" text="Github" url="https://github.com/Notselwyn" />
            <ButtonSocial hover_color="#1c2538" text="TryHackMe" url="https://tryhackme.com/p/notselwyn" />
            <ButtonSocial hover_color="#e2ae12" text="CodinGame" url="https://www.codingame.com/profile/295bd8e2b5e1c553cc4cbbacc9bde1f50218214" />
        </div>
    </div>
</div>

<style>
    /*16px + 0.6vw*/
    .socials-container {
        text-align: center;
        font-size: calc(18px + 0.7vw);
        margin-top: calc(30vh);
    }

    .socials-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    @media only screen and (min-width: 2559px) {
        .socials-container {
            font-size: calc(20px + 1vw);
        }
    }

    @media only screen and (max-width: 779px) {
        .socials-buttons {
            flex-direction: column;
        }
        @media only screen and (max-height: 799px) {
            .socials-container {
                margin-top: calc(20vh);
            }
        }

        @media only screen and (max-height: 689px) {
            .socials-container {
                display: none;
            }
        }
    }
    @media only screen and not (max-width: 779px) {
        @media only screen and (max-height: 599px) {
            .socials-container {
                margin-top: calc(20vh);
            }
        }

        @media only screen and (max-height: 499px) {
            .socials-container {
                display: none;
            }
        }
    }
</style>