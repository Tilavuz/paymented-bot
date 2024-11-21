"use client";
import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useRef } from "react";

export default function Page() {
  const { auth, loading } = useContext(AuthContext);
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (auth?._id && !loading) {
      router.push("/dashboard");
      return;
    }
  }, [router, auth?._id, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please fill out both fields");
      return;
    }

    await login({ username, password });
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-2 w-full max-w-[600px] min-h-[200px] dark:bg-white rounded dark:text-black flex flex-col gap-2 shadow-md dark:shadow-white border"
      >
        <label className="font-bold text-2xl">Kirish</label>
        <input
          ref={usernameRef}
          className="border p-2 rounded outline-none"
          type="text"
          placeholder="username"
        />
        <input
          ref={passwordRef}
          className="border p-2 rounded outline-none"
          type="password"
          placeholder="********"
        />
        <button className="border p-2 ml-auto max-w-[160px] w-full rounded font-bold bg-black text-white">
          Kirish
        </button>
      </form>
    </main>
  );
}
