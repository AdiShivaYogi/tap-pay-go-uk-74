
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import UserAuth from "./pages/UserAuth";
import Admin from "./pages/Admin";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Backups from "./pages/Backups";
import Translations from "./pages/Translations";
import StyleGuide from "./components/docs/StyleGuide";
import Onboarding from "./pages/Onboarding";
import Api from "./pages/Api";
import Status from "./pages/Status";
import ConnectStripe from "./pages/ConnectStripe";
import DesignSystem from "./pages/DesignSystem";
import UserProfile from "./pages/UserProfile";
import BillingSettings from "./pages/BillingSettings";
import NotificationSettings from "./pages/NotificationSettings";
import Agents from "./pages/Agents";
import AgentAdmin from "./pages/AgentAdmin";
import AgentMonitoring from "./pages/AgentMonitoring";
import UnifiedAgentManagement from "./pages/UnifiedAgentManagement";
import AgentCentralCommand from "./pages/AgentCentralCommand";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/help" element={<Help />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/profile" element={<UserProfile />} />
      <Route path="/account/billing" element={<BillingSettings />} />
      <Route path="/account/notifications" element={<NotificationSettings />} />
      <Route path="/backups" element={<Backups />} />
      <Route path="/translations" element={<Translations />} />
      <Route path="/style-guide" element={<StyleGuide />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/api" element={<Api />} />
      <Route path="/status" element={<Status />} />
      <Route path="/connect-stripe" element={<ConnectStripe />} />
      <Route path="/agents" element={<Agents />} />
      
      {/* Noua pagină unificată */}
      <Route path="/agent-central-command" element={<AgentCentralCommand />} />
      
      {/* Păstrăm rutele vechi temporar pentru compatibilitate */}
      <Route path="/agent-admin" element={<AgentCentralCommand />} />
      <Route path="/agent-monitoring" element={<AgentCentralCommand />} />
      <Route path="/agent-management" element={<AgentCentralCommand />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
