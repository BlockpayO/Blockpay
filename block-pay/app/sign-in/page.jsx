"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { backarrow } from "@/public/assets/images";
import {app} from '../../firebase/firebase'
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";




const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

<<<<<<< HEAD
const [loading, setLoading] = useState(false); // Loading state
=======
  const [loading, setLoading] = useState(false);
>>>>>>> 9ee26ee4e285db50955f761c5ffaa35e642cd0fd


  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
  const auth = getAuth(app)
  
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    console.log(user);
    toast.success("login successful");
    router.push('/user/dashboard')
  } catch (error) {
    console.log(error)
    if (error.code === 'auth/user-not-found') {
      console.log('User not found. ');
      toast.error('user not found')
    } else if (error.code === 'auth/wrong-password') {
      toast.error('Incorrect password')
    }else{
      toast.error(error.message)
=======

    const auth = getAuth(app);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);
      toast.success("login successful");
      router.push("/user/dashboard");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        console.log("User not found. ");
        toast.error("user not found");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
>>>>>>> 9ee26ee4e285db50955f761c5ffaa35e642cd0fd
    }
  
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Link href="/sign-up">
            <div className="flex items-center cursor-pointer">
              <Image src={backarrow} alt="backarrow" className="w-6 h-6" />
              <p className="ml-2 text-sm text-color">Back</p>
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center text-color mb-8">
          Login
        </h2>

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="E-mail"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
          />

          <button
              type="submit"
              className="w-full py-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

            <div>
              <Image src={""} alt="check button"/>
              <p className="font-normal text-xs">Forgot Password?</p>
            </div>          
        </form>
=======
        {loading ? (
          <p className="text-center text-blue-500">Logging In...</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="E-mail Or Username"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
              />

              <button
                type="submit"
                className="w-full py-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </>
        )}
>>>>>>> 9ee26ee4e285db50955f761c5ffaa35e642cd0fd
      </div>
    </div>
  );
};

export default SignIn;