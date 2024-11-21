import { privateInstance } from "./api/client-api";

class InviteLinkService {
  async getInviteLink() {
    try {
      const res = await privateInstance.get("/settings/invite_link");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async changeInviteLink(inviteLink: string) {
    try {
      const res = await privateInstance.put("/settings/invite_link", {
        inviteLink,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const inviteLinkService = new InviteLinkService();
