"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useRef, useEffect } from "react";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";
import { Are_You_Serious } from "next/font/google";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 500,
  },
  {
    id: 2,
    title: "Gas",
    color: "#009",
    total: 200,
  },
  {
    id: 3,
    title: "Food",
    color: "#034",
    total: 300,
  },
  {
    id: 4,
    title: "Movies",
    color: "#400",
    total: 30,
  },
];

export default function Home() {
  const [income, setIncome] = useState([]); // UseState for array of income history
  console.log(income);
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false); // UseState to determine if the modal for the add income is shown or not
  const amountRef = useRef(); // Refrence for the amount of income in the add income form
  const descriptionRef = useRef(); // Refrence for the description of the income in the add income form

  //Handler Funtions------------------------------------------
  //Handler fucntion for adding a new income to the db
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

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

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  //Handler for deleting previous entrys in the income history
  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    setIncome((prevState) => {
      return prevState.filter((i) => i.id !== incomeId);
    });
    // Update State

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------------------------------

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

    getIncomeData();
  }, []);

  return (
    <>
      {/* Add Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setshowAddIncomeModal}>
        <form className="flex flex-col gap-4">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              name="amount"
              type="number"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter Income Amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Desciption</label>
            <input
              name="description"
              type="text"
              ref={descriptionRef}
              placeholder="Enter Income Description "
              required
            />
          </div>

          <button
            onClick={(e) => addIncomeHandler(e)}
            type="submit"
            className="btn btn-primary"
          >
            Add entry
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>

          {income.map((i) => {
            return (
              <div className="flex items-center justify-between" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
      <main className="conainer max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000.5)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {}} className="btn btn-primary">
            + Expenses
          </button>
          <button
            onClick={() => setshowAddIncomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((item) => {
              return (
                <ExpenseItem
                  color={item.color}
                  title={item.title}
                  total={item.total}
                  key={item.id}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-3xl">Stats</h3>
          <div className="w-1/2 mx-auto ">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Total",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
