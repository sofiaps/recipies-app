import { ref } from 'vue';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { updateDisplayName } from './getUser';

const error = ref(null);
const isPending = ref(false);


const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      await updateProfile(userCredentials.user, { displayName }).then(() => {
        updateDisplayName(displayName);
      });
      error.value = null;
      isPending.value = false;
    })
    .catch((err) => {
      console.log(err);
      error.value = err;
      isPending.value = false;
    });
};

export const useSignUp = () => {
  return { error, isPending, signup };
};
