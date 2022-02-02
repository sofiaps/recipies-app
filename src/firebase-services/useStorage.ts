import { ref } from 'vue';
import { storage } from '../firebase/config';
import {
  deleteObject,
  getDownloadURL,
  ref as storageReference,
  uploadBytes,
} from 'firebase/storage';
import { getUser } from './getUser';

const { user } = getUser();

export const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = storageReference(storage, filePath.value);
    return await uploadBytes(storageRef, file)
    .then(async (res) => getDownloadURL(res.ref))
    .then(async (urlString) => url.value = urlString)
    .catch((err) => {
      console.log(err);
      error.value = err;
    });
  };

  const deleteImage = async (path) => {
    const storageRef = storageReference(storage, path);

    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { uploadImage, deleteImage, url, filePath, error };
};
