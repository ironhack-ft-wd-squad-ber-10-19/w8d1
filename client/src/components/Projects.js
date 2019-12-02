import React, { Component } from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";

class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    // axios
    //   .get("http://localhost:5555/api/projects")
    axios
      .get("/api/projects")
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Projects</h1>
        <ProjectList projects={this.state.projects} />
        <ProjectForm />
      </div>
    );
  }
}

export default Projects;
