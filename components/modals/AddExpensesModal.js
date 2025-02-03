import Modal from "@/components/Modal";
import { useContext, useState } from "react";
import { financeContex } from "@/lib/store/finance-contex";
import { v4 as uuidv4 } from "uuid";

export default function AddExpesesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCat, setSeletedCat] = useState(null);

  const { expenses } = useContext(financeContex);

  const addExpenseItemHandler = () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCat;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };
    console.log(newExpense);
    setExpenseAmount("");
    setSeletedCat(null);
    //onClose(); // Do this if you want the modal to close after adding an expense
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="amountInput">Enter An Amount...</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter Expense Amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
          name="amountInput"
          required
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl capitalize">Select Expense Category</h3>
          {expenses.map((expense) => {
            return (
              <button
                onClick={() => {
                  setSeletedCat(expense.id);
                }}
                key={expense.id}
              >
                <div
                  style={{
                    boxShadow: expense.id === selectedCat && "1px 1px 8px",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    {/* Colored circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize ">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {expenseAmount > 0 && selectedCat && (
        <div className="mt-6 ">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}
