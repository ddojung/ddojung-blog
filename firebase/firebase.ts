import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyBPpcd2sjbBnXLxORqN8Kqu7DFQIBXHNXY',
    authDomain: 'lee-ddojung-blog.firebaseapp.com',
    databaseURL: 'https://lee-ddojung-blog.firebaseio.com',
    projectId: 'lee-ddojung-blog',
    storageBucket: 'lee-ddojung-blog.appspot.com',
    messagingSenderId: '1042521962441',
  };

  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const database = firebase.firestore();
