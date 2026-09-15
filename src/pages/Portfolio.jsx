import { Link } from "react-router-dom"
import { useStocksStore } from "../store/stocksStore"
import { usePortfolioStore } from "../store/portfolioStore"

function Portfolio() {
  const cash = usePortfolioStore((s) => s.cash)
  const holdings = usePortfolioStore((s) => s.holdings)
  const reset = usePortfolioStore((s) => s.reset)
  const allStocks = useStocksStore((s) => s.stocks)

  const rows = holdings.map((h) => {
    const stock = allStocks.find((s) => s.symbol === h.symbol)
    const currentPrice = stock?.price ?? h.avgPrice
    const marketValue = h.quantity * currentPrice
    const costValue = h.quantity * h.avgPrice
    const pnl = marketValue - costValue
    const pnlPercent = (pnl / costValue) * 100

    return { ...h, currentPrice, marketValue, pnl, pnlPercent }
  })

  const totalMarketValue = rows.reduce((sum, r) => sum + r.marketValue, 0)
  const totalPnl = rows.reduce((sum, r) => sum + r.pnl, 0)
  const netWorth = cash + totalMarketValue

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Danh mục của tôi</h1>
        <button
          onClick={() => {
            if (confirm("Đặt lại toàn bộ danh mục về vốn ban đầu?")) reset()
          }}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-down)] border border-[var(--color-border)] rounded px-3 py-1.5"
        >
          Đặt lại
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard label="Tổng tài sản" value={netWorth} />
        <SummaryCard label="Tiền mặt" value={cash} />
        <SummaryCard
          label="Lãi/lỗ chưa thực hiện"
          value={totalPnl}
          color={totalPnl >= 0 ? "var(--color-up)" : "var(--color-down)"}
          signed
        />
      </div>

      {rows.length === 0 ? (
        <div className="border border-[var(--color-border)] rounded-lg p-8 text-center text-[var(--color-text-muted)]">
          Chưa có cổ phiếu nào. Vào{" "}
          <Link to="/" className="text-[var(--color-brand)]">
            bảng giá
          </Link>{" "}
          chọn mã để đặt lệnh mua thử.
        </div>
      ) : (
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-panel)] text-[var(--color-text-muted)] text-xs">
                <th className="text-left font-normal px-4 py-3">Mã CK</th>
                <th className="text-right font-normal px-4 py-3">KL</th>
                <th className="text-right font-normal px-4 py-3">Giá vốn</th>
                <th className="text-right font-normal px-4 py-3">Giá hiện tại</th>
                <th className="text-right font-normal px-4 py-3">Giá trị</th>
                <th className="text-right font-normal px-4 py-3">Lãi/lỗ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.symbol} className="border-t border-[var(--color-border)]">
                  <td className="px-4 py-3 font-semibold tabular">
                    <Link to={`/stock/${row.symbol}`}>{row.symbol}</Link>
                  </td>
                  <td className="px-4 py-3 text-right tabular">{row.quantity}</td>
                  <td className="px-4 py-3 text-right tabular text-[var(--color-text-muted)]">
                    {row.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right tabular">{row.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right tabular">
                    {row.marketValue.toLocaleString("vi-VN")}
                  </td>
                  <td
                    className="px-4 py-3 text-right tabular"
                    style={{ color: row.pnl >= 0 ? "var(--color-up)" : "var(--color-down)" }}
                  >
                    {row.pnl >= 0 ? "+" : ""}
                    {row.pnl.toLocaleString("vi-VN")} ({row.pnlPercent.toFixed(2)}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function SummaryCard({ label, value, color, signed }) {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4">
      <div className="text-xs text-[var(--color-text-muted)] mb-1">{label}</div>
      <div className="tabular text-lg font-medium" style={color ? { color } : undefined}>
        {signed && value >= 0 ? "+" : ""}
        {value.toLocaleString("vi-VN")} đ
      </div>
    </div>
  )
}

export default Portfolio