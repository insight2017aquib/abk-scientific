type IconProps = { className?: string };

export function FlaskIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M9 3h6M10 3v6.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function NetworkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.6 7.6 11 15.4M16.4 7.6 13 15.4M8.2 6h7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="4" y="8" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 4v4M8 13h.01M16 13h.01M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export const iconMap = {
  flask: FlaskIcon,
  network: NetworkIcon,
  bot: BotIcon,
} as const;
