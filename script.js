
d3.json("./airports.json",d3.autoType)
.then(data=>{
  data=data;
  console.log("a",data);
  
  const n= data.nodes;
  const l=data.links;
  console.log("l",l);
  console.log("n", n);
  

  
  const height = 400;
  const width= 400;
  
  const svg = d3.select("body")
  .append("svg")
  .attr("viewBox", [0,0,width, height]) ;
  
  const size= d3.scaleLinear()
  .domain(d3.extent( n, d=>d.passengers))
  .range([5,25]);
  
  console.log("size",size(21663240));
  
  const force = d3.forceSimulation(n)
  .force("charge", d3.forceManyBody())              
  .force("link", d3.forceLink(l))    
  .force("x", d3.forceX())
  .force("y", d3.forceY());

  //.force("center", d3.forceCenter().x(width/2).y(height/2));
 
  
  const nodes = svg.selectAll("circle")               
  .data(n)                              
  .join("circle")   
  .attr("fill","yellow")
  .attr("r", d=>size( d.passengers));
  
  
  
})
