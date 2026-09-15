import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import StockDetail from "./pages/StockDetail"
import Portfolio from "./pages/Portfolio"
import Sidebar from "./components/layout/Sidebar"
import Topbar from "./components/layout/Topbar"
import { useStockSocket } from "./hooks/useStockSocket"

function App() {
  useStockSocket()

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stock/:symbol" element={<StockDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App