import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBjI7p9EOK5k1i3DbwQ-oMGBOHUX4EroSs',
  authDomain: 'todolist-49f43.firebaseapp.com',
  databaseURL: 'https://todolist-49f43.firebaseio.com',
  projectId: 'todolist-49f43',
  storageBucket: '',
  messagingSenderId: '447664140149',
};
firebase.initializeApp(config);

export {firebase};
export const ref = firebase.database().ref();
