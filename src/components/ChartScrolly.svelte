<!-- STATIC CHART FOR SCROLLYTELLING -->

<script>
    import { onMount, onDestroy, setContext } from 'svelte';
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
        for (let i = 0.001; i <= 999; i += 0.1) {
            const E = E0 - b * Math.log10(i) - R * i - m * Math.exp(n * i);
            data.push({ i, E });
        }
        return data;
    }

    function updateDimensions() {
        if (!container) return;
        const width = container.clientWidth - margin.left - margin.right;
        const height = container.clientHeight - margin.top - margin.bottom;
        drawChart(width, height);
    }

    function drawChart(width, height) {
        const data = getLineData();
        const xScale = scaleLinear().domain([0, 999]).range([0, width]);
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
            .attr('y', margin.bottom - 5)
            .attr('fill', '#000')
            .attr('font-size', '14px')
            .text('Current Density (mA/cm^2)')
            .attr('text-anchor', 'middle');

        g.append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left + 5)
            .attr('x', -height / 2)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .attr('font-size', '14px')
            .text('Voltage (V)')
            .attr('text-anchor', 'middle');

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);
    }

    onMount(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
    });

    onDestroy(() => {
        window.removeEventListener('resize', updateDimensions);
    });

    $: {
        updateDimensions();
    }

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
        max-width: 95%;
    }
</style>
