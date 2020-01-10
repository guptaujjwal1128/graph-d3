import React,{Component} from 'react';
import '../App.css';
import * as d3 from 'd3';
import {jsonData} from '../data/data.js';
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Dot from './Dot';
class Scatterplot extends Component{
  constructor(props){
    super(props);
    this.gettingNodeData = this.gettingNodeData.bind(this);
    this.yScale = scaleBand()
    this.xScale = scaleLinear()
  }

  gettingNodeData(data){
      this.props.nodeData(data)
  }

  render(){
    const margins = { top: 50, right: 20, bottom: 50, left: 150 }
    const svgDimensions = { width: 1100, height: 900 }
    var {filteredData,intensity,likelyhood,relevance,currFilter} = this.props;
    var currY = filteredData.map((d,i)=>{
      return d[currFilter];
    })
    currY = currY.filter((data,i,arr)=>{
      return (arr.indexOf(data)==i) && (data!="");
    })
    currY.sort();
    var currX = filteredData.filter((d)=>{
      return d[currFilter]!=""
    });
    const yScale = this.yScale
     .padding(0.5)
     // scaleBand domain should be an array of specific values
     // in our case, we want to use movie titles
     .domain(currY.map(d => d))
     .range([svgDimensions.height - margins.bottom, margins.top]);

    const maxI = intensity ? Math.max(...currX.map(d=>d.intensity)) : -1;
    const maxL = likelyhood ? Math.max(...currX.map(d=>d.likelihood)) : -1;
    const maxR = relevance ? Math.max(...currX.map(d=>d.relevance)) : -1;
    const maxC = Math.max(maxI,Math.max(maxL,maxR))
    const xScale = this.xScale
     // scaleLinear domain required at least two values, min and max
    .domain([0, maxC])
    .range([margins.left, svgDimensions.width - margins.right]);

    return(
      <svg width={svgDimensions.width} height={svgDimensions.height}>
         // Bars and Axis comes here
         <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Dot
          nodeData = {this.gettingNodeData}
          scales={{ xScale, yScale }}
          margins={margins}
          dataY={currY}
          dataX={currX}
          svgDimensions={svgDimensions}
          currFilter={currFilter}
          intensity = {intensity}
          likelyhood = {likelyhood}
          relevance = {relevance}
        />
      </svg>
    );
  }
}

export default Scatterplot;
