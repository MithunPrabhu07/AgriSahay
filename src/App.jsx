import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import ChatbotPage from './pages/ChatbotPage'
import DashboardPage from './pages/DashboardPage'
import DiseaseDetectionPage from './pages/DiseaseDetectionPage'
import HomePage from './pages/HomePage'
import MarketPricesPage from './pages/MarketPricesPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/market" element={<MarketPricesPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/disease" element={<DiseaseDetectionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
