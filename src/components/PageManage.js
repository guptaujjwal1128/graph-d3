import React,{Component} from 'react';
import '../App.css';
import {Row, Pagination} from 'react-bootstrap';
import {jsonData} from '../data/data.js';

const minHeight_pagination = 50;

class PageManage extends Component{
  constructor(props){
    super(props);
    this.setPaging = this.setPaging.bind(this);
    this.state = {
      start:0,
      active:1,
      pageArr:[],
      numOfPagesToShow:10,
      numOfPages:100,
      trueLength:jsonData.data.length
    }
  }

  getActiveState(){
      return this.state.active;
  }

  setPaging(start,active1){
    this.props.sendData(active1);
    const pageArr = [];
    let starter = 10 * start;
    let end = starter + 10;
    let searchResults = [];
    searchResults = jsonData.data.filter((row,i)=>{
      return row.title.match(this.props.searchTitle);
    })
    let length1 = searchResults.length;
    this.setState({
      trueLength:length1,
      numOfPages: length1/this.props.entries,
      numOfPagesToShow:(length1/this.props.entries)/10
    })
    for(let i=starter+1;i<=end&&this.state.numOfPages;i++){
      pageArr.push(
        <Pagination.Item
        key={i}
        active = {active1 === i}
        onClick={()=>{
            let pageArr = this.setPaging(this.state.start,i);
              this.setState({
              pageArr:pageArr,
              active:i
            });
        }}>{i}
        </Pagination.Item>
      )
    }
    return pageArr;
  }

  componentDidMount(){
    let pageArr = this.setPaging(this.state.start,this.state.active);
    this.setState({
      pageArr: pageArr
    });
  }

  render(){
    let start1 = (this.state.active-1)*this.props.entries;
    let end1 = start1 + this.props.entries;
    let searchResults = [];
    searchResults = jsonData.data.filter((row,i)=>{
      return row.title.match(this.props.searchTitle);
    })
    let length1 = searchResults.length;
    return(
      <Row className="mx-1 my-3" style={{minHeight:minHeight_pagination}}>
      <label className="page-label">
        showing {start1} to {end1} of {length1} entries.
      </label>
        <Pagination className="mx-auto">
        <Pagination.First onClick={()=>{
          if(this.state.start > 0){
            let pageArr = this.setPaging(this.state.start-1,this.state.active);
            this.setState({
              pageArr: pageArr,
              start:this.state.start-1
            });
          }
        }} />
        <Pagination.Prev onClick={()=>{
          if(this.state.active>1){
            let startArg = this.state.start;
            if(this.state.active%this.state.numOfPagesToShow===1)
              startArg = this.state.start-1;
            let pageArr = this.setPaging(startArg,this.state.active-1);
            this.setState({
              pageArr:pageArr,
              active:this.state.active-1,
              start:startArg
            });
          }
        }}/>
        {this.state.pageArr}
        <Pagination.Next onClick={()=>{
          if(this.state.active < this.state.numOfPages){
            let startArg = this.state.start;
            if(this.state.active%this.state.numOfPagesToShow===0)
              startArg = this.state.start+1;
            let pageArr = this.setPaging(startArg,this.state.active+1);
            this.setState({
              pageArr:pageArr,
              active:this.state.active+1,
              start:startArg
            });
          }
        }}/>
        <Pagination.Last onClick={()=>{
          if(this.state.start < this.state.numOfPagesToShow-1){
            let pageArr = this.setPaging(this.state.start+1,this.state.active);
            this.setState({
              pageArr: pageArr,
              start:this.state.start+1
            });
          }
        }}/>
        </Pagination>
      </Row>
    );
  }
}

export default PageManage;
