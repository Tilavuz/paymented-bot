"use client";
import Aside from "@/components/common/aside/aside";
import Header from "@/components/common/header/header";
import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!auth) {
    router.push("/");
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 items-start">
        <Aside />
        <section className="flex-1 h-full overflow-y-auto">{children}</section>
      </div>
    </>
  );
}
