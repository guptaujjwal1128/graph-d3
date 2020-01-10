import React,{Component} from 'react';
import '../App.css';
import { Row,Col } from 'react-bootstrap';
import { Slider,Select,MenuItem } from '@material-ui/core';
import {jsonData} from '../data/data.js';


const minHeight_row1 = 120;
const minHeight_row2 = 100;
const minHeight_row3 = 330;
const minHeight_col1 = 140;
const minHeight_col2 = 140;
const minHeight_col3 = 80;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
var topicUnfiltered = new Array();
var sectorUnfiltered = new Array();
var regionUnfiltered = new Array();
var pestleUnfiltered = new Array();
var yearUnfiltered = new Array();

const swotArr = ["All","Strength","Weakness","Opportunity","Threat"]
class Filters extends Component{
  constructor(props){
    super(props);
    this.slider1 = this.slider1.bind(this);
    this.calculatingDataByFiltering = this.calculatingDataByFiltering.bind(this);
    this.state = {
      yearChecked:false,
      startYear:2016,
      endYear:2200,
      topic:"all",
      sector:"all",
      region:"all",
      pestle:"all",
      year:"all",
      currFilter:"topic",
      intensity:true,
      likelyhood:true,
      relevance:true,
      confidence:"90",
      swot:"all",
      filteredData:jsonData.data,
      topicArr:[],
      sectorArr:[],
      regionArr:[],
      pestleArr:[],
      yearArr:[]
    }
  }

  calculatingDataByFiltering(sy,ey,topic,sector,region,pestle,year){
      var filterArr = [];
      filterArr = this.state.filteredData.filter((data)=>{
          return ((Number(data.start_year)===0) || ((Number(data.start_year)>=sy))) &&
          ((Number(data.start_year)===0) || ((Number(data.end_year)<=ey)));
      })
      if(topic!="all"){
        topicUnfiltered = new Array(...filterArr);
        filterArr = filterArr.filter((data)=>{
          return (data.topic == topic)||(data.topic=="");
        })
      }
      else{
        filterArr = topicUnfiltered.length==0 ? filterArr : topicUnfiltered;
      }
      if(sector!="all"){
        sectorUnfiltered = new Array(...filterArr);
        filterArr = filterArr.filter((data)=>{
          return (data.sector == sector)||(data.sector=="");
        })
      }
      else{
        filterArr = sectorUnfiltered.length==0 ? filterArr : sectorUnfiltered;;
      }
      if(region!="all"){
        regionUnfiltered = new Array(...filterArr);
        filterArr = filterArr.filter((data)=>{
          return (data.region == region)||(data.region=="");
        })
      }
      else{
        filterArr = regionUnfiltered.length==0 ? filterArr : regionUnfiltered;;
      }
      if(pestle!="all"){
        pestleUnfiltered = new Array(...filterArr);
        filterArr = filterArr.filter((data)=>{
          return (data.pestle == pestle)||(data.pestle=="");
        })
      }
      else{
        filterArr = pestleUnfiltered.length==0 ? filterArr : pestleUnfiltered;;
      }
      if(year!="all"){
        yearUnfiltered = new Array(...filterArr);
        filterArr = filterArr.filter((data)=>{
          return (Number(data.start_year) >= Number(year)) &&
          (Number(data.end_year) <= Number(year));
        })
      }
      else{
        filterArr = yearUnfiltered.length==0 ? filterArr : yearUnfiltered;
      }
      var topicArr = filterArr.map((data,i)=>{
        return data.topic;
      })
      topicArr.sort();
      topicArr.unshift("all");
      var topicFilteredArr = topicArr.filter((data,i,arr)=>{
        return (arr.indexOf(data)==i) && (data!="");
      })

      var sectorArr = filterArr.map((data,i)=>{
        return data.sector;
      })
      sectorArr.sort();
      sectorArr.unshift("all");
      var sectorFilteredArr = sectorArr.filter((data,i,arr)=>{
        return (arr.indexOf(data)==i) && (data!="");
      })

      var regionArr = filterArr.map((data,i)=>{
        return data.region;
      })
      regionArr.sort();
      regionArr.unshift("all");
      var regionFilteredArr = regionArr.filter((data,i,arr)=>{
        return (arr.indexOf(data)==i) && (data!="");
      })

      var pestleArr = filterArr.map((data,i)=>{
        return data.pestle;
      })
      pestleArr.sort();
      pestleArr.unshift("all");
      var pestleFilteredArr = pestleArr.filter((data,i,arr)=>{
        return (arr.indexOf(data)==i) && (data!="");
      })

      var yearArr = filterArr.map((data,i)=>{
        return data.start_year;
      })
      yearArr.sort((a,b)=>{
        return a-b;
      })
      yearArr.unshift("all");
      var yearFilteredArr = yearArr.filter((data,i,arr)=>{
        return (arr.indexOf(data)==i) && (data!="");
      })
      this.props.sendDataFilter(filterArr,this.state.intensity
        ,this.state.likelyhood,this.state.relevance,this.state.currFilter);
      this.setState({
        filteredData:filterArr,
        topicArr:topicFilteredArr,
        sectorArr:sectorFilteredArr,
        regionArr:regionFilteredArr,
        pestleArr:pestleFilteredArr,
        yearArr:yearFilteredArr
      });
  }

