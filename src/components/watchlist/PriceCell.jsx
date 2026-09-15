// Xác định trạng thái giá theo đúng quy ước sàn chứng khoán Việt Nam
export function getPriceStatus(stock) {
  const { price, ref, ceiling, floor } = stock

  if (price >= ceiling) return "ceiling" // tím - tăng trần
  if (price <= floor) return "floor"     // xanh lam - giảm sàn
  if (price > ref) return "up"           // xanh lá - tăng
  if (price < ref) return "down"         // đỏ - giảm
  return "ref"                           // vàng - đứng giá
}

const statusColor = {
  up: "var(--color-up)",
  down: "var(--color-down)",
  ref: "var(--color-ref)",
  ceiling: "var(--color-ceiling)",
  floor: "var(--color-floor)",
}

export function PriceCell({ stock }) {
  const status = getPriceStatus(stock)
  const diff = stock.price - stock.ref
  const percent = (diff / stock.ref) * 100

  return (
    <div className="tabular text-right" style={{ color: statusColor[status] }}>
      <div className="font-medium">{stock.price.toFixed(2)}</div>
      <div className="text-xs">
        {diff >= 0 ? "+" : ""}
        {diff.toFixed(2)} ({percent >= 0 ? "+" : ""}
        {percent.toFixed(2)}%)
      </div>
    </div>
  )
}