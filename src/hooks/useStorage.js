import { useEffect, useState } from "react";
import { addNote, storage, updateNote } from "../firebase/store";
import { useAuth } from "../firebase/auth";

const useStorage = (file, docID) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    // references
    if (!file) return;
    const storageRef = storage.ref(file.name);
    const unsubscribe = storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        if (docID) {
          updateNote(docID, { photoURL: url });
        } else {
          addNote({ photoURL: url });
        }
        setUrl(url);
      }
    );
    return () => unsubscribe();
  }, [file, docID, user.uid]);
  return { progress, error, url };
};

export default useStorage;
