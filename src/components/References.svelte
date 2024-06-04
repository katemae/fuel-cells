<script>
    import { slide } from 'svelte/transition';
    let clicked = 0;
    function flip_clicked() {
        clicked = !(clicked);
    }
</script>
<button type="button" class="button" on:click={(event) => {flip_clicked()}}>
    {#if clicked}
    +
    {:else}
    &mdash;
    {/if}
    References
</button>
{#if clicked}
<div class="reference" transition:slide={{ duration: 250, axis: 'y' }}>
    <ul class="list">
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
    </ul>
</div>
{/if}
<div class="body">
    <p>
        Therefore, it becomes necessary to have tools to properly characterize a fuel cell in order to design an efficient one.
        Enter, the current-density vs. voltage curve! Also known as a polarization curve, it tells a story of a fuel cell's effectiveness.
    </p>
</div>

<style>
    .button {
    border: none;
    color: black;
    padding: 16px 32px;
    width: 100%;
    text-align: Left;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 40px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    }
    .button:hover {
    background-color: #03045E;
    color: white;
    }
    .button:active {
    background-color: #03045E;
    transform: translateY(4px);
    }

    .reference {
        text-align: justify;
        /* margin: 50px; */
        padding: 0%;
    }
    .body {
        text-align: justify;
        /* margin: 50px; */
        padding: 0%;
    }
    .list {
        list-style: none;
        margin-top: 0%;
    }
</style>