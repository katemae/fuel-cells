<script>
    import Chart from './components/Chart.svelte';
    import VariablesScrolly from './components/VariablesScrolly.svelte';
    import DiagramFC from './components/DiagramFC.svelte';

    import { writable } from 'svelte/store';
    import katexify from './katexify';

    const E0 = writable(1.0);
    const b = writable(0.05);
    const R = writable(30e-6);
    const m = writable(3e-5);
    const n = writable(8e-3);
</script>

<main>
    <div class="intro">
        <h1 id="intro-hed">Fuel Cells:</h1>
        <h2>A Quick Introduction to a Fuel Cell's Current-Density vs. Voltage Curve</h2>
        <h3 id="intro_date">
			<a href="https://github.com/katemae" target="_blank">Katelyn</a>
			and <a href="https://github.com/jman2-go" target="_blank">Jonathan</a>
			<br>
            May - June 2024
        </h3>
    </div>

    <DiagramFC />
    
    <p>
        [INSERT INFORMATION HERE!!! connect from diagram to equation below]
    </p>

    <p id="desc">
        {@html katexify("E = E_0 - b \\log(i) - Ri - m \\exp(ni)")}
    </p>

    <VariablesScrolly />

    <div class="main-graph">
        <div class="controls">
            <label>
                {@html katexify("E_0:")} <input type="range" min="0" max="1.2" step="0.01" bind:value={$E0} />
                <span>{$E0}</span>
            </label>
            <label>
                {@html katexify("b:")} <input type="range" min="0.01" max="0.1" step="0.001" bind:value={$b} />
                <span>{$b}</span>
            </label>
            <label>
                {@html katexify("R:")} <input type="range" min="10e-6" max="1000e-6" step="10e-6" bind:value={$R} />
                <span>{$R}</span>
            </label>
            <label>
                {@html katexify("m:")} <input type="range" min="1e-5" max="10e-5" step="1e-6" bind:value={$m} />
                <span>{$m}</span>
            </label>
            <label>
                {@html katexify("n:")} <input type="range" min="1e-3" max="10e-3" step="1e-4" bind:value={$n} />
                <span>{$n}</span>
            </label>
        </div>

    </div>
    <Chart {E0} {b} {R} {m} {n} />
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
