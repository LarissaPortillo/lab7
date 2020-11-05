
d3.json("./airports.json",d3.autoType)
.then(data=>{
  data=data;
  console.log("a",data);
  

  
  const height = 650;
  const width= 500;
 
  const svg = d3.select("body")
  .append("svg")
  .attr("viewBox", [0,0,width,height]) ;
  
  const size= d3.scaleLinear()
  .domain(d3.extent(data.nodes, d=>d.passengers))
  .range([height,0]);
  
  console.log("size",size(21663240));
  
  const force = d3.forceSimulation(data.nodes)
  .force("charge", d3.forceManyBody())              
  .force("link", d3.forceLink(data.links))              
  .force("center", d3.forceCenter().x(width/2).y(height/2));
  
  const edges = svg.selectAll("line")               
    .data(data.links)               
    .enter()               
    .append("line")               
    .style("stroke", "#ccc")               
    .style("stroke-width", 1);
  
  const nodes = svg.selectAll("circle")               
  .data(data.nodes)               
  .enter()               
  .append("circle")               
  .attr("r", size(data.nodes, d=>d.passengers));
  
  
  
})
