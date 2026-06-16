import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewsManager from './pages/NewsManager'
import ContentManager from './pages/ContentManager'
import ProtectedRoute from './components/ProtectedRoute'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/"         element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/news"      element={<ProtectedRoute><NewsManager /></ProtectedRoute>} />
      <Route path="/content"   element={<ProtectedRoute><ContentManager /></ProtectedRoute>} />
      <Route path="*"          element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
