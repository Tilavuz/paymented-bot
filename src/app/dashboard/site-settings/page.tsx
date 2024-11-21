"use client";
import AmountForm from "@/app/dashboard/site-settings/_components/amount-form";
import InviteLinkForm from "./_components/invite-link-form";
import TelegramAdminForm from "./_components/telegram-admin";

export default function Page() {
  return (
    <div className="p-4 flex gap-4">
      <AmountForm />
      <InviteLinkForm />
      <TelegramAdminForm />
    </div>
  );
}
