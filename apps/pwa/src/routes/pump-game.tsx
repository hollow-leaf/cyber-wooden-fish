import { useEffect, useState, useCallback } from "react";
import { getSerwist } from "virtual:serwist";
import { isSafari } from "../utils";

export default function PumpGame() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPermission, setHasPermission] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const getMotion = async () => {
    if (!window.DeviceMotionEvent) {
      alert(
        "Your current device does not have access to the DeviceMotion event",
      );
      return;
    } else {
      setHasPermission(true);
    }

    //@ts-ignore
    if (!window.DeviceMotionEvent?.requestPermission && isSafari()) {
      alert(
        "Your current device does not have access to the DeviceMotion event",
      );
    }

    //@ts-ignore
    let permission = await window.DeviceMotionEvent.requestPermission();
    if (permission !== "granted") {
      return alert(
        "You must grant access to the device's sensor for this demo",
      );
    }
  };

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
    if (hasPermission) {
      const handleMotion = (e: DeviceMotionEvent) => {
        if (e.acceleration && !isJumping) {
          const acceleration = e.acceleration.y || 0;
          if (acceleration > 15) {
            // set a threshold
            const jumpHeight = Math.min(acceleration * 20, 300); // set a max jump height
            handleJump(jumpHeight);
          }
        }
      };

      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
  }, [hasPermission, isJumping, handleJump]);

  return (
    <div className="game-container relative h-full w-full">
      {!hasPermission && (
        <button onClick={getMotion}>Enable Motion Sensor</button>
      )}

      <div
        className="score-board"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Score: {score}
      </div>

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
