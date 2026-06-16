import Navbar from './components/Navbar'
import VideoHeroSection from './components/VideoHeroSection'
import MediaSection from './components/MediaSection'
import StatsSection from './components/StatsSection'
import CoreBusinessSection from './components/CoreBusinessSection'
import SolutionsSection from './components/SolutionsSection'
import HistorySection from './components/HistorySection'
import DigitalFactorySection from './components/DigitalFactorySection'
import ZerotrackSection from './components/ZerotrackSection'
import ArchiveSenseSection from './components/ArchiveSenseSection'
import ResearchLabSection from './components/ResearchLabSection'
import CertificationsSection from './components/CertificationsSection'
import NewsSection from './components/NewsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="w-full">
      <Navbar />
      <VideoHeroSection />
      <MediaSection />
      <StatsSection />
      <CoreBusinessSection />
      <SolutionsSection />
      <HistorySection />
      <DigitalFactorySection />
      <ZerotrackSection />
      <ArchiveSenseSection />
      <ResearchLabSection />
      <CertificationsSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
