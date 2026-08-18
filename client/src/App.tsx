import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AffiliateLinkProvider } from "./contexts/AffiliateLinkContext";
import Home from "./pages/Home";
import Consulting from "./pages/Consulting";
import Certification from "./pages/Certification";
import CertificationStatus from "./pages/CertificationStatus";
import LPV3 from "./pages/LPV3";
import Invite from "./pages/Invite";
import LiveExclusive from "./pages/LiveExclusive";
import FAQ from "./pages/FAQ";
import Connect from "./pages/Connect";
import InternalLessons from "./pages/InternalLessons";
import SlideViewer from "./pages/SlideViewer";
import Masterclass from "./pages/Masterclass";
import FreeVideoTraining from "./pages/FreeVideoTraining";
import GenJamFreebie from "./pages/GenJamFreebie";
import GenJamOffer from "./pages/GenJamOffer";
import Membership from "./pages/Membership";
import MembershipSuccess from "./pages/MembershipSuccess";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Productions from "./pages/Productions";
import EducationEvents from "./pages/EducationEvents";
import Events from "./pages/Events";
import Showcase from "./pages/Showcase";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/showcase"} component={Showcase} />
      <Route path={"/connect"} component={Connect} />
      <Route path={"/consulting"} component={Consulting} />
      <Route path={"/certification"} component={Certification} />
      <Route path={"/certification-status"} component={CertificationStatus} />
      <Route path={"/lpv3"} component={LPV3} />
      <Route path={"/anthum-exclusive"} component={Invite} />
      <Route path={"/live-exclusive"} component={LiveExclusive} />
      <Route path={"/internal/lessons"} component={InternalLessons} />
      <Route path={"/lessons/:week"} component={SlideViewer} />
      <Route path={"/masterclass"} component={Masterclass} />
      <Route path={"/free-video-training"} component={FreeVideoTraining} />
      <Route path={"/membership"} component={Membership} />
      <Route path={"/membership/success"} component={MembershipSuccess} />
      <Route path={"/refund-policy"} component={RefundPolicy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/work-with-us"} component={Contact} />
      <Route path={"/productions"} component={Productions} />
      <Route path={"/education-events"} component={EducationEvents} />
      <Route path={"/events"} component={Events} />
      <Route path={"/genjam-freebie"} component={GenJamFreebie} />
      <Route path={"/genjam-offer"} component={GenJamOffer} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AffiliateLinkProvider>
        <TooltipProvider>
          <Toaster />
          <div className="aifa-readable">
            <Navbar />
            <Router />
            <Footer />
          </div>
        </TooltipProvider>
      </AffiliateLinkProvider>
    </ErrorBoundary>
  );
}

export default App;
