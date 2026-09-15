// Sinh dữ liệu nến giả lập quanh mức giá hiện tại của mã, dùng seed theo symbol
// để mỗi mã luôn ra cùng 1 bộ dữ liệu (không đổi mỗi lần re-render)
function seededRandom(seed) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function seedFromSymbol(symbol) {
  return symbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function generateHistory(symbol, currentPrice, days = 60) {
  const rand = seededRandom(seedFromSymbol(symbol))
  const candles = []
  let price = currentPrice * 0.85 // giá bắt đầu cách đây `days` phiên

  for (let i = days; i >= 0; i--) {
    const open = price
    const changePercent = (rand() - 0.48) * 0.04 // dao động +-4%/phiên, hơi lệch tăng
    const close = open * (1 + changePercent)
    const high = Math.max(open, close) * (1 + rand() * 0.015)
    const low = Math.min(open, close) * (1 - rand() * 0.015)
    const volume = Math.floor(500_000 + rand() * 5_000_000)

    const date = new Date()
    date.setDate(date.getDate() - i)

    candles.push({
      date: date.toISOString().slice(0, 10),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    })

    price = close
  }

  // Đảm bảo phiên cuối cùng khớp đúng giá hiện tại đang hiển thị ở bảng giá
  candles[candles.length - 1].close = currentPrice

  return candles
}