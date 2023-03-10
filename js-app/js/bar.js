var margin = { top: 20, left: 75, bottom: 50, right: 50 },
    width = 850 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var usa, canada, austria, germany, uk, japan, china, india, saudi_arabia;
d3.json('./data/energy_per_cap.json', d => {
    return {
        country: d.country,
        en_per_cap: +d.en_per_cap,
        year: +d.year
    };
}).then(data => {
    //initialize data variables
    austria = data.slice(0, 18);
    canada = data.slice(18, 36);
    china = data.slice(36, 54);
    germany = data.slice(54, 72);
    uk = data.slice(72, 90);
    india = data.slice(90, 108);
    italy = data.slice(108, 126);
    japan = data.slice(126, 144);
    saudi_arabia = data.slice(144, 162);
    usa = data.slice(162, 180);

    //set initial state
    filter('#usa');
    toggleFilter('#usa');
    draw();
});

///////////////////////////////////////////////////////////////
// Controls
///////////////////////////////////////////////////////////////

var current, sortMode, filterMode;

//filter event handlers
d3.select('#usa')
    .on('click', () => {
        filter('#usa');
        
        toggleFilter('#usa');

        redraw();
    });

d3.select('#canada')
    .on('click', () => {
        filter('#canada');
        
        toggleFilter('#canada');

        redraw();
    });

d3.select('#austria')
    .on('click', () => {
        filter('#austria');
        
        toggleFilter('#austria');

        redraw();
    });

d3.select('#germany')
    .on('click', () => {
        filter('#germany');
        
        toggleFilter('#germany');

        redraw();
    });

d3.select('#italy')
    .on('click', () => {
        filter('#italy');
        
        toggleFilter('#italy');

        redraw();
    });

d3.select('#uk')
    .on('click', () => {
        filter('#uk');
        
        toggleFilter('#uk');

        redraw();
    });

d3.select('#japan')
    .on('click', () => {
        filter('#japan');
        
        toggleFilter('#japan');

        redraw();
    });

d3.select('#india')
    .on('click', () => {
        filter('#india');
        
        toggleFilter('#india');

        redraw();
    });

d3.select('#china')
    .on('click', () => {
        filter('#china');
        
        toggleFilter('#china');

        redraw();
    });

d3.select('#saudi_arabia')
    .on('click', () => {
        filter('#saudi_arabia');
        
        toggleFilter('#saudi_arabia');

        redraw();
    });



function filter(mode) {
    if (mode === '#usa') {
        current = JSON.parse(JSON.stringify(usa));
    } else if (mode === '#canada') {
        current = JSON.parse(JSON.stringify(canada));
    } else if (mode === '#austria') {
        current = JSON.parse(JSON.stringify(austria));
    } else if (mode === '#germany') {
        current = JSON.parse(JSON.stringify(germany));
    } else if (mode === '#italy') {
        current = JSON.parse(JSON.stringify(italy));
    } else if (mode === '#uk') {
        current = JSON.parse(JSON.stringify(uk));
    } else if (mode === '#japan') {
        current = JSON.parse(JSON.stringify(japan));
    } else if (mode === '#india') {
        current = JSON.parse(JSON.stringify(india));
    } else if (mode === '#china') {
        current = JSON.parse(JSON.stringify(china));
    } else if (mode === '#saudi_arabia') {
        current = JSON.parse(JSON.stringify(saudi_arabia));
    }
    filterMode = mode;
}

function toggleFilter(id) {
    //???? write code to toggle buttons with class .filter here
    d3.selectAll('.filter')
        .style('background-color', '#eee');
    d3.select(id)
        .style('background-color', 'lightblue'); // #add8e6 is hex code for lightblue
}

///////////////////////////////////////////////////////////////
// draw the chart
///////////////////////////////////////////////////////////////

var x = d3.scaleBand();
var y = d3.scaleLinear();

var delay = function (d, i) {
    return i * 50;
};

function redraw() {
    console.log(current)
    //update scale
    x.domain(current.map(d => d.year));

    ////////////////////////////////
    // DATA JOIN FOR BARS.
    var bars = svg.selectAll('.bar')
        .data(current, d => d.year);

    // UPDATE.
    bars.transition()
        .duration(750)
        .delay(delay)
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.en_per_cap))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.en_per_cap));

    // ENTER.
    bars.enter()
        .append('rect')
        .attr('x', d => x(d.year))
        .attr('y', d => y(0))
        .attr('width', x.bandwidth())
        .transition()
        .duration(750)
        .attr('class', 'bar')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.en_per_cap))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.en_per_cap));

    // EXIT.
    bars.exit()
        .transition()
        .duration(750)
        .style('opacity', 0)
        .remove();

}

function transition() {
    var transition = svg.transition()
        .duration(750);

    transition.selectAll('.bar')
        .delay(delay)
        .attr('x', d => x(d.year));

    transition.selectAll('.name')
        .delay(delay)
        .attr('x', d => x(d.year) + x.bandwidth() / 2);
}

function draw() {
    x.domain(current.map(d => d.year))
        .range([0, width])
        .paddingInner(0.2);

    y.domain([0, d3.max(current, d => d.en_per_cap)])
        .range([height, 0]);

    svg.selectAll('.bar')
        .data(current, d => d.year)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.year))
        .attr('y', d => y(d.en_per_cap))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.en_per_cap));

    var xAxis;
    xAxis = d3.axisBottom()
        .scale(x)
        .ticks(18, 'd');

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5, 'd');

    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis);

    svg.append('text')
        .attr('x', - height / 2)
        .attr('y', - margin.left * 0.7)
        .attr('transform', 'rotate(-90)')
        .attr('class', 'label')
        .append('tspan').text('Energy per capita')
}