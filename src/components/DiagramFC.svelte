<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let clicked = -1;
    let hovered = -1;
    const hovered_color = "gold";

    function animateCircuit() {
        const electrons = document.querySelectorAll('.electron animateMotion');
        electrons.forEach((electron, i) => {
            electron.beginElement();
        });
    }
</script>

<div class="container">

    <div id="box1" class="info">
        <h2>What is a Fuel Cell?</h2>
        Fuel cells operate based on the electrochemistry principles of oxidation and reduction. 
        Using an inlet fuel such as hydrogen, a fuel cell converts chemical energy to electricity with its  
        <a href=https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Electrochemistry/Redox_Chemistry/Half-Reactions>
            <b>half reactions</b></a>.
        Unlike batteries, fuel cells need to be continuously supplied for the energy-releasing reaction to occur.
        The most well-known fuel cell is the <a href=https://en.wikipedia.org/wiki/Proton-exchange_membrane_fuel_cell><b>Proton-Exchange Membrane Fuel Cell</b></a> (PEMFC), 
        which utilizes the reaction
        <p class="equation">
            2H<sub>2</sub> + O<sub>2</sub> &#8594 2H<sub>2</sub>O
        </p>
        which has a potential of approximately 1.2 volts and produces electrical energy.
        Click on different parts of this fuel cell to explore!
        <br>
        <br>
    </div>

    <div class="diagram-full">

        <div class="diagram">
            <svg viewBox="-1000 -900 2000 1400">
                <defs>
                    <filter id="f1">
                        <feDropShadow dx="-12" dy="14" stdDeviation="1" flood-opacity="0.7"/>
                    </filter>
                    <marker 
                        id='head' orient="auto"
                        markerWidth='10' markerHeight='10'
                        refX='0.1' refY='2'>
                        <path d='M0,0 V4 L2,2 Z' fill="black"/>
                    </marker>
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
                class="hoverable"
                d="M-400 -490
                L-400 -740
                L 400 -740
                L 400 -490
                L 350 -490
                L 350 -690
                L-350 -690
                L-350 -490
                Z"
                fill={hovered === 3 ? hovered_color : "white"}
                stroke="black"
                stroke-width="5px"
                on:click={(event) => {clicked = 3; animateElectrons();}}
                on:mouseover={(event) => {hovered = 3;}}
                on:mouseout={(event) => { hovered = -1; }}
            />
            
                <!-- Electrons animation -->
                <path id="circuitPath" d="M-400 -490 V -740 H 400 V -490" fill="none" stroke="none"/>
                {#if clicked === 3}
                    {#each Array(5) as _, i}
                        <circle class="electron" r="15" fill="#ffb703">
                            <animateMotion
                                class="electronMotion"
                                dur="5s"
                                repeatCount="indefinite"
                                begin={(i * 1) + "s; anim" + i + ".begin"}>
                                <mpath href="#circuitPath"/>
                            </animateMotion>
                        </circle>
                    {/each}
                {/if}
                
                <!-- turns out PEM fuel cells have their electrolyte as a membrane... -->
                <!-- <rect
                    id="membrane"
                    width="40" 
                    height="1000" 
                    x="-25"
                    y="-525"
                    fill={hovered === 4 ? hovered_color: "#FFF8DC"}
                    stroke="black"
                    stroke-width="5"
                    on:click={(event) => {clicked = 4;}}
                    on:mouseover={(event) => {hovered = 4; }}
                    on:mouseout={(event) => { hovered = -1; }}
                /> -->
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
                <path
                    d="M-450 -700, -450 -800, -350 -800 "
                    marker-end='url(#head)'
                    fill='none'
                    stroke="black"
                    stroke-width=8px
                />
                <path
                    d="M350 -800, 450 -800, 450 -700"
                    marker-end='url(#head)'
                    fill='none'
                    stroke="black"
                    stroke-width=8px
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
                The anode takes in pure hydrogen gas, and ionizes the hydrogen. 
                The electrode itself is a conductive material to easily transfer electrons to the circuit.
                Typically, both electrodes use a catalyst such as platinum to speed up the reaction process, generating more energy.
            </div>
            {:else if clicked === 1}
            <header in:fade>Electrolyte</header>
            <p in:fade>
                The electrolyte is typically an ionic solution which enables the transfer of charged ions between electrodes. It also separates the two electrodes to prevent short circuiting.
                However, in PEM fuel cells, the electrolyte is a semi-conductive polymer membrane, solely allowing the movement of hydrogen ions.
                Once oxidized, hydrogen ions bond with the membrane, in which they can be used at the cathode for its reduction half-reaction.
            </p>
            {:else if clicked === 2}
            <div in:fade>
                <header>Cathode</header>
                    The cathode, also known as the positive electrode, reduces oxygen with this half reaction:
                    <p class="equation">
                        O<sub>2</sub> + 4<i>e</i><sup>-</sup> + 4H<sup>+</sup> &#8594 2H<sub>2</sub>O
                    </p>
                    receiving electrons from the circuit and producing water from the oxygen. 
                    On this side, both atmospheric air or pure oxygen can be inputted, and water vapor is released into the atmosphere.
                </div>
            {:else if clicked === 3}
            <div in:fade>
                <header>Circuit</header>
                    The circuit provides the pathway for electrons. Electrons come from the anode (the negative electrode), and move to the cathode (the positive electrode). 
                    Note, the direction of electron travel is <i>opposite</i> to the direction of current. The arrows drawn in this diagram portray the movement of electrons, not current flow.
                </div>
            <!-- {:else if clicked === 4}
            <div in:fade>
                <header>Membrane</header>
                    The membrane separates the two electrodes. As it is semi-permeable, it allows certain ions to pass through, but prevents the transfer of electrons to stop a short circuit.
                    It is typically made of a polymer; in 
                </div> -->
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

    @media (max-width: 950px) {
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
        padding: 1% 5.5%;
    }

    .diagram-full {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1% 2%;
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
