import { AuthContext } from "@/contexts/auth-context";
import { authService } from "@/service/auth-service";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";

interface FormData {
  username: string;
  password: string;
}

const EditAuthForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const { auth } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (auth?.username) {
      setFormData((prev) => ({ ...prev, username: auth.username }));
    }
  }, [auth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    try {
      if (auth?._id) {
        const data = await authService.changeAuth({
          auth: formData,
          id: auth?._id,
        });
        setSuccessMessage(data.message);
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Server bilan bog'lanishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Ma`lumotlarni tahrirlash</h2>
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-2">
            Foydalanuvchi nomi
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            placeholder="Yangi foydalanuvchi nomi"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">
            Yangi parol
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            placeholder="Yangi parol"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default EditAuthForm;
