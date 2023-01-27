//load the data

function Scrubber(values, {
    format = value => value,
    initial = 0,
    delay = null,
    autoplay = true,
    loop = true,
    loopDelay = null,
    alternate = false
} = {}) {
    values = Array.from(values);
    const form = html`<form style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 33px; align-items: center;">
    <button name=b type=button style="margin-right: 0.4em; width: 5em;"></button>
    <label style="display: flex; align-items: center;">
      <input name=i type=range min=0 max=${values.length - 1} value=${initial} step=1 style="width: 180px;">
      <output name=o style="margin-left: 0.4em;"></output>
    </label>
  </form>`;
    let frame = null;
    let timer = null;
    let interval = null;
    let direction = 1;
    function start() {
        form.b.textContent = "Pause";
        if (delay === null) frame = requestAnimationFrame(tick);
        else interval = setInterval(tick, delay);
    }
    function stop() {
        form.b.textContent = "Play";
        if (frame !== null) cancelAnimationFrame(frame), frame = null;
        if (timer !== null) clearTimeout(timer), timer = null;
        if (interval !== null) clearInterval(interval), interval = null;
    }
    function running() {
        return frame !== null || timer !== null || interval !== null;
    }
    function tick() {
        if (form.i.valueAsNumber === (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)) {
            if (!loop) return stop();
            if (alternate) direction = -direction;
            if (loopDelay !== null) {
                if (frame !== null) cancelAnimationFrame(frame), frame = null;
                if (interval !== null) clearInterval(interval), interval = null;
                timer = setTimeout(() => (step(), start()), loopDelay);
                return;
            }
        }
        if (delay === null) frame = requestAnimationFrame(tick);
        step();
    }
    function step() {
        form.i.valueAsNumber = (form.i.valueAsNumber + direction + values.length) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    }
    form.i.oninput = event => {
        if (event && event.isTrusted && running()) stop();
        form.value = values[form.i.valueAsNumber];
        form.o.value = format(form.value, form.i.valueAsNumber, values);
    };
    form.b.onclick = () => {
        if (running()) return stop();
        direction = alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
        form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        start();
    };
    form.i.oninput();
    if (autoplay) start();
    else stop();
    Inputs.disposal(form).then(stop);
    return form;
}

// viewof yearFilter = Scrubber(
//     d3.range(years[0], years[1] + 1, 5), // min to max years in 5 year increments
//     { autoplay: false, delay: 500, loop: false } // experiment with these settings!
// )


