
/*******************************************************/
// 
// fb_io.js
// Written by Alfie Cross
//This module handles login, writing to the database with user info,
//Saving score from geodash, and creating the leaderboard 
//
/*******************************************************/

//Initial login with google
function fb_login() {
	console.log("logging in to site")
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log("logged in to site")
			console.log(user)
			var uid = user.uid;
			//Logged in
			fb_getRegistration(user.uid);
		} else {
			console.log("not logged in ")
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				var token = result.credential.accessToken;
				var user = result.user;
				fb_getRegistration(user.uid);

				//Not logged in

			});
		}
	});
}

//checking firebase data
//checking if the user is already registered
function fb_getRegistration(uid) {
	console.log("checking if " + uid + " is registered")
	firebase.database().ref('users/' + uid).once('value', fb_checkRegistration)
}

//redirecting users 
function fb_checkRegistration(snapshot) {
	console.log(snapshot.val())
	if (snapshot.val() == null) {
		//redirecting users to the registration page 
		console.log("the user is not registered in the data base. Please go to the register page.")
		console.log("being redirected to registration page.")
		window.location = "registration.html"
		console.log("You have been redirected to the registration page.")
	} else {
		//redirecting users to the game menu page 
		console.log("the user is registered in the database. Please contintue to game page!")
		console.log("being redirected to game menu page.")
		window.location = "index.html"
		console.log("You have been redirected to the game page.")
	}
}

function fb_error(error) {
	console.error("error");
	console.error(error)
}

//authentication after registration
function fb_register() {
	console.log("logging in")
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in: 
			console.log(user.uid)
			fb_userInfo(user);
		} else {
			// User is not signed in  
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Google Access Token.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				fb_userInfo(user);
			});
		}
	});
}



//user info saved to firebase
function fb_userInfo(user) {


	var data = {

		userName: HTML_name.value,
		googleName: user.displayName,
		email: user.email,
		photo: user.photoURL,
		age: HTML_age.value,
		gender: HTML_gender.value,
		UID: user.uid,
	}
	console.log(user.uid)
	console.log(data)
	firebase.database().ref('/users/' + user.uid).set(data).then(fb_goToMainMenu)
}
//redirecting to gamepage (gp) after registration
function fb_goToMainMenu() {
	window.location = "mainMenu.html"
}





function fb_checkRegistrationForPageChange(snapshot) {
	console.log(snapshot.val())
	if (snapshot.val() == null) {
		//redirecting users to the registration page 
		console.log("the user is not registered in the data base. Please go to the register page.")
		console.log("being redirected to registration page.")
		window.location = "registration.html"
		console.log("You have been redirected to the registration page.")
	} else {
		//redirecting users to the game menu page 
		console.log("the user is registered in the database. Please contintue to game page!")
		console.log("being redirected to menu page.")
		window.location = "carSelection.html"
		console.log("You have been redirected to main page.")
	}
}




  /*******************************************************/
//  END OF APP
/*******************************************************/