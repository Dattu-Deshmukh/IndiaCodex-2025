import { getCardanoScanUrl, formatTxHash } from "../utils/nftUtils"

const TransactionStatus = ({ txHash, status, network = "preprod" }) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "confirmed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "failed":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      case "confirmed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case "failed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return null
    }
  }

  if (!txHash) return null

  return (
    <div className={`border rounded-xl p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium capitalize">{status}</span>
        </div>
        <a
          href={getCardanoScanUrl(txHash, network)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View on Explorer
        </a>
      </div>
      <div className="text-sm opacity-75">
        <span className="font-medium">Tx Hash: </span>
        <span className="font-mono">{formatTxHash(txHash)}</span>
      </div>
    </div>
  )
}

export default TransactionStatus
