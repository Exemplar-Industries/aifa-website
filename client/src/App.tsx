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
import LPv2 from "./pages/LPv2";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/consulting"} component={Consulting} />
      <Route path={"/certification"} component={Certification} />
      <Route path={"/lpv2"} component={LPv2} />
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
