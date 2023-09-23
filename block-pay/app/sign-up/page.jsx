"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { backarrow } from "@/public/assets/images";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  function generateRandomId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    if (password.trim() !== confirm.trim()) {
      console.log("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const randomId = generateRandomId(6);
      const db = getFirestore(app);
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        Email: email,
        generatedId: randomId,
      });

      console.log("Registration successful");
      toast.success("Registration successful");
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Ensure that loading is set to false even in case of an error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
              <p className="ml-2 text-sm text-color">Back</p>
            </div>
          </Link>
        </div>
        <h2 className="text-2xl font-semibold text-center text-color mb-8">
          Sign Up
        </h2>

        {loading ? (
          <p className="text-center text-blue-500">Registering...</p>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <input
                type="email"
                placeholder="E-mail Address"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <input
                type="password"
                placeholder="Create Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
                name="confirm-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <div className="justify-center items-center mb-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="justify-center items-center mt-5">
              <p className="font-normal text-[14px]">
                Have an account already?{" "}
                <span className="text-color">
                  <Link href="/sign-in">
                    <button type="button">Login</button>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
