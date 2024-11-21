import axios from "axios";
import { privateInstance } from "./api/client-api";
import { apiUrl } from "@/helpers/shared";

class MessageService {
  async sendMessageUser({
    message,
    chatId,
  }: {
    message: string;
    chatId: string;
  }) {
    try {
      const res = await privateInstance.post("/send_message_user", {
        message,
        chatId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async sendMessageAllUsers({
    caption,
    photo,
  }: {
    caption: string;
    photo?: File;
  }) {
    const formData = new FormData();
    formData.append("caption", caption);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await axios.post(
        `${apiUrl}/send_message_all_user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const messageService = new MessageService();
