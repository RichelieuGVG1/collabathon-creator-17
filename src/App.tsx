import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Hackathons from "./pages/Hackathons";
import HackathonDetail from "./pages/HackathonDetail";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import CreateTeamForm from "./components/CreateTeamForm";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import UsersWithoutTeam from "./pages/UsersWithoutTeam";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/hackathons/:id" element={<HackathonDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/teams/create" element={<CreateTeamForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/users-without-team" element={<UsersWithoutTeam />} />
          <Route path="/teams/:teamId/invite" element={<UsersWithoutTeam />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
