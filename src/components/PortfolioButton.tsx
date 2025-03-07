
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioButton = () => {
  return (
    <Link to="/portfolio" className="fixed bottom-24 right-6 z-40 md:bottom-8 md:right-24">
      <Button className="rounded-full shadow-lg bg-white text-purple hover:bg-purple hover:text-white border border-purple/30 p-3 h-auto">
        <BookIcon size={20} />
        <span className="ml-2 font-medium">Portfolio</span>
      </Button>
    </Link>
  );
};

export default PortfolioButton;
