// firebase/auth/signOut.ts
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';

const signOut = async () => {
  const auth = getAuth();

  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export default signOut;
