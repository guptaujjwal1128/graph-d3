import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Home,Guide,Feedback,NotExist} from './pages';
import './App.css';

class App extends Component{
  render(){
    return(
      <div>
      <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/guide" component={Guide} />
      <Route exact path="/feedback" component={Feedback} />
      <Route component={NotExist} />
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
