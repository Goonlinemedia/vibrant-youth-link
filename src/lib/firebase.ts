import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, collection, addDoc, updateDoc, deleteDoc, getDocs, writeBatch } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { BookOpen, FileText, Flame, Compass, HelpCircle } from "lucide-react";

import community from "@/assets/community.jpg";
import word from "@/assets/word.jpg";
import event from "@/assets/event.jpg";

const firebaseConfig = {
  apiKey: "AIzaSyAa26Wkibi0GT4S3DQIng7W0kWcHBdhxSU",
  authDomain: "youth-on-fire-ministry.firebaseapp.com",
  projectId: "youth-on-fire-ministry",
  storageBucket: "youth-on-fire-ministry.firebasestorage.app",
  messagingSenderId: "260520952136",
  appId: "1:260520952136:web:05ef06b8da67283b16337d",
  measurementId: "G-J1Q8LPY2DK"
};

// Initialize Firebase safely for SSR (Server Side Rendering)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics };

// Image and Icon Resolvers
export function resolveImage(img: string): string {
  if (img === "community") return community;
  if (img === "word") return word;
  if (img === "event") return event;
  return img; // Assume it's a dynamic URL or path
}

export function getResourceIcon(iconName: string) {
  switch (iconName) {
    case "BookOpen": return BookOpen;
    case "FileText": return FileText;
    case "Flame": return Flame;
    case "Compass": return Compass;
    default: return HelpCircle;
  }
}

// Database Defaults (Fallback and Seeding)
export const defaultSermons = [
  { t: "When the fire fell", p: "Pastor Daniel", c: "Faith", len: "42m", img: "community" },
  { t: "Designed for purpose", p: "Sarah M.", c: "Purpose", len: "36m", img: "word" },
  { t: "The prayer that moves heaven", p: "Pastor Daniel", c: "Prayer", len: "48m", img: "event" },
  { t: "Dating, waiting, knowing", p: "Joseph K.", c: "Relationships", len: "39m", img: "community" },
  { t: "Lead from the secret place", p: "Sarah M.", c: "Leadership", len: "31m", img: "word" },
  { t: "Faith in the unseen", p: "Pastor Daniel", c: "Faith", len: "44m", img: "event" }
];

export const defaultEvents = [
  { date: "2026-06-14T18:00:00", name: "Carriers Camp 2026", place: "Mountview Retreat", tag: "Camp", featured: true },
  { date: "2026-06-02T19:00:00", name: "Burning Hearts — Prayer Night", place: "Main Auditorium", tag: "Prayer" },
  { date: "2026-06-21T16:00:00", name: "Campus Outreach", place: "City University", tag: "Outreach" },
  { date: "2026-07-09T18:30:00", name: "Worship Encounter", place: "Main Auditorium", tag: "Worship" }
];

export const defaultResources = [
  { t: "Daily Devotionals", d: "A 5-minute morning read to anchor your day in scripture.", tag: "Read", icon: "BookOpen" },
  { t: "Bible Study Guides", d: "Group-ready studies through Romans, John and the Psalms.", tag: "PDF", icon: "FileText" },
  { t: "21-Day Prayer Plan", d: "Three weeks of guided prayer prompts and scripture.", tag: "Plan", icon: "Flame" },
  { t: "Growth Tracks", d: "Step-by-step paths for new believers and emerging leaders.", tag: "Path", icon: "Compass" }
];

export const defaultBooks = [
  { title: "The Pursuit of God", author: "A.W. Tozer" },
  { title: "Forgotten God", author: "Francis Chan" },
  { title: "Mere Christianity", author: "C.S. Lewis" },
  { title: "The Cost of Discipleship", author: "Dietrich Bonhoeffer" }
];

export const defaultRhythms = [
  { day: "Friday", name: "Youth Night", time: "6:30 PM" },
  { day: "Sunday", name: "Main Service", time: "9:00 AM & 11:00 AM" },
  { day: "Wednesday", name: "Prayer & Word", time: "6:00 PM" },
  { day: "Saturday", name: "Small Groups", time: "Various locations" }
];

export const defaultTeam = [
  { name: "Pastor Daniel O.", role: "Youth Pastor" },
  { name: "Sarah M.", role: "Discipleship Lead" },
  { name: "Joseph K.", role: "Worship Lead" }
];

// Firestore CRUD Helpers
export async function addFirestoreDoc(coll: string, data: any) {
  return await addDoc(collection(db, coll), data);
}

export async function updateFirestoreDoc(coll: string, id: string, data: any) {
  // Omit the 'id' field if it is inside the data to avoid updating the document's path ID
  const { id: _, ...cleanData } = data;
  const docRef = doc(db, coll, id);
  return await updateDoc(docRef, cleanData);
}

export async function deleteFirestoreDoc(coll: string, id: string) {
  const docRef = doc(db, coll, id);
  return await deleteDoc(docRef);
}

export async function initializeCollectionWithDefaults(coll: string, defaults: any[]) {
  const colRef = collection(db, coll);
  const snapshot = await getDocs(colRef);
  
  const batch = writeBatch(db);
  // Clear existing items in collection to prevent duplicates
  snapshot.docs.forEach((d) => {
    batch.delete(d.ref);
  });
  
  // Set defaults
  defaults.forEach((item) => {
    const newDocRef = doc(collection(db, coll));
    batch.set(newDocRef, item);
  });
  
  await batch.commit();
}
