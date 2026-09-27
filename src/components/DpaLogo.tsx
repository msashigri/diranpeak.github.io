import React from 'react';

interface DpaLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export const DpaLogo: React.FC<DpaLogoProps> = ({
  variant = 'light',
  className = 'h-11',
  showText = true
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern DPA Monogram Badge */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Rounded Hexagonal Crest */}
          <path
            d="M60 4L110 32V88L60 116L10 88V32L60 4Z"
            fill="url(#crestGradient)"
            stroke={isDark ? '#60a5fa' : '#2563eb'}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Majestic Mountain Peak Silhouette (Diran & Rakaposhi Twin Spire) */}
          <path
            d="M60 22L82 68L70 64L60 52L50 64L38 68L60 22Z"
            fill="url(#snowCapGradient)"
          />
          <path
            d="M32 74L46 54L55 65L42 75H32Z"
            fill="#38bdf8"
            opacity="0.8"
          />
          <path
            d="M88 74L74 54L65 65L78 75H88Z"
            fill="#0284c7"
            opacity="0.9"
          />

          {/* Golden Sun / Horizon Arc behind the peak */}
          <circle cx="60" cy="38" r="7" fill="#fbbf24" opacity="0.95" />

          {/* Prominent 'DPA' Bold Modern Lettering inside Crest Banner */}
          <rect x="18" y="76" width="84" height="26" rx="5" fill={isDark ? '#0f172a' : '#1a2b48'} stroke="#38bdf8" strokeWidth="1.5" />
          <text
            x="60"
            y="94"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Poppins', sans-serif"
            fontWeight="900"
            fontSize="17"
            letterSpacing="2.5"
          >
            DPA
          </text>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="crestGradient" x1="10" y1="4" x2="110" y2="116" gradientUnits="userSpaceOnUse">
              <stop stopColor={isDark ? '#1e293b' : '#0f172a'} />
              <stop offset="1" stopColor={isDark ? '#0f172a' : '#1e3a8a'} />
            </linearGradient>
            <linearGradient id="snowCapGradient" x1="60" y1="22" x2="60" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-heading font-black tracking-tight text-lg sm:text-xl ${
                isDark ? 'text-white' : 'text-[#1a2b48]'
              }`}
            >
              DIRAN PEAK
            </span>
            <span className="font-heading font-black tracking-tight text-lg sm:text-xl text-[#5191fa]">
              ADVENTURE
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] text-[#5e6d77] mt-0.5">
            Trekking · Climbing · Expeditions
          </span>
        </div>
      )}
    </div>
  );
};
