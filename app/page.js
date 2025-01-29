"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      <Modal show={modalIsOpen} onClose={setModalIsOpen}>
        <h3>Hello Modal</h3>
      </Modal>
      <main className="conainer max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000.5)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button className="btn btn-primary-outline">+ Income</button>
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
