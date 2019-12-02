import React, { Component } from "react";
import axios from "axios";

class ProjectDetail extends Component {
  state = {
    project: null,
    error: ""
  };

  componentDidMount() {
    // get the data from the API
    // update the state accordingly

    const id = this.props.match.params.id;
    // console.log("/api/projects/" + id);

    axios
      .get(`/api/projects/${id}`)
      .then(response => {
        this.setState({
          project: response.data
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  }

  deleteProject = () => {
    const id = this.state.project._id;
    axios
      .delete(`/api/projects/${id}`)
      .then(response => {
        // redirect to '/projects'
        console.log(this.props.history);
        this.props.history.push("/projects"); // `/projects` is our client side route
        // this.props.history comes from react-router-dom <Route>
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state);
    if (this.state.error) {
      // if error
      return <p>{this.state.error}</p>;
    } else if (this.state.project === null) {
      return <div></div>;
    }

    return (
      <div>
        <h1>{this.state.project.title}</h1>
        <p>{this.state.project.description}</p>
        <button onClick={this.deleteProject}>Delete Project</button>
      </div>
    );
  }
}

export default ProjectDetail;
