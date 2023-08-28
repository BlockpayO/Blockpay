"use client";
import Link from "next/link";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";
import {  doc, setDoc } from "firebase/firestore"; 
import { app } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState('')
  const [confirm, setConfirm] = useState('')


  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth(app)
    if (password.trim() !== confirm.trim()) {
      console.log('Passwords do not match');
      toast.error('Passwords do not match');
    } else {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      
      // Save additional user details to Firestore using the userId as the document ID
      const db = getFirestore(app);
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        Email: email,

      });

      console.log('registration successful')
      alert('registration successful')
      router.push('/sign-in')
    } catch (error) {
      console.log(error)
    }
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-color mb-8">
          Sign Up
        </h2>

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
                        <button type="submit" className="w-[380px] h-[40px] font-[210px] text-[18px] text-[#f7f7f7] rounded-[16px] bg-[#1856F3]">
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="font-normal text-[14px]">
                Have an Account already? 
                <span className="text-color">
                    <Link href="/sign-in">
                        <button type="button">Login</button>
                    </Link>
                </span>
                </p>
            </div>
            
        </div>
    );
}

export default SignUp;