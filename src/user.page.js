import React, {Component} from 'react';

import { Banner } from './banner';

export function UserPage() {
  return  (
    <React.Fragment>
      <NotificationPrompt />
      <div className="App">
        <Banner />
        <div id="topics">asdfasdssss</div>
      </div>
    </React.Fragment>
  )
}

class NotificationPrompt extends Component {
  constructor(props){
    super(props);
    this.state = {
      shouldAskPermission: false
    }
    this.promptPermission = this.promptPermission.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if(Notification.permission == 'default') {
        this.setState({shouldAskPermission: true});
      }
    }, 2000);
  }

  promptPermission = () => {
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission ', permission);
      //If permission granted asked service worker to subscribe for push notification
      // if successfully subscribed worked will send back the ack, then we can clear this notificaiton
      // from UI
      if(permission == 'granted' && navigator.serviceWorker.controller) {
        let messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (evt) => {
          if(evt.data === 'SUBSCRIBE_DONE') {
            console.log('push subscribtion completed. close this popup');
            this.setState({shouldAskPermission: false});
          }
        }
        navigator.serviceWorker.controller.postMessage('SUBSCRIBE_FOR_PUSH', [messageChannel.port2])
      }
    });
  }
  render() {
    return (
      <React.Fragment>
      {
        this.state.shouldAskPermission && 
        <div className="notificationBar">
          <h4><b>ChennaiJs</b> would like to notifiy you about the upcoming events</h4>
          <div>
            <button onClick={this.promptPermission}>Allow</button>
          </div>
        </div>
      }
    </React.Fragment>
    )
  }
}