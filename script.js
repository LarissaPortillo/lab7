
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
  .attr("viewBox", [-width/2,-height/2,width, height]) ;
  
  const size= d3.scaleLinear()
  .domain(d3.extent( n, d=>d.passengers))
  .range([4,10]);
  
  console.log("size",size(21663240));
  
  const force = d3.forceSimulation(n)
  .force("charge", d3.forceManyBody())              
  .force("link", d3.forceLink(l))    
  .force("x", d3.forceX())
  .force("y", d3.forceY());

 // .force("center", d3.forceCenter());
 
  const links = svg.selectAll("line")               
  .data(l)               
  //.enter()               
  .join("line")               
  .style("stroke", "#ccc")               
  .style("stroke-width", 1);
  
  const nodes = svg.selectAll("circle")
  .data(n)                              
  .join("circle")   
  .attr("fill","plum")
  .attr("r", d=>size( d.passengers));
  
  nodes.append("title")
       .text(d=>d.name);

  force.on("tick",()=>{
    nodes.attr("cx",d=>{return d.x; })
         .attr("cy",d=>{return d.y;})
          
    
    links.attr("x1", (d)=> d.source.x)         
      .attr("y1", (d)=>  d.source.y)         
      .attr("x2", (d)=> d.target.x)         
      .attr("y2",(d)=>d.target.y);
  
  })
  
})
