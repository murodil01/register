import { useState } from "react";
import { useAuth } from "../App";

const Edit = () => {
  const { user, updateUser } = useAuth();
  const [newLogin, setNewLogin] = useState(user?.login || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ ...user, login: newLogin });
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Yangi login"
        className="border p-2 rounded mb-2"
        value={newLogin}
        onChange={(e) => setNewLogin(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-yellow-500 px-4 py-2 text-white rounded"
      >
        Yangilash
      </button>
    </form>
  );
};

export default Edit;
