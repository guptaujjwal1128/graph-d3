import React,{Component} from 'react';
import { Row,Col } from 'react-bootstrap';
import '../App.css';

const minHeight_display = 300;
let relArr = ["Vague","Early stage","Gaining Traction","Evolving","Established","Expansionary","Growing"];
let likeArr = ["Potential","Possible","Probabble","Business as Usual"];
class Highlights extends Component{
  constructor(props){
    super(props);

  }
  render(){
    let topTen = this.props.filteredData.sort((a,b)=>{
      return b.intensity - a.intensity;
    });
    topTen = topTen.filter((d,i)=>{
      return i < 10;
    })
    console.log(topTen);
    return(
      <Row className="border shadow-lg mx-1 mb-3"
      style={{backgroundColor:"aliceblue",minHeight:minHeight_display,borderRadius:"10px"}}>
      {
        topTen.map((data,i) => {
        return <Col key={i} style={{
          minWidth:"300px",
          backgroundColor:"white",
          borderRadius:"50px"
        }} className="mx-2 my-2 shadow-sm">
        <p className="topic-high">{data.topic} </p>
        <p className="small-high">{data.intensity} | {data.relevance<=7 ? relArr[data.relevance] : data.relevance} |
         {data.likelihood<=7 ? " "+relArr[data.likelihood] : " "+data.likelihood}</p>
        </Col>
        })
      }
      </Row>
    );
  }
}

export default Highlights;
