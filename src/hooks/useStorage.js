import { useContext, useEffect, useState } from "react";
import { addNote, storage, updateNote } from "../firebase";
import { UserContext } from "../providers/UserProvider";

const useStorage = (file, docID) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const user = useContext(UserContext);
  useEffect(() => {
    // references
    if (!file) return;
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on(
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
          addNote({ owner: user.uid, photoURL: url });
        }
        setUrl(url);
      }
    );
  }, [file, docID, user.uid]);
  return { progress, error, url };
};

export default useStorage;
