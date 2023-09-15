import { useState, useEffect, useContext } from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import trustModule from "@web3-onboard/trust";
import ProviderContext from "./context/ProviderContext";
import { ethers } from "ethers";
import setContract from "./useContract";

const HELP = `<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 704.01 159.42">
<defs>
  <style>
    .cls-1 {
      fill: #1856f3;
    }
  </style>
</defs>
<g id="Layer_1-2" data-name="Layer 1">
  <path class="cls-1" d="M38.29,50.39h1.34c16.54,0,32.01,7.41,42.43,20.32,10.41,12.89,14.35,29.73,10.79,46.19-5.31,24.64-28.24,42.52-54.51,42.52H2.31L0,121.55H39.63c9.18,0,16.65-7.47,16.65-16.65s-7.47-16.64-16.65-16.64H.41V0H38.29V50.39Zm-24.81,24.81h26.16c16.38,0,29.71,13.33,29.71,29.7s-13.33,29.71-29.71,29.71H13.89l.72,11.74h23.74c20.16,0,37.72-13.55,41.75-32.22,2.72-12.58-.27-25.42-8.19-35.23-7.93-9.83-19.7-15.46-32.27-15.46h-14.41V13.06H13.47v62.14Z"/>
  <g>
    <path class="cls-1" d="M172.92,74.8c5.25,3.76,7.87,9.09,7.87,15.99,0,5.09-1.41,9.2-4.23,12.34s-6.82,5.17-11.99,6.11c6.11,.78,10.83,2.74,14.16,5.88,3.33,3.13,4.99,7.52,4.99,13.16,0,7.21-2.74,12.87-8.22,16.98-5.49,4.11-13.24,6.17-23.27,6.17h-32.79V69.16h31.26c9.56,0,16.96,1.88,22.21,5.64Zm-21.74,28.2c3.76,0,6.7-.9,8.81-2.7s3.17-4.23,3.17-7.29-1.06-5.48-3.17-7.28c-2.11-1.8-5.05-2.7-8.81-2.7h-14.1v19.98h14.1Zm1.18,34.44c4.23,0,7.5-.9,9.81-2.7,2.31-1.8,3.47-4.31,3.47-7.52s-1.17-5.97-3.53-7.81c-2.35-1.84-5.6-2.76-9.75-2.76h-15.28v20.8h15.28Z"/>
    <path class="cls-1" d="M195.35,69.16h17.63v67.1h32.67v15.16h-50.3V69.16Z"/>
    <path class="cls-1" d="M307.69,146.73c-6.19,3.61-13.24,5.41-21.15,5.41s-14.96-1.8-21.15-5.41c-6.19-3.61-11.01-8.6-14.45-14.98-3.45-6.39-5.17-13.53-5.17-21.45s1.72-15.06,5.17-21.45c3.44-6.39,8.26-11.38,14.45-14.98,6.19-3.61,13.24-5.41,21.15-5.41s14.96,1.8,21.15,5.41c6.19,3.6,11.01,8.6,14.46,14.98,3.45,6.38,5.17,13.53,5.17,21.45s-1.73,15.06-5.17,21.45c-3.45,6.38-8.26,11.38-14.46,14.98Zm-33.14-12.99c3.45,2.31,7.44,3.47,11.99,3.47s8.42-1.15,11.87-3.47c3.45-2.31,6.11-5.5,7.99-9.58,1.88-4.07,2.82-8.7,2.82-13.87s-.94-9.79-2.82-13.86c-1.88-4.08-4.54-7.27-7.99-9.58s-7.4-3.47-11.87-3.47-8.54,1.15-11.99,3.47c-3.45,2.31-6.11,5.5-7.99,9.58-1.88,4.07-2.82,8.7-2.82,13.86s.94,9.79,2.82,13.87c1.88,4.07,4.54,7.27,7.99,9.58Z"/>
    <path class="cls-1" d="M353.57,73.63c6.07-3.45,13.22-5.17,21.45-5.17,6.43,0,12.19,1.25,17.28,3.76,5.09,2.51,9.21,6.03,12.34,10.58,3.13,4.54,5.01,9.79,5.64,15.75h-17.63c-1.02-4.7-3.15-8.4-6.4-11.11-3.25-2.7-7.31-4.05-12.17-4.05-6.58,0-11.79,2.47-15.63,7.41-3.84,4.93-5.76,11.44-5.76,19.51s1.92,14.47,5.76,19.45c3.84,4.97,9.05,7.46,15.63,7.46,4.86,0,8.91-1.35,12.17-4.05,3.25-2.7,5.38-6.4,6.4-11.1h17.63c-.63,5.95-2.51,11.2-5.64,15.75-3.13,4.54-7.25,8.07-12.34,10.58-5.09,2.51-10.85,3.76-17.28,3.76-8.22,0-15.38-1.73-21.45-5.17-6.07-3.45-10.73-8.32-13.99-14.63-3.25-6.31-4.88-13.65-4.88-22.04s1.63-15.73,4.88-22.03c3.25-6.31,7.91-11.19,13.99-14.63Z"/>
    <path class="cls-1" d="M438.1,69.28v36.9l32.91-36.9h21.39l-30.2,33.85,32.2,48.3h-21.15l-23.5-34.67-11.63,13.04v21.62h-17.63V69.28h17.63Z"/>
    <path class="cls-1" d="M549.79,72.52c4.51,2.23,7.99,5.42,10.46,9.58,2.47,4.15,3.7,8.97,3.7,14.46s-1.23,10.28-3.7,14.4c-2.47,4.11-5.95,7.29-10.46,9.52-4.51,2.23-9.7,3.35-15.57,3.35h-15.87v27.62h-17.63V69.16h33.5c5.88,0,11.06,1.12,15.57,3.35Zm-17.22,36.61c4.15,0,7.44-1.13,9.87-3.41,2.43-2.27,3.65-5.33,3.65-9.17s-1.21-7.01-3.65-9.28c-2.43-2.27-5.72-3.41-9.87-3.41h-14.22v25.27h14.22Z"/>
    <path class="cls-1" d="M587.45,69.16h21.15l29.85,82.26h-18.92l-6.35-17.98h-31.26l-6.35,17.98h-18.22l30.08-82.26Zm20.92,50.07l-10.93-31.26-10.81,31.26h21.74Z"/>
    <path class="cls-1" d="M646.55,69.16l18.45,33.73,19.39-33.73h19.62l-30.2,51.71v30.55h-17.63v-30.55l-30.2-51.71h20.56Z"/>
  </g>
</g>
</svg>`;

