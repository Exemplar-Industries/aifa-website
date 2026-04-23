import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AffiliateLinkProvider } from "./contexts/AffiliateLinkContext";
import Home from "./pages/Home";
import Consulting from "./pages/Consulting";
import Certification from "./pages/Certification";
import LPV3 from "./pages/LPV3";
import Invite from "./pages/Invite";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/consulting"} component={Consulting} />
      <Route path={"/certification"} component={Certification} />
      <Route path={"/lpv3"} component={LPV3} />
      <Route path={"/anthum-exclusive"} component={Invite} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AffiliateLinkProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AffiliateLinkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
