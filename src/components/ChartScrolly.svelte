<!-- STATIC CHART FOR SCROLLYTELLING -->

<script>
    import { onMount, setContext } from 'svelte';
    import { scaleLinear, select, axisBottom, axisLeft, line } from 'd3';

    export let E0;
    export let b;
    export let R;
    export let m;
    export let n;

    let svg;
    let container;

    let margin = { top: 20, right: 10, bottom: 40, left: 50 };

    function getLineData() {
        const data = [];
        for (let i = 0.001; i <= 1000; i += 0.1) {
            const E = E0 - b * Math.log10(i) - R * i - m * Math.exp(n * i);
            data.push({ i, E });
        }
        return data;
    }

    function drawChart() {
        if (!container) return; // Fitting chart to container, otherwise dimensions get crazy
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;
        const data = getLineData();
        const xScale = scaleLinear().domain([0, 1000]).range([0, width]);
        const yScale = scaleLinear().domain([0, 1.5]).range([height, 0]);

        const xAxis = axisBottom(xScale)
            .tickSizeOuter(0)
            .tickPadding(5)
            .tickFormat(d => `${d}`);

        const yAxis = axisLeft(yScale)
            .tickSizeOuter(0)
            .tickPadding(5)
            .tickFormat(d => `${d}`);

        const lineGenerator = line()
            .x(d => xScale(d.i))
            .y(d => yScale(d.E));

        select(svg).selectAll('*').remove();

        const g = select(svg)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .append('text')
            .attr('x', width / 2)
            .attr('y', margin.bottom - 10)
            .attr('fill', '#000')
            .attr('font-size', '16px')
            .text('Voltage (V)')
            .attr('text-anchor', 'middle');

        g.append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left + 10)
            .attr('x', -height / 2)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .attr('font-size', '16px')
            .text('Current Density (mA/cm^2)')
            .attr('text-anchor', 'middle');

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);
    }

    onMount(() => {
        drawChart();
    });

    $: {
        drawChart();
    }

    // Emit chart container for external styling
    setContext('chartContainer', container);
</script>

<div bind:this={container} style="width: 100%; height: 100%;">
    <svg bind:this={svg}></svg>
</div>

<style>
    .axis text {
        font-size: 14px;
    }
    svg {
        display: block;
        margin-bottom: 5%;
    }
</style>
