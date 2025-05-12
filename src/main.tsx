import { useEffect, useState } from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoadingScreen } from "./components/LoadingScreen";
import { ProfileSelector } from "./components/ProfileSelector";
import { AboutSection } from "./components/about/AboutSection";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { ContactSection } from "./components/contact/ContactSection";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./components/NotFound";

import "./index.css";

import '../src/translation/config';

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<ProfileSelector />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </Router>
    
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
