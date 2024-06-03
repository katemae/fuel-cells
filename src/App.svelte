<script>
    import Chart from './components/Chart.svelte';
    import VariablesScrolly from './components/VariablesScrolly.svelte';
    import DiagramFC from './components/DiagramFC.svelte';
    import Why from './components/Why.svelte';

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
    <Why />

    <p id="desc">
        {@html katexify("E = E_0 - b \\log(i) - Ri - m \\exp(ni)")}
    </p>

    <VariablesScrolly />

    <div class="chart-container">
        <div class="controls-container">
            <div class="control">
                <label>{@html katexify("E_0:")} </label>
                <input type="range" min="0" max="1.2" step="0.01" bind:value={$E0} />
                <span>{$E0}</span>
            </div>
            <div class="control">
                <label>{@html katexify("b:")} </label>
                <input type="range" min="0.01" max="0.1" step="0.001" bind:value={$b} />
                <span>{$b}</span>
            </div>
            <div class="control">
                <label>{@html katexify("R:")} </label>
                <input type="range" min="10e-6" max="1000e-6" step="10e-6" bind:value={$R} />
                <span>{$R}</span>
            </div>
            <div class="control">
                <label>{@html katexify("m:")} </label>
                <input type="range" min="1e-5" max="10e-5" step="1e-6" bind:value={$m} />
                <span>{$m}</span>
            </div>
            <div class="control">
                <label>{@html katexify("n:")} </label>
                <input type="range" min="1e-3" max="10e-3" step="1e-4" bind:value={$n} />
                <span>{$n}</span>
            </div>
        </div>

        <div class="graph-container">
            <Chart {E0} {b} {R} {m} {n} />
        </div>
    </div>
</main>

<style>
    .intro {
        height: 40vh;
        margin-bottom: 7vh;
        text-align: center;
        padding-top: 12rem;
        padding-bottom: 10rem;
        background-color: #03045E;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        color: #CAF0F8;
    }

    .intro a {
        color: #00B4D8;
    }

    #intro-hed {
        font-size: 4rem;
        margin-top: 5px;
        margin-bottom: 0;
        letter-spacing: 1.5px;
        text-transform: uppercase;
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
        margin: 0;
        margin-top: 15px;
        padding-bottom: 1rem;
        font-family: var(--font-main);
    }

    @media (max-width: 950px) {
        #intro-hed {
            font-size: 3rem;
        }

        #desc {
            font-size: 1.2rem;
        }

        #intro_date {
            font-size: 1rem;
    }

    }

    .graph-container {
        flex: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
    }

    .chart-container {
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .controls-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        margin-left: 7%;
    }


    .graph-container .controls-container {
        margin-right: 20px;
    }


    .control {
        display: flex;
        align-items: center;
    }

    .control label {
        width: 60px;
    }


</style>
