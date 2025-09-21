"use client"

import { useState } from "react"
import WalletProvider from "./contexts/WalletProvider"
import WalletConnect from "./components/WalletConnect"
import MintButton from "./components/MintButton"
import Gallery from "./components/Gallery"
import Stats from "./components/Stats"
import { useWallet } from "@meshsdk/react"
import { Buffer } from "buffer"
window.Buffer = Buffer


const AppContent = () => {
  const { connected } = useWallet()
  const [mintedNFTs, setMintedNFTs] = useState([])
  const [activeSection, setActiveSection] = useState("mint")

  const handleMintSuccess = (nftData) => {
    setMintedNFTs((prev) => [nftData, ...prev])
    // Auto-switch to gallery after successful mint
    setTimeout(() => setActiveSection("gallery"), 2000)
  }

  const navigation = [
    { id: "mint", label: "Mint NFT", icon: "⚡" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-gradient-cardano rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Cardano NFT Minter</h1>
                <p className="text-gray-400 text-sm">Create unique digital collectibles</p>
              </div>
            </div>

            {/* Network Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Preprod Testnet</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {connected && (
        <nav className="relative z-10 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeSection === item.id
                      ? "text-white border-blue-400 bg-white/5"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {!connected ? (
          // Landing Section
          <div className="text-center py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                  Mint Your First
                  <span className="bg-gradient-cardano bg-clip-text text-transparent"> Cardano NFT</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Connect your wallet and create unique digital collectibles on the Cardano blockchain. Safe, secure,
                  and running on Preprod Testnet.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: "🔒",
                    title: "Secure & Safe",
                    description: "Your wallet, your keys. All transactions are signed securely by your wallet.",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Minting",
                    description: "Create NFTs in seconds with our streamlined minting process.",
                  },
                  {
                    icon: "🌍",
                    title: "Cardano Powered",
                    description: "Built on Cardano's sustainable and efficient blockchain technology.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="card-web3 text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Wallet Connection */}
              <WalletConnect />

              {/* Instructions */}
              <div className="mt-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">How it works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { step: "1", title: "Connect Wallet", desc: "Link your Cardano wallet" },
                    { step: "2", title: "Mint NFT", desc: "Create your unique collectible" },
                    { step: "3", title: "View & Share", desc: "Admire your NFT collection" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-cardano rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Connected User Interface
          <div className="space-y-8">
            {/* Stats */}
            <Stats mintedNFTs={mintedNFTs} walletNFTs={[]} />

            {/* Content Sections */}
            {activeSection === "mint" && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Create Your NFT</h2>
                  <p className="text-gray-400">Mint a unique digital collectible with randomly generated attributes</p>
                </div>
                <MintButton onMintSuccess={handleMintSuccess} />
              </div>
            )}

            {activeSection === "gallery" && <Gallery mintedNFTs={mintedNFTs} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <p className="text-gray-400 text-sm">Built with ❤️ for the Cardano community</p>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://cardano.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Learn about Cardano
              </a>
              <a
                href="https://docs.meshjs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                MeshJS Docs
              </a>
              <a
                href="https://preprod.cardanoscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Block Explorer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const App = () => {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  )
}

export default App
