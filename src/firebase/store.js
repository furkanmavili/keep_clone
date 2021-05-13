import { firebase } from "./initFirebase";

export const storage = firebase.storage();
const db = firebase.firestore();

function getCurrentUser() {
  return firebase.auth().currentUser.uid;
}
export const getNotesRef = (user) => {
  if (!user) return;
  console.log(getCurrentUser());
  const ref = db.collection(user.uid);
  return ref;
};

const defaultNote = {
  title: "",
  content: "",
  color: "",
  edited: firebase.firestore.FieldValue.serverTimestamp(),
  photoURL: "",
  isPinned: false,
  isArchived: false,
  isTrashed: false,
  labels: [],
};

export const addNote = async (data) => {
  console.log(getCurrentUser());
  const ref = db.collection(getCurrentUser());
  console.log("adding new note...");
  const res = await ref.add({
    ...defaultNote,
    ...data,
  });
  return res;
};

// Updating note
export const updateNote = async (docID, data) => {
  const ref = db.collection(getCurrentUser());
  const doc = ref.doc(docID);
  console.log("updating note..");
  const res = await doc.update({
    ...data,
    edited: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return res;
};

// Deleting note
export const deleteNote = async (docID) => {
  const ref = db.collection(getCurrentUser());
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