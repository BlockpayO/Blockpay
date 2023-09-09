import { useEffect, useState } from "react";
import connectWallet from "./connect";
import { ethers } from "ethers";
import {
  blockpayFactoryContractAddress,
  blockpayFactoryContractABI,
} from "@/constants";

const setContract = () => {
  const { provider } = connectWallet();
  const [contract, setContract] = useState();
  useEffect(() => {
    if (provider) {
      (async () => {
        const signer = await provider.getSigner();
        setContract(
          new ethers.Contract(
            blockpayFactoryContractAddress,
            blockpayFactoryContractABI,
            signer
          )
        );
      })();
    }
  }, [provider]);

  return { contract };
};

export default setContract;
