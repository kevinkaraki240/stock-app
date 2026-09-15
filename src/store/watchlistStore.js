import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      symbols: ["VCB", "VNM", "HPG", "FPT", "MWG", "VIC"], // danh mục mặc định

      addSymbol: (symbol) => {
        const upper = symbol.toUpperCase().trim()
        if (!upper) return
        if (get().symbols.includes(upper)) return
        set({ symbols: [...get().symbols, upper] })
      },

      removeSymbol: (symbol) => {
        set({ symbols: get().symbols.filter((s) => s !== symbol) })
      },

      hasSymbol: (symbol) => get().symbols.includes(symbol),
    }),
    {
      name: "watchlist-storage", // key lưu trong localStorage
    }
  )
)