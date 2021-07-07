import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  withRouter
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error:''
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  async componentDidMount() {
    try { 
    let res = await axios.get('http://localhost:3333/smurfs')
    this.setState({smurfs:res.data})
    } catch (err){
      console.log(err.message)
    }
   
  }

  deleteSmurf = (e,id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  };


  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Create Smurf</NavLink>
        </nav>
        <Route exact path="/" render={ (props) => {
          return(<Smurfs {...props}
          smurfs={this.state.smurfs}
          deleteSmurf={this.deleteSmurf}
        />)
        }} />
        <Route path="/smurf-form" component={SmurfForm} />
      </div>
    );
  }
}

export default App;

