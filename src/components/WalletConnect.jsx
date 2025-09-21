"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@meshsdk/react"

const WalletConnect = () => {
  const { wallet, connected, name, connecting, connect, disconnect, error } = useWallet()
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState("0")

  useEffect(() => {
    if (connected && wallet) {
      getWalletInfo()
    }
  }, [connected, wallet])

  const getWalletInfo = async () => {
    try {
      const addresses = await wallet.getRewardAddresses()
      const usedAddresses = await wallet.getUsedAddresses()
      const address = usedAddresses[0] || addresses[0]
      setWalletAddress(address)

      // Get wallet balance
      const utxos = await wallet.getUtxos()
      const totalLovelace = utxos.reduce((total, utxo) => {
        return total + Number.parseInt(utxo.output.amount.find((asset) => asset.unit === "lovelace")?.quantity || "0")
      }, 0)
      setBalance((totalLovelace / 1000000).toFixed(2)) // Convert to ADA
    } catch (err) {
      console.error("Error getting wallet info:", err)
    }
  }

  const formatAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  const availableWallets = [
    { name: "nami", displayName: "Nami", icon: "🦎" },
    { name: "eternl", displayName: "Eternl", icon: "♾️" },
    { name: "lace", displayName: "Lace", icon: "🎭" },
    { name: "flint", displayName: "Flint", icon: "🔥" },
  ]

  if (connected) {
    return (
      <div className="card-web3 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-cardano rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{name?.charAt(0).toUpperCase() || "W"}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Connected to {name}</h3>
              <p className="text-sm text-gray-400">{formatAddress(walletAddress)}</p>
            </div>
          </div>
          <button
            onClick={disconnect}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            Disconnect
          </button>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Balance:</span>
            <span className="text-white font-semibold">{balance} ADA</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-green-400 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Wallet Connected</span>
        </div>
      </div>
    )
  }

  return (
    <div className="card-web3 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400 text-sm">Choose your preferred Cardano wallet to start minting NFTs</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm">
            {error.message === "[BrowserWallet] An error occurred during enable: {}"
              ? "Could not connect to the wallet. Make sure the wallet extension is installed and enabled in your browser."
              : error.message}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {availableWallets.map((walletOption) => (
          <button
            key={walletOption.name}
            onClick={() => connect(walletOption.name)}
            disabled={connecting}
            className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{walletOption.icon}</span>
              <span className="text-white font-medium">{walletOption.displayName}</span>
            </div>
            {connecting ? (
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Make sure you have a Cardano wallet installed and funded with testnet ADA
        </p>
      </div>
    </div>
  )
}

export default WalletConnect
