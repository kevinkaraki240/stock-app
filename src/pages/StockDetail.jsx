import { useParams, Link } from "react-router-dom"
import { useStocksStore } from "../store/stocksStore"
import { generateHistory } from "../services/mockHistory"
import { PriceCell } from "../components/watchlist/PriceCell"
import CandlestickChart from "../components/charts/CandlestickChart"
import { useWatchlistStore } from "../store/watchlistStore"
import TradeForm from "../components/portfolio/TradeForm"
function StockDetail() {
  const { symbol } = useParams()
  const stock = useStocksStore((state) => state.getStock(symbol))

  const hasSymbol = useWatchlistStore((state) => state.hasSymbol)
  const addSymbol = useWatchlistStore((state) => state.addSymbol)
  const removeSymbol = useWatchlistStore((state) => state.removeSymbol)

  if (!stock) {
    return (
      <div>
        <p className="text-[var(--color-text-muted)]">
          Không tìm thấy mã "{symbol}".
        </p>
        <Link to="/" className="text-[var(--color-brand)] text-sm">
          ← Quay lại bảng giá
        </Link>
      </div>
    )
  }

  const history = generateHistory(stock.symbol, stock.price)
  const isFollowing = hasSymbol(stock.symbol)

  return (
    <div>
      <Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        ← Bảng giá
      </Link>

      <div className="flex items-start justify-between mt-3 mb-6">
        <div>
          <h1 className="text-3xl font-semibold tabular">{stock.symbol}</h1>
          <p className="text-[var(--color-text-muted)]">{stock.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <PriceCell stock={stock} />
          <button
            onClick={() =>
              isFollowing ? removeSymbol(stock.symbol) : addSymbol(stock.symbol)
            }
            className={`text-sm px-4 py-2 rounded border transition-colors ${
              isFollowing
                ? "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-down)] hover:text-[var(--color-down)]"
                : "border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-bg)]"
            }`}
          >
            {isFollowing ? "Bỏ theo dõi" : "+ Theo dõi"}
          </button>
        </div>
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mb-6">
        <div className="border border-[var(--color-border)] rounded-lg p-4">
            <CandlestickChart data={history} />
        </div>
        <TradeForm stock={stock} />
     </div> 

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard label="Tham chiếu" value={stock.ref.toFixed(2)} />
        <InfoCard label="Trần" value={stock.ceiling.toFixed(2)} color="var(--color-ceiling)" />
        <InfoCard label="Sàn" value={stock.floor.toFixed(2)} color="var(--color-floor)" />
        <InfoCard label="Khối lượng" value={stock.volume.toLocaleString("vi-VN")} />
      </div>
    </div>
  )
}

function InfoCard({ label, value, color }) {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4">
      <div className="text-xs text-[var(--color-text-muted)] mb-1">{label}</div>
      <div className="tabular font-medium" style={color ? { color } : undefined}>
        {value}
      </div>
    </div>
  )
}

export default StockDetail