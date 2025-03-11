
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Home, RotateCcw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Card = {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
};

const icons = ['🤖', '🧠', '💻', '⚙️', '🔍', '📊', '💡', '🌐'];

const GamePage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const { toast } = useToast();

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards with icons
    const cardPairs = [...icons, ...icons].map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false,
    }));

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameOver(false);
    setTimer(0);
    
    if (timerInterval) {
      window.clearInterval(timerInterval);
    }
    
    setGameStarted(true);
    const interval = window.setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    setTimerInterval(interval as unknown as number);
  };

  // Handle game completion
  useEffect(() => {
    if (gameStarted && matchedPairs === icons.length) {
      if (timerInterval) {
        window.clearInterval(timerInterval);
      }
      setGameOver(true);
      toast({
        title: "Game Complete! 🎉",
        description: `You completed the game in ${moves} moves and ${formatTime(timer)}.`,
      });
    }
  }, [matchedPairs, gameStarted, moves, timer, timerInterval, toast]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle card flip
  const handleCardClick = (id: number) => {
    // If two cards are already flipped and not yet evaluated, or clicked on already matched card, do nothing
    if (flippedCards.length === 2 || cards[id].matched) return;
    
    // Prevent clicking the same card
    if (flippedCards.length === 1 && flippedCards[0] === id) return;

    // Add clicked card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Update the cards state
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      if (cards[firstId].icon === cards[secondId].icon) {
        // Match found
        setMatchedPairs(prev => prev + 1);
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, matched: true } 
            : card
        ));
        setFlippedCards([]);
      } else {
        // No match, flip them back after a delay
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, flipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
              <span className="flex items-center justify-center gap-2">
                AI Memory Game <Brain className="text-purple h-6 w-6 animate-pulse" />
              </span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Test your memory by matching pairs of AI-themed icons. Find all pairs with the fewest moves!
            </p>
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <div className="glass-card flex items-center justify-center p-3">
              <Trophy className="h-5 w-5 text-purple mr-2" />
              <span className="font-medium">Moves: {moves}</span>
            </div>
            
            <div className="glass-card flex items-center justify-center p-3">
              <span className="font-medium">Time: {formatTime(timer)}</span>
            </div>
            
            <div className="glass-card flex items-center justify-center p-3">
              <span className="font-medium">Matches: {matchedPairs}/{icons.length}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={initializeGame} 
              variant="default" 
              className="bg-purple hover:bg-purple-dark"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {gameStarted ? 'Restart Game' : 'Start Game'}
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {gameStarted ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`card-3d w-full aspect-square rounded-lg ${card.flipped ? 'flipped' : ''} 
                           ${card.matched ? 'matched bg-purple/10 border-purple/30' : 'bg-white/80'}
                           border-2 ${card.flipped && !card.matched ? 'border-purple' : 'border-purple/10'}
                           flex items-center justify-center text-4xl cursor-pointer transition-all duration-300
                           hover:shadow-glow hover:border-purple/50`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className={`card-content ${card.flipped || card.matched ? 'visible' : 'invisible'}`}>
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-medium mb-4">How to Play</h3>
              <p className="mb-4">Click 'Start Game' to begin. Flip cards to find matching pairs. Remember the positions to match them with fewer moves!</p>
              <div className="flex justify-center">
                <Button 
                  onClick={initializeGame} 
                  variant="default" 
                  className="bg-purple hover:bg-purple-dark"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Start Game
                </Button>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="mt-8 glass-card max-w-lg mx-auto text-center bg-purple/10 border-purple/30">
              <h3 className="text-xl font-bold mb-2">🎉 Game Complete!</h3>
              <p className="mb-4">You completed the game in {moves} moves and {formatTime(timer)}.</p>
              <Button 
                onClick={initializeGame} 
                variant="default" 
                className="bg-purple hover:bg-purple-dark"
              >
                Play Again
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamePage;
