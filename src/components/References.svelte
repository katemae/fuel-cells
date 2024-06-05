<script>
    import { slide } from 'svelte/transition';
    let clicked = 0;
    function flip_clicked() {
        clicked = !(clicked);
    }
</script>

<!-- <button type="button" class="button" on:click={(event) => {flip_clicked()}}>
    {#if clicked}
    +
    {:else}
    &mdash;
    {/if}
    References
</button> -->
<input type='checkbox' id='check' hidden on:change={(event) => {flip_clicked()}}/>
<label for='check' class='button'>
    {#if clicked}
    +
    {:else}
    &mdash;
    {/if}
    <strong> References</strong>
</label>
{#if clicked}
<div class="reference" transition:slide={{ duration: 250, axis: 'y' }}>
    <ul class="list">
        <li><h3>Reference #1</h3> Reference 1 Description</li>
        <li><h3>Reference #2</h3> Reference 2 Description</li>
        <li><h3>Reference #3</h3> Reference 3 Description</li>
    </ul>
</div>
{/if}

<style>
    .button {
        background-color: #90E0EF;
        border: none;
        color: #03045E;
        padding: 2% 0;
        padding-left: 10%;
        width: 100%;
        text-align: Left;
        text-decoration: none;
        display: inline-block;
        font-size: 24px;
        margin-top: 5%;
        margin-bottom: 0;
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

    #check:checked + label {
            background-color: #03045E;
            color: white
    }

    .reference {
        text-align: justify;
        padding: 1% 10%;
        color: white;
        background-color: #03045E;
    }

    .body {
        text-align: justify;
        padding: 0%;
    }

    .list {
        list-style: none;
        margin-top: 0%;
    }
</style>