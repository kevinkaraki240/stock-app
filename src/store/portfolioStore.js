import { create } from "zustand"
import { persist } from "zustand/middleware"

const STARTING_CASH = 100_000_000 // 100 triệu VNĐ vốn giả lập ban đầu

export const usePortfolioStore = create(
  persist(
    (set, get) => ({
      cash: STARTING_CASH,
      holdings: [], // { symbol, quantity, avgPrice }

      buy: (symbol, quantity, price) => {
        const cost = quantity * price
        if (cost > get().cash) return { ok: false, message: "Không đủ tiền mặt" }

        const holdings = [...get().holdings]
        const existing = holdings.find((h) => h.symbol === symbol)

        if (existing) {
          const totalQty = existing.quantity + quantity
          const totalCost = existing.avgPrice * existing.quantity + cost
          existing.avgPrice = totalCost / totalQty
          existing.quantity = totalQty
        } else {
          holdings.push({ symbol, quantity, avgPrice: price })
        }

        set({ cash: get().cash - cost, holdings })
        return { ok: true }
      },

      sell: (symbol, quantity, price) => {
        const holdings = [...get().holdings]
        const existing = holdings.find((h) => h.symbol === symbol)

        if (!existing || existing.quantity < quantity) {
          return { ok: false, message: "Không đủ cổ phiếu để bán" }
        }

        existing.quantity -= quantity
        const proceeds = quantity * price
        const filtered = existing.quantity === 0
          ? holdings.filter((h) => h.symbol !== symbol)
          : holdings

        set({ cash: get().cash + proceeds, holdings: filtered })
        return { ok: true }
      },

      reset: () => set({ cash: STARTING_CASH, holdings: [] }),
    }),
    { name: "portfolio-storage" }
  )
)