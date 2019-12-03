import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";

const Projects = props => {
  const [projects, setProjects] = useState([]);

  const getData = () => {
    // axios
    //   .get("http://localhost:5555/api/projects")
    axios
      .get("/api/projects")
      .then(response => {
        setProjects(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("component did mount");
    getData();
  }, []);

  return (
    <div className="projects-container">
      <ProjectList projects={projects} />
      <ProjectForm refreshData={getData} />
    </div>
  );
};

// class Projects extends Component {
//   state = {
//     projects: []
//   };

//   // componentWillUnmount() {
//   //   console.log("PROJECTS UNMOUNT");
//   // }

//   getData = () => {
//     // axios
//     //   .get("http://localhost:5555/api/projects")
//     axios
//       .get("/api/projects")
//       .then(response => {
//         this.setState({
//           projects: response.data
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   componentDidMount() {
//     this.getData();
//   }

//   render() {
//     return (
//       <div className="projects-container">
//         <ProjectList projects={this.state.projects} />
//         <ProjectForm refreshData={this.getData} />
//       </div>
//     );
//   }
// }

export default Projects;
