import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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

// Storage
export const storage = firebase.storage();

// Authentication
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
const ref = db.collection("notes");

// Getting docs from collection
export const getNotes = (user) => {
  if (!user) return;
  return ref.where("owner", "==", user.uid);
};

const defaultNote = {
  title: "",
  content: "",
  color: "",
  edited: firebase.firestore.FieldValue.serverTimestamp(),
  owner: "",
  photoURL: "",
};
// Adding new note
export const addNote = async (data) => {
  console.log("adding new note...", {
    ...defaultNote,
    ...data,
  });
  const res = await ref.add({
    ...defaultNote,
    ...data,
  });
  return res;
};

// Updating note
export const updateNote = async (docID, data) => {
  const doc = ref.doc(docID);
  console.log(`Updating with id:${doc}, `, {
    ...data,
    edited: firebase.firestore.FieldValue.serverTimestamp(),
  });
  const res = await doc.update({
    ...data,
    edited: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return res;
};

// Deleting note
export const deleteNote = async (docID) => {
  const doc = ref.doc(docID);
  console.log("Deleting note with id:", doc);
  doc
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
