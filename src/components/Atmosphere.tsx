import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ==========================================
// 1. DYNAMIC SYNTHESIZED ATMOSPHERIC AUDIO
// ==========================================

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  startAudio: () => void;
  stopAudio: () => void;
}

const AtmosphericAudioContext = createContext<AudioContextType | null>(null);

export const useAtmosphericAudio = () => {
  const context = useContext(AtmosphericAudioContext);
  if (!context) {
    throw new Error("useAtmosphericAudio must be used within an AtmosphericAudioProvider");
  }
  return context;
};

export function AtmosphericAudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Synth node references
  const droneGain1Ref = useRef<GainNode | null>(null);
  const droneGain2Ref = useRef<GainNode | null>(null);
  const crackleGainRef = useRef<GainNode | null>(null);
  const isRunningRef = useRef(false);
  const timeoutIdRef = useRef<number | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  // Initialize Audio Nodes
  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // --- 1. DEEP AMBIENT DRONE ---
    // Deep smoky sine wave at 55Hz (A1)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 55;

    // Rich triangle wave at 110Hz (A2) for warm harmonics
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = 110.2;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 140; // filter out harsh mids, keeping it deep
    filter.Q.value = 1.0;

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    gain1.gain.value = 0.0; // Start at 0, fade in
    gain2.gain.value = 0.0;

    // Connect Drone
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    // LFO to slowly breathe/swell the drone volume (16s cycle)
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02; // modulate drone slightly

    lfo.connect(lfoGain);
    lfoGain.connect(gain1.gain); // Modulate volume of first drone oscillator
    lfo.start();

    // Start oscillators
    osc1.start();
    osc2.start();

    droneGain1Ref.current = gain1;
    droneGain2Ref.current = gain2;

    // --- 2. PROCEDURAL EMBER CRACKLE ---
    // Create highpass noise source for crisp pops
    const bufferSize = ctx.sampleRate * 0.4; // 400ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseBufferRef.current = buffer;

    const crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.05; // general crackle level
    crackleGain.connect(ctx.destination);
    crackleGainRef.current = crackleGain;
  };

  // Organic crackle scheduler
  const scheduleCrackle = () => {
    if (!isRunningRef.current || !audioCtxRef.current || !noiseBufferRef.current || !crackleGainRef.current) return;
    
    const ctx = audioCtxRef.current;
    
    // Play a crisp pop / ember snap
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBufferRef.current;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    // Randomize center frequency for dynamic crackles (snaps vs deep pops)
    filter.frequency.value = Math.random() * 1500 + 800; 
    filter.Q.value = Math.random() * 4 + 2;

    const popGain = ctx.createGain();
    
    // Sharp envelope: instantaneous attack, very rapid exponential decay
    const now = ctx.currentTime;
    popGain.gain.setValueAtTime(0, now);
    const volume = Math.random() * 0.4 + 0.05; // randomize volume of individual sparks
    popGain.gain.linearRampToValueAtTime(volume, now + 0.001);
    
    // Slow decay vs short snap
    const decay = Math.random() * 0.05 + 0.005;
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    // Speed modulation for dynamic texture
    noise.playbackRate.value = Math.random() * 0.5 + 0.8;

    // Connect and play
    noise.connect(filter);
    filter.connect(popGain);
    popGain.connect(crackleGainRef.current);
    
    noise.start(now);
    noise.stop(now + decay + 0.01);

    // Schedule next crackle with highly organic timing (between 100ms and 1500ms)
    const nextTime = Math.random() * 1200 + 80;
    timeoutIdRef.current = window.setTimeout(scheduleCrackle, nextTime);
  };

  const startAudio = async () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    isRunningRef.current = true;
    setIsPlaying(true);

    // Slow-motion fade in of drone (2.5 seconds)
    const now = ctx.currentTime;
    if (droneGain1Ref.current && droneGain2Ref.current) {
      droneGain1Ref.current.gain.cancelScheduledValues(now);
      droneGain2Ref.current.gain.cancelScheduledValues(now);
      
      droneGain1Ref.current.gain.setValueAtTime(droneGain1Ref.current.gain.value, now);
      droneGain2Ref.current.gain.setValueAtTime(droneGain2Ref.current.gain.value, now);

      droneGain1Ref.current.gain.linearRampToValueAtTime(0.08, now + 2.5);
      droneGain2Ref.current.gain.linearRampToValueAtTime(0.04, now + 3.5);
    }

    // Start scheduling crackles
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    scheduleCrackle();
  };

  const stopAudio = () => {
    isRunningRef.current = false;
    setIsPlaying(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    // Slow-motion fade out drone (1.5 seconds)
    const ctx = audioCtxRef.current;
    if (ctx && droneGain1Ref.current && droneGain2Ref.current) {
      const now = ctx.currentTime;
      droneGain1Ref.current.gain.cancelScheduledValues(now);
      droneGain2Ref.current.gain.cancelScheduledValues(now);
      
      droneGain1Ref.current.gain.setValueAtTime(droneGain1Ref.current.gain.value, now);
      droneGain2Ref.current.gain.setValueAtTime(droneGain2Ref.current.gain.value, now);

      droneGain1Ref.current.gain.linearRampToValueAtTime(0.0, now + 1.5);
      droneGain2Ref.current.gain.linearRampToValueAtTime(0.0, now + 1.5);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AtmosphericAudioContext.Provider value={{ isPlaying, toggleAudio, startAudio, stopAudio }}>
      {children}
    </AtmosphericAudioContext.Provider>
  );
}

// ==========================================
// 2. HIGH-PERFORMANCE CANVAS EMBERS
// ==========================================

export function CanvasEmbers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isMoving: false });
  const mouseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Adjust for High DPI screens
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Tracking mouse with lag (slow motion)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isMoving = true;

      if (mouseTimerRef.current) window.clearTimeout(mouseTimerRef.current);
      mouseTimerRef.current = window.setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 1000); // fading effect after mouse stops
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle template
    class Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      decay: number;
      wobbleSpeed: number;
      wobbleRange: number;
      wobbleAngle: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height * 0.1; // start all over
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.35 + 0.12); // slow vertical drift
        this.speedX = Math.random() * 0.15 - 0.075;
        this.maxAlpha = Math.random() * 0.5 + 0.2;
        this.alpha = 0; // fade in slowly
        this.decay = Math.random() * 0.0003 + 0.0001;
        this.wobbleSpeed = Math.random() * 0.01 + 0.003;
        this.wobbleRange = Math.random() * 1.5 + 0.5;
        this.wobbleAngle = Math.random() * Math.PI * 2;
        
        // Dynamic embers tones (gold, bright orange, dusky smoke red)
        const rand = Math.random();
        if (rand < 0.6) {
          this.color = `249, 115, 22`; // Orange #f97316 (Primary)
        } else if (rand < 0.85) {
          this.color = `245, 158, 11`; // Amber #f59e0b
        } else {
          this.color = `239, 68, 68`;  // Red #ef4444
        }
      }

      update(scrollOffset: number) {
        // Slow-motion drift
        this.y += this.speedY - scrollOffset * 0.08; // slightly move faster on scroll (parallax feel)
        this.wobbleAngle += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobbleAngle) * (this.wobbleSpeed * this.wobbleRange);

        // Slow motion mouse atmospheric reaction (wind)
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220; // radius of mouse influence

        if (dist < radius) {
          // Particles gently sway away from the cursor, resisting it (heavy slow motion friction)
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 0.45;
          const pushY = Math.sin(angle) * force * 0.3; // mostly push sideways and slightly up

          this.x += pushX;
          this.y += pushY;
        }

        // Fade in slowly at the bottom, fade out at top
        if (this.alpha < this.maxAlpha) {
          this.alpha += 0.005;
        }

        // Out of bounds / naturally dissolve
        if (this.y < -10) {
          this.respawn();
        }
      }

      respawn() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.alpha = 0;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedY = -(Math.random() * 0.35 + 0.12);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        
        // Ember soft radial glow (drawn using shadows on larger particles, or simply native transparency)
        if (this.size > 1.8) {
          ctx.shadowBlur = this.size * 2.5;
          ctx.shadowColor = `rgba(${this.color}, ${this.alpha * 0.8})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    // Initialize 20 slow particles
    const particleCount = 20;
    const particles: Ember[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new Ember();
      // Scatter initially across heights
      p.y = Math.random() * height;
      p.alpha = Math.random() * p.maxAlpha;
      particles.push(p);
    }

    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Loop
    const animate = () => {
      ctx.shadowBlur = 0; // reset shadow
      ctx.clearRect(0, 0, width, height);

      // Smooth lag-interpolation for mouse tracking (inertia)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.035; // slow inertia
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.035;

      // Smooth lag-scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.05;
      const scrollDiff = targetScrollY - scrollY;

      // Draw and update embers
      particles.forEach((p) => {
        p.update(scrollDiff);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
}

// ==========================================
// 3. HEAVY PHYSICAL CURSOR FOLLOWER
// ==========================================

export function FluidCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Only enable custom cursor on hover-capable pointer devices
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    setEnabled(true);
    document.body.classList.add("hover:cursor-none");

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Slow-motion physics loop
    let frameId: number;
    const ringPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };

    const updatePhysics = () => {
      // The dot is relatively responsive but slightly damp (lag coefficient 0.15)
      dotPos.x += (mouseRef.current.targetX - dotPos.x) * 0.15;
      dotPos.y += (mouseRef.current.targetY - dotPos.y) * 0.15;

      // The ring is extremely sluggish, creating the heavy slow-motion water feel (lag coefficient 0.05)
      ringPos.x += (mouseRef.current.targetX - ringPos.x) * 0.055;
      ringPos.y += (mouseRef.current.targetY - ringPos.y) * 0.055;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x - 20}px, ${ringPos.y - 20}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x - 3}px, ${dotPos.y - 3}px, 0)`;
      }

      frameId = requestAnimationFrame(updatePhysics);
    };

    frameId = requestAnimationFrame(updatePhysics);

    // Track hoverable elements to expand the cursor slowly
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("hover:cursor-none");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Sluggish Glowing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/20 bg-primary/0 pointer-events-none transition-[width,height,background-color,border-color] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hovered 
            ? "scale-150 border-primary/40 bg-primary/5" 
            : clicked 
            ? "scale-75 border-accent bg-accent/10" 
            : ""
        }`}
        style={{
          boxShadow: hovered ? "0 0 15px rgba(249, 115, 22, 0.05)" : "none",
        }}
      />
      {/* Inner Glowing Ember Core */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none transition-transform duration-[600ms] ease-out ${
          hovered ? "scale-[2] bg-accent" : clicked ? "scale-[0.5]" : ""
        }`}
        style={{
          boxShadow: "0 0 10px rgba(249, 115, 22, 0.8)",
        }}
      />
    </div>
  );
}

// ==========================================
// 4. ATMOSPHERIC SOUND WAVE TOGGLE
// ==========================================

export function AtmosphericSoundWave() {
  const { isPlaying, toggleAudio } = useAtmosphericAudio();

  return (
    <button
      onClick={toggleAudio}
      className="group flex items-center gap-3 bg-background/40 hover:bg-background/80 border border-border/40 hover:border-primary/40 px-4 py-2 rounded-full transition-all duration-[1000ms] cursor-pointer"
      title="Toggle atmospheric audio"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary transition-colors duration-[1000ms]">
        {isPlaying ? "Ambiance Active" : "Silence Space"}
      </span>
      <div className="flex items-center gap-[3px] h-3 w-5">
        {[0, 1, 2, 3].map((i) => {
          // Slow-motion waveform pulse ratios
          const delay = i * 0.15;
          return (
            <span
              key={i}
              className={`w-[2px] rounded-full bg-primary/80 transition-all duration-[1200ms]`}
              style={{
                height: isPlaying ? "100%" : "30%",
                animation: isPlaying 
                  ? `slowWave 1.4s ease-in-out infinite alternate` 
                  : "none",
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      
      {/* Custom slow-wave keyframe injection */}
      <style>{`
        @keyframes slowWave {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}
