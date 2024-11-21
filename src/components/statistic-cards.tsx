"use client";
import { statisticsService } from "@/service/statistics-service";
import { useEffect, useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { RiUserForbidFill } from "react-icons/ri";

export default function StatisticCards() {
  const [data, setData] = useState<{
    sum: number;
    users: number;
    usersWait: number;
    usersBlock: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await statisticsService.getStatistics();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="border max-w-[300px] max-h-[100px] h-full w-full flex items-end justify-between p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <FaUsersLine size={32} />
          <p className="text-xl">Foydalanuvchilar</p>
        </div>
        <p className="text-xl font-bold">{data?.users}</p>
      </div>
      <div className="border max-w-[300px] max-h-[100px] h-full w-full flex items-end justify-between p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <FaMoneyBillTrendUp size={32} />
          <p className="text-xl">Mablag`</p>
        </div>
        <p className="text-xl font-bold">{data?.sum} so`m</p>
      </div>
      <div className="border max-w-[300px] max-h-[100px] h-full w-full flex items-end justify-between p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <RiUserForbidFill size={32} />
          <p className="text-xl">Bloklanganlar</p>
        </div>
        <p className="text-xl font-bold">{data?.usersBlock}</p>
      </div>
      <div className="border max-w-[300px] max-h-[100px] h-full w-full flex items-end justify-between p-4 rounded-xl">
        <div className="flex flex-col gap-2">
          <IoTimeSharp size={32} />
          <p className="text-xl">Tekshirish kerak</p>
        </div>
        <p className="text-xl font-bold">{data?.usersWait}</p>
      </div>
    </div>
  );
}
