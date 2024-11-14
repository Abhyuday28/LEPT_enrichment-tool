import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

const FirestoreTest = () => {
  const addTestDocument = async () => {
    try {
      await addDoc(collection(db, "testCollection"), {
        name: "Test Document",
        timestamp: new Date(),
      });
      console.log("Document written successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <button onClick={addTestDocument} className="py-1 px-3 bg-indigo-800 hover:bg-indigo-700 text-white rounded">
        Add
      </button>
    </div>
  );
};

export default FirestoreTest;
