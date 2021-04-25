import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
  isPinned: false,
  isArchived: false,
  labels: [],
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
