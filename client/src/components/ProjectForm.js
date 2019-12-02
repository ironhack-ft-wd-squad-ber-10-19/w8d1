import React, { Component } from "react";

class ProjectForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" />

        <label htmlFor="description">Description: </label>
        <input type="text" name="description" id="description" />

        <button type="submit">Create a project</button>
      </form>
    );
  }
}

export default ProjectForm;
