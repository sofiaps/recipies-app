import { ref } from 'vue';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(auth.currentUser);
const displayName = ref(null);

onAuthStateChanged(auth, (_user) => {
  user.value = _user;
  displayName.value = _user?.displayName;
});

export const updateDisplayName = (name) => {
  displayName.value = name;
};

export const getUser = () => {
  return { user, displayName };
};