const apiKey = "7ace9320-5f4f-42d7-a89f-f38553654585";

const INFURA_KEY = "270e676f9e754dd2a6d1bfbecf296c04";

const injected = injectedModule();
const trust = trustModule();

const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: "68e6a9128d33db007d0f2261c25a3bad",
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56, 137, 97, 80001],
};

const walletConnect = walletConnectModule(wcV2InitOptions);

// initialize Onboard
init({
  apiKey,
  wallets: [injected, trust, walletConnect],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    {
      id: "0x38",
      token: "BNB",
      label: "Binance",
      rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    {
      id: "0x5",
      token: "ETH",
      label: "Goerli",
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    },
    {
      id: "0x13881",
      token: "MATIC",
      label: "MUMBAI",
      rpcUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
    },
  ],
  appMetadata: {
    name: "Blockpay",
    icon: HELP,
    logo: HELP,
    description: "Your Personal Subscription Manager",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

const connectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const signerContext = useContext(ProviderContext);
  const [provider, setProvider] = useState();
  useEffect(() => {
    let ethersProvider;
    if (wallet) {
      ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
      setProvider(ethersProvider);
      signerContext.setProvider(ethersProvider);
    }
  }, [wallet, signerContext.setProvider]);

  return { provider, wallet, connecting, connect, disconnect };
};

export default connectWallet;
