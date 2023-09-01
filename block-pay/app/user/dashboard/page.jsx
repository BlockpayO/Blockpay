"use client";
import SideNav from "@/components/SideNav";
import Image from "next/image";
import {
  viewBalance,
  periodIcon,
  convertIcon,
  notiIcon,
} from "@/public/assets/images";
import { dashData, rates } from "@/constants";
import { useState, useEffect, useContext } from "react";
import { init, useConnectWallet } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import trustModule from "@web3-onboard/trust";
import ProviderContext from "../context/ProviderContext";
import { ethers } from "ethers";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";

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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [provider, setProvider] = useState();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const signerContext = useContext(ProviderContext);

  useEffect(() => {
    // create an ethers provider
    let ethersProvider;

    if (wallet) {
      ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      setProvider(ethersProvider);
      signerContext.setProvider(ethersProvider);
    }
  }, [wallet, signerContext.setProvider]);

  const router = useRouter();
  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#1856f3"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#1856f3"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <main className="flex">
      {/**-------======== BEFORE CONNECTING WALLET =======------ */}

      {!connect ? (
        <>
          <SideNav />
          <div className="flex-1 p-7">
            <div className="flex mt-9 mb-4">
              <h1 className="text-3xl text-color font-semibold text-left mr-2">
                Dashboard
              </h1>
              <select
                name="userBalance"
                className="p-1 border border-[#1856f3] rounded cursor-pointer"
              >
                <option value="usdc">USDC</option>
                <option value="matic">MATIC</option>
                <option value="eth">ETH</option>
                <option value="bsc">BSC</option>
              </select>
            </div>

            <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
              <div className="flex flex-row">
                <h2 className="font-medium mr-1 font-base">Total Value</h2>
                <Image src={viewBalance} alt="view balance" className="w-6 h-6 p-1" />
              </div>

              <h1 className="flex-col text-2xl font-medium mt-1">USD 0.00</h1>

              <div className="flex flex-row mt-2">
                <Image src={periodIcon}  alt="view balance" className="mt-1 w-3 h-3 p-1" />
                <p className="ml-1 text-[#727272] text-xs">
                  Updated 5 secs ago
                </p>
              </div>
            </div>
            <div className="grid bg-[#f7f7f7] w-[339px] px-12 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Quick Links
              </h2>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer">
                Generate Payment Link
              </p>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer mt-2">
                Withdrawal
              </p>
            </div>
            <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Conversion Rates
              </h2>

              <div className="flex flex-row">
                <select
                  name="convertFrom"
                  className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                  <option value="eth">ETH</option>
                  <option value="bsc">BSC</option>
                </select>
                <Image src={convertIcon} alt="view balance" className="w-5 h-5 pt-[6px]" />
                <select
                  name="convertTo"
                  className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                  <option value="eth">ETH</option>
                  <option value="bsc">BSC</option>
                </select>
              </div>
              <p className="text-[#bebebe] mt-2 text-[13px]">
                Updated 15 secs ago
              </p>
              <ul className="mt-2">
                {rates.map((rate) => (
                  <li key={rate.desc} className="flex text-[13px]">
                    <div className="text-color mr-2">{rate.desc}</div>
                    <div className="text-[#bebebe]">{rate.rate}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col flex-auto p-6 pt-4 pr-12 mt-9  pl-0">
            <button
              className={`hover:text-white hover:bg-[#1856F3] text-white border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 ml-4 ${
                connecting
                  ? ""
                  : wallet
                  ? "bg-red-500 border border-none hover:bg-red-700"
                  : "bg-blue-500 border border-none hover:bg-blue-700"
              }`}
              disabled={connecting}
              onClick={() => (wallet ? disconnect(wallet) : connect())}
            >
              {connecting
                ? "Connecting"
                : wallet
                ? "Disconnect"
                : "Connect Wallet"}
            </button>
            <div className="bg-[#f7f7f7] p-10 pt-8 mt-4 rounded-lg">
              <h2 className="text-color text-xl font-medium text-color">
                Recent Transactions
              </h2>
              <div className="mt-1">
                <ul className="flex justify-between mb-4">
                  {dashData.map((dashDatum) => (
                    <li key={dashDatum.id} className="text-[#727272]">
                      {dashDatum.title}
                    </li>
                  ))}
                </ul>
                <h1 className="flex justify-center items-center order-first font-medium mt-32 mb-32 text-xl">
                  Connect Wallet to view this section.
                </h1>
              </div>
            </div>

            <div className="bg-[#f7f7f7] px-12 py-7 mt-5 rounded-lg ">
              <h2>Generate Invoice</h2>
              <SearchBar />
            </div>
          </div>
        </>
      ) : (
        <>
          <SideNav />
          <div className="flex-1 p-7">
            <div className="flex mt-9 mb-4">
              <h1 className="text-2xl text-color font-semibold text-left mr-2">
                Dashboard
              </h1>
              <select
                name="userBalance"
                className="p-1 border border-[#1856f3] rounded cursor-pointer"
              >
                <option value="usdc">USDC</option>
                <option value="matic">MATIC</option>
                <option value="eth">ETH</option>
                <option value="bsc">BSC</option>
              </select>
            </div>

            <div className="grid bg-[#f7f7f7] px-11 py-6 rounded-lg">
              <div className="flex flex-row">
                <h2 className="font-medium mr-1 font-base">Total Value</h2>
                <Image src={viewBalance}  alt="view balance" className="w-6 h-6 p-1" />
              </div>

              <h1 className="flex-col text-2xl font-medium mt-1">
                USD 75,690.73
              </h1>

              <div className="flex flex-row mt-2">
                <Image src={periodIcon}  alt="view balance" className="mt-1 w-3 h-3 p-1" />
                <p className="ml-1 text-[#727272] text-xs">
                  Updated 5 secs ago
                </p>
              </div>
            </div>
            <div className="grid bg-[#f7f7f7] w-[339px] px-12 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Quick Links
              </h2>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer">
                Generate Payment Link
              </p>
              <p className="p-1 text-[13px] border border-[#bebebe] rounded text-center text-[#bebebe] cursor-pointer mt-2">
                Withdrawal
              </p>
            </div>
            <div className="grid bg-[#f7f7f7] px-11 py-6 mt-5 rounded-lg">
              <h2 className="text-color text-xl font-medium mb-4">
                Conversion Rates
              </h2>

              <div className="flex flex-row">
                <select
                  name="convertFrom"
                  className="p-1 border border-[#1856f3] w-24 rounded mr-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                  <option value="eth">ETH</option>
                  <option value="bsc">BSC</option>
                </select>
                <Image src={convertIcon}  alt="view balance" className="w-5 h-5 pt-[6px]" />
                <select
                  name="convertTo"
                  className="p-1 border border-[#1856f3] w-24 rounded ml-1 cursor-pointer"
                >
                  <option value="usdc">USDC</option>
                  <option value="matic">MATIC</option>
                  <option value="eth">ETH</option>
                  <option value="bsc">BSC</option>
                </select>
              </div>
              <p className="text-[#bebebe] mt-2 text-[13px]">
                Updated 15 secs ago
              </p>
              <ul className="mt-2">
                {rates.map((rate) => (
                  <li key={rate.desc} className="flex text-[13px]">
                    <div className="text-color mr-2">{rate.desc}</div>
                    <div className="text-[#bebebe]">{rate.rate}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col flex-auto p-6 pt-4 pr-12 mt-9  pl-0">
            <div className="flex self-end order-first">
              <Image
                src={notiIcon}
                alt="Noti Icon"
                className="w-7 h-7 p-1 pb-0 cursor-pointer"
              />
              <button
                className={`hover:text-white hover:bg-[#1856F3] text-white border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 ml-4 ${
                  connecting
                    ? ""
                    : wallet
                    ? "bg-red-500 border border-none hover:bg-red-700"
                    : "bg-blue-500 border border-none hover:bg-blue-700"
                }`}
                disabled={connecting}
                onClick={() => (wallet ? disconnect(wallet) : connect())}
              >
                {connecting
                  ? "Connecting"
                  : wallet
                  ? "Disconnect"
                  : "Connect Wallet"}
              </button>
            </div>
            <div className="bg-[#f7f7f7] p-10 pt-8 mt-4 rounded-lg">
              <h2 className="text-color text-xl font-medium text-color">
                Recent Transactions
              </h2>
              <div className="mt-1">
                <ul className="flex justify-between mb-4">
                  {dashData.map((dashDatum) => (
                    <li key={dashDatum.id} className="mb-4">
                      <div className="text-[#727272] mb-1">
                        {dashDatum.title}
                      </div>
                      <div className="text-black">{dashDatum.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button
                  type="button"
                  className=" font-medium mt-48 hover:text-white hover:bg-[#1856F3] text-[#727272] border border-[#1856f3] text-sm w-32 rounded-md py-2 px-3 cursor-pointer"
                >
                  Load more
                </button>
              </div>
            </div>

            <div className="bg-[#f7f7f7] px-12 py-7 mt-5 rounded-lg ">
              <h2>Generate Invoice</h2>
              <SearchBar />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;

const SearchBar = () => {
  return (
    <div>
      <input
        type="search"
        name="search invoice"
        id=""
        placeholder="Enter transaction ID"
        className="w-[355px] text-[13px] py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        name="search invoice"
        className="mt-2 ml-4 py-2 px-3 bg-blue-500 hover:bg-[#1856f3] text-[13px] text-white rounded-md w-40"
      >
        Search
      </button>
    </div>
  );
};
