import { useState, useEffect } from "react";
import useContract from "../useContract";
import connectWallet from "../connect";
import useBlockpayTxs from "../useBlockpayTxs";

const Transactions = () => {
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
    for (let i = 0; i < allPayments.length; i++) {
      for (let x = 0; x < allPayments[i].length; x++) {
        allTxs.push(allPayments[i][x]);
      }
    }
    setTxs([...allTxs]);
    return allTxs;
  };
  return (
    <table className=" mb-2 md:mb-4 w-[100%]">
      <tr className=" text-[#727272] font-bold text-sm mb-1">
        <th className="text-left w-[33%]">Name</th>
        <th className="text-left w-[33%]">Amount</th>
        <th className="text-left w-[33%]">Date</th>
      </tr>
      {!(async () => await blockpayTxs())() && <p>Loading</p>}

      {(async () => await blockpayTxs())() &&
        txs.map((tx) => (
          <tr key={tx["4"]} className="mb-4">
            <td className="text-black">{`${tx["1"]} ${tx["2"]}`}</td>
            <td className="text-black">
              {` $${(Number(tx["0"]) / 10 ** 18).toFixed(3)}`}
            </td>
            <td>{new Date(Number(tx["4"]) * 1000).toLocaleString()}</td>
          </tr>
        ))}
    </table>
  );
};

export default Transactions;
