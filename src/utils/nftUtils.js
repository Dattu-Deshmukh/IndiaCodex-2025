import { BlockfrostProvider } from "@meshsdk/core"

export const createBlockfrostProvider = () => {
  const apiKey = import.meta.env.VITE_BLOCKFROST_API_KEY
  if (!apiKey) {
    console.warn("Blockfrost API key not found. Using demo key.")
    return new BlockfrostProvider("preprodYourApiKeyHere")
  }
  return new BlockfrostProvider(apiKey)
}

export const generateRandomAttributes = () => {
  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
  const colors = ["Blue", "Red", "Green", "Purple", "Gold", "Silver"]
  const types = ["Warrior", "Mage", "Archer", "Healer", "Rogue"]

  return [
    {
      trait_type: "Rarity",
      value: rarities[Math.floor(Math.random() * rarities.length)],
    },
    {
      trait_type: "Color",
      value: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      trait_type: "Type",
      value: types[Math.floor(Math.random() * types.length)],
    },
    {
      trait_type: "Power Level",
      value: Math.floor(Math.random() * 100) + 1,
    },
    {
      trait_type: "Mint Date",
      value: new Date().toISOString().split("T")[0],
    },
  ]
}

export const formatTxHash = (hash) => {
  if (!hash) return ""
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}

export const getCardanoScanUrl = (txHash, network = "preprod") => {
  const baseUrl = network === "mainnet" ? "https://cardanoscan.io" : "https://preprod.cardanoscan.io"
  return `${baseUrl}/transaction/${txHash}`
}

export const validateNFTMetadata = (metadata) => {
  const required = ["name", "description", "image"]
  const missing = required.filter((field) => !metadata[field])

  if (missing.length > 0) {
    throw new Error(`Missing required metadata fields: ${missing.join(", ")}`)
  }

  return true
}
