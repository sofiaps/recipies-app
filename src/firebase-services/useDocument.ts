import { ref } from 'vue';
import { db } from '@/firebase/config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const error = ref(null);
const isPending = ref(false);

export const useDocument = (c, id) => {
  error.value = null;
  isPending.value = true;

  const docRef = doc(db, c, id);

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      await updateDoc(docRef, updates);
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not update the document';
    }
  };

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    try {
      await deleteDoc(docRef);
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not delete the document';
    }
  };

  return { error, isPending, updateDocument, deleteDocument };
};
