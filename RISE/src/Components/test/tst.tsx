import React, { useEffect, useState } from "react";
import "./FibonacciDiv.scss";

function generateFibonacci(n: number): number[] {
  const fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

const FibonacciDiv = () => {
  const [size, setSize] = useState(500); // Initial size of the div
  const fibSequence = generateFibonacci(10); // Generate 10 terms of the Fibonacci sequence
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSize(fibSequence[currentStep]);
      setCurrentStep((prevStep) => (prevStep + 1) % fibSequence.length);
    }, 1000); // Change size every 1 second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentStep, fibSequence]);

  return (
    <div className="fibonacci-container">
      <div className="fibonacci-div" style={{ width: size, height: size }}>
        Fibonacci Size: {size}
      </div>
    </div>
  );
};

export default FibonacciDiv;
