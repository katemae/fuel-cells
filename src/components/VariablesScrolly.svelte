<script>
    import Scrolly from "./Scrolly.svelte";
    import ChartScrolly from "./ChartScrolly.svelte";
    import katexify from "../katexify";

    export let value;

    // Default values
    const E0 = 1.0;
    const b =  0.05;
    const R =  30e-6;
    const m =  3e-5;
    const n =  8e-3;
    
    let steps = [];

        steps = [
            { title: 'Activation Losses: E<sub>0</sub>  and b', 
            content: "Activation losses arise from the rate of the reaction at each electrode. E<sub>0</sub> encompasses the voltage differential between the reversible voltage and the measured voltage. b comes from the non-linear Tafel equation, which describes the variation in reaction rate at different current densities. A higher b indicates a slower reaction. Together, they form the low current density region." 
            },
            { title: 'Fuel Crossover and Internal Currents', 
            content: "An extra source of voltage loss is observed from the imperfect electrolyte. The electrolyte, despite its electronic resistivity, still lets through a small amount of electrons. Additionally, some hydrogen gas can diffuse through the electrolyte to react with the oxygen. Both result in voltage drop within the observed voltage."
            },
            { title: 'Ohmic Losses: R', 
            content: "As implied in the name, ohmic losses come from interal resistance of the fuel cell. Internal resistance is affected by factors such as electrical conductivity of the electrodes and the ionic conductivity of the electrolyte. The ohmic losses describe the intermediate current density region, which is mostly linear." 
            },
            { title: 'Mass Transfer Losses: m and n', 
            content: "Lastly, mass transfer losses materialize from the concentration of gasses at each electrode. When hydrogen or oxygen gas is reacted, its partial pressure drops, reducing voltage. m and n are empirical parameters, providing a nice fit to the curve. Mass transfer losses dominate in the high current density region."
            }
        ];

    let chartParams1 = { E0, b, R, m, n };
    let chartParams2 = { E0, b, R, m, n };
</script>

<h2 class="body-header">Understanding the Parameters</h2>
<p class="body-text">
    Ideally, a fuel cell would operate at its theoretical voltage of 1.2 volts, no matter the condition. 
    However, fuel cells in real life are not perfect; factors such as temperature, pressure of the fuel, materials, and construction all contribute to fuel cell voltage losses, also known as irreversibilities.
    Each parameter of this fitted characterization curve helps describe a different type of loss.
</p>
<section>
    <!-- scroll container -->
    <div class="section-container">
        <div class="steps-container">
            <Scrolly bind:value>
                {#each steps as step, i}
                    <div class="step" class:active={value === i}>
                        <div class="step-content">
                            <h1 class="step-title">{@html step.title}</h1>
                            <p>{@html step.content}</p>
                        </div>
                    </div>
                {/each}
                <div class="spacer" />
            </Scrolly>
        </div>
        <div class="charts-container">
            {#if value === 0}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} E0={1.2} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} E0={0.5} />
                </div>
            {:else if value === 1}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} b={0.1} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} b={0.01} />
                </div>
            {:else if value === 2}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} R={0.001} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} R={0.00001} />
                </div>
            {:else if value === 3}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} m={0.0001} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} m={0.00001} />
                </div>
            {:else if value === 4}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} n={0.01} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} n={0.001} />
                </div>
            {:else}
                <div class="chart-one">
                    <ChartScrolly {...chartParams1} />
                </div>
                <div class="chart-two">
                    <ChartScrolly {...chartParams2} />
                </div>
            {/if}
        </div>
    </div>
    
    <br /><br />
    <p class="body-text">
        In conclusion, each source of voltage loss plays a role in the effectiveness of the fuel cell. 
        From the current-density versus voltage curve, these parameters can be fitted from collected data, and key sources of fuel cell losses can be determined.
        Therefore, with a solid understanding of this characterization method, better fuel cells can be designed for an energy efficient future.
        (Note: this website provides a simplified view of this curve; lots of active research is still being done to accurately model a fuel cell's behavior, especially at extreme temperatures and pressures.)
    </p>
</section>

<style>
    .body-header,
    .body-text {
        padding: 1% 11%;
    }

    .chart-one, .chart-two {
        width: 100%;
        height: 85%;
        background-color: white;
    }

    .spacer {
        height: 40vh;
    }
    .charts-container {
        position: sticky;
        top: 10%;
        display: grid;
        width: 45%;
        grid-template-columns: 100%;
        grid-row-gap: 2rem;
        grid-column-gap: 0rem;
        grid-template-rows: repeat(2, 1fr);
        height: 85vh;
    }
    .section-container {
        margin-top: 1em;
        text-align: center;
        transition: background 100ms;
        justify-content: center;
        padding: 0 10%;
        display: flex;
        gap: 5%;
    }
    
    .step {
        height: 110vh;
        display: flex;
        place-items: center;
        justify-content: left;
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
        width: 90%;
        margin-left: 3%;
        max-width: 500px;
        font-family: var(--font-main);
        line-height: 1.3;
        border: 5px solid var(--default);
    }

    .step.active .step-content {
        background: #90E0EF;
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
