import { MeshProvider } from "@meshsdk/react"

const WalletProvider = ({ children }) => {
  return <MeshProvider>{children}</MeshProvider>
}

export default WalletProvider
