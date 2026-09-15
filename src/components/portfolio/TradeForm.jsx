import { useState } from "react"
import { usePortfolioStore } from "../../store/portfolioStore"

function TradeForm({ stock }) {
  const [quantity, setQuantity] = useState(100)
  const [message, setMessage] = useState(null)

  const buy = usePortfolioStore((s) => s.buy)
  const sell = usePortfolioStore((s) => s.sell)
  const cash = usePortfolioStore((s) => s.cash)

  const total = quantity * stock.price

  function handleTrade(action) {
    const result = action === "buy"
      ? buy(stock.symbol, quantity, stock.price)
      : sell(stock.symbol, quantity, stock.price)

    setMessage(
      result.ok
        ? { type: "ok", text: `Đã ${action === "buy" ? "mua" : "bán"} ${quantity} CP ${stock.symbol}` }
        : { type: "error", text: result.message }
    )
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4">
      <div className="text-xs text-[var(--color-text-muted)] mb-3">
        Tiền mặt khả dụng:{" "}
        <span className="tabular text-[var(--color-text)]">
          {cash.toLocaleString("vi-VN")} đ
        </span>
      </div>

      <label className="text-xs text-[var(--color-text-muted)]">Khối lượng</label>
      <input
        type="number"
        min="1"
        step="100"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="tabular w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded px-3 py-2 mt-1 mb-3 outline-none focus:border-[var(--color-brand)]"
      />

      <div className="tabular text-sm text-[var(--color-text-muted)] mb-4">
        Tạm tính: {total.toLocaleString("vi-VN")} đ
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleTrade("buy")}
          className="flex-1 py-2 rounded bg-[var(--color-up)] text-[var(--color-bg)] font-medium text-sm hover:opacity-90"
        >
          Mua
        </button>
        <button
          onClick={() => handleTrade("sell")}
          className="flex-1 py-2 rounded bg-[var(--color-down)] text-[var(--color-bg)] font-medium text-sm hover:opacity-90"
        >
          Bán
        </button>
      </div>

      {message && (
        <div
          className={`text-xs mt-3 ${
            message.type === "ok" ? "text-[var(--color-up)]" : "text-[var(--color-down)]"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}

export default TradeForm