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
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const lineData = derived([E0, b, R, m, n], ([$E0, $b, $R, $m, $n]) => {
        const data = [];
        for (let i = 0.001; i <= 10; i += 0.1) {
            const E = $E0 - $b * Math.log10(i) - $R * i - $m * Math.exp($n * i);
            // create data to plot based on given slider values
            data.push({ i, E });
        }
        return data;
    });

    function drawChart(data) {
        const xScale = scaleLinear().domain([0, 10]).range([0, width]);
        const yScale = scaleLinear().domain([0, 50]).range([height, 0]);

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);

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
        drawChart($lineData);
    });
</script>

<svg bind:this={svg}></svg>

<style>
    svg {
        display: block;
        margin: auto;
    }
</style>
