import React, { Component } from 'react';

import { Validation, Validator, ValidateHelper } from './validation';

export class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDate: "",
      error: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onValidate(error) {
    console.log('onvlaidate error', error);
    let prevError = this.state.error;
    this.setState({ error: Object.assign(prevError, error) });
  }
  
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  saveEvent() {
    let error = this.validationRef.validate();
    if(!error.eventName && !error.eventDate){
      fetch('/newEvent', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({eventName: this.state.eventName, eventDate: this.state.eventDate})
      }).then((res) => {
        this.setState({status: true});
        setTimeout(() => {
          this.setState({status: false});
        },3000)
      })
      .catch((err) => {
        this.setState({status: false});
      });
    }
    this.setState({ error });
  }

  render() {
    return (
      <div className="adminpage">
        <div className="eventform">
          <h2>Event Form</h2>
          {
            this.state.status &&
            <p className="status">Event created.</p>
          }
          <Validation ref={(ref) => {this.validationRef = ref;}}>
            <div className="input">
              <label htmlFor="">Event Name</label>
              <Validator name="eventName" value={this.state.eventName} validations={[ValidateHelper.required]}
                onValidate={this.onValidate}>
                <input name="eventName" type="text" onChange={this.handleChange}/>
              </Validator>
              {
                this.state.error.eventName && <p className="error">{this.state.error.eventName}</p>
              }
            </div>
            <div className="input">
              <label htmlFor="">Event Date</label>
              <Validator name="eventDate" value={this.state.eventDate} validations={[ValidateHelper.required]}
                onValidate={this.onValidate}>
                <input name="eventDate" type="date" onChange={this.handleChange}/>
              </Validator>
              {
                this.state.error.eventDate && <p className="error">{this.state.error.eventDate}</p>
              }
            </div>
            <div className="input">
              <button onClick={this.saveEvent}>save</button>
            </div>
          </Validation>
        </div>
      </div>
    );
  }
}