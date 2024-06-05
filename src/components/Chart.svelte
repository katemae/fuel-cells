<script>
    import { onMount } from 'svelte';
    import { scaleLinear, select, axisBottom, axisLeft, line } from 'd3';
    import { derived } from 'svelte/store';

    export let E0;
    export let b;
    export let R;
    export let m;
    export let n;

    let svg;
    let container;
    let width, height;
    const margin = { top: 40, right: 0, bottom: 70, left: 90 };
    const x_lim = 999;

    const lineData = derived([E0, b, R, m, n], ([$E0, $b, $R, $m, $n]) => {
        const data = [];
        for (let i = 0.001; i <= x_lim; i += 0.1) {
            const E = $E0 - $b * Math.log10(i) - $R * i - $m * Math.exp($n * i);
            data.push({ i, E });
        }
        return data;
    });

    function drawChart(data) {
        const xScale = scaleLinear().domain([0, x_lim]).range([0, width]);
        const yScale = scaleLinear().domain([0, 1.5]).range([height, 0]);

        const xAxis = axisBottom(xScale)
            .tickSizeOuter(0)
            .tickPadding(10)
            .tickFormat(d => `${d}`);

        const yAxis = axisLeft(yScale)
            .tickSizeOuter(0)
            .tickPadding(10)
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
            .text('Current Density (mA/cm^2)')
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
            .text('Voltage (V)')
            .attr('text-anchor', 'middle');

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);
    }

    function updateDimensions() {
        if (container) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            width = containerWidth - margin.left - margin.right;
            height = containerHeight - margin.top - margin.bottom;
            lineData.subscribe(drawChart);
        }
    }

    onMount(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    });
</script>

<div bind:this={container} class="chart-container">
    <svg bind:this={svg}></svg>
</div>

<style>
    .axis text {
        font-size: 14px;
    }

    svg {
        display: block;
        margin-bottom: 5%;
        padding-right: 4%;
        background-color: white;
    }

    .chart-container {
        width: 100%;
        height: 80vh;
    }

    @media (max-width: 1350px) {
        .chart-container {
            width: 90%;
            margin: auto;
        }
    }
</style>
