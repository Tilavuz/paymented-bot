import { amountService } from "@/service/amount-service";
import { FormEvent, useEffect, useState } from "react";

export default function AmountForm() {
  const [amount, setAmount] = useState<{
    value: number;
    unit: "zero" | "K" | "M" | "B";
  }>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const data = await amountService.getAmount();
        setAmount(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!value) {
        alert("Obuna narxi bo'sh bo'lmasligi kerak");
        return;
      }
      const data = await amountService.changeAmount(parseInt(value, 10));
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[300px] w-full dark:bg-white rounded p-2 text-black border border-black">
      <p className="text-xl font-bold mb-2">Obuna narxi</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-black p-2 rounded"
          defaultValue={amount?.value}
          type="number"
        />
        <button type="submit" className=" border px-2 py-1 rounded">
          Change
        </button>
      </form>
    </div>
  );
}
