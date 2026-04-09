import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// GitHub LFS CDN — repo must be public for this URL to work
const VIDEO_SRC = "https://media.githubusercontent.com/media/Imhappy2024/asset-insights-hub/main/public/0409.mp4";

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayedRef = useRef(false);
  const userPausedRef = useRef(false);
  const observerPausingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = false;
      video.play().catch(() => {
        // Browser blocked unmuted — fall back to muted
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    const onPause = () => {
      if (!observerPausingRef.current) {
        userPausedRef.current = true;
      }
    };
    const onPlay = () => {
      if (!observerPausingRef.current) {
        userPausedRef.current = false;
      }
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only autoplay the very first time
          if (!hasAutoplayedRef.current) {
            hasAutoplayedRef.current = true;
            if (video.readyState >= 3) {
              tryPlay();
            } else {
              video.addEventListener("canplay", tryPlay, { once: true });
            }
          }
          // Do NOT resume when scrolling back — user must manually play
        } else {
          // Pause when scrolled out of view
          if (!video.paused) {
            observerPausingRef.current = true;
            video.pause();
            // Mark as user-paused so it won't auto-resume
            userPausedRef.current = true;
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

  return (
    <section className="py-20 md:py-24 px-5 md:px-12 bg-background relative overflow-hidden">
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
          className="rounded-2xl overflow-hidden border border-border shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            controls
            playsInline
            preload="auto"
            className="w-full block bg-black"
            style={{ maxHeight: "560px", objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
