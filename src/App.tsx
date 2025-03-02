
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
