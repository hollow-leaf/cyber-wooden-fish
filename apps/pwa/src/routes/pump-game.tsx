import { useMotion } from "@/hooks/useMotion";
import { useEffect, useState, useCallback } from "react";
import { getSerwist } from "virtual:serwist";

export default function PumpGame() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const motion = useMotion();

  const handleJump = useCallback((height: number) => {
    setIsJumping(true);
    setPosition((prev) => ({ ...prev, y: -height }));
    setScore((prev) => prev + Math.floor(height / 50));

    setTimeout(() => {
      setPosition((prev) => ({ ...prev, y: 0 }));
      setIsJumping(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const loadSerwist = async () => {
      if ("serviceWorker" in navigator) {
        const serwist = await getSerwist();
        serwist?.addEventListener("installed", () => {
          console.log("Serwist installed!");
        });
        void serwist?.register();
      }
    };
    loadSerwist();

    // Motion event listener
    const handleMotion = (e: DeviceMotionEvent) => {
      if (e.acceleration && !isJumping) {
        const acceleration = e.acceleration.y || 0;
        setPosition((prev) => ({ ...prev, y: acceleration }));
        // if (acceleration > 15) {
        //   // set a threshold
        //   const jumpHeight = Math.min(acceleration * 20, 300); // set a max jump height
        //   setPosition((prev) => ({ ...prev, y: jumpHeight }));
        //   // handleJump(jumpHeight);
        // }
      }

      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isJumping, handleJump]);

  return (
    <div className="relative h-full w-full">
      <div>Score: {score}</div>
      <div>{position.y}</div>
      {
        //     <div>
        //       Acceleration:{" "}
        //       {motion &&
        //         Object.values(motion.acceleration).map((d) => <div>{d}</div>)}
        //     </div>
        //       <div>
        //       AccelerationIncludingGravity:{" "}
        //   {motion &&
        //     Object.values(motion.accelerationIncludingGravity).map((d) => (
        //       <div>{d}</div>
        //     ))}
        // </div>
        //   <div>
        //   rotationRate:{" "}
        //     {motion &&
        //   Object.values(motion.rotationRate).map((d) => <div>{d}</div>)}
        //   </div>
      }

      <div
        style={{
          width: "20px",
          height: "50px",
          backgroundColor: "red",
          position: "absolute",
          bottom: "50px",
          left: "50%",
          transform: `translateX(-50%) translateY(${position.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </div>
  );
}
