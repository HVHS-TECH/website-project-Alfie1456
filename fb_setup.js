var database;

/**************************************************************/
// fb_setup.js
// Initialize firebase, connect to the Firebase project.
/**************************************************************/
function fb_initialise() {  
  const firebaseConfig = {
    apiKey: "AIzaSyAGCaJ9PL8M7Nsw7rl3A5IHODdyF-h71e8",
    authDomain: "dtech-alfiecross-2025.firebaseapp.com",
    databaseURL: "https://dtech-alfiecross-2025-default-rtdb.firebaseio.com",
    projectId: "dtech-alfiecross-2025",
    storageBucket: "dtech-alfiecross-2025.firebasestorage.app",
    messagingSenderId: "930002586227",
    appId: "1:930002586227:web:9c2aad4ce8135bb4533806",
    measurementId: "G-78KTTPYYSV"
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