"use client";
import { IoMdClose } from "react-icons/io";
import { ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
  buttonText: ReactNode;
  buttonClassName: string;
}

export default function Modal({
  children,
  buttonText,
  buttonClassName,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <button type="button" className={buttonClassName} onClick={openModal}>
        {buttonText}
      </button>
      {isOpen && (
        <div
          className="fixed w-screen h-screen bg-black/60 flex items-center justify-center top-0 left-0 z-50"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[600px] bg-white p-4 rounded-xl w-full"
          >
            <div className="flex items-center justify-end">
              <button className="border p-2" onClick={closeModal}>
                <IoMdClose />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
