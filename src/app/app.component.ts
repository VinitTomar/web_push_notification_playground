import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  message = '';
  icon = '';
  badge = '';
  image = '';

  actions: NotificationAction[] = [];

  constructor() { }

  private sendNotification() {
    const options: NotificationOptions = {
      body: this.message || 'Here is your message',
      icon: this.icon || 'https://img.icons8.com/nolan/64/bell.png',
      badge: this.badge || "https://img.icons8.com/material-sharp/24/000000/bell.png",
      image: this.image || 'https://cdn.pixabay.com/photo/2016/02/04/13/49/the-earth-1179212__340.png',
      actions: this.actions.map(act => {
        return {
          title: act.title,
          action: act.action,
          icon: act.icon
        }
      })
    }

    navigator.serviceWorker.getRegistration().then(reg => {
      reg.showNotification(this.title || 'Here is your title', options);
    });
  }

  addAction() {
    if (this.actions.length >= 4)
      return;

    this.actions.push({
      action: 'Button',
      title: '',
      icon: ''
    });
  }

  removeAction(index: number) {
    this.actions.splice(index, 1);
  }


  notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification

      this.sendNotification();
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
          Notification.requestPermission()
            .then((permission) => this._afterPermissionGranted(permission));
        } else {
          // Safari
          Notification.requestPermission((permission) => this._afterPermissionGranted(permission));
        }
      }

    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }

  private _afterPermissionGranted(permission) {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      this.sendNotification();
    }
  }
}
