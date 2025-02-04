"use client";

import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpesesModal from "@/components/modals/AddExpensesModal";
import ViewExpenseModal from "@/components/modals/VeiwExpenseModal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useContext, use, useEffect } from "react";
import { financeContex } from "@/lib/store/finance-contex";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false); // UseState to determine if the modal for the add income is shown or not
  const [showAddExpensesModal, setshowAddExpensesModal] = useState(false); // UseState to determine if the modal for the add expense income is shown or not

  const [balance, setBalance] = useState(0);

  const { expenses, income } = useContext(financeContex); // pulling the expenses documents from the finaceContex file pulling it from the db

  useEffect(() => {
    const newBalance = income.reduce((total, i) => {
      return total + i.amount;
    }, 0);
    -expenses.reduce((total, e) => {
      return total + e.total;
    }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setshowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpesesModal
        show={showAddExpensesModal}
        onClose={setshowAddExpensesModal}
      />

      <main className="conainer max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setshowAddExpensesModal(true);
            }}
            className="btn btn-primary"
          >
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
            {expenses.map((expense) => {
              return <ExpenseItem expense={expense} key={expense.id} />;
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-3xl">Stats</h3>
          <div className="w-1/2 mx-auto ">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Total",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: expenses.length > 1 ? 5 : 0, // added so if there is only one expense the broder is gone so there is not a space
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
