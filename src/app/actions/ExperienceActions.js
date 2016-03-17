var alt = require('../alt');
import ExperienceAPI from '../api/ExperienceAPI'

class ExperienceActions {
  updateExperiences(Experiences) {
    return Experiences;
  }

  createExperience(experience) {
    return (dispatch) => {
      ExperienceAPI.create(experience)
        .then((experiences) => {
          this.updateExperiences(experiences);
        })
        .catch((errorMessage) => {
          this.ExperiencesFailed(errorMessage);
        });
      }
  }

  getExperiences() {
    return (dispatch) => {
      dispatch();

      ExperienceAPI.fetch()
        .then((experiences) => {
          this.updateExperiences(experiences);
        })
        .catch((errorMessage) => {
          this.ExperiencesFailed(errorMessage);
        });
      }
  }

  experiencesFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(ExperienceActions);
