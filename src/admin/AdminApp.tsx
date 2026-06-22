import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewsManager from './pages/NewsManager'
import HistoryManager from './pages/HistoryManager'
import SolutionsManager from './pages/SolutionsManager'
import PortfolioManager from './pages/PortfolioManager'
import PartnersManager from './pages/PartnersManager'
import ContentManager from './pages/ContentManager'
import ProtectedRoute from './components/ProtectedRoute'

export default function AdminApp() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="news"       element={<ProtectedRoute><NewsManager /></ProtectedRoute>} />
      <Route path="history"    element={<ProtectedRoute><HistoryManager /></ProtectedRoute>} />
      <Route path="solutions"  element={<ProtectedRoute><SolutionsManager /></ProtectedRoute>} />
      <Route path="portfolio"  element={<ProtectedRoute><PortfolioManager /></ProtectedRoute>} />
      <Route path="partners"   element={<ProtectedRoute><PartnersManager /></ProtectedRoute>} />
      <Route path="content"    element={<ProtectedRoute><ContentManager /></ProtectedRoute>} />
      <Route path="*"          element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
