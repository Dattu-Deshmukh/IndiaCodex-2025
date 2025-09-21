"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@meshsdk/react"
import { useCardano } from "../hooks/useCardano"
import NFTCard from "./NFTCard"

const Gallery = ({ mintedNFTs = [] }) => {
  const { connected } = useWallet()
  const { getWalletAssets } = useCardano()
  const [walletNFTs, setWalletNFTs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (connected) {
      fetchWalletNFTs()
    }
  }, [connected])

  const fetchWalletNFTs = async () => {
    setLoading(true)
    try {
      const assets = await getWalletAssets()
      // Filter out ADA and only show NFTs (assets with quantity of 1)
      const nfts = assets.filter((asset) => asset.quantity === "1")
      setWalletNFTs(nfts)
    } catch (error) {
      console.error("Error fetching wallet NFTs:", error)
    } finally {
      setLoading(false)
    }
  }

  // Combine minted NFTs with wallet NFTs
  const allNFTs = [
    ...mintedNFTs,
    ...walletNFTs.map((asset) => ({
      id: asset.unit,
      name: `NFT ${asset.assetName || asset.unit.slice(-8)}`,
      description: "NFT from your wallet",
      image: "/nft-placeholder.jpg",
      policyId: asset.policyId,
      assetName: asset.assetName,
      unit: asset.unit,
      source: "wallet",
    })),
  ]

  const filteredNFTs = filter === "all" ? allNFTs : allNFTs.filter((nft) => nft.source === filter)

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Connect your Cardano wallet to view your NFT collection and mint new digital collectibles.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">NFT Gallery</h2>
          <p className="text-gray-400">Your collection of digital collectibles on Cardano</p>
        </div>

        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button onClick={fetchWalletNFTs} disabled={loading} className="btn-secondary text-sm">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing...</span>
              </div>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 rounded-xl p-1">
        {[
          { key: "all", label: "All NFTs", count: allNFTs.length },
          { key: "minted", label: "Recently Minted", count: mintedNFTs.length },
          { key: "wallet", label: "From Wallet", count: walletNFTs.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === tab.key ? "bg-white text-gray-900" : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {loading && allNFTs.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card-web3 animate-pulse">
              <div className="bg-white/10 h-48 rounded-xl mb-4"></div>
              <div className="bg-white/10 h-4 rounded mb-2"></div>
              <div className="bg-white/10 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <NFTCard key={nft.id || index} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No NFTs Found</h3>
          <p className="text-gray-400 mb-6">
            {filter === "all"
              ? "You don't have any NFTs yet. Start by minting your first one!"
              : `No NFTs found in the ${filter} category.`}
          </p>
          {filter !== "all" && (
            <button onClick={() => setFilter("all")} className="btn-secondary">
              View All NFTs
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Gallery
