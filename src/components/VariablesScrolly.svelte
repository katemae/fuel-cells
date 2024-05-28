<script>
    import Scrolly from "./Scrolly.svelte";
    import katexify from "../katexify";
    import { select } from "d3-selection";

    let value;

    let steps = [];

    // Preprocess the steps content with katexify
        steps = [
            { title: 'E_0', content: ".... desc for E_0" },
            { title: 'b', content: ".... desc for b" },
            { title: 'R', content: ".... desc for R" },
            { title: 'm', content: ".... desc for m" },
            { title: 'n', content: ".... desc for n" },
        ];


    const target2event = {
        0: () => {
            select("#chart1").style("background-color", "purple");
            select("#chart2").style("background-color", "coral");
        },
        1: () => {
            select("#chart1").style("background-color", "red");
            select("#chart2").style("background-color", "green");
        },
        2: () => {
            select("#chart1").style("background-color", "purple");
            select("#chart2").style("background-color", "coral");
        },
        3: () => {
            select("#chart1").style("background-color", "red");
            select("#chart2").style("background-color", "green");
        },
        4: () => {
            select("#chart1").style("background-color", "purple");
            select("#chart2").style("background-color", "coral");
        },
        5: () => {
            select("#chart1").style("background-color", "red");
            select("#chart2").style("background-color", "green");
        },
    };

    $: if (typeof value !== "undefined") target2event[value]();
</script>

<h2 class="body-header">Understanding the Variables</h2>
<p class="body-text">
    description ... understanding the difference between high and low values for each is important bc ... etc...
</p>
<section>
    <!-- scroll container -->
    <div class="section-container">
        <div class="steps-container">
            <Scrolly bind:value>
                {#each steps as step, i}
                    <div class="step" class:active={value === i}>
                        <div class="step-content">
                            <h1 class="step-title">{@html katexify(step.title)}</h1>
                            <p>{@html step.content}</p>
                        </div>
                    </div>
                {/each}
                <div class="spacer" />
            </Scrolly>
        </div>
        <div class="charts-container">
            <div class="chart-one">
                <svg id="chart1" />
            </div>
            <div class="chart-two">
                <svg id="chart2" />
            </div>
        </div>
    </div>
    <br /><br />
    <p class="body-text">conclusions about variables ... </p>
</section>

<style>
    .body-header,
    .body-text {
        padding: 1% 5%;

    }

    #chart1,
    #chart2 {
        width: 100%;
        height: 100%;
    }
    .chart-one {
        width: 100%;
        height: 100%;
        border: 3px solid skyblue;
    }
    .chart-two {
        width: 100%;
        height: 100%;
        border: 3px solid coral;
    }
    .spacer {
        height: 40vh;
    }
    .charts-container {
        position: sticky;
        top: 10%;
        display: grid;
        width: 50%;
        grid-template-columns: 100%;
        grid-row-gap: 2rem;
        grid-column-gap: 0rem;
        grid-template-rows: repeat(2, 1fr);
        height: 85vh;
        border: 3px solid black;
    }
    .section-container {
        margin-top: 1em;
        text-align: center;
        transition: background 100ms;
        justify-content: center;
        padding: 0 15%;
        display: flex;
    }
    
    .step {
        height: 110vh;
        display: flex;
        place-items: center;
        justify-content: center;
    }
    .step-content {
        font-size: 18px;
        background: var(--bg);
        border-radius: 1px;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: background 500ms ease;
        text-align: left;
        width: 75%;
        margin: auto;
        max-width: 500px;
        font-family: var(--font-main);
        line-height: 1.3;
        border: 5px solid var(--default);
    }

    .step.active .step-content {
        background: #f1f3f3ee;
        color: var(--squid-ink);
    }
    .steps-container {
        height: 100%;
    }
    .steps-container {
        flex: 1 1 40%;
        z-index: 10;
    }

    @media screen and (max-width: 950px) {
        .section-container {
            flex-direction: column-reverse;
        }
        .steps-container {
            pointer-events: none;
        }
        .charts-container {
            top: 7.5%;
            width: 95%;
            margin: auto;
        }
        .step {
            height: 130vh;
        }
        .step-content {
            width: 95%;
            max-width: 768px;
            font-size: 17px;
            line-height: 1.6;
            color: black;
        }
        .spacer {
            height: 100vh;
        }
    }

    .math-expression {
        color: inherit;
        font-family: inherit; 
    }
</style>