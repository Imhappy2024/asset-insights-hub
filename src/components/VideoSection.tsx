import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayedRef = useRef(false); // only autoplay once on first scroll-in
  const userPausedRef = useRef(false);    // user manually paused — don't resume
  const observerPausingRef = useRef(false); // we triggered the pause, not the user

  const [showUnmuteHint, setShowUnmuteHint] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPause = () => {
      // If WE triggered this pause (scroll-out), don't count it as user action
      if (!observerPausingRef.current) {
        userPausedRef.current = true;
        setShowUnmuteHint(false);
      }
    };

    const onPlay = () => {
      userPausedRef.current = false;
      setShowUnmuteHint(false);
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // First time scrolling in — autoplay (unmuted)
          if (!hasAutoplayedRef.current) {
            hasAutoplayedRef.current = true;
            video.muted = false;
            video.play().then(() => {
              setShowUnmuteHint(false);
            }).catch(() => {
              // Browser blocked unmuted autoplay — mute and retry, show hint
              video.muted = true;
              video.play().catch(() => {});
              setShowUnmuteHint(true);
            });
          }
          // Subsequent entries: only resume if user hasn't manually paused
          else if (!userPausedRef.current) {
            video.play().catch(() => {});
          }
        } else {
          // Scrolled away — pause silently (not counted as user pause)
          if (!video.paused) {
            observerPausingRef.current = true;
            video.pause();
            setTimeout(() => { observerPausingRef.current = false; }, 50);
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  const handleUnmuteClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    setShowUnmuteHint(false);
  };

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute w-[700px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(162_100%_39%/0.07),transparent_65%)] top-0 left-1/2 -translate-x-1/2 blur-[80px] pointer-events-none" />

      <div className="max-w-[960px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-machine font-bold tracking-[0.1em] uppercase text-primary mb-5 justify-center">
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
            See It In Action
            <span className="block w-[22px] h-0.5 bg-primary rounded" />
          </div>
          <h2 className="font-display text-[clamp(26px,3.4vw,46px)] font-bold leading-[1.08] tracking-[-0.02em] text-foreground mb-4">
            See FolioExcel <em className="font-serif italic font-normal text-primary">in action</em>
          </h2>
          <p className="text-[16px] text-fe-muted-dark max-w-[520px] mx-auto leading-relaxed">
            Watch how asset managers get instant access to every KPI across their portfolio — no more logging in, clicking around, or building spreadsheets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <video
            ref={videoRef}
            src="/0409.mp4"
            controls
            playsInline
            preload="metadata"
            className="w-full block bg-black"
            style={{ maxHeight: "560px", objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>

          {/* Unmute hint — shown if browser blocked unmuted autoplay */}
          {showUnmuteHint && (
            <button
              onClick={handleUnmuteClick}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-black/90 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 5.5h2.5L8 2v12L4.5 10.5H2V5.5Z" fill="white"/>
                <path d="M11 5.5c1.1.6 1.8 1.8 1.8 3s-.7 2.4-1.8 3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="1" y1="1" x2="15" y2="15" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Click to unmute
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
