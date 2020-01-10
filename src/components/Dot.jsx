import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'
import '../App.css'

export default class Dot extends Component {
  constructor(props) {
    super(props)
    this.sendNodeData = this.sendNodeData.bind(this);
  }

  sendNodeData(d){
    var dArr = Object.values(d).map((d)=>{
      return d
    })
    this.props.nodeData(dArr);
  }

  render() {
    const { scales, margins, dataY , dataX , svgDimensions, currFilter, intensity, likelyhood, relevance } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions
    const intensity1 = intensity ? (
      dataX.map((d,i) =>{
        return <circle
          className="svg-circle"
          key={i}
          cx={xScale(d.intensity)}
          cy={yScale(d[currFilter])}
          r={4}
          fill="red"
          onClick={()=>this.sendNodeData(d)}
        />})
      ) : null;
    const likelyhood1 = likelyhood ? (
      dataX.map((d,i) =>{
        return <circle
        className="svg-circle"
          key={i}
          cx={xScale(d.likelihood)}
          cy={yScale(d[currFilter])}
          r={4}
          fill="blue"
          onClick={(d)=>{
              this.sendNodeData(d);
          }}
        />})
      ) : null;
    const relevance1 = relevance ? (
      dataX.map((d,i) =>{
        return <circle
        className="svg-circle"
          key={i}
          cx={xScale(d.relevance)}
          cy={yScale(d[currFilter])}
          r={4}
          fill="green"
          onClick={(d)=>{
              this.sendNodeData(d);
          }}
        />})
      ) : null;
    return (
      <g>
      <g>{intensity1}</g>
      <g>{likelyhood1}</g>
      <g>{relevance1}</g>
      </g>
    )
  }
}
