<script>
    import { fade } from 'svelte/transition';
    let clicked = -1;
    let hovered = -1;
    const hovered_color = "gold"
</script>
<div id="box1" class="info">
    <h2>What is a Fuel Cell?</h2>
    Fuel cells operate based on the electrochemistry principles
    of oxidation and reduction. 
    Unlike batteries, they require an inlet fuel (such as hydrogen) to be continuously supplied for the energy-releasing reaction to occur.
    Click on different parts of the fuel cell to explore!
    <br>
    
    <br>
</div>

<div class="diagram">
    <svg height="300" viewBox="-1000 -750 2000 1250">
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

<style>
    .diagram {
        text-align: center;
    }
    .info {
        text-align: justified;
        font-size: 16px;
        padding: 1% 5%;
    }
    .equation {
        text-align: center;
        font-family: 'Times New Roman', Times, serif
    }
    .tooltip {
        border-color: black;
        border: solid;
        border-radius: 10px;
        padding: 10px;
        background-color: #E1E5F8;
        width: 500px;
        margin: auto;
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