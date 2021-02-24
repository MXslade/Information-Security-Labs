import * as d3 from "d3";

export const createDiagram = () => {
  console.log("KEKULUS RIFT");
  const svg = d3.select("svg");
  console.log(svg);
  svg
    .append("circle")
    .attr("cx", 100)
    .attr("cy", 100)
    .attr("r", 100)
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("fill", "red");
};
