import React from 'react'

import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import styles from 'material-ui'
import {FormsyRadio, FormsyRadioGroup, FormsyText} from 'formsy-material-ui'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AutoComplete from 'material-ui/lib/auto-complete'

import ExperienceActions from '../../actions/ExperienceActions'
import CollectionStore from '../../stores/CollectionStore'
import CollectionActions from '../../actions/CollectionActions'

const errorMessages = {
  wordsError: "This field can't be empty."
}

export default class ExperienceCreate extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      canSubmit: false
      , autoHideDuration: 0
      , snackMessage: 'Your new experience was created.'
      , isSnackOpen: false
      , collections: []
      , defaultCollectionId: null
      , selectedCollectionId: null
      , selectedType: "general"
    }
  }

  componentDidMount() {
    $.get( "/user/me", function(data) {
      if (this.props.params.collectionId) {
        this.setState({
          selectedCollectionId: this.props.params.collectionId
          , defaultCollectionId: data.defaultCollectionId
        })
      }
      else {
        this.setState({
         selectedCollectionId: data.defaultCollectionId
        });
      }
    }.bind(this))


    CollectionStore.listen(this._change)
    CollectionActions.fetchCollections()
  }

  componentWillUnmount() {
    CollectionStore.unlisten(this._change)
  }
  
  _change = (state) => {
    this.setState({collections: state.collections})
  };

  selectCollection = (event, index, value) => this.setState({selectedCollectionId: value});
  selectType = (event, index, value) => this.setState({selectedType: value});

  _enableSubmit = () => {
    this.setState({ canSubmit: true })
  };
 
  _disableSubmit = () => {
    this.setState({ canSubmit: false })
  };

  _submitForm = (experience) => {
    experience.type = this.state.selectedType
    experience.collectionId = this.state.selectedCollectionId
    experience.location = this.refs.location.getValue()
    ExperienceActions.createExperience(experience)

    this.refs.experienceForm.reset()
    this.refs.location.setValue("")
    this.state.location = ""
    this.state.selectedType = "general"
    this.state.selectedCollectionId = this.state.defaultCollectionId;
    this._snackOpen()
  };

  _snackAction = () => {
    //Ultimately redirect to new experience, go to list for now
    this.context.router.push('/experience/list')
  };

  _snackClose = () => {
    this.setState({ isSnackOpen: false })
  };

  _snackOpen = () => {
    this.setState({ isSnackOpen: true })
  };

  render() {
    return (
      <div style={{marginBottom:"50px"}}>
        <Snackbar
          open={this.state.isSnackOpen}
          message={this.state.snackMessage}
          action="view"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._snackAction}
          onRequestClose={this._snackClose}
          style={{"position":"absolute"}}
        />

        <Formsy.Form
          ref="experienceForm"
          onValid={this._enableSubmit}
          onInvalid={this._disableSubmit}
          onValidSubmit={this._submitForm} >

          <div style={{width:"46%", float:"left", marginRight: "2%"}}>
            <FormsyText
              fullWidth={true}
              name='name'
              validations='isExisty'
              validationError={errorMessages.wordsError}
              required
              hintText="Maybe, 'Bike the Golden Gate'..."
              value=""
              floatingLabelText="Name" />
         </div>

         <div style={{width:"25%", float:"left", marginRight: "2%"}}>
           <SelectField
             fullWidth={true}
             value={this.state.selectedCollectionId}
             onChange={this.selectCollection}
             name='collection'
             floatingLabelText="Collection" >
               {this.state.collections.map(collection => {
                  return (
                    <MenuItem value={collection.id} primaryText={collection.name} />
                  )
               })}
           </SelectField>
         </div>

         <div style={{width:"25%", float:"left"}}>
           <SelectField
             ref="type"
             fullWidth={true}
             value={this.state.selectedType}
             onChange={this.selectType}
             name='type'
             required
             floatingLabelText="Category">
               <MenuItem value={"general"} primaryText={"General"} />
               <MenuItem value={'micro'} primaryText="Micro" />
               <MenuItem value={'excursion'} primaryText="Excursion" />
               <MenuItem value={'dining'} primaryText="Dining" />
               <MenuItem value={'boozing'} primaryText="Boozing" />
               <MenuItem value={'sleeping'} primaryText="Sleeping" />
               <MenuItem value={'powder'} primaryText="Powder" />
               <MenuItem value={'trek'} primaryText="Trek" />
               <MenuItem value={'afternoon'} primaryText="Afternoon" />
               <MenuItem value={'exercize'} primaryText="Exercize" />
               <MenuItem value={'relaxation'} primaryText="Relaxation" />
               <MenuItem value={'cultural'} primaryText="Cultural" />
               <MenuItem value={'budget'} primaryText="Budget" />
           </SelectField>
         </div>
         <br />
        
         <FormsyText
            fullWidth={true}
            name='description'
            validations='isExisty'
            validationError={errorMessages.wordsError}
            required
            hintText="Maybe, 'Rent a bike, spend the day enjoying the views on a bike crossing the bridge'..."
            multiLine={true}
            value=""
            rowsMax={2}
            floatingLabelText="Description" />
         <br />


        <div style={{width:"48%", float:"left", marginRight:"2%"}}>
          <AutoComplete
            ref="location"
            fullWidth={true}
            floatingLabelText="Location"
            hintText="City? Resteraunt? Hotel?"
            filter={AutoComplete.fuzzyFilter}
            triggerUpdateOnFocus={true}
            animated={true}
            dataSource={['San Francisco, CA', 'Zurich, CH', 'Munich, DE']}
          />
        </div>

        <div style={{width:"48%", float:"left"}}>
         <FormsyText
            fullWidth={true}
            name='costs'
            hintText="Maybe, '$30 bike rental'..."
            multiLine={true}
            value=""
            rowsMax={2}
            floatingLabelText="What costs are involved?" />
         </div>
         <br />

         <FormsyText
            fullWidth={true}
            name='url'
            hintText="Useful links? (comma delimited)"
            multiLine={true}
            value=""
            rowsMax={2}
            floatingLabelText="Links" />
         <br />

         <FormsyText
           fullWidth={true}
           name='meta'
           hintText="park, museum, indoors..."
           value=""
           floatingLabelText="Add some meta tags (comma delimited)" />
         <br />

         {/* <FormsyText
            fullWidth={true}
            name='collaborators'
            hintText="username1, username2, username3"
            value=""
            floatingLabelText="Collaborators" />
         <br />
         <br />

          /*<FormsyRadioGroup name="privacy" defaultSelected="public">
            <FormsyRadio
              value="private"
              label="Private" />
            <FormsyRadio
              value="public"
              label="Public" />
          </FormsyRadioGroup>
          */ }

         <br />
         <RaisedButton
           primary={true}
           type="submit"
           style={{textAlign:"center"}}
           label="Create"
           disabled={!this.state.canSubmit} />

         <RaisedButton
           style={{float:"right", textAlign:"center"}}
           secondary={true}
           linkButton={true}
           href="#/experience"
           label="Done" />

        </Formsy.Form>
      </div>
    )
  }
}

ExperienceCreate.contextTypes = {
  router: React.PropTypes.object.isRequired
}
