import { inviteLinkService } from "@/service/invite-link-service";
import React, { FormEvent, useEffect, useState } from "react";

export default function InviteLinkForm() {
  const [data, setData] = useState<{
    inviteLink: string;
  }>();
  const [inviteLink, setInviteLink] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const data = await inviteLinkService.getInviteLink();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!inviteLink) {
        alert("Havola bo'sh bo'lmasligi kerak!");
        return;
      }
      const data = await inviteLinkService.changeInviteLink(inviteLink);
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-[300px] w-full dark:bg-white rounded p-2 text-black border border-black">
      <p className="text-xl font-bold mb-2">Telegram kanal</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-end gap-2">
        <input
          onChange={(e) => setInviteLink(e.target.value)}
          className="w-full border border-black p-2 rounded"
          defaultValue={data?.inviteLink}
          type="text"
        />
        <button type="submit" className=" border px-2 py-1 rounded">
          Change
        </button>
      </form>
    </div>
  );
}
