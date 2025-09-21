# Cardano NFT Minting Website

A modern, production-ready NFT minting platform built for the Cardano blockchain. This application allows users to connect their Cardano wallets and mint unique digital collectibles on the Cardano Preprod Testnet.

## 🚀 Features

- **Wallet Integration**: Connect with popular Cardano wallets (Nami, Eternl, Lace, Flint)
- **NFT Minting**: Create unique NFTs with randomly generated attributes
- **Gallery View**: Browse and manage your NFT collection
- **Responsive Design**: Modern Web3 UI that works on all devices
- **Testnet Safe**: Runs on Cardano Preprod Testnet for safe testing
- **Real-time Updates**: Live wallet balance and transaction status

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom Web3 theme
- **Blockchain**: Cardano (Preprod Testnet)
- **Wallet Integration**: MeshJS SDK
- **API**: Blockfrost for blockchain interaction

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd cardano-nft-minting
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Add your Blockfrost API key to `.env`:
   \`\`\`
   VITE_BLOCKFROST_API_KEY=your_preprod_api_key_here
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔑 Getting Started

### Prerequisites

1. **Cardano Wallet**: Install one of the supported wallets:
   - [Nami](https://namiwallet.io/)
   - [Eternl](https://eternl.io/)
   - [Lace](https://www.lace.io/)
   - [Flint](https://flint-wallet.com/)

2. **Testnet ADA**: Get free testnet ADA from the [Cardano Testnet Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet/)

3. **Blockfrost API Key**: 
   - Sign up at [Blockfrost.io](https://blockfrost.io/)
   - Create a new project for "Cardano Preprod"
   - Copy your API key to the `.env` file

### Usage

1. **Connect Wallet**: Click on your preferred wallet to connect
2. **Mint NFT**: Click "Mint NFT" to create a unique digital collectible
3. **View Collection**: Browse your NFTs in the Gallery section
4. **Transaction Details**: View transaction hashes on Cardano Explorer

## 🏗 Project Structure

\`\`\`
src/
├── components/
│   ├── WalletConnect.jsx    # Wallet connection interface
│   ├── MintButton.jsx       # NFT minting functionality
│   ├── Gallery.jsx          # NFT collection display
│   ├── NFTCard.jsx          # Individual NFT card component
│   ├── Stats.jsx            # Collection statistics
│   └── TransactionStatus.jsx # Transaction status display
├── contexts/
│   └── WalletProvider.jsx   # MeshJS wallet context
├── hooks/
│   └── useCardano.js        # Custom Cardano utilities
├── utils/
│   └── nftUtils.js          # NFT helper functions
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # TailwindCSS styles
\`\`\`

## 🎨 Design Features

- **Web3 Aesthetic**: Gradient backgrounds, glass morphism effects
- **Responsive Layout**: Mobile-first design with Flexbox/Grid
- **Interactive Elements**: Hover effects, animations, loading states
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Color System**: Cardano blue theme with carefully selected accent colors

## 🔧 Configuration

### Network Settings
- **Default**: Cardano Preprod Testnet
- **Network ID**: 0 (testnet)
- **Explorer**: https://preprod.cardanoscan.io

### Customization
- Modify NFT metadata in `src/components/MintButton.jsx`
- Update styling in `src/index.css` and `tailwind.config.js`
- Add new wallet types in `src/components/WalletConnect.jsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_BLOCKFROST_API_KEY`
4. Deploy

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔒 Security

- **Client-side Only**: No private keys stored on server
- **Wallet Signatures**: All transactions signed by user's wallet
- **Testnet Environment**: Safe testing without real funds
- **Environment Variables**: Sensitive data stored securely

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure wallet extension is installed and unlocked
   - Check if wallet is set to Preprod Testnet
   - Try refreshing the page

2. **Minting Failed**
   - Verify sufficient testnet ADA balance
   - Check Blockfrost API key is valid
   - Ensure wallet is connected to Preprod network

3. **NFTs Not Showing**
   - Wait for transaction confirmation (1-2 minutes)
   - Click "Refresh" in the gallery
   - Check transaction on Cardano Explorer

## 📚 Resources

- [Cardano Documentation](https://docs.cardano.org/)
- [MeshJS Documentation](https://docs.meshjs.dev/)
- [Blockfrost API](https://docs.blockfrost.io/)
- [Cardano Testnet Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Minting! 🎨✨**
