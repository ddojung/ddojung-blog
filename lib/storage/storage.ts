import firebase from 'firebase/app';
import 'firebase/storage';

// Create a root reference
const storageRef = firebase.storage().ref();

export const fileUpload = async (file: File): Promise<string | null> => {
  try {
    const uploadFile = storageRef.child('blogImage/' + file.name);
    uploadFile.put(file);
    const fileURI: string = await uploadFile.getDownloadURL();

    return fileURI;
  } catch (err) {
    console.log(err);

    return null;
  }
};
