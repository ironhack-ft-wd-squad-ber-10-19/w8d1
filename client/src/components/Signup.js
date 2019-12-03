import React, { Component } from "react";
import { signup } from "../services/auth";

class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    signup(this.state.username, this.state.password).then(data => {
      // handle errors

      console.log(data);
      // lift the data up to the App state
      this.props.setUser(data);

      // redirect to "/projects"
      this.props.history.push("/projects");
    });
  };

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
