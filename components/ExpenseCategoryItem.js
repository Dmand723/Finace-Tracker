import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";

import ViewExpenseModal from "@/components/modals/VeiwExpenseModal";

export default function ExpenseItem({ expense }) {
  const [showVeiwExpenseModal, setShowVeiwExpenseModal] = useState(false); // UseState to determine if the modal for the veiw expense income is shown or not

  return (
    <>
      <ViewExpenseModal
        show={showVeiwExpenseModal}
        onClose={setShowVeiwExpenseModal}
        expense={expense}
      />
      <button
        onClick={() => {
          setShowVeiwExpenseModal(true);
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: expense.color }}
            />
            <h4 className="capitalize">{expense.title}</h4>
          </div>
          <p>{currencyFormatter(expense.total)}</p>
        </div>
      </button>
    </>
  );
}
