var database;

/**************************************************************/
// fb_setup.js
// Initialize firebase, connect to the Firebase project.
/**************************************************************/
function fb_initialise() {  
const firebaseConfig = {
  apiKey: "AIzaSyDXULAjPvR9-JKWP1LRaIbXHuTGRg1VkMk",
  authDomain: "dtech-2025-alfiecross-4841d.firebaseapp.com",
  projectId: "dtech-2025-alfiecross-4841d",
  storageBucket: "dtech-2025-alfiecross-4841d.firebasestorage.app",
  messagingSenderId: "1018157546719",
  appId: "1:1018157546719:web:281861487fcd836bcc3d6a",
  measurementId: "G-445TDE8T2P"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log(firebase);	
}
fb_initialise();
function fb_authenticate(RUN_NEXT){
  firebase.auth().onAuthStateChanged((authUser)=>{
    if (authUser){
      //User is logged in
      user = authUser;
      console.log()
      console.log("Logged in, doing next action")
      RUN_NEXT();
    }else{
      // Sign in using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      });
    }
  })
}

  /*-----------------------------------------*/
  // error handling 
  // 
  // 
  /*-----------------------------------------*/
  function fb_readError(error) {
    console.log("There was an error reading the message");
    console.error(error);
  }

  function fb_error(error) {
    if (error){
      console.log("fbError");
      console.error(error);
    }else{
      console.log("succesful write");

      //All went well
    }
  }