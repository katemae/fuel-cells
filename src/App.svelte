<script>
    import Chart from './components/Chart.svelte';
    import { writable } from 'svelte/store';

    // Define writable stores for m and b
    const m = writable(1);
    const b = writable(0);
</script>

<main>
    <div class="intro">
        <h1 id="intro-hed">Fuel Cells: ...</h1>
        <p id="desc">description here...</p>
        <h3 id="intro_date">
			<a href="https://github.com/katemae">Katelyn</a>
			and <a href="https://github.com/jman2-go">Jonathan</a>

			<br>

            May - June 2024
        </h3>
    </div>

    <div class="controls">
        <label>
            Slope (m): <input type="range" min="-5" max="5" step="0.05" bind:value={$m} />
            <span>{$m}</span>
        </label>
        <label>
            Intercept (b): <input type="range" min="0" max="10" step="0.05" bind:value={$b} />
            <span>{$b}</span>
        </label>
    </div>

    <Chart {m} {b} />
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
        justify-content: space-between;
    }
    .controls label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .controls input {
        margin-top: 0.5rem;
    }
    @media screen and (max-width: 950px) {
        #intro-hed {
            font-size: 3.5rem;
        }
        .intro-sub {
            font-size: 1.5rem;
        }
    }
</style>
