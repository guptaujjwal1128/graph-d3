import React,{Component} from 'react';
import '../App.css';
import { Dropdown } from 'react-bootstrap';

class Theader extends Component{
  constructor(props){
    super(props);
    this.state = {
      entriesToShow:10
    }
  }

  render(){
    return(
      <div className="w-100">
      <Dropdown className="mx-1 my-1" style={{display:"inline"}}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Show Entries
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item eventKey="10" onSelect={(e)=>{
        this.setState({
          entriesToShow:Number(e)
        });
        this.props.sendEntries(Number(e));
      }}>10</Dropdown.Item>
      <Dropdown.Item eventKey="25" onSelect={(e)=>{
        this.setState({
          entriesToShow:Number(e)
        });
        this.props.sendEntries(Number(e));
      }}>25</Dropdown.Item>
      <Dropdown.Item eventKey="50" onSelect={(e)=>{
        this.setState({
          entriesToShow:Number(e)
        });
        this.props.sendEntries(Number(e));
      }}>50</Dropdown.Item>
      <Dropdown.Item eventKey="100" onSelect={(e)=>{
        this.setState({
          entriesToShow:Number(e)
        });
        this.props.sendEntries(Number(e));
      }}>100</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      <input style={{float:"right"}} className="mr-3" onChange={(e)=>{
        this.props.sendSearchContent(e.target.value);
      }}>
      </input>
      <label style={{float:"right",fontSize:"20px"}} className="mr-2">Search
      </label>
      </div>
    );
  }
}

export default Theader;
