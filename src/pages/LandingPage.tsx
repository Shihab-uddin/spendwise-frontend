import AuthForm from "../components/AuthForm";
import { JSX, useState, useEffect } from "react";

const LandingPage = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ["Income", "Expenses", "Daily Transactions"];
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for fade-out animation to complete before changing text
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
      
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full md:flex items-center justify-start bg-gray-100 p-8">
        <div className="space-y-6 text-left max-w-md md:ml-8 lg:ml-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Track Your{" "}
            <br />
            <span 
              className={`text-blue-600 inline-block transition-opacity duration-1000 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              {phrases[currentIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Take control of your finances with our intuitive tracking and management platform.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-900 p-4">
        <AuthForm />
      </div>
    </div>
  );
};

export default LandingPage;