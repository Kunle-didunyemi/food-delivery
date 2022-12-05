import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBhElfYbG_fmHr4QTb0MR6joGQjtFtjhiw",
    authDomain: "restaurantapp-2635c.firebaseapp.com",
    databaseURL: "https://restaurantapp-2635c-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-2635c",
    storageBucket: "restaurantapp-2635c.appspot.com",
    messagingSenderId: "690418704928",
    appId: "1:690418704928:web:9820ef65dfe9da6d839245"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage};