import { Footer } from "@/components/layout";
import HomeContent from "@/components/home/HomeContent";
import AdSpace from "@/components/ui/AdSpace";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Client Component con Header dinámico */}
      <HomeContent />

      {/* Ad Space */}
      <div className="container mx-auto px-4 py-8">
        <AdSpace 
          width="w-full max-w-6xl mx-auto" 
          height="h-24" 
          label="Publicidad inferior"
        />
      </div>

      <Footer />
    </div>
  );
}
