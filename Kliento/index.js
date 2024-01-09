import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import App from './App';


const firebaseConfig = {
    apiKey: "AIzaSyBcLO2Ve-V9SgTutchauZCw4wRcCg4TvOo",
    authDomain: "baigiamasisprojektas-f9129.firebaseapp.com",
    projectId: "baigiamasisprojektas-f9129",
    storageBucket: "baigiamasisprojektas-f9129.appspot.com",
    messagingSenderId: "447673278484",
    appId: "1:447673278484:web:bb0bc9c5fd9dbd7cbbc701"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

AppRegistry.registerComponent(appName, () => App);
