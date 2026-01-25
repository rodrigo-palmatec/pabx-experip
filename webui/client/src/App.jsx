import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Extensions from './pages/Extensions'
import Trunks from './pages/Trunks'
import Calls from './pages/Calls'
import System from './pages/System'
import Categories from './pages/Categories'
import Groups from './pages/Groups'
import Queues from './pages/Queues'
import ServiceHours from './pages/ServiceHours'
import Reports from './pages/Reports'
import Blacklist from './pages/Blacklist'
import Profiles from './pages/Profiles'
import CostCenters from './pages/CostCenters'
import Conferences from './pages/Conferences'
import IVRs from './pages/IVRs'
import Contacts from './pages/Contacts'
import Holidays from './pages/Holidays'
import InboundRoutes from './pages/InboundRoutes'
import OutboundRoutes from './pages/OutboundRoutes'
import ClickToCall from './pages/ClickToCall'
import MusicOnHold from './pages/MusicOnHold'
import Callbacks from './pages/Callbacks'
import ExtensionPanel from './pages/ExtensionPanel'
import CustomRules from './pages/CustomRules'
import Recordings from './pages/Recordings'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="extensions" element={<Extensions />} />
            <Route path="trunks" element={<Trunks />} />
            <Route path="calls" element={<Calls />} />
            <Route path="system" element={<System />} />
            <Route path="categories" element={<Categories />} />
            <Route path="groups" element={<Groups />} />
            <Route path="queues" element={<Queues />} />
            <Route path="service-hours" element={<ServiceHours />} />
            <Route path="reports" element={<Reports />} />
            <Route path="blacklist" element={<Blacklist />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="cost-centers" element={<CostCenters />} />
            <Route path="conferences" element={<Conferences />} />
            <Route path="ivrs" element={<IVRs />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="inbound-routes" element={<InboundRoutes />} />
            <Route path="outbound-routes" element={<OutboundRoutes />} />
            <Route path="click-to-call" element={<ClickToCall />} />
            <Route path="moh" element={<MusicOnHold />} />
            <Route path="callbacks" element={<Callbacks />} />
            <Route path="extension-panel" element={<ExtensionPanel />} />
            <Route path="custom-rules" element={<CustomRules />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
