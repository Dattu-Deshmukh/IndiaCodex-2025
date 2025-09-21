"use client"

import { useState } from "react"
import { getCardanoScanUrl } from "../utils/nftUtils"

const NFTCard = ({ nft }) => {
  const [imageError, setImageError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const formatAttribute = (attr) => {
    if (typeof attr.value === "number") {
      return attr.value.toString()
    }
    return attr.value
  }

  return (
    <div className="card-web3 group hover:scale-105 transition-transform duration-300">
      {/* NFT Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        {!imageError ? (
          <img
            src={nft.image || "/nft-placeholder.jpg"}
            alt={nft.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-cardano flex items-center justify-center">
            <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Source Badge */}
        {nft.source && (
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                nft.source === "minted"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}
            >
              {nft.source === "minted" ? "Minted" : "Wallet"}
            </span>
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-white text-lg leading-tight">{nft.name || "Unnamed NFT"}</h3>
          {nft.description && <p className="text-gray-400 text-sm mt-1 line-clamp-2">{nft.description}</p>}
        </div>

        {/* Attributes Preview */}
        {nft.attributes && nft.attributes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {nft.attributes.slice(0, 2).map((attr, index) => (
              <span key={index} className="px-2 py-1 bg-white/10 text-white text-xs rounded-lg">
                {attr.trait_type}: {formatAttribute(attr)}
              </span>
            ))}
            {nft.attributes.length > 2 && (
              <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-lg">
                +{nft.attributes.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>

          {nft.txHash && (
            <a
              href={getCardanoScanUrl(nft.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Explorer
            </a>
          )}
        </div>

        {/* Detailed View */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            {nft.policyId && (
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">Policy ID:</p>
                <p className="text-white text-xs font-mono break-all">{nft.policyId}</p>
              </div>
            )}

            {nft.assetName && (
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">Asset Name:</p>
                <p className="text-white text-xs">{nft.assetName}</p>
              </div>
            )}

            {nft.mintDate && (
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">Mint Date:</p>
                <p className="text-white text-xs">{new Date(nft.mintDate).toLocaleDateString()}</p>
              </div>
            )}

            {nft.attributes && nft.attributes.length > 2 && (
              <div>
                <p className="text-gray-400 text-xs font-medium mb-2">All Attributes:</p>
                <div className="space-y-1">
                  {nft.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-gray-400">{attr.trait_type}:</span>
                      <span className="text-white">{formatAttribute(attr)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTCard
