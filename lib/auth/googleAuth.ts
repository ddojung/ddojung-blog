import firebase from 'firebase/app';
import { auth as googleAuth } from '../../firebase/firebase';

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = async () => {
  try {
    const signInWithPopup = await googleAuth.signInWithPopup(provider);

    return signInWithPopup;
  } catch (err) {
    console.log(err && err.message);

    return null;
  }
};

export const signOut = async () => {
  try {
    await googleAuth.signOut();

    return true;
  } catch (err) {
    console.log(err && err.message);

    return false;
  }
};

export { googleAuth };
