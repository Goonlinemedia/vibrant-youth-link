import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestoreCollection<T>(collectionName: string, defaultData: T[]): T[] {
  const [data, setData] = useState<T[]>(defaultData);

  useEffect(() => {
    try {
      const q = query(collection(db, collectionName));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const items: T[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as T);
          });
          setData(items);
        } else {
          // Fallback to default static data when the collection is empty
          setData(defaultData);
        }
      }, (error) => {
        console.error(`Firestore onSnapshot error for collection "${collectionName}":`, error);
        setData(defaultData);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error(`Error setting up Firestore listener for "${collectionName}":`, e);
      setData(defaultData);
    }
  }, [collectionName, defaultData]);

  return data;
}
