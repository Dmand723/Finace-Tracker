"use client";

import { createContext, useState, useEffect } from "react";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const financeContex = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContexProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    setIncome((prevState) => {
      return prevState.filter((i) => i.id !== incomeId);
    });
    // Update State

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const values = { income, expenses, addIncomeItem, removeIncomeItem };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(), //Get remander of the feilds
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });

      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const docSnap = await getDocs(collectionRef);

      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, []);

  return (
    <financeContex.Provider value={values}>{children}</financeContex.Provider>
  );
}
