import { useState, useEffect } from "react";

const loadingMessages = [
  "Warming up the engines...",
  "Crunching the numbers...",
  "Summoning the results...",
  "Almost there, hang tight...",
  "Putting on the finishing touches...",
  "Weaving your magic together...",
  "Polishing the final output...",
];

export default function LoadingScreen({ isLoading }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [dots, setDots] = useState("");

  // Cycle loading messages with fade transition
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setFade(true);
      }, 400);
    }, 2200);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Animated dots
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        .loader-overlay {
          position: fixed;
          inset: 0;
          background: #0a0a0f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          font-family: 'DM Mono', monospace;
          overflow: hidden;
        }

        /* Subtle grid background */
        .loader-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Glowing orb */
        .loader-orb {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ff9fc2, #ff2d78 60%, #7a0f39);
          box-shadow:
            0 0 60px 20px rgba(255, 45, 120, 0.45),
            0 0 120px 40px rgba(255, 45, 120, 0.2);
          animation: pulse-orb 2s ease-in-out infinite, float 3s ease-in-out infinite;
          margin-bottom: 48px;
          position: relative;
        }

        .loader-orb::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 45, 120, 0.3);
          animation: spin-ring 4s linear infinite;
        }

        @keyframes pulse-orb {
          0%, 100% { box-shadow: 0 0 60px 20px rgba(255,45,120,0.45), 0 0 120px 40px rgba(255,45,120,0.2); }
          50%       { box-shadow: 0 0 80px 30px rgba(255,106,160,0.6), 0 0 160px 60px rgba(255,45,120,0.28); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }

        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Text */
        .loader-message-wrap {
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-message {
          font-size: 15px;
          color: #c4b5fd;
          letter-spacing: 0.04em;
          transition: opacity 0.35s ease, transform 0.35s ease;
          white-space: nowrap;
        }

        .loader-message.hidden {
          opacity: 0;
          transform: translateY(6px);
        }

        .loader-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .loader-dots {
          display: inline-block;
          width: 20px;
          text-align: left;
          color: #7c3aed;
        }

        /* Progress bar */
        .loader-bar-track {
          margin-top: 36px;
          width: 240px;
          height: 3px;
          background: rgba(255,255,255,0.07);
          border-radius: 999px;
          overflow: hidden;
        }

        .loader-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed);
          background-size: 200% 100%;
          animation: shimmer 1.8s linear infinite;
          width: 40%;
        }

        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Corner label */
        .loader-label {
          position: absolute;
          top: 28px;
          left: 32px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.12);
        }
      `}</style>

      <div className="loader-overlay">


        <div className="loader-orb" />

        <div className="loader-message-wrap">
          <span className={`loader-message ${fade ? "visible" : "hidden"}`}>
            {loadingMessages[messageIndex]}
            <span className="loader-dots">{dots}</span>
          </span>
        </div>

        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </>
  );
}