import { useState, useEffect, useContext, createContext } from "react";

import { auth, storage, firestore, timestamp } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);

  //SIGNUP FUNCTION TO CREATE A NEW USER

  const signup = async (username, email, password, thumbnail) => {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

    const img = await storage.ref(uploadPath).put(thumbnail);

    const imgURL = await img.ref.getDownloadURL();

    await res.user.updateProfile({
      displayName: username,
      photoURL: imgURL,
    });

    await firestore
      .collection("users")
      .doc(res.user.uid)
      .set({
        email,
        uid: res.user.uid,
        online: true,
        displayName: username,
        photoURL: imgURL,
        createdAt: timestamp.fromDate(new Date()),
      });
  };

  //SIGN IN FUNCTION TO SIGN IN USERS

  const login = async (email, password) => {
    const res = await auth.signInWithEmailAndPassword(email, password);

    await firestore.collection("users").doc(res.user.uid).update({
      online: true,
    });
  };
  const logout = async () => {
    const { uid } = currentUser;
    try {
      await firestore.collection("users").doc(uid).update({
        online: false,
      });
      await auth.signOut();
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    error,
    loading,
    signup,
    login,
    logout,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
