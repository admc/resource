import alt from '../alt'
import CollectionActions from '../actions/CollectionActions'

class CollectionStore {

  constructor() {
    this.collections = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateCollections: CollectionActions.UPDATE_COLLECTIONS,
      handleFetchCollections: CollectionActions.FETCH_COLLECTIONS,
      handleCollectionsFailed: CollectionActions.COLLECTIONS_FAILED
    });
  }

  handleUpdateCollections(collections) {
    this.collections = collections;
    this.errorMessage = null;
  }

  handleFetchCollections() {
    this.collections = [];
  }

  handleCollectionsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(CollectionStore, 'CollectionStore');
