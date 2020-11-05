Promise.all([
  d3.json("airports.json", d3.autoType),
  d3.json("world-110m.json", d3.autoType)
])
.then(data=>{
  let airports=data[0];
  console.log("a",airports);
  
  const n= airports.nodes;
  const l=airports.links;
  console.log("l",l);
  console.log("n", n);
  
  let worldmap=data[1];
  console.log("world",worldmap);
  
  const features = topojson.feature(worldmap, worldmap.objects.countries).features;
  console.log("feats",features);
  
  const height = 400;
  const width=600;
  
  
  const svg = d3.select("body")
  .append("svg")
  .attr("viewBox", [-width/2,-height/2,width, height]) ;
  
  
  const size= d3.scaleLinear()
  .domain(d3.extent( n, d=>d.passengers))
  .range([4,10]); 
  
  console.log("size",size(21663240));
  
  
  const projection = d3.geoMercator()
    .fitExtent([[0,0],[width, height]], topojson.feature(worldmap, worldmap.objects.countries));
  
  const path= d3.geoPath()
  .projection(projection);
  
  
  const force = d3.forceSimulation(n)
  .force("charge", d3.forceManyBody())              
  .force("link", d3.forceLink(l))    
  .force("x", d3.forceX())
  .force("y", d3.forceY());

    const drag= force => {
    function startdrag(e){
      if(!e.active) force.alphaTarget(0.3).restart();
      e.subject.fx=e.subject.x;
      e.subject.fy=e.subject.y;
    }
    function dragged(e){
      e.subject.fx=e.x;
      e.subject.fy=e.y;
    }
    function enddrag(e){
      if(!e.active) force.alphaTarget(0);
      e.subject.fx=null;
      e.subject.fy=null;
    }
    return d3.drag()
      .on("start",startdrag)
      .on("drag",dragged)
      .on("end",enddrag);
  };
 
 
  const links = svg.selectAll("line")               
  .data(l)                            
  .join("line")               
  .style("stroke", "#ccc")               
  .style("stroke-width", 1);
  
  const nodes = svg.selectAll("circle")
  .data(n)                              
  .join("circle")   
  .attr("fill","plum")
  .attr("r", d=>size( d.passengers))
  .call(drag(force));
  
  svg.append("g")
  .selectAll("path")
  .data(features)
  .join("path")
  .attr("d", path);
  
  
  svg.append("path")
	.datum(topojson.mesh(worldmap, worldmap.objects.countries))
	.attr('fill', 'none')
  .attr('stroke', 'white')
	.attr("class", "subunit-boundary")
  .attr("d", path);
  
  nodes.append("title")
       .text(d=>d.name);

  force.on("tick",()=>{
    nodes.attr("cx",d=>{return d.x; })
         .attr("cy",d=>{return d.y;}); 
    
    links.attr("x1", (d)=> d.source.x)         
      .attr("y1", (d)=>  d.source.y)         
      .attr("x2", (d)=> d.target.x)         
      .attr("y2",(d)=>d.target.y);
  });
  

  
})
