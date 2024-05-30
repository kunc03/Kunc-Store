// firebase/auth/signup.ts
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebase_app from './init';

const signUp = async (email: string, password: string, name: string) => {
  const auth = getAuth(firebase_app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }

    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

export default signUp;
