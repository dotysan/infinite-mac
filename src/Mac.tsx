import {useEffect, useRef} from "react";
import "./Mac.css";
import basiliskPrefsPath from "./Data/BasiliskIIPrefs.txt";
import quadraRomPath from "./Data/Quadra-650.rom.gz";
import macOs753ImagePath from "./Data/MacOS753.img.gz";
import gamesImagePath from "./Data/Games.img.gz";
import {Emulator} from "./BasiliskII/emulator-ui";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export function Mac() {
    const screeRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emulator = new Emulator({
            useTouchEvents: "ontouchstart" in window,
            useSharedMemory:
                typeof SharedArrayBuffer !== "undefined" &&
                searchParams.get("use_shared_memory") !== "false",
            screenWidth: SCREEN_WIDTH,
            screenHeight: SCREEN_HEIGHT,
            screenCanvas: screeRef.current!,
            basiliskPrefsPath,
            romPath: quadraRomPath,
            disk1Path: macOs753ImagePath,
            disk2Path: gamesImagePath,
        });
        emulator.start();
        return () => {
            emulator.stop();
        };
    }, []);
    return (
        <div
            className="Mac"
            style={{
                width: `calc(${SCREEN_WIDTH}px + 2 * var(--screen-underscan))`,
                height: `calc(${SCREEN_HEIGHT}px + 2 * var(--screen-underscan))`,
            }}>
            <div className="Mac-Apple-Logo" />
            <div className="Mac-Led" />
            <canvas
                className="Mac-Screen"
                ref={screeRef}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                onContextMenu={e => e.preventDefault()}
            />
        </div>
    );
}