  slider1(){
    return <Slider
              min={2016}
              max={2200}
              onChange={(e,newValue)=>{
                  this.setState({
                    startYear:Number(newValue[0]),
                    endYear:Number(newValue[1])
                  })
                  this.calculatingDataByFiltering(newValue[0],newValue[1],
                  this.state.topic,this.state.sector,this.state.region,
                  this.state.pestle,this.state.year);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              defaultValue={[2016, 2200]}
              className="mx-3"
            />
  }

  componentDidMount(){
    this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
    this.state.topic,this.state.sector,this.state.region,
    this.state.pestle,this.state.year);
  }

  render(){
    let node = this.props.realNodeData;
    console.log(node);
    let relArr = ["Vague","Early stage","Gaining Traction","Evolving","Established","Expansionary","Growing"];
    let likeArr = ["Potential","Possible","Probabble","Business as Usual"];
    const secLine = <p className="small-node">{node[1]} | {node[16]<=7 ? relArr[node[16]] : node[16]} | {node[12]<=4 ? likeArr[node[12]] : node[12]} | {node[7]}</p>
    return(
      <Col xl={4}>
      <div style={{borderRadius:"10px"}} className="bg-light border shadow-sm">
        <Row style={{minHeight:minHeight_row1}} className="bg-white rounded shadow-sm mx-3 my-3">
        <p className="topic-node">{node[3]} </p>
        {node.length ? secLine:null}
        <p className="link-node"><a href={node[5]}>{node[15]}</a></p>
        </Row>
        <Row style={{minHeight:minHeight_row2}} className="bg-white rounded shadow-sm mx-3 my-3">
          <label className="label-year">Year Range({this.state.startYear}-{this.state.endYear})</label>
          <input className="switch-year" type="checkbox" name="year" value="year" onChange={()=>{
            this.setState({
              yearChecked:!(this.state.yearChecked)
            })
          }}></input>
        {
          this.state.yearChecked ? this.slider1() : null
        }
        </Row>
        <Row style={{minHeight:minHeight_row3}} className="bg-light mx-3 my-3">
          <Col className="bg-white rounded shadow-sm my-3" lg={8} md ={8} xl={8}>
             <form>
             <label className="label-style">Show and Filter</label><br/>
             <input checked={this.state.currFilter=="topic"} className="input-radio" name="filter" type="radio" value="topic" onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,this.state.likelyhood,this.state.relevance,e.target.value);
                this.setState({
                  currFilter:e.target.value
                })
             }}/>Topic<br/>
             <Select MenuProps={MenuProps} value={this.state.topic} onChange={(e)=>{
                this.setState({
                  topic:e.target.value
                })
                this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
                e.target.value,this.state.sector,this.state.region,
                this.state.pestle,this.state.year);
             }}className="select-style">
             {this.state.topicArr.map((data,i) => (
               <MenuItem value={data} key={i}>
               {data}
               </MenuItem>
             ))}
             </Select>
             <br/>
             <input checked={this.state.currFilter=="sector"} className="input-radio" name="filter" type="radio" value="sector" onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,this.state.likelyhood,this.state.relevance,e.target.value);
                this.setState({
                  currFilter:e.target.value
                })
             }} />Sector<br/>
             <Select MenuProps={MenuProps} value={this.state.sector} onChange={(e)=>{
                this.setState({
                  sector:e.target.value
                })
                this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
                this.state.topic,e.target.value,this.state.region,
                this.state.pestle,this.state.year);
             }}className="select-style">
             {this.state.sectorArr.map((data,i) => (
               <MenuItem value={data} key={i}>
               {data}
               </MenuItem>
             ))}
             </Select><br/>
             <input checked={this.state.currFilter=="region"} className="input-radio" name="filter" type="radio" value="region" onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,this.state.likelyhood,this.state.relevance,e.target.value);
                this.setState({
                  currFilter:e.target.value
                })
             }} />Region<br/>
             <Select MenuProps={MenuProps} value={this.state.region} onChange={(e)=>{
                this.setState({
                  region:e.target.value
                })
                this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
                this.state.topic,this.state.sector,e.target.value,
                this.state.pestle,this.state.year);
             }}className="select-style">
             {this.state.regionArr.map((data,i) => (
               <MenuItem value={data} key={i}>
               {data}
               </MenuItem>
             ))}
             </Select><br/>
             <input checked={this.state.currFilter=="pestle"} className="input-radio" name="filter" type="radio" value="pestle" onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,this.state.likelyhood,this.state.relevance,e.target.value);
                this.setState({
                  currFilter:e.target.value
                })
             }} />Pestle<br/>
             <Select MenuProps={MenuProps} value={this.state.pestle} onChange={(e)=>{
                this.setState({
                  pestle:e.target.value
                })
                this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
                this.state.topic,this.state.sector,this.state.region,
                e.target.value,this.state.year);
             }}className="select-style">
             {this.state.pestleArr.map((data,i) => (
               <MenuItem value={data} key={i}>
               {data}
               </MenuItem>
             ))}
             </Select><br/>
             <label className="special-label">Year</label>
             <Select MenuProps={MenuProps} value={this.state.year} onChange={(e)=>{
                this.setState({
                  year:e.target.value
                })
                this.calculatingDataByFiltering(this.state.startYear,this.state.endYear,
                this.state.topic,this.state.sector,this.state.region,
                this.state.pestle,e.target.value);
             }} className="select-year-style">
             {this.state.yearArr.map((data,i) => (
               <MenuItem value={data} key={i}>
               {data}
               </MenuItem>
             ))}
             </Select><br/>
             </form>
          </Col>
          <Col lg={4} md ={4} xl={4}>
           <Row style={{minHeight:minHeight_col1}} className="bg-white rounded shadow-sm mx-1 my-3">
             <form>
             <label className="label-style">Measures</label><br/>
             <input checked={this.state.intensity} className="input-radio" name="Measures" type="checkbox" value="intensity"  onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,!(this.state.intensity)
                 ,this.state.likelyhood,this.state.relevance,this.state.currFilter);
                this.setState({
                  intensity:!(this.state.intensity)
                })
             }} /><span style={{color:"red"}}>intensity</span><br/>
             <input checked={this.state.likelyhood} className="input-radio" name="Measures" type="checkbox" value="likelyhood" onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,!(this.state.likelyhood),this.state.relevance,this.state.currFilter);
                this.setState({
                  likelyhood:!(this.state.likelyhood)
                })
             }} /><span style={{color:"blue"}}>likelihood</span><br/>
             <input checked={this.state.relevance} className="input-radio" name="Measures" type="checkbox" value="relevance"  onChange={(e)=>{
               this.props.sendDataFilter(this.state.filteredData,this.state.intensity
                 ,this.state.likelyhood,!(this.state.relevance),this.state.currFilter);
                this.setState({
                  relevance:!(this.state.relevance)
                })
             }} /><span style={{color:"green"}}>relevance</span>
             </form>
           </Row>
           <Row style={{minHeight:minHeight_col2}} className="bg-white rounded shadow-sm mx-1 my-3">
             <form>
             <label className="label-style">Confidence</label><br/>
             <input  checked={this.state.confidence=="90"} className="input-radio" name="Confidence" type="radio" value="90" onChange={(e)=>{
                this.setState({
                  confidence:e.target.value
                })
             }} />90%<br/>
             <input  checked={this.state.confidence=="95"} className="input-radio" name="Confidence" type="radio" value="95" onChange={(e)=>{
                this.setState({
                  confidence:e.target.value
                })
             }} />95%<br/>
             <input  checked={this.state.confidence=="99"} className="input-radio" name="Confidence" type="radio" value="99" onChange={(e)=>{
                this.setState({
                  confidence:e.target.value
                })
             }} />99%
             </form>
           </Row>
           <Row style={{minHeight:minHeight_col3}} className="bg-white rounded shadow-sm mx-1 my-3">
           <label className="swot-label">SWOT</label>
           <br/>
           <Select MenuProps={MenuProps} value={this.state.swot} onChange={(e)=>{
              this.setState({
                swot:e.target.value
              })
           }}className="swot-select">
           {swotArr.map((data,i) => (
             <MenuItem value={data} key={i}>
             {data}
             </MenuItem>
           ))}
           </Select>
           </Row>
         </Col>
        </Row>
      </div>
      </Col>
    );
  }
}

export default Filters;
