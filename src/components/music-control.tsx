"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

export function MusicControl() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  function toggle() {
    if (!audio.current) audio.current = new Audio("/music/susi-davies-theme.mp3");
    if (playing) { audio.current.pause(); setPlaying(false); return; }
    audio.current.play().then(() => setPlaying(true)).catch(() => setUnavailable(true));
  }

  return <button className="music-control" onClick={toggle} title={unavailable ? "Music track will be added soon" : "Play Susi's sound experience"}>
    {playing ? <Pause size={15} /> : <Play size={15} />}<Volume2 size={15} /><span>{unavailable ? "Sound arriving soon" : playing ? "Pause sound" : "Play sound"}</span>
  </button>;
}
