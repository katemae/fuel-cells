<script>
    import { fade } from 'svelte/transition';
    let clicked = -1;
    let hovered = -1;
    const hovered_color = "gold";
</script>

<div class="container">

    <div id="box1" class="info" style="padding: 1% 5%;">
        <h2>What is a Fuel Cell?</h2>
        Fuel cells operate based on the electrochemistry principles
        of oxidation and reduction. 
        Unlike batteries, they require an inlet fuel (such as hydrogen) to be continuously supplied for the energy-releasing reaction to occur.
        Click on different parts of the fuel cell to explore!
        <br>
        <br>
    </div>

    <div class="diagram-full">

        <div class="diagram">
            <svg viewBox="-1000 -750 2000 1250">
                <defs>
                    <filter id="f1">
                        <feDropShadow dx="-12" dy="14" stdDeviation="1" flood-opacity="0.7"/>
                    </filter>
                </defs>
                <rect
                    id="anode"
                    width="400" 
                    height="950" 
                    x="-490"
                    y="-490"
                    fill={hovered === 0 ? hovered_color: "dimgray"}
                    stroke="black"
                    stroke-width="5"
                    on:click={(event) => {clicked = 0; }}
                    on:mouseover={(event) => {hovered = 0; }}
                    on:mouseout={(event) => { hovered = -1; }}
                />
                <rect
                    id="electrolyte"
                    width="200" 
                    height="950" 
                    x="-100"
                    y="-490"
                    fill={hovered === 1 ? hovered_color: "white"}
                    stroke="black"
                    stroke-width="5"
                    on:click={(event) => {clicked = 1;}}
                    on:mouseover={(event) => {hovered = 1; }}
                    on:mouseout={(event) => { hovered = -1; }}
                />
                <rect
                    id="cathode"
                    width="400" 
                    height="950" 
                    x="90"
                    y="-490"
                    fill={hovered === 2 ? hovered_color: "lightgray"}
                    stroke="black"
                    stroke-width="5"
                    on:click={(event) => {clicked = 2;}}
                    on:mouseover={(event) => {hovered = 2; }}
                    on:mouseout={(event) => { hovered = -1; }}
                />
                <path
                class = "hoverable"
                d="M-400 -490
                L-400 -740
                L 400 -740
                L 400 -490
                L 350 -490
                L 350 -690
                L-350 -690
                L-350 -490
                Z"
                fill={hovered === 3 ? hovered_color: "white"}
                stroke="black"
                stroke-width=5px
                on:click={(event) => {clicked = 3;}}
                on:mouseover={(event) => {hovered = 3; }}
                on:mouseout={(event) => { hovered = -1; }}
                />
                <circle 
                    r=50
                    cx=-600
                    cy=-400
                    stroke="black"
                    stroke-width="5"
                    fill=none
                />
                <line
                    x1=-625
                    y1=-400
                    x2=-575
                    y2=-400
                    stroke="black"
                    stroke-width="5"
                />

                <circle 
                    r=50
                    cx=600
                    cy=-400
                    stroke="black"
                    stroke-width="5"
                    fill=none
                />
                <line
                    x1=625
                    y1=-400
                    x2=575
                    y2=-400
                    stroke="black"
                    stroke-width="5"
                />
                <line
                    x1=600
                    y1=-425
                    x2=600
                    y2=-375
                    stroke="black"
                    stroke-width="5"
                />
            </svg>
        </div>

        <div class="tooltip">
            {#if clicked === 0}
            <div in:fade>
            <header>Anode</header>
                The anode, also known as the negative electrode, oxidizes hydrogen with this half reaction,
                <p class="equation">
                    2H<sub>2</sub> &#8594 4H<sup>+</sup> + 4<i>e</i><sup>-</sup>
                </p>
                releasing electrons which do electrical work through the connected circuit. 
                Typically, 
            </div>
            {:else if clicked === 1}
            <header in:fade>Electrolyte</header>
            <p in:fade>
                The electrolyte is an ionic solution which enables the transfer of charged ions between electrodes.
            </p>
            {:else if clicked === 2}
            <div in:fade>
                <header>Cathode</header>
                    The cathode, also known as the positive electrode, reduces oxygen with this half reaction:
                    <p class="equation">
                        O<sub>2</sub> + 4<i>e</i><sup>-</sup> + 4H<sup>+</sup> &#8594 2H<sub>2</sub>O
                    </p>
            
                </div>
            {:else}
            <p style="text-align: center">
                Click any component of the fuel cell!
            </p>
            {/if}
        </div>

    </div>
</div>

<style>

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 2rem auto;
        width: 90%;
    }

    svg {
        height: 300px;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            align-items: center;
        }
        
        .info,
        .chart-content {
            width: 100%;
            margin: 0;
            padding: 1rem 0;
        }
        
        .tooltip {
            width: 100%;
            margin: 1rem 0;
        }

        .diagram-full {
            width: 90%;
            margin: auto;
        }

        svg {
            height: 100%;
            width: 100%;
        }

    }


    .info {
        flex: 1;
        text-align: justify;
        font-size: 16px;
        margin: 1rem;
        padding: 1% 5%;
    }

    .diagram-full {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .diagram {
        text-align: center;
        margin-bottom: 20px;
    }

    .tooltip {
        border-color: 03045E;
        border: solid;
        border-radius: 10px;
        padding: 10px;
        background-color: #CAF0F8;
        width:80%;
        text-align: center;
    }

    .equation {
        text-align: center;
        font-family: 'Times New Roman', Times, serif;
    }

    header {
        font-size: 24px;
        text-align: center;
    }

    rect,
    .hoverable {
        cursor: pointer;
    }
</style>
