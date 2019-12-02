import React, { Component } from "react";
import axios from "axios";

class ProjectDetail extends Component {
  state = {
    project: null,
    error: "",
    showForm: false,
    title: "",
    description: ""
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
          project: response.data,
          title: response.data.title,
          description: response.data.description
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

  toggleEdit = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const id = this.state.project._id

    const id = this.props.match.params.id;
    axios
      .put(`/api/projects/${id}`, {
        title: this.state.title,
        description: this.state.description
      })
      .then(response => {
        this.setState({
          project: response.data,
          // title: response.data.title,
          // description: response.data.description,
          showForm: false
        });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.project === null) {
      return <div></div>;
    }

    return (
      <div>
        <h1>{this.state.project.title}</h1>
        <p>{this.state.project.description}</p>
        <button onClick={this.deleteProject}>Delete Project</button>
        <button onClick={this.toggleEdit}>Show Edit Form</button>
        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <h2>Edit form</h2>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <button type="submit">Edit</button>
          </form>
        )}
      </div>
    );
  }
}

export default ProjectDetail;
