import Modal from "@/components/Modal";

export default function ViewExpenseModal({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose}>
      <h3>Expense Detail View</h3>
    </Modal>
  );
}
