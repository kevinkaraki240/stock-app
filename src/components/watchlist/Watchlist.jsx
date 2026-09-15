import { Link } from "react-router-dom"
import { useStocksStore } from "../../store/stocksStore"
import { PriceCell } from "./PriceCell"
import { useWatchlistStore } from "../../store/watchlistStore"

function formatVolume(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + "M"
  if (v >= 1_000) return (v / 1_000).toFixed(0) + "K"
  return v
}

function Watchlist() {
  const symbols = useWatchlistStore((state) => state.symbols)
  const removeSymbol = useWatchlistStore((state) => state.removeSymbol)
  const allStocks = useStocksStore((state) => state.stocks)
  const isLoading = useStocksStore((state) => state.isLoading)

  const stocks = allStocks.filter((s) => symbols.includes(s.symbol))

  if (isLoading) {
    return (
      <div className="border border-[var(--color-border)] rounded-lg p-8 text-center text-[var(--color-text-muted)]">
        Đang tải dữ liệu...
      </div>
    )
  }

  if (stocks.length === 0) {
    return (
      <div className="border border-[var(--color-border)] rounded-lg p-8 text-center text-[var(--color-text-muted)]">
        Danh mục theo dõi đang trống. Tìm mã ở thanh phía trên để thêm.
      </div>
    )
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--color-panel)] text-[var(--color-text-muted)] text-xs">
            <th className="text-left font-normal px-4 py-3">Mã CK</th>
            <th className="text-right font-normal px-4 py-3">Giá / +-%</th>
            <th className="text-right font-normal px-4 py-3">Cao</th>
            <th className="text-right font-normal px-4 py-3">Thấp</th>
            <th className="text-right font-normal px-4 py-3">KL</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr
              key={stock.symbol}
              className="border-t border-[var(--color-border)] hover:bg-[var(--color-panel-hover)] group"
            >
              <td className="px-4 py-3">
                <Link to={`/stock/${stock.symbol}`} className="block">
                  <div className="font-semibold tabular">{stock.symbol}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{stock.name}</div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <PriceCell stock={stock} />
              </td>
              <td className="px-4 py-3 text-right tabular text-[var(--color-text-muted)]">
                {stock.high.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right tabular text-[var(--color-text-muted)]">
                {stock.low.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right tabular text-[var(--color-text-muted)]">
                {formatVolume(stock.volume)}
              </td>
              <td className="px-2">
                <button
                  onClick={() => removeSymbol(stock.symbol)}
                  className="opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)] hover:text-[var(--color-down)] transition-opacity px-2"
                  title="Bỏ theo dõi"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Watchlist