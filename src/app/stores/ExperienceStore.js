var alt = require('../alt');
var ExperienceActions = require('../actions/ExperienceActions');

class ExperienceStore {
  constructor() {
    this.experiences = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateExperiences: ExperienceActions.UPDATE_EXPERIENCES,
      handleGetExperiences: ExperienceActions.GET_EXPERIENCES,
      //handleCreateExperience: ExperienceActions.CREATE_EXPERIENCE,
      handleExperiencesFailed: ExperienceActions.EXPERIENCES_FAILED
    });
  }

  handleUpdateExperiences(experiences) {
    this.experiences = experiences;
    this.errorMessage = null;
  }

  handleGetExperiences() {
    // reset the array while we're fetching new experiences so React can
    // be smart and render a spinner for us since the data is empty.
    this.experiences = [];
  }

  handleExperiencesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(ExperienceStore, 'ExperienceStore');
