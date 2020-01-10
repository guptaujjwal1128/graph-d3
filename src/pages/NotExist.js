import React,{Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class NotExist extends Component{
  render(){
    return(
      <div>
      <div style={{fontSize:"30px"}}>
      This page doesn't exist. You can go back to home with the link given below
      </div>
      <div>
      <Link to="/">Go back Home</Link>
      </div>
      </div>
    );
  }
}

export default NotExist;
