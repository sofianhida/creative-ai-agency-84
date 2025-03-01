
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8 bg-purple inline-flex rounded-full p-4">
          <div className="h-16 w-16 rounded-full bg-purple flex items-center justify-center">
            <img 
              src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
              alt="Neko AI Logo" 
              className="h-12 w-12"
            />
          </div>
        </div>
        <h1 className="text-6xl font-bold font-display mb-4">404</h1>
        <p className="text-xl text-foreground/70 mb-8 max-w-md mx-auto">
          Oops! Halaman yang Anda cari tidak ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center btn-primary gap-2"
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
