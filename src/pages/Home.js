import React,{Component} from 'react';
import '../App.css';
import {Header,Body} from '../layout';

class Home extends Component{
  render(){
    return(
      <div style={{overflowX:"hidden"}}>
      <Header />
      <Body />
      </div>
    );
  }
}

export default Home;
