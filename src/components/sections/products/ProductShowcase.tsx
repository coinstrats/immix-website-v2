import { useRef, useEffect, useState } from 'react';
import { Check, ArrowRight, Radio } from 'lucide-react';
import type { Product, IntegrationLevel } from './productData';

interface ProductShowcaseProps {
  product: Product;
  dimmed: boolean;
}

export function ProductShowcase({ product, dimmed }: ProductShowcaseProps) {
  const Icon = product.icon;
  const Visual = product.visual;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const showVideo = product.videoSrc && !videoError;

  return (
    <div
      ref={containerRef}
      className={`
        relative group rounded-2xl border overflow-hidden h-full
        transition-all duration-500
        ${dimmed
          ? 'opacity-25 scale-[0.99] border-white/[0.04] bg-white/[0.01]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]'
        }
      `}
      style={!dimmed ? {
        boxShadow: `0 0 0 1px ${product.accentHex}08, 0 4px 40px ${product.accentHex}06`,
      } : undefined}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${product.accentHex}50, transparent)` }}
      />

      <div className="flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
          {showVideo ? (
            <>
              {!videoLoaded && (
                <div className="absolute inset-0 bg-white/[0.03] animate-pulse" />
              )}
              <video
                ref={videoRef}
                src={product.videoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoError(true)}
                className={`
                  w-full h-full object-cover transition-opacity duration-700
                  ${videoLoaded ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </>
          ) : (
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `linear-gradient(135deg, ${product.accentHex}15, transparent)` }}
              />
              <div className="relative z-10 w-full h-full">
                <Visual />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>

        <div className="p-6 lg:p-7 flex flex-col flex-1">
          <div className="space-y-5 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${product.accentHex}15` }}
                >
                  <Icon size={22} style={{ color: product.accentHex }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <span className="text-[11px] font-medium opacity-60" style={{ color: product.accentHex }}>
                    {product.clientType}
                  </span>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider flex-shrink-0"
                style={{
                  background: `${product.accentHex}15`,
                  color: product.accentHex,
                }}
              >
                <Radio size={8} className="animate-pulse" />
                Live
              </span>
            </div>

            <p className="text-sm text-white/50 leading-relaxed">
              {product.tagline}
            </p>

            <div className="space-y-2.5">
              {product.capabilities.map((cap) => (
                <div key={cap} className="flex items-start gap-2.5">
                  <Check
                    size={14}
                    className="mt-0.5 flex-shrink-0 opacity-70"
                    style={{ color: product.accentHex }}
                  />
                  <span className="text-sm text-white/60 leading-snug">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              {(['ui', 'sdk', 'api'] as IntegrationLevel[]).map((level) => {
                const supported = product.integrations.includes(level);
                return (
                  <span
                    key={level}
                    className={`
                      px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider
                      ${supported ? '' : 'bg-white/[0.03] text-white/15'}
                    `}
                    style={supported ? {
                      background: `${product.accentHex}15`,
                      color: product.accentHex,
                    } : undefined}
                  >
                    {level}
                  </span>
                );
              })}
            </div>

            <a
              href="https://app.immix.xyz"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group/link opacity-70 hover:opacity-100"
              style={{ color: product.accentHex }}
            >
              Get started
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
