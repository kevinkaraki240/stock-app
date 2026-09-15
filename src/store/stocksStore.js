import { create } from "zustand"

export const useStocksStore = create((set, get) => ({
  stocks: [],       // toàn bộ mã, cập nhật real-time
  isLoading: true,
  error: null,

  setStocks: (stocks) => set({ stocks, isLoading: false }),

  updateStock: (updatedStock) => {
    const stocks = get().stocks.map((s) =>
      s.symbol === updatedStock.symbol ? updatedStock : s
    )
    set({ stocks })
  },

  setError: (error) => set({ error, isLoading: false }),

  getStock: (symbol) => get().stocks.find((s) => s.symbol === symbol),
}))