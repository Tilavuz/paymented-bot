"use client";
import Modal from "@/components/modal";
import { IUser } from "@/interfaces/user-interface";
import { messageService } from "@/service/message-service";
import { userSirvice } from "@/service/user-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";

export default function Users() {
  const [users, setUsers] = useState<{
    users: IUser[];
    pagination: { totalUsers: number; currentPage: number; totalPages: number };
  } | null>(null);

  const [search, setSearch] = useState<string | undefined>("");
  const [isPaid, setIsPaid] = useState<string | undefined>("");
  const [status, setStatus] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);

  const [caption, setCaption] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const data = await userSirvice.getUsers({
          search,
          isPaid,
          status,
          page,
        });
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [search, isPaid, status, page]);

  const handleClearFilters = () => {
    setSearch("");
    setIsPaid("");
    setStatus("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (users?.pagination?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!caption) {
      alert("Iltimos, caption kiriting!");
      return;
    }

    try {
      const data = await messageService.sendMessageAllUsers({
        caption,
        photo,
      });
      alert(data.message);
      setCaption("");
      setPhoto(undefined);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Habaringizni yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="p-2 relative h-full">
      <Modal
        buttonText={<MdMessage />}
        buttonClassName="border p-3 rounded-full text-xl absolute right-6 top-[50%] bg-green-400 text-white animate-pulse"
      >
        <h4 className="font-bold text-xl mb-4 text-black">
          Barcha foydalanuvchilarga habar yuborish
        </h4>
        <form className="flex flex-col gap-4" onSubmit={handleSendMessage}>
          <input
            type="file"
            className="text-black"
            onChange={handleFileChange}
          />
          <textarea
            className="border border-black text-black outline-none py-1 px-2 h-[300px]"
            placeholder="Habaringizni kiriting..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            type="submit"
            className="border py-2 rounded bg-black font-bold text-white"
          >
            Yuborish
          </button>
        </form>
      </Modal>
      <div className="w-full h-[60px] border rounded-lg mb-12 mt-4 p-2 flex items-center justify-between">
        <div className="h-full flex items-center gap-4 flex-1">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50 border max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Status</option>
            <option value="active">Faol</option>
            <option value="inactive">Nofaol</option>
            <option value="block">Bloklangan</option>
          </select>
          <select
            value={isPaid}
            onChange={(e) => setIsPaid(e.target.value)}
            className="bg-gray-50 border max-w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">To`lov jarayoni</option>
            <option value="paid">Tasdiqlangan</option>
            <option value="deny_paid">Tasdiqlanmagan</option>
            <option value="wait">Kutmoqda</option>
            <option value="not_paid">To`lov qilmagan</option>
          </select>
          <button onClick={handleClearFilters}>Clear</button>
        </div>
        <div className="flex items-center gap-4 px-2">
          <input
            className="border outline-none px-4 py-2 rounded dark:bg-black"
            type="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="border border-black dark:border-white w-full">
        <thead>
          <tr>
            <th className="border border-black dark:border-white w-8">#N</th>
            <th className="border border-black dark:border-white">
              Foydalanuvchi nomi
            </th>
            <th className="border border-black dark:border-white">Statusi</th>
            <th className="border border-black dark:border-white">Chat id</th>
            <th className="border border-black dark:border-white">
              To`lov jarayoni
            </th>
            <th className="border border-black dark:border-white w-12"></th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user, i) => (
            <tr key={user._id}>
              <td className="border border-black dark:border-white text-center">
                {i + 1}
              </td>
              <td className="border border-black dark:border-white text-center">
                {user?.name}
              </td>
              <td
                className={`border border-black dark:border-white text-center ${
                  user?.status === "active" && "bg-blue-400"
                } ${user?.status === "inactive" && "bg-yellow-400"} ${
                  user?.status === "block" && "bg-red-400"
                } text-white font-bold`}
              >
                {user?.status}
              </td>
              <td className="border border-black dark:border-white text-center">
                {user?.chatId}
              </td>
              <td
                className={`border border-black dark:border-white text-center ${
                  user?.isPaid === "paid" && "bg-green-500"
                } ${user?.isPaid === "not_paid" && "bg-inherit"} ${
                  user?.isPaid === "wait" && "bg-yellow-500"
                } ${
                  user?.isPaid === "deny_paid" && "bg-red-500"
                } text-white font-bold`}
              >
                {user?.isPaid === "wait" && "Tekshiruvni kutmoqda"}
                {user?.isPaid === "not_paid" && "To'lov qilmagan"}
                {user?.isPaid === "paid" && "To'lov tasdiqlangan"}
                {user?.isPaid === "deny_paid" && "To'lov tasdiqlanmadi"}
              </td>
              <td className="border border-black dark:border-white">
                <Link
                  className="w-full h-full flex items-center justify-center p-1"
                  href={`users/${user?._id}`}
                >
                  <IoSettingsOutline size={24} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users?.pagination && users.pagination.totalPages >= 2 && (
        <div className="mt-4 flex justify-center gap-4 items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span>
            Page {page} of {users.pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= users.pagination.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
