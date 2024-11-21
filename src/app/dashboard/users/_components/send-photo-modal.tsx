import { apiUrl } from "@/helpers/shared";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SendPhotoModal({
  photo,
  handleCloseModal,
  chatId,
}: {
  photo: File;
  handleCloseModal: () => void;
  chatId: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (photo) {
      const url = URL.createObjectURL(photo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photo]);

  const [caption, setCaption] = useState<string>("");

  const sendPhoto = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/send_photo_user`,
        { photo, caption, chatId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      alert(res.data.message);
    } catch (error) {
      alert("Rasm yuborilmadi");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-black">Send an image</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="w-full p-2 border rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500">
            {previewUrl ? (
              <div className="w-full max-h-[400px] overflow-hidden p-2 border rounded">
                <Image
                  src={previewUrl}
                  alt="Selected Image"
                  layout="responsive"
                  width={250}
                  height={200}
                  className="rounded object-cover w-full h-full object-center"
                />
              </div>
            ) : (
              <p>Loading preview...</p>
            )}
          </div>
          <input
            type="text"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            placeholder="Caption"
            className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={sendPhoto}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
