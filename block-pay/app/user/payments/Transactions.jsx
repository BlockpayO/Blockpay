import { useState, useEffect } from "react";
import useContract from "../useContract";
import connectWallet from "../connect";

const Transactions = ({ max }) => {
  const [txs, setTxs] = useState([]);
  const { provider } = connectWallet();
  const { contract } = useContract();

  const blockpayTxs = async () => {
    if (!provider) return;
    if (!contract) return;
    const signer = await provider.getSigner();
    let signerAddress = signer.address;
    const total = Number(await contract.getContractsLength(signerAddress));
    const allPayments = [];
    for (let i = 0; i < total; i++) {
      const payments = await contract.getTotalPaymentsBpF(signerAddress, i);
      allPayments.push(payments);
    }
    let allTxs = [];
    let planLength = allPayments.length > max ? max : allPayments.length;

    for (let i = 0; i < planLength; i++) {
      for (let x = 0; x < allPayments[i].length; x++) {
        allTxs.push(allPayments[i][x]);
      }
    }
    let slicedTxs =
      max === "full"
        ? allTxs
        : allTxs.length > max
        ? allTxs.slice(0, max)
        : allTxs;

    setTxs([...slicedTxs]);
    return allTxs;
  };

  useEffect(() => {
    blockpayTxs();
  }, [provider, contract]);

  if (provider && txs.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h3 className="text-gray-500">No transactions to display currently</h3>
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
        </tr>
      </thead>
      <tbody>
        {txs.length > 0 &&
          txs.map((tx) => (
            <tr key={tx["4"]} className="mb-4">
              <td className="text-black">{`${tx["1"]} ${tx["2"]}`}</td>
              <td className="text-black">
                {` $${(Number(tx["0"]) / 10 ** 18).toFixed(3)}`}
              </td>
              <td>{new Date(Number(tx["4"]) * 1000).toLocaleString()}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Transactions;
