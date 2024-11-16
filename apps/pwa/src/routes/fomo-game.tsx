import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FomoGame() {
  const [isRunning, _setIsRunning] = useState(false);

  const startGame = async () => {};
  return (
    <div className="relative h-full w-full">
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
        <div className="ball" style={{ bottom: `${"100"}px` }}></div>
      ) : (
        <div className="justify-cente flex h-full w-full flex-col items-center">
          <h1 className="organic-text mt-[30vh] text-[56px] text-white">
            Fomo
          </h1>

          <p className="mt-4 max-w-60 text-center text-subtitle text-sub-text">
            Hit your wooden fish as much as possible to gain merit points
            <br />
          </p>
          <Button className="mx-auto mt-4" onClick={startGame}>
            Start
          </Button>
        </div>
      )}
    </div>
  );
}
