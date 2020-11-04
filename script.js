
d3.json("./airports.json",d3.autoType)
.then(data=>{
  data=data;
  console.log("a",data);
  
  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map(d => Object.create(d));
  
  console.log(links);
  console.log(nodes);
  
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
  .force("link", d3.forceLink(data.edges))              
  .force("center", d3.forceCenter().x(width/2).y(height/2));
  
})
