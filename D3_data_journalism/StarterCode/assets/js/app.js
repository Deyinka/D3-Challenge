// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("data.csv").then(function(hData) {
    // change string (from CSV) into number format
    hData.forEach(function(d) {
      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;
   // console.log(hData);

});  
// Configure a band scale for the horizontal axis.
var xBandScale = d3.scaleLinear()
  .domain(d3.extent(hData,d => d.poverty))
  .range([0, chartWidth]);

// Create a linear scale for the vertical axis.
var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(hData, d => d.healthcare)])
  .range([chartHeight, 0]);

// Create two new functions passing our scales in as arguments
// These will be used to create the chart's axes
var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

// Append two SVG group elements to the chartGroup area,
// and create the bottom and left axes inside of them
chartGroup.append("g")
  .call(leftAxis);

chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

// Create one SVG dot per piece of Data
// Use the linear scales to position each dot within the chart
chartGroup.selectAll("circle")
  .data(hData)
  .enter()
  .append("circle")
  .attr("class", "text")
  .attr("cx", d => xBandScale(d.healthcare))
  .attr("cy", d => yLinearScale(d.poverty))
  .attr("r", 8)
  .attr("fill", "lightblue");
  
  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      // draw legend text
      legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
}).catch(function(error) {
  console.log(error);
});
