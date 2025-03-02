import { useState } from "react";
import { useAuth } from "../App";

const Add = () => {
  const { addItem } = useAuth();
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleAdd} className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Yangi ma'lumot"
        className="border p-2 rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 text-white rounded"
      >
        Qo'shish
      </button>
    </form>
  );
};

export default Add;
