<script>
    import Chart from './components/Chart.svelte';
    import VariablesScrolly from './components/VariablesScrolly.svelte';

    import { writable } from 'svelte/store';
    import katexify from './katexify';

    const E0 = writable(30);
    const b = writable(2);
    const R = writable(0.001);
    const m = writable(0.01);
    const n = writable(0.7);
</script>

<main>
    <div class="intro">
        <h1 id="intro-hed">Fuel Cells: ...</h1>
        <p id="desc">
            {@html katexify("E = E_0 - b \\log(i) - Ri - m \\exp(ni)")}
        </p>
        <h3 id="intro_date">
			<a href="https://github.com/katemae">Katelyn</a>
			and <a href="https://github.com/jman2-go">Jonathan</a>
			<br>
            May - June 2024
        </h3>
    </div>

    <div class="controls">
        <label>
            {@html katexify("E_0:")} <input type="range" min="0" max="45" step="0.5" bind:value={$E0} />
            <span>{$E0}</span>
        </label>
        <label>
            {@html katexify("b:")} <input type="range" min="0.01" max="10" step="0.01" bind:value={$b} />
            <span>{$b}</span>
        </label>
        <label>
            {@html katexify("R:")} <input type="range" min="0.001" max="1" step="0.001" bind:value={$R} />
            <span>{$R}</span>
        </label>
        <label>
            {@html katexify("m:")} <input type="range" min="0.001" max="0.1" step="0.001" bind:value={$m} />
            <span>{$m}</span>
        </label>
        <label>
            {@html katexify("n:")} <input type="range" min="0.01" max="1" step="0.01" bind:value={$n} />
            <span>{$n}</span>
        </label>
    </div>
    
    <Chart {E0} {b} {R} {m} {n} />
    <VariablesScrolly />
</main>

<style>
    .intro {
        max-width: 600px;
        margin: 1rem auto;
        text-align: center;
        padding-top: 1rem;
    }
    #intro-hed {
        font-size: 4rem;
        margin-top: 5px;
        margin-bottom: 0;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        max-width: 100%;
        margin: auto;
        color: var(--squid-ink);
    }
    #desc {
        font-size: 1.4rem;
        color: var(--squid-ink);
        text-align: center;
        margin: 1rem;
        opacity: 0.9;
        padding: 2rem;
        font-family: var(--font-main);
    }
    #intro_date {
        font-size: 1.1rem;
        color: var(--squid-ink);
        margin: 0px;
        margin-top: 15px;
        padding-bottom: 0px;
        margin-bottom: 0px;
        color: black;
        padding-bottom: 1rem;
        font-family: var(--font-main);
    }
    .controls {
        max-width: 600px;
        margin: 1rem auto;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }
    .controls label {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    .controls input {
        margin-top: 0.5rem;
    }
</style>
