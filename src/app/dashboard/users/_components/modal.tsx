import { paymentService } from "@/service/payment-service";
import React, { ReactNode, useState } from "react";
import { FaCheckDouble } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Modal = ({ children, id }: { children: ReactNode; id: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setModalPosition({ top: event.clientY, left: event.clientX });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(error);

  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await paymentService.approvePayment(id);
      alert("Check tasdiqlandi!");
      console.log("Payment approved:", result);
    } catch (error) {
      console.error(error);
      setError("Failed to approve payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await paymentService.denyPayment(id);
      alert("Check rad etildi!");
      console.log("Payment denied:", result);
    } catch (error) {
      console.error(error);
      setError("Failed to deny payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await paymentService.deletePayment(id);
      alert("Check o'chirildi");
      console.log("Payment deleted:", result);
    } catch (error) {
      console.error(error);
      setError("Failed to delete payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onContextMenu={handleContextMenu} className="text-black">
      <div className="">{children}</div>
      {isModalVisible && (
        <div
          className="absolute w-screen h-screen top-0 left-0"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: modalPosition.top,
              left: modalPosition.left,
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            className="p-2"
          >
            <div className="space-y-2 w-[150px] p-2">
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaCheckDouble size={18} />
                {loading ? "Loading..." : "Tasdiqlash"}
              </button>
              <button
                onClick={handleDeny}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MdClose size={18} />
                {loading ? "Loading..." : "Rad etish"}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MdDeleteForever size={18} />
                {loading ? "Loading..." : "O`chirish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
