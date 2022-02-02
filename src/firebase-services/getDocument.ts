import { watchEffect, ref } from 'vue';
import { db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const getDocument = (c, id) => {

  const document = ref(null)
  const error = ref(null)

  const docRef = doc(db, c, id);

  const unsub = onSnapshot(docRef, doc => {
    if(doc.data()) {
      document.value = {...doc.data(), id: doc.id};
      error.value = null;
    }
    else {
      error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    error.value = 'problem fetching the document'
  })

  watchEffect((onUnMount) => {
    onUnMount(() => unsub());
  });

  return { error, document }

}