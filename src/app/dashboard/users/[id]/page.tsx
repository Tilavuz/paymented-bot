"use client";
import { serverUrl } from "@/helpers/shared";
import { IPayment } from "@/interfaces/payment-interface";
import { IUser } from "@/interfaces/user-interface";
import { messageService } from "@/service/message-service";
import { userSirvice } from "@/service/user-service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import SendPhotoModal from "../_components/send-photo-modal";
import Modal from "../_components/modal";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [user, setUser] = useState<{
    user: IUser;
    payments: IPayment[];
  } | null>(null);

  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const sendMessageUser = async () => {
    try {
      if (!message) {
        alert("Inputni to'ldiring!");
        return;
      }
      if (!user?.user?.chatId) {
        alert("Foydalanuvchi topilmadi!");
        return;
      }
      const data = await messageService.sendMessageUser({
        chatId: user?.user?.chatId,
        message: message,
      });
      setMessage("");
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error! Habar yuborilmadi");
    }
  };

  useEffect(() => {
    (async () => {
      const { id } = await params;
      const data = await userSirvice.getUser(id);
      setSelectedStatus(data?.user?.status);
      setUser(data);
    })();
  }, [params]);

  const updateUserStatus = async () => {
    try {
      if (!selectedStatus) {
        alert("Holatni tanlang!");
        return;
      }
      if (!user?.user?._id) {
        alert("Foydalanuvchi topilmadi!");
        return;
      }

      const updatedUser = await userSirvice.changeUser({
        id: user?.user?._id,
        status: selectedStatus,
      });
      console.log(updatedUser);
      alert("Foydalanuvchi holati yangilandi!");
    } catch (error) {
      console.error(error);
      alert("Error! Holat yangilanmadi.");
    }
  };

  return (
    <div className="p-2 h-full flex items-start gap-2">
      {user && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUserStatus();
            }}
            className="border max-w-[500px] w-full h-full flex flex-col gap-4 p-4 bg-black/10"
          >
            <input
              className="border w-full px-2 py-1 rounded dark:border-white bg-white dark:bg-black cursor-not-allowed"
              type="text"
              value={user?.user?.name}
              disabled
            />
            <input
              className="border w-full px-2 py-1 rounded dark:border-white bg-white dark:bg-black cursor-not-allowed"
              type="text"
              value={user?.user?.chatId}
              disabled
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none select-none"
            >
              <option value="active">Active</option>
              <option value="block">Block</option>
              <option value="inactive" disabled>
                Inactive
              </option>
            </select>

            <button
              type="submit"
              className="border border-white bg-white dark:bg-black py-2 rounded"
            >
              Saqlash
            </button>
          </form>
          <div className="w-full h-full mx-auto flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-yellow-100/80 via-green-100/80 to-green-200/80 p-4 overflow-y-auto">
              <div className="max-h-[750px] overflow-y-auto flex flex-col gap-4 items-start">
                {user?.payments?.map((payment) => {
                  return (
                    <div
                      key={payment._id}
                      className="bg-blue-500/50 p-2 rounded flex flex-col gap-2"
                    >
                      <Modal id={payment?._id}>
                        <Link
                          href={`${serverUrl}${payment.screenshotUrl}`}
                          target="_blank"
                          className="cursor-pointer"
                        >
                          <Image
                            src={`${serverUrl}${payment.screenshotUrl}`}
                            alt="Image"
                            width={250}
                            height={400}
                          />
                        </Link>
                      </Modal>
                      <p>{payment?.amount} so`m</p>
                      <p
                        className={`${
                          payment?.isApproved ? "bg-green-500" : "bg-red-500"
                        } p-2 rounded font-bold`}
                      >
                        {payment?.isApproved
                          ? "Tasdiqlangan"
                          : "Tasdiqlanmagan"}
                      </p>
                      <p>{`${new Date(payment.createdAt).getDate()}.${
                        new Date(payment.createdAt).getMonth() + 1
                      }.${new Date(
                        payment.createdAt
                      ).getFullYear()} / ${new Date(
                        payment.createdAt
                      ).getHours()}:${new Date(
                        payment.createdAt
                      ).getMinutes()}`}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <input
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleOpenModal();
                        setPhoto(e.target.files[0]);
                      } else {
                        console.log("No file selected");
                      }
                    }}
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <button
                  onClick={sendMessageUser}
                  className="p-2 text-black rounded-full hover:bg-gray-100"
                >
                  <IoIosSend size={28} />
                </button>
              </div>
            </div>
          </div>
          {photo && isModalOpen && (
            <SendPhotoModal
              photo={photo}
              handleCloseModal={handleCloseModal}
              chatId={user?.user.chatId ?? ""}
            />
          )}
        </>
      )}
    </div>
  );
}
