import { useEffect } from "react"
import { socket } from "../services/socket"
import { fetchStocks } from "../services/api"
import { useStocksStore } from "../store/stocksStore"

// Gọi hook này 1 LẦN DUY NHẤT ở App.jsx (không gọi lặp lại ở từng trang)
export function useStockSocket() {
  const setStocks = useStocksStore((s) => s.setStocks)
  const updateStock = useStocksStore((s) => s.updateStock)
  const setError = useStocksStore((s) => s.setError)

  useEffect(() => {
    // 1. Lấy snapshot ban đầu qua REST (nhanh, không cần đợi socket connect)
    fetchStocks()
      .then(setStocks)
      .catch((err) => setError(err.message))

    // 2. Lắng nghe cập nhật real-time qua WebSocket
    function handlePriceUpdate(stock) {
      updateStock(stock)
    }

    socket.on("price-update", handlePriceUpdate)
    socket.on("connect_error", () => setError("Không kết nối được server"))

    return () => {
      socket.off("price-update", handlePriceUpdate)
      socket.off("connect_error")
    }
  }, [])
}