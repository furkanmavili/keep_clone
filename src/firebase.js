import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBy0lcE2Txm3kLsNwOjKN5ZxxsmTY1Xmt4",
  authDomain: "keepnote-208bd.firebaseapp.com",
  projectId: "keepnote-208bd",
  storageBucket: "keepnote-208bd.appspot.com",
  messagingSenderId: "808400154746",
  appId: "1:808400154746:web:122bdd1714f55dc1c3cbc3",
  measurementId: "G-2W563GCDZY",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const db = firebase.firestore();
export const getNotes = (user) => {
  if (!user) return;
  return db.collection("notes").where("owner", "==", user.uid);
};

export const addNote = async (title, content, color, user) => {
  const data = {
    title,
    content,
    color,
    owner: user,
  };

  const res = await db.collection("notes").add(data);
  return res;
};
