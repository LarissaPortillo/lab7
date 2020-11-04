
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
  .domain([d3.min(data,d=> d.nodes.passengers),d3.max(data,d=>d.nodes.passegers)])
  .range([height,0]);
  
  const force = d3.forceSimulation(dataset.nodes)
  .force("charge", d3.forceManyBody())              
  .force("link", d3.forceLink(data.edges))              
  .force("center", d3.forceCenter().x(width/2).y(height/2));
  
})
