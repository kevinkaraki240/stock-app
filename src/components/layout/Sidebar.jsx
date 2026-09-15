import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-16 bg-[var(--color-panel)] border-r border-[var(--color-border)] flex flex-col items-center py-4 gap-4">
      <Link to="/" className="text-[var(--color-brand)] font-bold">
        VN
      </Link>
      <Link to="/portfolio" className="text-[var(--color-text-muted)] text-sm">
        DM
      </Link>
    </aside>
  )
}

export default Sidebar