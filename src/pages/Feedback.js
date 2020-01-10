import React,{Component} from 'react';
import '../App.css';
import {Header,Body} from '../layout';
import {InputGroup,FormControl} from 'react-bootstrap';

class Feedback extends Component{
  render(){
    return(
      <div>
      <Header />
      <div className="feedback-div">
        <InputGroup className="input-feedback">
        <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>
        <button className="button-feedback" onClick={(e)=>{
          console.log(e);
        }}> Send </button>
      </div>
      </div>
    );
  }
}

export default Feedback;
