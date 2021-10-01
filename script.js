
d3.csv('wealth-health-2014.csv').then(data=>{
	console.log('wealth-health', data);
    data.forEach(function(d) {
        d.Income = +d.Income;
        d.LifeExpectancy = +d.LifeExpectancy;
        d.Population = +d.Population;
        
     });

//d3.select('.chart').append('svg')
    
   const margin = ({top: 50, right: 40, bottom: 40, left: 50})
   const width = 650 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom; 
    
    const xScale = d3
        .scaleLinear()
        .domain([0,d3.max(data, function(d) { return d.Income; })])
        .range([0,width]);
    
    

    const yScale =d3
        .scaleLinear()
        .domain([d3.min(data, function(d){return d.LifeExpectancy;}),d3.max(data, function(d) {return d.LifeExpectancy;})])
        .range([height,0]);
    
    
    

    var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        
        

        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
    
    var color = d3.scaleOrdinal()
      .domain(["Sub-Saharan Africa", "Middle East & North Africa", "East Asia & Pacific" , "South Asia","America","Europe & Central Asia"])
      .range([ d3.color("green"), d3.color("yellow"), d3.color("blue"), d3.color("orange"), d3.color("red") ]);
    
    
   

    var dot = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr('cx', function(d){return xScale(d.Income);})//d=>xScale(d.Income))
            .attr('cy', function(d){return yScale(d.LifeExpectancy);})//d=>yScale(d.LifeExpectancy))
        
            .attr('r', function(d){
                var size =5
                size = size +(size* (d.Population *.000000003))
                return size;
                

            })
            .style("fill", function(d){return color(d.Region);})
            .style("opacity", .5)
           
        console.log("circles",dot);


    var tooltip = d3.select('.tooltip')
            .style("visibility", "hidden")
        //set positions
        .html(
            //format your tooltip
        )
    d3.select('.tooltip')
        .on("mouseenter", (event, d) => {
                // show the tooltip
                const pos = d3.pointer(event, window); // pos = [x,y]
                tooltip.style("visibility", "visible")
                .attr('top',pos[1])
                .attr('top',pos[0])
        })
        .on("mouseleave", (event, d) => {
                // hide the tooltip
            return tooltip.style("visibility", "hidden");
        });

 
        
    const yAxis =  d3.axisLeft()
        .scale(yScale)
    svg.append("g")
        .attr("class", "axis y-axis")
        
        .call(yAxis);
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")
    
    // Draw the axis
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis); 

    

    svg.append("text")
     .attr("class", "axisLabel")
     .attr("text-anchor", "end")
     .attr("x", 300)
     .attr("y", height + 35)
     .text("Income");
    
    svg.append("text")
     .attr("class", "axisLabel")
     .attr("text-anchor", "end")
     .attr("x", -70)
     .attr("y", -35)
     .attr("transform", "rotate(-90)")
     .text("Life Expectancy");

     
    //Legend
    var svg2 = d3.select('.legend').append("svg2")

    svg2.selectAll('legend-squares')
        .data(data)
        .enter()
        .append("rect")
            .attr('x',100)
            .attr('y', function(d,i){ return 100 + i*25;})
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", function(d){ return color(d.Region);})

    svg2.selectAll('legend-labels')
        .data(data)
        .enter()
        .append("text")
            .attr('x',120)
            .attr('y', function(d,i){ return 100 + i*25;})
            .style("fill", function(d){ return color(d);})
            .text(function(d){return d})
            .attr("text-anchor","left")



 

})


