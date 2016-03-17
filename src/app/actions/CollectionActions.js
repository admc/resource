import alt from '../alt'
import CollectionAPI from '../api/CollectionAPI'

class CollectionActions {
  updateCollections(collections) {
    return collections;
  }

  createCollection(collection) {
    return (dispatch) => {
      CollectionAPI.create(collection)
        .then((collections) => {
          this.updateCollections(collections);
        })
        .catch((errorMessage) => {
          this.CollectionsFailed(errorMessage);
        });
      }
  }

  fetchCollections() {
    return (dispatch) => {
      dispatch();

      CollectionAPI.fetch()
        .then((collections) => {
          // we can access other actions within our action through `this.actions`
          this.updateCollections(collections);
        })
        .catch((errorMessage) => {
          this.CollectionsFailed(errorMessage);
        });
      }
  }

  collectionsFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(CollectionActions);
