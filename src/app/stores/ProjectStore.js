import alt from '../alt'
import ProjectActions from '../actions/ProjectActions'

class ProjectStore {

  constructor() {
    this.projects = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateProjects: ProjectActions.UPDATE_PROJECTS,
      handleFetchProjects: ProjectActions.FETCH_PROJECTS,
      handleProjectsFailed: ProjectActions.PROJECTS_FAILED
    });
  }

  handleUpdateProjects(projects) {
    this.projects = projects;
    this.errorMessage = null;
  }

  handleFetchProjects() {
    this.projects = [];
  }

  handleProjectsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(ProjectStore, 'ProjectStore');
