import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { asset } from "@/lib/asset";
import { usePrefs } from "@/lib/prefs";

const TRACKS = ["media/daddeln-mit-den-dudes.mp3", "media/teardrop.mp3"] as const;
const STORAGE = "blizzen-music";
const VOLUME = 0.4;

export function SiteMusic() {
  const { t } = usePrefs();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let storedOff = false;
    try {
      storedOff = localStorage.getItem(STORAGE) === "off";
    } catch {
      /* ignore */
    }
    mutedRef.current = storedOff;
    setMuted(storedOff);

    const audio = new Audio();
    audio.preload = storedOff ? "none" : "auto";
    audio.volume = VOLUME;
    audio.src = asset(TRACKS[0]);
    audioRef.current = audio;

    const play = () => {
      if (mutedRef.current) return;
      void audio.play().catch(() => {});
    };

    const onEnded = () => {
      indexRef.current = (indexRef.current + 1) % TRACKS.length;
      audio.src = asset(TRACKS[indexRef.current]);
      play();
    };
    audio.addEventListener("ended", onEnded);

    const unlock = () => {
      play();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    if (!storedOff) {
      void audio.play().catch(() => {
        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    try {
      localStorage.setItem(STORAGE, next ? "off" : "on");
    } catch {
      /* ignore */
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (next) {
      audio.pause();
      return;
    }
    if (!audio.src) audio.src = asset(TRACKS[indexRef.current]);
    void audio.play().catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? t.music.play : t.music.mute}
      className="fixed right-4 bottom-4 z-40 grid size-11 place-items-center border border-edge bg-panel/90 text-fog backdrop-blur-md transition-colors hover:text-ice sm:right-6 lg:right-10"
    >
      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
    </button>
  );
}
