import React, { Component, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ProjectForm = props => {
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: ""
  });

  const handleChange = event => {
    setProjectForm({
      ...projectForm,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("SUBMIT");
    // axios.post('http://localhost:5555/api/projects')
    axios
      .post("/api/projects", projectForm)
      .then(response => {
        props.refreshData();
        setProjectForm({ title: "", description: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="title">Title: </Form.Label>
        <Form.Control
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={projectForm.title}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="description">Description: </Form.Label>
        <Form.Control
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={projectForm.description}
        />
      </Form.Group>

      <Button type="submit">Create a project</Button>
    </Form>
  );
};

// class ProjectForm extends Component {
//   state = {
//     title: "",
//     description: ""
//   };

//   handleChange = event => {
//     // if (event.target.name === "title") {
//     //   this.setState({
//     //     title: event.target.value
//     //   });
//     // } else if (event.target.name === "description") {
//     //   this.setState({
//     //     description: event.target.value
//     //   });
//     // } else if (event.target.name === "foo") {
//     //   this.setState({
//     //     foo: event.target.value
//     //   });
//     // }
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     console.log("SUBMIT");

//     // axios.post('http://localhost:5555/api/projects')
//     axios
//       .post("/api/projects", {
//         title: this.state.title,
//         description: this.state.description
//       })
//       .then(response => {
//         this.props.refreshData();
//         this.setState({
//           title: "",
//           description: ""
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   render() {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Group>
//           <Form.Label htmlFor="title">Title: </Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             id="title"
//             onChange={this.handleChange}
//             value={this.state.title}
//           />
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor="description">Description: </Form.Label>
//           <Form.Control
//             type="text"
//             name="description"
//             id="description"
//             onChange={this.handleChange}
//             value={this.state.description}
//           />
//         </Form.Group>

//         <Button type="submit">Create a project</Button>
//       </Form>
//     );
//   }
// }

export default ProjectForm;
