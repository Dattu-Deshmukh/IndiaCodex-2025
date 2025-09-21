"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@meshsdk/react"
import { BlockfrostProvider, MeshWallet } from "@meshsdk/core"

export const useCardano = () => {
  const { wallet, connected } = useWallet()
  const [blockfrostProvider, setBlockfrostProvider] = useState(null)
  const [meshWallet, setMeshWallet] = useState(null)

  useEffect(() => {
    // Initialize Blockfrost provider
    const provider = new BlockfrostProvider(import.meta.env.VITE_BLOCKFROST_API_KEY || "preprodYourApiKeyHere")
    setBlockfrostProvider(provider)

    if (connected && wallet) {
      const mesh = new MeshWallet({
        networkId: 0, // 0 for testnet, 1 for mainnet
        fetcher: provider,
        submitter: provider,
        key: {
          type: "root",
          bech32: wallet,
        },
      })
      setMeshWallet(mesh)
    }
  }, [connected, wallet])

  const getWalletAssets = async () => {
    if (!connected || !wallet) return []

    try {
      const utxos = await wallet.getUtxos()
      const assets = []

      utxos.forEach((utxo) => {
        utxo.output.amount.forEach((asset) => {
          if (asset.unit !== "lovelace") {
            assets.push({
              unit: asset.unit,
              quantity: asset.quantity,
              policyId: asset.unit.slice(0, 56),
              assetName: asset.unit.slice(56),
            })
          }
        })
      })

      return assets
    } catch (error) {
      console.error("Error fetching wallet assets:", error)
      return []
    }
  }

  const getWalletBalance = async () => {
    if (!connected || !wallet) return "0"

    try {
      const utxos = await wallet.getUtxos()
      const totalLovelace = utxos.reduce((total, utxo) => {
        const lovelaceAsset = utxo.output.amount.find((asset) => asset.unit === "lovelace")
        return total + Number.parseInt(lovelaceAsset?.quantity || "0")
      }, 0)

      return (totalLovelace / 1000000).toFixed(2)
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
      return "0"
    }
  }

  return {
    wallet,
    connected,
    blockfrostProvider,
    meshWallet,
    getWalletAssets,
    getWalletBalance,
  }
}
