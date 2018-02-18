const registerBackgroundSync = (tag) => {
  self.registration.sync.register({
    id: tag || "12345",
    minDelay: 10000
  }).then((syncRegistration) => {
    console.log('registered for sync event');
  })
  .catch((error) => {
    console.log('Failed to register for sync ', error);
  });
}

self.addEventListener('install', (event) => {
  console.log('service worker 1 installed successfully');
  self.skipWaiting().then(() => {
    //service workers takes controll of its clients
    console.log('cliaming the clients in install');
    clients.claim().then(() => {
      console.log('clients are cliamed')
    })
    .catch((err) => {
      console.log('clients are cliam failed', err);
    });
  })

  self.registration.pushManager.getSubscription()
    .then((subscriptions) => {
      
      subscriptions && subscriptions.forEach((subscription) => {
        subscription.unsubscribe().then((status) => {
          console.log('subscription unsubscriped ', subscription.getKey(), status);
        })
        
      })

    })

  //register for sync
  registerBackgroundSync()

});

// will be called whenevery new service worker is updated
self.addEventListener('activate', (event) => {
  console.log('serice worker 1 activate is calling');
})

self.addEventListener('push', (event) => {
  console.log('sample push message', event);
  const pushData = event.data.text();
  self.registration.showNotification('ChennaiJs Annouced a Event', {
    actions: [{title: 'Open', action: 'Action'}],
    body: 'ChennaiJs Just Announced the new Event',
    icon: '/img/js92.png',
    tag: Math.random() * 10000,
    requireInteraction: true
  })
  .then((event) => {
    console.log('showing notification ', event, pushData);
  })
  .catch((err) => {
    console.log('Failed to show notification ', err);
  });
});

self.onnotificationclick = (event) => {
  const notification = event.notification;
  event.waitUntil(clients.matchAll({
    type: 'window'
  })
  .then((clientList)=> {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  })
  .catch((err) => {
    console.log("Failed to get clients ", err)
  }))
}

self.addEventListener('message',  (event) => {
  console.log('message event', event);
  if(event.data === "SUBSCRIBE_FOR_PUSH") {
   const publicKey = "BF4bwfU6a84iE1zwqU-Zbf3kdVF5zvAPUEmPGmCE43EM7UyY9yXXrqbS_XXx_eZ0TmwPfEHSx7CuN2GclV_8Rak";

   self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    })
    .then((subscribtion) => {
      console.log('subscription details', JSON.stringify(subscribtion));
      event.ports[0].postMessage('SUBSCRIBE_DONE');

      // send subsction details to server
      fetch('/subscribe',{
        method: "POST",
        body: JSON.stringify(subscribtion),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      }).then((res) => {
        console.log('saved the subscription details', res.json());
      }).catch((err) => {
        console.log('Failed to save the subscription', err);
      });

    })
    .catch((error) => {
      console.log('failed to subscribe for push', error);
    })
  }
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('sync', (event) => {
  console.log('sync event fired', JSON.stringify(event.tag), event.lastChance);
});