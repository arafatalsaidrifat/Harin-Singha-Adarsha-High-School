import React from 'react';
import { SCHOOL_INFO } from '../../lib/mock-data';

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
  const pixelSize = typeof size === 'number' ? size + 'px' : size;
  const light = variant === 'white';

  return (
    <div className={'inline-flex items-center gap-3 ' + className}>
      <div
        style={{ width: pixelSize, height: pixelSize }}
        className={'relative shrink-0 overflow-hidden rounded-full p-1 shadow-sm ring-1 ' + (light ? 'bg-white/10 ring-white/20' : 'bg-white ring-emerald-200')}
      >
        <img
          src="/hsahs-logo.webp"
          alt={SCHOOL_INFO.nameEn + ' official seal'}
          className="h-full w-full rounded-full object-cover"
          draggable={false}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-lg leading-tight text-slate-900">
            {SCHOOL_INFO.nameBn}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            {SCHOOL_INFO.nameEn}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {'EIIN: ' + SCHOOL_INFO.eiin + ' | MPO: ' + SCHOOL_INFO.mpoCode}
          </span>
        </div>
      )}
    </div>
  );
};
