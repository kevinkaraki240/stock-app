const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

export async function fetchStocks() {
  const res = await fetch(`${API_URL}/api/stocks`)
  if (!res.ok) throw new Error("Không tải được danh sách mã")
  return res.json()
}

export async function fetchStock(symbol) {
  const res = await fetch(`${API_URL}/api/stocks/${symbol}`)
  if (!res.ok) throw new Error("Không tìm thấy mã")
  return res.json()
}