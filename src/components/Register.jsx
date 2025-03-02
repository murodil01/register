import { useState } from "react";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    register({ login: loginName });
    navigate("/");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col items-center mt-10"
    >
      <input
        type="text"
        placeholder="Login"
        className="border p-2 rounded mb-2"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-500 px-4 py-2 text-white rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
