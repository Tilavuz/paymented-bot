"use client"
import Link from "next/link";
import { items } from "./items";
import { usePathname } from "next/navigation";

export default function Aside() {
  const pathname = usePathname()

  return (
    <aside className="max-w-[300px] w-full h-full border-r">
      {items.map((item) => {
        return (
          <div key={item.menu} className="">
            <h5 className="font-bold text-2xl my-4 px-2">{item.menu}</h5>
            <ul className="flex flex-col gap-4">
              {item.datas.map((data) => {
                return (
                  <li key={data.title} className="px-2">
                    <Link
                      className={`flex items-center gap-2 border p-2 rounded-xl ${pathname === data.path ? "border-black dark:border-white" : "border-white dark:border-black"}`}
                      href={data.path}
                    >
                      {data.icon}
                      <span>{data.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
