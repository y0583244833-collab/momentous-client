import Box from "@mui/material/Box";
import HomeNav from "../components/home/HomeNav";
import HeroSection from "../components/home/HeroSection";
import ExperiencesSection from "../components/home/ExperiencesSection";
import ShareTypesSection from "../components/home/ShareTypesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ClosingSection from "../components/home/ClosingSection";
import Footer from "../components/Footer";

const HomePage = () => (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <HomeNav />
        <Box component="main" sx={{ flex: 1 }}>
            <HeroSection />
            <ExperiencesSection />
            <ShareTypesSection />
            <HowItWorksSection />
            <ClosingSection />
        </Box>
        <Footer />
    </Box>
);

export default HomePage;
