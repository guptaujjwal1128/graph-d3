import React,{Component} from 'react';
import { Container,Row,Col,Dropdown } from 'react-bootstrap';
import {ScatterPlot, Highlights, MyTable, PageManage, Theader, Filters} from '../components';
import '../App.css';
import {jsonData} from '../data/data.js';

const minHeight_graph = 725;
const minHeight_theader = 50;
const minHeight_pagination = 50;

class Body extends Component{
  constructor(props){
    super(props);
    this.getEntries = this.getEntries.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
    this.getSearchContent = this.getSearchContent.bind(this);
    this.gettingFilterData = this.gettingFilterData.bind(this);
    this.gettingNodeData = this.gettingNodeData.bind(this);
    this.state = {
      data:1,
      entries:10,
      searchContent:"",
        fdata:jsonData.data,
        int:true,
        like:true,
        rel:true,
        cfilter:"topic",
        nodeData:[]
    }
  }

  gettingNodeData(data){
      this.setState({
        nodeData:data
      })
  }

  gettingFilterData(fdata,int,like,rel,cfilter){
      this.setState({
        fdata:fdata,
        int:int,
        like:like,
        rel:rel,
        cfilter:cfilter
      })
  }

  getDataFromChild(data){
      this.setState({
        data:data
      });
  }

  getEntries(entries){
    this.setState({
      entries:entries
    });
  }

  getSearchContent(content){
    this.setState({
      searchContent:content
    })
  }

  render(){
    return(
      <div>
      <Container fluid>
        <Row className=" my-3" style={{minHeight:minHeight_graph}}>
          <Col style={{minHeight:minHeight_graph}} xl={8}>
          <div style={{minHeight:minHeight_graph,borderRadius:"10px"}} className="bg-light border shadow-sm">
          <ScatterPlot nodeData={this.gettingNodeData} filteredData={this.state.fdata} intensity={this.state.int} likelyhood={this.state.like}
            relevance={this.state.rel} currFilter={this.state.cfilter}/>
          </div>
          </Col>
          <Filters realNodeData={this.state.nodeData} sendDataFilter={this.gettingFilterData}/>
        </Row>
        <Row className="mx-1">
          <h4>Top Ten Results</h4>
        </Row>
        <Highlights filteredData={this.state.fdata}/>
        <Row style={{borderRadius:"10px"}} className="border shadow-lg bg-light  mx-1 my-3">
          <div style={{backgroundColor:"aliceblue"}}>
            <Row className="mx-1 my-3" style={{minHeight:minHeight_theader}}>
              <Theader sendSearchContent = {this.getSearchContent} sendEntries={this.getEntries}/>
            </Row>
            <Row className="mx-1 my-3">
              <MyTable searchTitle={this.state.searchContent} entries={this.state.entries} activeState = {this.state.data}/>
            </Row>
              <PageManage searchTitle={this.state.searchContent} entries={this.state.entries} sendData={this.getDataFromChild}/>
          </div>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Body;
