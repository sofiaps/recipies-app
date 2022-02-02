import { db } from '@/firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { onUnmounted, ref, watch, watchEffect } from 'vue';
import { getUser } from './getUser';

export const getCollection = (c) => {
  const documents = ref([]);
  const colRef = collection(db, c);
  const { user } = getUser();

  const q = query(colRef, where('userUid', '==', user.value.uid));

  const unsub = onSnapshot(q, (snapshot) => {
    documents.value = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  });

  watchEffect((onInvalidate) => {
    if (!user.value) {
      unsub();
    }
    onInvalidate(() => unsub());
  });

  return { documents };
};
