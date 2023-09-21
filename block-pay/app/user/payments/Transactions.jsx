import { useState, useEffect } from "react";
import useContract from "../useContract";
import connectWallet from "../connect";
import { getFirestore, query, collection, onSnapshot, where } from "firebase/firestore";
import { Spinner, Flex } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Transactions = () => {
  const [txs, setTxs] = useState([]);
  const { provider } = connectWallet();
  const { contract } = useContract();
  const [transactions, setTransactions] = useState([])

  const router = useRouter();

  

  
  const listenToTransactionsByUser = (userId, callback) => {
    try {
      // Create a reference to the Firestore database
      const db = getFirestore(app);
  
      // Create a query to fetch payment plans created by the specific user
      const paymentPlanQuery = query(
        collection(db, "paymentPlans"),
        where("creatorId", "==", userId)
      );
  
      // Listen for changes in the payment plans
      const unsubscribe = onSnapshot(paymentPlanQuery, (paymentPlanSnapshot) => {
        const transactions = [];
  
        // Iterate through the payment plans created by the user
        paymentPlanSnapshot.forEach((paymentPlanDoc) => {
          // Get the reference to the "transactions" subcollection within the payment plan
          const transactionsCollectionRef = collection(paymentPlanDoc.ref, "transactions");
  
          // Listen for changes in the transactions subcollection
          const transactionUnsubscribe = onSnapshot(transactionsCollectionRef, (transactionsSnapshot) => {
            transactionsSnapshot.forEach((transactionDoc) => {
              transactions.push(transactionDoc.data());
            });
  
            // Invoke the callback function with the updated transactions
            callback(transactions);
          });
  
          // Store the unsubscribe function for the transactions subcollection
          // This will be used to stop listening when no longer needed
          paymentPlanDoc.data().transactionUnsubscribe = transactionUnsubscribe;
        });
  
        // Invoke the callback function with the initial transactions
        callback(transactions);
      });
  
      // Return the unsubscribe function for the payment plans
      return () => {
        unsubscribe();
  
        // Unsubscribe from transaction listeners within payment plans
        paymentPlanQuerySnapshot.forEach((paymentPlanDoc) => {
          const transactionUnsubscribe = paymentPlanDoc.data().transactionUnsubscribe;
          if (transactionUnsubscribe) {
            transactionUnsubscribe();
          }
        });
      };
    } catch (error) {
      console.error("Error listening to transactions by user:", error);
      throw error;
    }
  };
  
 

  
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        listenToTransactionsByUser(user.uid, (transactions) => {
          console.log("Transactions for the user:", transactions);
          setTransactions(transactions)
        });
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const formatTransactionHash = (hash, length = 10) => {
    if (hash && hash.length > length) {
      const prefix = hash.slice(0, length / 2);
      const suffix = hash.slice(-length / 2);
      return `${prefix}...${suffix}`;
    }
    return hash;
  };



  if (provider && transactions.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h3 className="text-gray-300">No transactions to display currently</h3>
      </div>
    );
  }



  return (
    <table className=" mb-2 md:mb-4 w-[100%]">
      <thead>
        <tr className=" text-[#727272] font-bold text-sm mb-1">
          <th className="text-left w-[39%]">Name</th>
          <th className="text-left w-[30%]">Amount</th>
          <th className="text-left w-[30%]">Date</th>
          <th className="text-left w-[30%]">Tx Hash</th>
        </tr>
      </thead>
      <tbody>
       {transactions.map((tx, index)=>{
        return(
          <tr key={index}>
            <td>{`${tx.firstName} ${tx.lastName}`}</td>
            <td>{tx?.amount}</td>
            <td> {new Date(tx.timestamp.seconds * 1000).toLocaleString()}</td>
            <td><Link href={`https://mumbai.polygonscan.com/tx/${tx.transactionHash}`}>{formatTransactionHash(tx.transactionHash)}</Link></td>
          </tr>
        )
       })}
      </tbody>
    </table>
  );
};

export default Transactions;
