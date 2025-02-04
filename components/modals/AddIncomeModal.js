import { useRef, useEffect, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";
import Modal from "@/components/Modal";

import { financeContex } from "@/lib/store/finance-contex";
import { authContext } from "@/lib/store/auth-contex";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

export default function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } = useContext(financeContex);
  const { user } = useContext(authContext);

  //Handler Funtions------------------------------------------
  //Handler fucntion for adding a new income to the db
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };
    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  //Handler for deleting previous entrys in the income history
  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------------------

  return (
    <Modal show={show} onClose={onClose}>
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
  );
}
