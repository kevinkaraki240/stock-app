import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStocksStore } from "../../store/stocksStore"
import { useWatchlistStore } from "../../store/watchlistStore"

function Topbar() {
  const [query, setQuery] = useState("")
  const addSymbol = useWatchlistStore((state) => state.addSymbol)
  const allStocks = useStocksStore((state) => state.stocks)
  const navigate = useNavigate()

  function handleKeyDown(e) {
    if (e.key !== "Enter") return

    const upper = query.toUpperCase().trim()
    const found = allStocks.find((s) => s.symbol === upper)

    if (!found) {
      alert(`Không tìm thấy mã "${upper}"`)
      return
    }

    addSymbol(upper)
    setQuery("")
    navigate("/")
  }

  return (
    <header className="h-14 bg-[var(--color-panel)] border-b border-[var(--color-border)] flex items-center px-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập mã rồi Enter để thêm vào theo dõi..."
        className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded px-3 py-1.5 text-sm w-72 outline-none focus:border-[var(--color-brand)]"
      />
    </header>
  )
}

export default Topbar