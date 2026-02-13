import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SurveyCard from "@/components/SurveyCard";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleParticipate = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <SurveyCard onParticipate={handleParticipate} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
