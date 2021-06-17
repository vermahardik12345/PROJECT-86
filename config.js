import firebase from 'firebase'
require('@firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyDM8OnkEs921yAoIFxrSGgbsGdAGIfmxgI",
  authDomain: "barter-system-e9a68.firebaseapp.com",
  projectId: "barter-system-e9a68",
  storageBucket: "barter-system-e9a68.appspot.com",
  messagingSenderId: "538387223694",
  appId: "1:538387223694:web:105bb8faa70c57ed5125df"
};
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();