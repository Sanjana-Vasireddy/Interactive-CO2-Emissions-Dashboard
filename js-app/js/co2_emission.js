margin = ({ top: 50, right: 100, bottom: 50, left: 200 })
height = 400; // initial height
width = 900;

const svg = d3.select("#co2_diseal")
    .attr("viewBox", [0, 0, width, height]);

let yG, simulation, data_global;


//function chart() {

d3.json("data/co2_emission_by_diseal.json").then(function (data) {
    data_global = data;
    console.log(data_global)
    data.map((d, i) => ({ id: i + 1, ...d }))
    console.log(data_global)

    continents = [...new Set(data_global.map(d => d.continent))]

    //x-axis

    x = d3.scaleLinear()
        .domain(d3.extent(data_global, d => d.year))
        .range([margin.left, width - margin.right])
    //y-axis
    y = d3.scaleBand()
        .domain(continents)
        .range([height / 2, height / 2])

    xAxis = g =>
        g
            .attr("transform", `translate(0, ${margin.top})`)
            .call(d3.axisTop(x).ticks(10))
            .call(g => g.select(".domain").remove())
            .call(g =>
                g
                    .append("text")
                    .attr("x", width - margin.right)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "middle")
                    .text("Years →")
            )

    yAxis = (g, scale = y, ticks = y.domain()) =>
        g
            .attr("transform", `translate(${30}, 0)`)
            .call(d3.axisLeft(scale).tickValues(ticks))
            .call(g => g.style("text-anchor", "start"))
            .call(g => g.select(".domain").remove())

    r = d3.scaleSqrt()
        .domain(d3.extent(data_global, d => d.emission))
        .range([6, 20])

    colour = d3.scaleSequential(d3.extent(data_global, d => d.year), d3.interpolatePlasma)

    svg.append("g").call(xAxis);
    yG = svg.append("g").attr("stroke-width", 0).call(yAxis);

    let node = svg.append("g")
        .selectAll("circle")
        .data(data_global)
        .join("circle")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.continent) + y.bandwidth() / 2)
        .attr("r", d => r(d.emission))
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("fill", d => colour(d.year));

    simulation = d3.forceSimulation()
        .force("x", d3.forceX(d => x(d.year)))
        .force("y", d3.forceY(d => y(d.continent) + y.bandwidth() / 2))
        .force("collide", d3.forceCollide(d => r(d.emission) + 1).strength(0.3));

    simulation.on("tick", () => {
        node
            .transition()
            .delay((d, i) => d.x)
            .ease(d3.easeLinear)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
    });

    //invalidation.then(() => simulation.stop());
    // function chart(split) {
    //     let height = split ? 800 : 400;

    //     y.domain(split ? continents : continents.concat("Global")); // workaround for updating the yAxis
    //     y.range(split ? [margin.top, height - margin.bottom] : [height / 2, height / 2]);
    //     let ticks = split ? continents : ["Global"];

    //     const t = svg.transition().duration(750);
    //     svg.transition(t).attr("viewBox", [0, 0, width, height]);
    //     yG.transition(t).call(yAxis, y, ticks);

    //     simulation.nodes(data_global); // update nodes
    //     simulation.alpha(1).restart(); // restart simulation
    // }
    // const chart_old = Object.assign(svg.node(), {
    //     update(split) {

    //         let height = split ? 800 : 400;

    //         y.domain(split ? continents : continents.concat("Global")); // workaround for updating the yAxis
    //         y.range(split ? [margin.top, height - margin.bottom] : [height / 2, height / 2]);
    //         let ticks = split ? continents : ["Global"];

    //         const t = svg.transition().duration(750);
    //         svg.transition(t).attr("viewBox", [0, 0, width, height]);
    //         yG.transition(t).call(yAxis, y, ticks);

    //         simulation.nodes(data_global); // update nodes
    //         simulation.alpha(1).restart(); // restart simulation
    //     }
    // });

    // function toggle() {
    //     chart(false)
    //     return html`<label style="font-size:25px"><input name="split" type="radio" value="0" checked="true" onclick=${() => chart(false)}><small>Global</small></label>
    //   <label style="font-size:25px"><input name="split" type="radio" value="1" onclick=${() => chart(true)}><small>By Continents</small></label>`
    // }

    // toggle();
    chart(false);

});
//}

function chart(split) {
    let height = split ? 800 : 400;

    y.domain(split ? continents : continents.concat("Global")); // workaround for updating the yAxis
    y.range(split ? [margin.top, height - margin.bottom] : [height / 2, height / 2]);
    let ticks = split ? continents : ["Global"];

    const t = svg.transition().duration(750);
    svg.transition(t).attr("viewBox", [0, 0, width, height]);
    yG.transition(t).call(yAxis, y, ticks);

    simulation.nodes(data_global); // update nodes
    simulation.alpha(1).restart(); // restart simulation
}