import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf:{  
        name: '',
        age: '',
        height: ''
      }
    };
  }

  addSmurf = event => {
    // event.preventDefault();
    // add code to create the smurf using the api
    axios
      .post('http://localhost:3333/smurfs', this.state.smurf)
      .then(res => {
        this.setState({
          smurf:{
            name: '',
            age: '',
            height: ''
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange = e => {
    let value = e.target.value;
    if (e.target.name === 'age') {
      value = parseInt(value, 10);
    }
    this.setState({
        smurf: {
          ...this.state.smurf,
          [e.target.name]: value
        }
      });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.smurf.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.smurf.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.smurf.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
