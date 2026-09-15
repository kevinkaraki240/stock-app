function CandlestickChart({ data, height = 320 }) {
  const width = 900
  const padding = { top: 16, right: 16, bottom: 24, left: 56 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const allHighs = data.map((d) => d.high)
  const allLows = data.map((d) => d.low)
  const maxPrice = Math.max(...allHighs)
  const minPrice = Math.min(...allLows)
  const priceRange = maxPrice - minPrice || 1

  const candleSlot = chartWidth / data.length
  const candleWidth = Math.max(2, candleSlot * 0.6)

  function yFor(price) {
    return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight
  }

  function xFor(index) {
    return padding.left + index * candleSlot + candleSlot / 2
  }

  // 4 mốc giá làm lưới tham chiếu
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => minPrice + priceRange * f)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {gridLines.map((price, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={yFor(price)}
            y2={yFor(price)}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <text
            x={padding.left - 8}
            y={yFor(price)}
            textAnchor="end"
            dominantBaseline="middle"
            className="tabular"
            fontSize="11"
            fill="var(--color-text-muted)"
          >
            {price.toFixed(1)}
          </text>
        </g>
      ))}

      {data.map((candle, i) => {
        const isUp = candle.close >= candle.open
        const color = isUp ? "var(--color-up)" : "var(--color-down)"
        const bodyTop = yFor(Math.max(candle.open, candle.close))
        const bodyBottom = yFor(Math.min(candle.open, candle.close))
        const bodyHeight = Math.max(1, bodyBottom - bodyTop)
        const x = xFor(i)

        return (
          <g key={candle.date}>
            {/* Râu nến (high-low) */}
            <line
              x1={x}
              x2={x}
              y1={yFor(candle.high)}
              y2={yFor(candle.low)}
              stroke={color}
              strokeWidth="1"
            />
            {/* Thân nến (open-close) */}
            <rect
              x={x - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={color}
            />
          </g>
        )
      })}
    </svg>
  )
}

export default CandlestickChart