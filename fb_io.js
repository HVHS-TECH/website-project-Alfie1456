
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
		window.location = "mainMenu.html"
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


//saving geodash score to firebase
function fb_saveScore(oneScore) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const scoreRef = firebase.database().ref('users/' + user.uid + '/Agame1/score');
            scoreRef.once('value').then((snapshot) => {
                const prevScore = snapshot.val();
                if (prevScore === null || oneScore > prevScore) {
                    console.log("saving " + oneScore);
                    firebase.database().ref('users/' + user.uid + '/Agame1/').set({
                        score: oneScore
                    });
                } else {
                    console.log("Score not higher. Not saving.");
                }
            });
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var user = result.user;
                const scoreRef = firebase.database().ref('users/' + user.uid + '/Agame1/score');
                scoreRef.once('value').then((snapshot) => {
                    const prevScore = snapshot.val();
                    if (prevScore === null || oneScore > prevScore) {
                        console.log("saving " + oneScore);
                        firebase.database().ref('users/' + user.uid + '/Agame1/').set({
                            score: oneScore
                        });
                    } else {
                        console.log("Score not higher. Not saving.");
                    }
                });
            });
        }
    });
}

//saving game2 score
//function fb_saveTwoScore(twoScore) {
//	firebase.auth().onAuthStateChanged((user) => {
//		if (user) {
//			// User is signed in: 
//			console.log(user.uid)
//			var uid = user.uid;
//			console.log("saving " + twoScore);
//			firebase.database().ref('users/' + user.uid + '/Bgame2/').set({
//				score: twoScore
//			})
//		} else {
//		    window.location = "index.html"
//			// User is not signed in - Use the Google! 
//			var provider = new firebase.auth.GoogleAuthProvider();
//			firebase.auth().signInWithPopup(provider).then(function(result) {
//				// This gives you a Google Access Token.
//				var token = result.credential.accessToken;
//				// The signed-in user info.
//				var user = result.user;
//				console.log("saving " + score);
//				firebase.database().ref('users/' + user.uid + '/Bgame2/').set({
//					score: score
//				})
//			});
//		}
//	});
//}

// reading scores from geodash 
function fb_readAgameScores(readScores) {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in: 
			var uid = user.uid;
			firebase.database().ref('users/').orderByChild('/Agame1/score').once('value', fb_displayAgameTable)
		} else {
		    window.location = "index.html"
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {});
		}
	});
}

//leader board updating 
function updateLeaderBoard() {
	fb_readBgameScores()

}

	//Game1 leaderboard 
function fb_displayAgameTable(snapshot) {

	snapshot.forEach(displayAgameRow)
}
//display geodash leaderboard
function displayAgameRow(child) {
	let userRecord = child.val()



	var table = document.getElementById("container");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = userRecord.userName;
	cell2.innerHTML = userRecord.Agame1.score;

}




  /*******************************************************/
//  END OF APP
/*******************************************************/