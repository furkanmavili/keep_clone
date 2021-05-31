import { firebase } from "./initFirebase";

export const storage = firebase.storage();
const db = firebase.firestore();

function getCurrentUser() {
  return firebase.auth().currentUser.uid;
}
export const getNotesRef = (user) => {
  if (!user) return;
  const ref = db.collection(user.uid).orderBy("createdTime", "asc");
  return ref;
};

export const getSingleNote = (docID) => {
  const ref = db.collection(getCurrentUser()).doc(docID);
  return ref;
};

const defaultNote = {
  title: "",
  content: "",
  color: "",
  edited: firebase.firestore.FieldValue.serverTimestamp(),
  createdTime: firebase.firestore.FieldValue.serverTimestamp(),
  photoURL: "",
  isPinned: false,
  isArchived: false,
  isTrashed: false,
  trashDate: "",
  labels: [],
};

export const addNote = async (data) => {
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

// Trash note
export const trashNote = async (docID, data) => {
  const ref = db.collection(getCurrentUser());
  const doc = ref.doc(docID);

  console.log("updating note..");
  const res = await doc.update({
    ...data,
    isTrashed: true,
    trashDate: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return res;
};

// Delete note permanently
export const deleteNote = (docID) => {
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

// Delete notes that are over 7 days old
export const cleanDeletedNotes = () => {
  if (!getCurrentUser()) return;
  // db.collection(getCurrentUser())
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });
};
