// TODO: load the dataset 
let airports;
fetch("./airports.json")
  .then(response => response.json())
  .then(data => {
    
		airports= data;
    console.log('a',airports);
  
    const height = 650;
    const width= 500;
 
     const svg = d3.select("body")
    .append("svg")
    .attr("viewBox", [0,0,width,height]) ;
     
});
