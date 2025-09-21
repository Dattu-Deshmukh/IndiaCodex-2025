"use client"

import { useState } from "react"
import { useWallet } from "@meshsdk/react"
import { Transaction, ForgeScript } from "@meshsdk/core"

const MintButton = ({ onMintSuccess }) => {
  const { wallet, connected } = useWallet()
  const [minting, setMinting] = useState(false)
  const [mintedNFT, setMintedNFT] = useState(null)
  const [error, setError] = useState("")

  const generateNFTMetadata = () => {
    const nftId = Date.now()
    const metadata = {
      name: `Cardano NFT #${nftId}`,
      description: "A unique digital collectible minted on the Cardano blockchain",
      image: "ipfs://QmYourImageHashHere", // In production, upload to IPFS
      mediaType: "image/png",
      attributes: [
        {
          trait_type: "Rarity",
          value: Math.random() > 0.5 ? "Common" : "Rare",
        },
        {
          trait_type: "Mint Date",
          value: new Date().toISOString().split("T")[0],
        },
        {
          trait_type: "Collection",
          value: "Cardano Starter NFTs",
        },
      ],
      files: [
        {
          name: `Cardano NFT #${nftId}`,
          mediaType: "image/png",
          src: "ipfs://QmYourImageHashHere",
        },
      ],
    }

    return { metadata, nftId }
  }

  const mintNFT = async () => {
    if (!connected || !wallet) {
      setError("Please connect your wallet first")
      return
    }

    setMinting(true)
    setError("")

    try {
      // Generate NFT metadata
      const { metadata, nftId } = generateNFTMetadata()

      // Get wallet address
      const addresses = await wallet.getUsedAddresses()
      const address = addresses[0]

      if (!address) {
        throw new Error("No wallet address found")
      }

      // Create policy script (time-locked)
      const slot = Date.now() + 10000000 // 10 million milliseconds from now
      const nativeScript = {
        type: "before",
        slot: slot.toString(),
      }

      const forgeScript = ForgeScript.withOneSignature(address)

      // Create asset name (hex encoded)
      const assetName = `CardanoNFT${nftId}`
      const assetNameHex = Buffer.from(assetName, "utf8").toString("hex")

      // Build transaction
      const tx = new Transaction({ initiator: wallet })

      // Add minting
      tx.mintAsset(forgeScript, {
        [assetNameHex]: "1",
      })

      // Add metadata
      tx.setMetadata(721, {
        [forgeScript.getPolicyId()]: {
          [assetName]: metadata,
        },
      })

      // Send minted NFT to wallet
      tx.sendAssets(address, [
        {
          unit: forgeScript.getPolicyId() + assetNameHex,
          quantity: "1",
        },
      ])

      // Build and sign transaction
      const unsignedTx = await tx.build()
      const signedTx = await wallet.signTx(unsignedTx)
      const txHash = await wallet.submitTx(signedTx)

      // Create NFT object for display
      const nftData = {
        id: nftId,
        name: metadata.name,
        description: metadata.description,
        image: "/nft-placeholder.jpg", // Using placeholder image
        attributes: metadata.attributes,
        txHash: txHash,
        policyId: forgeScript.getPolicyId(),
        assetName: assetName,
        mintDate: new Date().toISOString(),
      }

      setMintedNFT(nftData)

      // Call success callback
      if (onMintSuccess) {
        onMintSuccess(nftData)
      }

      console.log("NFT minted successfully! Transaction hash:", txHash)
    } catch (err) {
      console.error("Minting error:", err)
      setError(err.message || "Failed to mint NFT. Please try again.")
    } finally {
      setMinting(false)
    }
  }

  const resetMint = () => {
    setMintedNFT(null)
    setError("")
  }

  if (mintedNFT) {
    return (
      <div className="card-web3 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">NFT Minted Successfully!</h3>
          <p className="text-gray-400 text-sm">Your NFT has been created and sent to your wallet</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <img
            src={mintedNFT.image || "/placeholder.svg"}
            alt={mintedNFT.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="font-semibold text-white mb-2">{mintedNFT.name}</h4>
          <p className="text-gray-400 text-sm mb-4">{mintedNFT.description}</p>

          <div className="space-y-2">
            {mintedNFT.attributes.map((attr, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-400">{attr.trait_type}:</span>
                <span className="text-white">{attr.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-blue-400 text-sm">
            <strong>Transaction Hash:</strong>
          </p>
          <p className="text-blue-300 text-xs font-mono break-all">{mintedNFT.txHash}</p>
        </div>

        <button onClick={resetMint} className="btn-secondary w-full">
          Mint Another NFT
        </button>
      </div>
    )
  }

  return (
    <div className="card-web3 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-cardano rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Mint Your NFT</h3>
        <p className="text-gray-400 text-sm">Create a unique digital collectible on the Cardano blockchain</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-white mb-3">What you'll get:</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span>Unique NFT with random attributes</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span>Stored permanently on Cardano blockchain</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span>Viewable in your wallet</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            <span>Transferable and tradeable</span>
          </li>
        </ul>
      </div>

      <button
        onClick={mintNFT}
        disabled={!connected || minting}
        className={`w-full ${
          !connected ? "bg-gray-600 cursor-not-allowed" : "btn-primary glow-effect"
        } ${minting ? "animate-pulse" : ""}`}
      >
        {minting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Minting NFT...</span>
          </div>
        ) : !connected ? (
          "Connect Wallet to Mint"
        ) : (
          "Mint NFT"
        )}
      </button>

      {!connected && (
        <p className="text-center text-gray-500 text-xs mt-3">Please connect your wallet to start minting</p>
      )}
    </div>
  )
}

export default MintButton
