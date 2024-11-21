import { telegramAdminService } from "@/service/telegram-admin-service";
import { FormEvent, useEffect, useState } from "react";

export default function TelegramAdminForm() {
  const [data, setData] = useState<{
    value: string;
  }>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const data = await telegramAdminService.getTelegramAdmin();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!value) {
        alert("input bo'sh bo'lmasligi kerak");
        return;
      }
      const data = await telegramAdminService.changeTelegramAdmin(value);
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[300px] w-full dark:bg-white rounded p-2 text-black border border-black">
      <p className="text-xl font-bold mb-2">Admin linki</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-black p-2 rounded"
          defaultValue={data?.value}
          type="text"
        />
        <button type="submit" className=" border px-2 py-1 rounded">
          Change
        </button>
      </form>
    </div>
  );
}
