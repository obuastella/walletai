import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../store/userStore";
import { auth, db } from "../config/firebase";

const useUserData = () => {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      //   console.log("Auth state changed, user:", user?.email || "No user");

      if (user) {
        try {
          setLoading(true);
          setError(null);

          //   console.log("Fetching user data for:", user.email);
          const userRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            // console.log("User data from Firestore:", userData);

            setUser({
              email: user.email || "",
              accountBalance: userData.accountBalance || 0,
            });

            // console.log("User data set in store");
          } else {
            // console.log("No user document found in Firestore");
            setError("User data not found");

            // Still set basic user info even if no document
            setUser({
              email: user.email || "",
              accountBalance: 0,
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No authenticated user");
        // Clear user data when not authenticated
        setUser({
          email: "",
          accountBalance: 0,
        });
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      //   console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, [setUser]);

  return { loading, error };
};

export default useUserData;
