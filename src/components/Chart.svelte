<script>
    import { onMount } from 'svelte';
    import { scaleLinear, select, axisBottom, axisLeft, line } from 'd3';
    import { derived } from 'svelte/store';

    export let m;
    export let b;

    let svg;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create derived store for line data
    const lineData = derived([m, b], ([$m, $b]) => {
        const data = [];
        for (let x = -10; x <= 10; x += 0.1) {
            data.push({ x, y: $m * x + $b });
        }
        return data;
    });

    function drawChart(data) {
        const xScale = scaleLinear().domain([0, 20]).range([0, width]);
        const yScale = scaleLinear().domain([0, 20]).range([height, 0]);

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);

        const lineGenerator = line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        select(svg).selectAll('*').remove();

        const g = select(svg)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        g.append('g')
            .call(yAxis);

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);
    }

    $: lineData.subscribe(drawChart);

    onMount(() => {
        drawChart([]);
    });
</script>

<svg bind:this={svg}></svg>

<style>
    svg {
        display: block;
        margin: auto;
    }
</style>
