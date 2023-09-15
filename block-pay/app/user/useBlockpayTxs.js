import useContract from "./useContract";

import connectWallet from "./connect";
import { useEffect, useState } from "react";

const useBlockpayTxs = () => {
  const { provider } = connectWallet();
  const { contract } = useContract();
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (provider) {
      (async () => {
        const signer = await provider.getSigner();
        let signerAddress = signer.address;
        if (contract) {
          const total = Number(
            await contract.getContractsLength(signerAddress)
          );
          const allPayments = [];
          for (let i = 0; i < total; i++) {
            const payments = await contract.getTotalPaymentsBpf(
              signerAddress,
              i
            );
            allPayments.push(payments);
          }
          let allTxs = [];
          for (let i = 0; i < allPayments.length; i++) {
            for (let x = 0; x < allPayments[i].length; x++) {
              allTxs.push(allPayments[i][x]);
            }
          }
          setTxs([...allTxs]);
        }
      })();
    }
  }, [provider]);
  return { txs };
};

export default useBlockpayTxs;
