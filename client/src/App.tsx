import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
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

const SHOWCASE_UPLOAD_FORM_URL = "https://drive.google.com/drive/u/0/folders/12Cy3_AAqqdfizjQlO1h9s3h-X-7PfezV";

function ShowcaseUploadRedirect() {
  useEffect(() => {
    window.location.replace(SHOWCASE_UPLOAD_FORM_URL);
  }, []);
  return null;
}

function CharacterReferenceDownload() {
  useEffect(() => {
    document.title = "Character reference sheet";
  }, []);
  return <main style={{ minHeight: "100vh", padding: "7rem 1.5rem 4rem", background: "#FAF3E3", color: "#141B34" }}>
    <div style={{ width: "min(100%, 920px)", margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: .94, margin: "0 0 1rem", fontWeight: 900 }}>Character reference sheet</h1>
      <p style={{ maxWidth: "45rem", fontSize: "1.05rem", lineHeight: 1.45, margin: "0 0 1.5rem" }}>Use this reference while you direct your character’s look, wardrobe, and angles.</p>
      <a href="/assets/genjam/malecref.jpg" download="Character-Reference-Sheet.jpg" style={{ display: "inline-block", marginBottom: "1.5rem", padding: ".85rem 1.1rem", background: "#FF3B5C", border: "3px solid #141B34", boxShadow: "5px 5px 0 #141B34", color: "#FAF3E3", textDecoration: "none", fontSize: ".78rem", fontWeight: 900, letterSpacing: ".08em" }}>Download character sheet</a>
      <img src="/assets/genjam/malecref.jpg" alt="Character reference sheet with front, back, and head angles" style={{ display: "block", width: "100%", height: "auto", border: "4px solid #141B34", background: "#fff" }} />
    </div>
  </main>;
}

function BetterYouthWorkshopTimer() {
  const [remaining, setRemaining] = useState(4 * 60 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => { document.title = "4-hour workshop timer · Better Youth GenJam"; }, []);
  useEffect(() => {
    if (!running || remaining <= 0) return;
    const interval = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [running, remaining]);
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  return <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", background: "#141B34", color: "#FAF3E3", fontFamily: "Arial, sans-serif" }}>
    <section style={{ width: "min(100%, 940px)", textAlign: "center" }}>
      <p style={{ margin: "0 0 1.2rem", letterSpacing: ".18em", fontSize: ".8rem", fontWeight: 800 }}>Better Youth · GenJam</p>
      <h1 style={{ margin: "0", fontSize: "clamp(2.5rem, 7vw, 6.7rem)", lineHeight: ".88", fontWeight: 900 }}>Workshop timer</h1>
      <p style={{ margin: "1.15rem auto 2rem", maxWidth: "42rem", fontSize: "1rem", lineHeight: 1.45 }}>Four-hour work block. Keep this tab open while you present the deck.</p>
      <div style={{ border: "4px solid #FAF3E3", background: "#FF3B5C", boxShadow: "12px 12px 0 #FFD93D", padding: "clamp(1.25rem, 4vw, 3rem)", fontSize: "clamp(3.4rem, 12vw, 10rem)", fontWeight: 900, lineHeight: ".9", letterSpacing: "-.06em" }}>{`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</div>
      <div style={{ display: "flex", justifyContent: "center", gap: ".8rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <button type="button" onClick={() => setRunning((value) => !value)} style={{ border: "3px solid #FAF3E3", background: "#CCFF33", color: "#141B34", boxShadow: "5px 5px 0 #FAF3E3", padding: ".85rem 1.15rem", fontWeight: 900, letterSpacing: ".08em", cursor: "pointer" }}>{running ? "Pause timer" : "Start timer"}</button>
        <button type="button" onClick={() => { setRunning(false); setRemaining(4 * 60 * 60); }} style={{ border: "3px solid #FAF3E3", background: "transparent", color: "#FAF3E3", padding: ".85rem 1.15rem", fontWeight: 900, letterSpacing: ".08em", cursor: "pointer" }}>Reset</button>
      </div>
    </section>
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
      <Route path={"/genjam/better-youth-timer"} component={BetterYouthWorkshopTimer} />
      <Route path={"/genjam/better-youth-0829"} component={BetterYouthGenJam} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isLiveDeck = location.startsWith("/genjam/better-youth-0829") || location.startsWith("/genjam/better-youth-timer") || location === "/cref";
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
