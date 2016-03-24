import alt from '../alt'
import ProjectAPI from '../api/ProjectAPI'

class ProjectActions {
  updateProjects(projects) {
    return projects;
  }

  createProject(project) {
    return (dispatch) => {
      ProjectAPI.create(project)
        .then((projects) => {
          this.updateProjects(projects);
        })
        .catch((errorMessage) => {
          this.ProjectsFailed(errorMessage);
        });
      }
  }

  fetchProjects() {
    return (dispatch) => {
      dispatch();

      ProjectAPI.fetch()
        .then((projects) => {
          // we can access other actions within our action through `this.actions`
          this.updateProjects(projects);
        })
        .catch((errorMessage) => {
          this.ProjectsFailed(errorMessage);
        });
      }
  }

  projectsFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(ProjectActions);
