import React from 'react';

interface SchoolLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  variant?: 'monochrome' | 'emerald' | 'white';
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 64,
  className = '',
  showText = false,
  variant = 'emerald',
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  // Exact reproduction of the Harin Singha Adarsha High School official seal from uploaded h1.jpg / h2.jpg
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        style={{ width: pixelSize, height: pixelSize }}
        className="relative shrink-0 select-none transition-transform hover:scale-105 duration-200"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path id={`topText_${variant}`} d="M 65,250 A 185,185 0 0,1 435,250" fill="none" />
            <path id={`bottomText_${variant}`} d="M 435,250 A 185,185 0 0,1 65,250" fill="none" />
          </defs>

          {/* Outer Border */}
          <circle
            cx="250"
            cy="250"
            r="242"
            fill={variant === 'white' ? 'transparent' : '#ffffff'}
            stroke={variant === 'white' ? '#ffffff' : '#0f172a'}
            strokeWidth="10"
          />
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke={variant === 'white' ? '#ffffff' : '#0f172a'}
            strokeWidth="3"
          />

          {/* Top Arc Text: হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয় */}
          <text
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="34"
            fontWeight="bold"
            fill={variant === 'white' ? '#ffffff' : '#0f172a'}
            letterSpacing="1"
          >
            <textPath href={`#topText_${variant}`} startOffset="50%" textAnchor="middle">
              হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়
            </textPath>
          </text>

          {/* Stars on the left arc */}
          <g fill={variant === 'white' ? '#ffffff' : '#0f172a'}>
            <polygon points="50,270 54,282 67,282 56,290 60,302 50,295 40,302 44,290 33,282 46,282" />
            <polygon points="68,322 72,334 85,334 74,342 78,354 68,347 58,354 62,342 51,334 64,334" />
          </g>

          {/* Stars on the right arc */}
          <g fill={variant === 'white' ? '#ffffff' : '#0f172a'}>
            <polygon points="450,270 454,282 467,282 456,290 460,302 450,295 440,302 444,290 433,282 446,282" />
            <polygon points="432,322 436,334 449,334 438,342 442,354 432,347 422,354 426,342 415,334 428,334" />
          </g>

          {/* Bottom Arc Text: রহমতপুর, গাইবান্ধা। */}
          <text
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="34"
            fontWeight="bold"
            fill={variant === 'white' ? '#ffffff' : '#0f172a'}
            letterSpacing="2"
          >
            <textPath href={`#bottomText_${variant}`} startOffset="50%" textAnchor="middle">
              রহমতপুর, গাইবান্ধা।
            </textPath>
          </text>

          {/* Center Circular Medallion */}
          <circle
            cx="250"
            cy="250"
            r="160"
            fill={variant === 'emerald' ? '#047857' : '#0f172a'}
            stroke="#ffffff"
            strokeWidth="3"
          />

          {/* 7 Stars inside top arch of medallion */}
          <g fill="#ffffff">
            <polygon points="135,170 138,178 147,178 140,183 142,192 135,187 128,192 130,183 123,178 132,178" />
            <polygon points="168,140 171,148 180,148 173,153 175,162 168,157 161,162 163,153 156,148 165,148" />
            <polygon points="206,122 209,130 218,130 211,135 213,144 206,139 199,144 201,135 194,130 203,130" />
            <polygon points="250,116 253,124 262,124 255,129 257,138 250,133 243,138 245,129 238,124 247,124" />
            <polygon points="294,122 297,130 306,130 299,135 301,144 294,139 287,144 289,135 282,130 291,130" />
            <polygon points="332,140 335,148 344,148 337,153 339,162 332,157 325,162 327,153 320,148 329,148" />
            <polygon points="365,170 368,178 377,178 370,183 372,192 365,187 358,192 360,183 353,178 362,178" />
          </g>

          {/* Sun Rays radiating outwards */}
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="250" y1="210" x2="250" y2="152" strokeWidth="3" />
            <line x1="240" y1="212" x2="232" y2="156" />
            <line x1="260" y1="212" x2="268" y2="156" />
            <line x1="228" y1="215" x2="216" y2="162" />
            <line x1="272" y1="215" x2="284" y2="162" />
            <line x1="216" y1="220" x2="198" y2="172" />
            <line x1="284" y1="220" x2="302" y2="172" />
            <line x1="206" y1="226" x2="184" y2="185" />
            <line x1="294" y1="226" x2="316" y2="185" />
            <line x1="198" y1="234" x2="172" y2="200" />
            <line x1="302" y1="234" x2="328" y2="200" />
            <line x1="192" y1="244" x2="165" y2="215" />
            <line x1="308" y1="244" x2="335" y2="215" />
          </g>

          {/* Half Sun Body */}
          <path d="M 200,225 A 50,50 0 0,1 300,225 Z" fill="#ffffff" />

          {/* Open Book Graphic */}
          <path
            d="M 250,225 C 220,210 175,200 150,205 L 150,305 C 180,300 220,310 250,325 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
          <path
            d="M 250,225 C 280,210 325,200 350,205 L 350,305 C 320,300 280,310 250,325 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3.5"
          />
          <line
            x1="250"
            y1="225"
            x2="250"
            y2="325"
            stroke="#0f172a"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Characters inside the book */}
          {/* Left Page: 'অ' and '১' */}
          <text
            x="188"
            y="250"
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="28"
            fontWeight="bold"
            fill="#0f172a"
            textAnchor="middle"
          >
            অ
          </text>
          <text
            x="188"
            y="290"
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="26"
            fontWeight="bold"
            fill="#0f172a"
            textAnchor="middle"
          >
            ১
          </text>

          {/* Right Page: '১' and 'A' */}
          <text
            x="300"
            y="250"
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="28"
            fontWeight="bold"
            fill="#0f172a"
            textAnchor="middle"
          >
            ১
          </text>
          <text
            x="300"
            y="290"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="25"
            fontWeight="800"
            fill="#0f172a"
            textAnchor="middle"
          >
            A
          </text>

          {/* Foundation Text inside bottom of center circle: স্থাপিত-১৯৭০ইং */}
          <text
            x="250"
            y="370"
            fontFamily="'Hind Siliguri', sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill="#ffffff"
            textAnchor="middle"
            letterSpacing="1"
          >
            স্থাপিত-১৯৭০ইং
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
            হরিণ সিংহা আদর্শ উচ্চ বিদ্যালয়
          </span>
          <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            Harin Singha Adarsha High School
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            EIIN: 121123 | MPO: 8702091302
          </span>
        </div>
      )}
    </div>
  );
};
