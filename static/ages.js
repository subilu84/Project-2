


// create 3 data_set
var data1 = [
   {group: "F: 0-17", value: 18260},
   {group: "F: 18-59", value: 17631},
   {group: "F: 60", value: 934},
   {group: "M: 0-17", value: 20247}, 
   {group: "M: 18-59", value: 17254},
   {group: "M: 60", value: 843}
];

var data2 = [
   {group: "F: 0-17", value: 20113},
   {group: "F: 18-59", value: 18875},
   {group: "F: 60", value: 948},
   {group: "M: 0-17", value: 22009},
   {group: "M: 18-59", value: 18181},
   {group: "M: 60", value: 773}
];

var data3 = [
   {group: "F: 0-17", value: 20167},
   {group: "F: 18-59", value: 19362},
   {group: "F: 60", value: 976},
   {group: "M:0-17", value: 22303},
   {group: "M: 18-59", value: 18027},
   {group: "M: 60", value: 787}
];


// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#ages")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg2.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg2.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  x.domain(data.map(function(d) { return d.group; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg2.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#5F9EA0")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)
