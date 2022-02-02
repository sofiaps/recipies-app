import { ref } from 'vue';
import { db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const error = ref(null);
const isPending = ref(false);


export const useCollection = (c) => {
  error.value = null;
  isPending.value = true;

  const addDocument = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const colRef = collection(db, c);
      const res = await addDoc(colRef, doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = 'could not send the message';
      isPending.value = false;
    }
  };

  return { error, isPending, addDocument };
};

