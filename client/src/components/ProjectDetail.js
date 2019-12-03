import React, { Component, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const ProjectDetail = props => {
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: ""
  });

  const [project, setProject] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const [error, setError] = useState("");

  const { id } = props.match.params;

  const getData = () => {
    // get the data from the API
    // update the state accordingly
    // console.log("/api/projects/" + id);
    axios
      .get(`/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
        setProjectForm({
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          setError(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    console.log("component mounting");
    getData();
  }, []);

  useEffect(() => {
    console.log("component mounted or updated");
  }, [editForm]);

  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  const deleteProject = () => {
    axios
      .delete(`/api/projects/${id}`)
      .then(response => {
        // redirect to '/projects'
        console.log(props.history);
        props.history.push("/projects"); // `/projects` is our client side route
        // this.props.history comes from react-router-dom <Route>
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleEdit = () => {
    setEditForm(!editForm);
  };

  const handleChange = event => {
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // const id = this.state.project._id

    axios
      .put(`/api/projects/${id}`, projectForm)
      .then(response => {
        setProject(response.data);
        setEditForm(false);

        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (error) {
    return <p>{error}</p>;
  } else if (project === null) {
    return <div></div>;
  }

  let canUpdate = false;

  if (project.owner === props.user._id) {
    canUpdate = true;
  }
  console.log(canUpdate);
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      {canUpdate && (
        <>
          <Button onClick={toggleEdit}>Show Edit Form</Button>
          {/* <Button onClick={() => setState({ taskForm: !taskForm })}> */}
          <Button onClick={() => setTaskForm(!taskForm)}>Show Task form</Button>
          <Button variant="danger" onClick={deleteProject}>
            Delete Project
          </Button>
        </>
      )}

      {editForm && (
        <Form onSubmit={handleSubmit}>
          <h2>Edit form</h2>
          <Form.Group>
            <Form.Label htmlFor="title">Title: </Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={projectForm.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="description">Description: </Form.Label>
            <Form.Control
              type="text"
              name="description"
              id="description"
              value={projectForm.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Edit</Button>
        </Form>
      )}

      {taskForm && (
        <TaskForm
          projectId={project._id}
          getData={getData}
          hideForm={() => setTaskForm(false)}
          // hideForm={() => this.setState({ taskForm: false })}
        />
      )}

      <TaskList tasks={project.tasks} />
    </div>
  );
};

// class ProjectDetail extends Component {
//   state = {
//     project: null,
//     error: "",
//     editForm: false,
//     taskForm: false,
//     title: "",
//     description: ""
//   };

//   getData = () => {
//     // get the data from the API
//     // update the state accordingly
//     // console.log("/api/projects/" + id);

//     const id = this.props.match.params.id;
//     axios
//       .get(`/api/projects/${id}`)
//       .then(response => {
//         this.setState({
//           project: response.data,
//           title: response.data.title,
//           description: response.data.description
//         });
//       })
//       .catch(err => {
//         if (err.response.status === 404) {
//           this.setState({
//             error: err.response.data.message
//           });
//         }
//       });
//   };

//   componentDidMount() {
//     this.getData();
//   }

//   deleteProject = () => {
//     const id = this.state.project._id;
//     axios
//       .delete(`/api/projects/${id}`)
//       .then(response => {
//         // redirect to '/projects'
//         console.log(this.props.history);
//         this.props.history.push("/projects"); // `/projects` is our client side route
//         // this.props.history comes from react-router-dom <Route>
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   toggleEdit = () => {
//     this.setState({
//       editForm: !this.state.editForm
//     });
//   };

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     // const id = this.state.project._id

//     const id = this.props.match.params.id;
//     axios
//       .put(`/api/projects/${id}`, {
//         title: this.state.title,
//         description: this.state.description
//       })
//       .then(response => {
//         this.setState({
//           project: response.data,
//           // title: response.data.title,
//           // description: response.data.description,
//           editForm: false
//         });
//         // console.log(response);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   render() {
//     // console.log(this.state, this.props);
//     if (this.state.error) {
//       return <p>{this.state.error}</p>;
//     } else if (this.state.project === null) {
//       return <div></div>;
//     }

//     let canUpdate = false;

//     if (this.state.project.owner === this.props.user._id) {
//       canUpdate = true;
//     }
//     console.log(canUpdate);
//     return (
//       <div>
//         <h1>{this.state.project.title}</h1>
//         <p>{this.state.project.description}</p>

//         {canUpdate && (
//           <>
//             <Button onClick={this.toggleEdit}>Show Edit Form</Button>
//             <Button
//               onClick={() => this.setState({ taskForm: !this.state.taskForm })}
//             >
//               Show Task form
//             </Button>
//             <Button variant="danger" onClick={this.deleteProject}>
//               Delete Project
//             </Button>
//           </>
//         )}

//         {this.state.editForm && (
//           <Form onSubmit={this.handleSubmit}>
//             <h2>Edit form</h2>
//             <Form.Group>
//               <Form.Label htmlFor="title">Title: </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 id="title"
//                 value={this.state.title}
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label htmlFor="description">Description: </Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 id="description"
//                 value={this.state.description}
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Button type="submit">Edit</Button>
//           </Form>
//         )}

//         {this.state.taskForm && (
//           <TaskForm
//             projectId={this.state.project._id}
//             getData={this.getData}
//             hideForm={() => this.setState({ taskForm: false })}
//           />
//         )}

//         <TaskList tasks={this.state.project.tasks} />
//       </div>
//     );
//   }
// }

export default ProjectDetail;