margin = ({ top: 10, right: 50, bottom: 20, left: 50 })
d3.csv("data/data_scatterplot_new.csv").then(function (data) {

    data.forEach(function (d) {
        d.En_per_cap = +d.En_per_cap;
        d.Co2Emission = +d.Co2Emission;
        // d.GDP = Math.log(d.GDP);
        d.GDP = +d.GDP;

    });

    let dataSet = data;
    const selmodel = SelectionModel();


    // Set chart domain max value to the highest total value in data set
    years = d3.extent(data, d => d.Year)
    width = 932
    height = 500

    dataInitial = data.filter(d => d.Year === years[0])

    d3.select("#play").on("click", function () {
        setup();
    });

    function setup() {
        d3.select("#play")
            .html("Play<span class='fa fa-caret-right'></span>")
            .on('click', null);
        year = 1990;
        count = 0;
        setYear();
    };



    x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.En_per_cap)])
        .range([margin.left, width - margin.right])
        .nice()

    y = d3.scaleLog()
        .domain([d3.min(data, d => d.GDP), d3.max(data, d => d.GDP)])
        .range([height - margin.bottom, margin.top])
        .nice()

    color = d3.scaleOrdinal()
        .domain(data.map(d => d.cluster))
        .range(d3.schemeTableau10) // try other schemes, too!

    size = d3.scaleSqrt()
        .domain(d3.extent(data, d => d.Co2Emission))
        .range([0, 25]) // output radii range from 4 to 35 pixels


    // create the container SVG element
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height);

    // position and populate the x-axis
    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        // Add x-axis title 'text' element.
        .append('text')
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('x', width - margin.right)
        .attr('y', -10)
        .text('Energy Per Capita');

    // position and populate the y-axis
    svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        // Add y-axis title 'text' element.
        .append('text')
        .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text('GDP($)');

    // Add a background label for the current year.
    const yearLabel = svg.append('text')
        .attr('class', 'year')
        .attr('x', 40 + margin.left)
        .attr('y', height - margin.bottom - 20)
        .attr('fill', '#ccc')
        .attr('font-family', 'Helvetica Neue, Arial')
        .attr('font-weight', 500)
        .attr('font-size', 80)
        .text(years[0]);

    // add circle elements for each country
    // use scales to set fill color, x, y, and radius
    // sort circles to draw smaller circles on top
    const countries = svg
        .selectAll('circle.country')
        .data(dataInitial, d => d.country)
        .join('circle')
        .sort((a, b) => b.Co2Emission - a.Co2Emission)
        .attr('class', 'country')
        .attr('opacity', 0.75)
        .attr('fill', d => color(d.cluster))
        .attr('cx', d => x(d.En_per_cap))
        .attr('cy', d => y(d.GDP))
        .attr('r', d => size(d.Co2Emission));

    // add a tooltip
    countries
        .append('title')
        .text(d => d.country);


    // Add mouse hover interactions, using D3 to update attributes directly.
    // In a stand-alone context, we could also use stylesheets with 'circle:hover'.
    countries
        // The 'on()' method registers an event listener function
        .on('mouseover', function () {
            // The 'this' variable refers to the underlying SVG element.
            // We can select it directly, then use D3 attribute setters.
            // (Note that 'this' is set when using "function() {}" definitions,
            //  but *not* when using arrow function "() => {}" definitions.)
            d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
        })
        .on('mouseout', function () {
            // Setting the stroke color to null removes it entirely.
            d3.select(this).attr('stroke', null);
        });

    function setYear(year) {
        yearLabel.text(year);
        countries
            .data(data.filter(d => d.Year === year), d => d.Country)
            .sort((a, b) => b.Co2Emission - a.Co2Emission)
            .transition()
            .duration(1000)
            .attr('cx', d => x(d.En_per_cap))
            .attr('cy', d => y(d.GDP))
            .attr('r', d => size(d.Co2Emission));
    }

    // Add a selection model listener that updates country colors
    // We name the event 'change.chart' as this is the chart's own internal listener.
    // We do not want the name to collide with the listener defined in the legend component.
    selmodel.on('change.chart', () => {
        countries.attr('fill', d => selmodel.has(d.cluster) ? color(d.cluster) : '#ccc');
    });


    // Our selection model wraps two components:
    // - A JavaScript Set for tracking the selected elements
    // - A D3 dispatch helper for registering and invoking listener callbacks upon changes
    function SelectionModel(values) {
        const dispatch = d3.dispatch('change');
        const state = new Set(values);

        const api = {
            on: (type, fn) => (dispatch.on(type, fn), api),
            clear: () => (clear(), api),
            has: value => !state.size || state.has(value),
            set: value => (update(value, true), api),
            toggle: value => (update(value, !state.has(value)), api)
        };

        function clear() {
            if (state.size) {
                state.clear();
                dispatch.call('change', api, api);
            }
        }

        function update(value, add) {
            if (add && !state.has(value)) {
                state.add(value);
                dispatch.call('change', api, api);
            } else if (!add && state.has(value)) {
                state.delete(value);
                dispatch.call('change', api, api);
            }
        }

        return api;
    }

    ////////////////////////////
    ///Legend////////////////
    ///////////////////////////

    regions = [
        { index: 0, label: 'Austria' },
        { index: 1, label: 'Canada' },
        { index: 2, label: 'China' },
        { index: 3, label: 'Germany' },
        { index: 4, label: 'United Kingdom' },
        { index: 5, label: 'India' },
        { index: 6, label: 'Italy' },
        { index: 7, label: 'Japan' },
        { index: 8, label: 'Saudi Arabia' },
        { index: 9, label: 'United States' }
    ];

    function colorLegend(container) {
        const titlePadding = 14;  // padding between title and entries
        const entrySpacing = 16;  // spacing between legend entries
        const entryRadius = 5;    // radius of legend entry marks
        const labelOffset = 4;    // additional horizontal offset of text labels
        const baselineOffset = 4; // text baseline offset, depends on radius and font size

        const title = container.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'black')
            .attr('font-family', 'Helvetica Neue, Arial')
            .attr('font-weight', 'bold')
            .attr('font-size', '12px')
            .text('Region');

        const entries = container.selectAll('g')
            .data(regions)
            .join('g')
            .attr('transform', d => `translate(0, ${titlePadding + d.index * entrySpacing})`);

        const symbols = entries.append('circle')
            .attr('cx', entryRadius) // <-- offset symbol x-position by radius
            .attr('r', entryRadius)
            .attr('fill', d => color(d.index));

        const labels = entries.append('text')
            .attr('x', 2 * entryRadius + labelOffset) // <-- place labels to the left of symbols
            .attr('y', baselineOffset) // <-- adjust label y-position for proper alignment
            .attr('fill', 'black')
            .attr('font-family', 'Helvetica Neue, Arial')
            .attr('font-size', '11px')
            .style('user-select', 'none') // <-- disallow selectable text
            .text(d => d.label);
    };

    const legend = svg.append('g')
        .attr('transform', 'translate(832, 10)')
        .call(colorLegend); // <-- our legend helper is invoked just like an axis generator
    legend
        .attr("height", 300)
        .attr("width", 100)

    document.getElementById("scatterplot").appendChild(svg.node());

}).catch(function (error) {
    if (error) throw error;
});