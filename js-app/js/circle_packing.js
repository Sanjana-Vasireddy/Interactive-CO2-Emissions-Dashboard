data = d3.json("../data/co2_data_hierarchical.json").then(data => {
    var margin = {
        top: 50,
        right: 50,
        bottom: 40,
        left: 150
    },
        width = 800,
        height = 800;

    color = d3.scaleLinear()
        .domain([0, 3])
        .range(["hsl(220,80%,80%)", "hsl(120,30%,30%)"])
        .interpolate(d3.interpolateHcl)

    var pack = data => d3.pack()
        .size([width, height])
        .padding(4)
        (d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value))

    var root = pack(data);
    let focus = root;
    let view;

    var svg = d3.select("#bubble")
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", color(0))
        .style("cursor", "pointer")
        .attr('width', width)
        .attr('height', height)
        .on("click", (event) => zoom(event, root));

    var node = svg.append("g")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function () { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    var label = svg.append("g")
        .style("font", "15px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name)
        .attr("x", 100)
        .attr("y", 50);

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
        var k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${250 + (d.x - v[0]) * k},${350 + (d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${250 + (d.x - v[0]) * k},${350 + (d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
        focus = d;

        var transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                return t => zoomTo(i(t));
            });

        label
            .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
    }

})