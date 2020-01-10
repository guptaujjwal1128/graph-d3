import React,{Component} from 'react';
import '../App.css';
import {jsonData} from '../data/data.js';
import {Table} from 'react-bootstrap';
import PageManage,{NumOfPages} from './PageManage';

class MyTable extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let start = (this.props.activeState-1)*this.props.entries;
    let end = Number(start) + Number(this.props.entries);
    let searchResults = [];
    searchResults = jsonData.data.filter((row,i)=>{
      return row.title.match(this.props.searchTitle);
    })
    return(
      <div>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th style={{width:"1100px"}}>Title</th>
            {/*fixing width is important so that table width does not change with content*/}
            <th style={{width:"120px"}}>Topic</th>
            <th style={{width:"100px"}}>Year</th>
            <th style={{width:"100px"}}>Intensity</th>
            <th style={{width:"120px"}}>Sector</th>
            <th style={{width:"200px"}}>Region</th>
            <th style={{width:"200px"}}>Pestle</th>
          </tr>
        </thead>
        <tbody>
        {
          searchResults.map((row,i)=>{
            if(i>=start && i<end)
            return <tr key={i}>
              <td>
              <a href={row.url}>
              {row.title}
              </a>
              </td>
              <td>{row.topic}</td>
              <td>{row.start_year}</td>
              <td>{row.intensity}</td>
              <td>{row.sector}</td>
              <td>{row.region}</td>
              <td>{row.pestle}</td>
            </tr>
          })
        }
        </tbody>
      </Table>
      </div>
    );
  }
}

export default MyTable;
