import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      formInput : ""
    }
    this.queryTwitter = this.queryTwitter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  queryTwitter(hashtag){
    // API bing to
  }

  handleChange(event){
    event.preventDefault();
    this.setState({
      formInput: event.target.value
    })
  }
 

  render() {
    console.log("this is my state", this.state)

    return (
      <div className="App">
        <form onSubmit={this.queryTwitter}>
          <select>
            <option name="hashtag">#</option>
            <option name="handle">@</option>
          </select>
          <input value={this.state.formInput} onChange={this.handleChange} type="text" placeholder="Enter a HashTag" />
        </form>
        
        
      </div>
    );
  }
}

export default App;
