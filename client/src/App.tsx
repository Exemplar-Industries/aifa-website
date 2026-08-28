import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch, useLocation } from "wouter";
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
import Showcase from "./pages/Showcase";
import BetterYouthGenJam from "./pages/BetterYouthGenJam";
import Seo from "./components/Seo";

const SHOWCASE_UPLOAD_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfxxjVTC8xrbIV9DQbcEPWFVcMFyPBMy_5Nbp4HsUlo1AaRcA/viewform";

function ShowcaseUploadRedirect() {
  useEffect(() => {
    window.location.replace(SHOWCASE_UPLOAD_FORM_URL);
  }, []);
  return null;
}

function CharacterReferenceDownload() {
  useEffect(() => {
    document.title = "Character reference sheet · Better Youth GenJam";
  }, []);
  return <main style={{ minHeight: "100vh", padding: "7rem 1.5rem 4rem", background: "#FAF3E3", color: "#141B34" }}>
    <div style={{ width: "min(100%, 920px)", margin: "0 auto" }}>
      <p style={{ fontSize: ".78rem", fontWeight: 800, letterSpacing: ".16em", marginBottom: ".75rem" }}>BETTER YOUTH · GENJAM RESOURCE</p>
      <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: .94, margin: "0 0 1rem", fontWeight: 900 }}>Character reference sheet</h1>
      <p style={{ maxWidth: "45rem", fontSize: "1.05rem", lineHeight: 1.45, margin: "0 0 1.5rem" }}>Open this reference alongside Google Flow while you direct your character’s look, wardrobe, and angles.</p>
      <a href="/assets/genjam/malecref.jpg" download="Better-Youth-Character-Reference.jpg" style={{ display: "inline-block", marginBottom: "1.5rem", padding: ".85rem 1.1rem", background: "#FF3B5C", border: "3px solid #141B34", boxShadow: "5px 5px 0 #141B34", color: "#FAF3E3", textDecoration: "none", fontSize: ".78rem", fontWeight: 900, letterSpacing: ".08em" }}>DOWNLOAD CHARACTER SHEET</a>
      <img src="/assets/genjam/malecref.jpg" alt="Better Youth character reference sheet with front, back, and head angles" style={{ display: "block", width: "100%", height: "auto", border: "4px solid #141B34", background: "#fff" }} />
    </div>
  </main>;
}

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
      <Route path={"/events"}><Redirect to="/" /></Route>
      <Route path={"/genjam-freebie"} component={GenJamFreebie} />
      <Route path={"/genjam-offer"} component={GenJamOffer} />
      <Route path={"/cref"} component={CharacterReferenceDownload} />
      <Route path={"/genjam/character-sheet"} component={CharacterReferenceDownload} />
      <Route path={"/genjam/submit"} component={ShowcaseUploadRedirect} />
      <Route path={"/genjam/better-youth-0829"} component={BetterYouthGenJam} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isLiveDeck = location.startsWith("/genjam/better-youth-0829");
  return (
      <ErrorBoundary>
        <Seo />
        <AffiliateLinkProvider>
        <TooltipProvider>
          <Toaster />
          {isLiveDeck ? <Router /> : <div className="aifa-readable"><Navbar /><Router /><Footer /></div>}
        </TooltipProvider>
      </AffiliateLinkProvider>
    </ErrorBoundary>
  );
}

export default App;
