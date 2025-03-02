import React, { createContext, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Add from "./components/Add";
import Edit from "./components/Edit";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateUser, items, addItem }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/add" className="mr-4">
          Add
        </Link>
        <Link to="/edit" className="mr-4">
          Edit
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">👤 {user.login}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <Add />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
