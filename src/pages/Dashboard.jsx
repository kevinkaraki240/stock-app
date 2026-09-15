import Watchlist from "../components/watchlist/Watchlist"

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Bảng giá</h1>
      <Watchlist />
    </div>
  )
}

export default Dashboard