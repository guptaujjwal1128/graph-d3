import React,{Component} from 'react';
import '../App.css';
import {Header,Body} from '../layout';

class Guide extends Component{
  render(){
    return(
      <div className="bg-light">
      <Header />
      <div className="guide-div">
      <p className="guide-heading">1. Purpose </p>
      <p className="guide-content">    By plotting a value along each axis and then connecting the resulting points a shape forms on the radar chart.
      The radar chart can then be used by you to answer the following questions:
      </p>
      <ul>
      <li className="guide-content"> Which are the strongest forces of change?</li>
      <li className="guide-content"> Which observations are most similar, i.e., are there clusters of observations?</li>
      <li className="guide-content"> Are there outliers?</li>
      </ul>
      <p className="guide-heading">2. Radar Dashboard </p>
      <p className="sub-guide-heading">2.1 How to Read It </p>
      <p className="guide-content">First, identify what category each axis represents. Then assess how the categories are related to one another as you read around the wheel. The 'zero' of each axis is the center of the wheel. The further towards the edge of the spoke a point reaches, the higher the value. Then look at the whole shape: which features stand out? Are some categories more pronounced than others? Which categories are lacking? Where are your opportunities and risks? </p>
      </div>
      </div>
    );
  }
}

export default Guide;
