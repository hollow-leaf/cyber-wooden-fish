import WoodenFishIcon from "@/assets/wooden-fish-icon";
import "./pump-game.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export default function PumpGame() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const velocity = useRef(0);
  const lastBounceTime = useRef(0);
  const gravity = 0.9;
  const bounceVelocity = 15; // Upward velocity during bounce

  useEffect(() => {
    let motionListener: any;
    if (isRunning) {
      motionListener = (event: DeviceMotionEvent) => {
        const zTilt = event.accelerationIncludingGravity?.z || 0; // Tilt along the Z-axis
        const currentTime = Date.now();

        if (
          zTilt > 9.5 &&
          position === 0 &&
          currentTime - lastBounceTime.current >= 100
        ) {
          // Trigger bounce
          velocity.current = bounceVelocity;
          lastBounceTime.current = currentTime;
          setScore((prev) => prev + 1);
        }
      };

      // Listen to device motion events
      window.addEventListener("devicemotion", motionListener);
    }

    return () => {
      if (motionListener)
        window.removeEventListener("devicemotion", motionListener);
    };
  }, [isRunning, position]);

  // Update position
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          let newVelocity = velocity.current - gravity;
          let newPosition = prevPosition + newVelocity;

          if (newPosition <= 0) {
            newPosition = 0;
            velocity.current = 0;
          } else {
            velocity.current = newVelocity;
          }

          return newPosition;
        });
      }, 16); // Approximately 60fps
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Timer
  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startGame = () => {
    setTimeLeft(60);
    setScore(0); // Reset score
    setPosition(0); // Reset ball position
    velocity.current = 0; // Reset velocity
    lastBounceTime.current = 0; // Reset last bounce time
    setIsRunning(true); // Start the game
  };

  return (
    <div className="relative h-full w-full items-center justify-center">
      {
        //   <div className="absolute left-0 flex gap-4">
        //     <div>{zTilt}</div>
        //     <div>{position}</div>
        //   </div>
        //     <div className="absolute right-0 flex gap-4">
        //       <div>{lastBounceTime.current}</div>
        //         <div>{Date.now() - lastBounceTime.current}</div>
        // </div>
      }
      {isRunning ? (
        <>
          <div className="ball" style={{ bottom: `${400 + position}px` }}></div>
          <div className="score">Score: {score}</div>
          <div className="absolute left-0 top-10">Time: {timeLeft} sec</div>
          <div className="absolute bottom-10 left-1/2 h-60 w-60 -translate-x-1/2">
            <WoodenFishIcon className="h-full w-full fill-white" />
          </div>
        </>
      ) : (
        <div className="justify-cente flex h-full w-full flex-col items-center">
          <h1 className="organic-text mt-[30vh] text-[56px] text-white">
            Pump
          </h1>

          <p className="mt-4 max-w-60 text-center text-subtitle text-sub-text">
            Hit your wooden fish as much as possible to gain merit points
            <br />
          </p>
          <Button className="mx-auto mt-4" onClick={startGame}>
            Start
          </Button>
          <div className="absolute bottom-10 h-60 w-60">
            <WoodenFishIcon className="h-full w-full fill-white" />
          </div>
        </div>
      )}
    </div>
  );
}
