import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { ProfileSelector } from "./components/ProfileSelector";
import { AboutSection } from "./components/about/AboutSection";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
  <>
    <Router>
      

        <Routes>
          <Route path="/" element={<ProfileSelector/>} />
          <Route path="/about" element={<AboutSection/>}/>
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      <Navbar/>
      
    </Router>
  </>
  );
}

export default App;
