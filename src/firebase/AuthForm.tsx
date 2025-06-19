"use client";
import { useState, FormEvent } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuth } from "./AuthContext";


const AuthForm = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-m h-xl mx-auto p-4 border rounded shadow">
      {user ? (
        <>
          <p className="mb-4">Logged in as {user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl text-center mb-4">
            {isLogin ? (
              <div>
                  <h1 className="text-3xl font-bold">Login to Propriologics</h1>
                  <h3 className="text-sm">Welcome back! Please enter your details.</h3>
                </div> 
              ) : (
                <div>
                  <h1 className="text-3xl font-bold">Sign up for Propriologics</h1>
                  <h3 className="text-sm">Create a free account or login</h3>
                </div>
              )}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-blue-500 underline"
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </>
      )}
    </div>
  );
};

export default AuthForm;
