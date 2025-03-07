
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PortfolioButton = () => {
  return (
    <Link to="/portfolio" className="fixed top-24 right-6 z-40 md:top-8 md:right-8">
      <Button className="rounded-full shadow-lg bg-purple text-white hover:bg-white hover:text-purple border border-purple/30 p-3 h-auto">
        <BookIcon size={20} />
        <span className="ml-2 font-medium">Portfolio</span>
      </Button>
    </Link>
  );
};

export default PortfolioButton;
