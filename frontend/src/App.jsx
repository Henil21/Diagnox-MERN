import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brain from "./pages/Brain/Brain";
import Footer from "./components/Footer";
import Diabetes from "./pages/Diabetes/Diabetes";
import Navbar from "./components/Navbar";
import "./index.css";
import VisionAssist from "./pages/vision/VisionAssist";
import Contact from "./pages/Contact/Contact";
import HeartDiagnosis from "./pages/HeartAttack/HeartDiagnosis";
import MedicineRecommendation from "./pages/Medicines/MedicineRecommendation";
import Home from "./pages/Home/Home";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/brain" element={<Brain />} />
            <Route path="/diabetes" element={<Diabetes />} />
            <Route path="/vision-assist" element={<VisionAssist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/heart-attack" element={<HeartDiagnosis />} />
            <Route path="/medicine-recommendation" element={<MedicineRecommendation />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
