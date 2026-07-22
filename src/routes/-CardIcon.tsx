/** Rule:
 *  - hasVideo (hover-to-play): always show play icon
 *  - no video: show arrow icon on hover only
 */

const PlaySvg = () => (
  <svg viewBox="0 0 16.2891 16.416" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.70898 14.9805C1.70898 15.9473 2.26562 16.4062 2.92969 16.4062C3.22266 16.4062 3.52539 16.3086 3.82812 16.1523L15.2051 9.50195C16.0156 9.0332 16.2891 8.71094 16.2891 8.20312C16.2891 7.68555 16.0156 7.37305 15.2051 6.9043L3.82812 0.253906C3.52539 0.0878906 3.22266 0 2.92969 0C2.26562 0 1.70898 0.458984 1.70898 1.42578ZM3.28125 14.2871L3.28125 2.11914C3.28125 1.94336 3.4375 1.86523 3.58398 1.95312L14.0234 8.04688C14.0918 8.07617 14.1309 8.14453 14.1309 8.20312C14.1309 8.26172 14.0918 8.32031 14.0234 8.35938L3.58398 14.4531C3.4375 14.541 3.28125 14.4629 3.28125 14.2871Z" fill="black" fillOpacity="0.85"/>
  </svg>
);

const ArrowSvg = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export function CardIcon({ hasVideo }: { hasVideo: boolean }) {
  return (
    <span
      className={[
        "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-opacity text-neutral-700",
        hasVideo ? "opacity-100" : "opacity-0 group-hover:opacity-100",
      ].join(" ")}
    >
      {hasVideo ? <PlaySvg /> : <ArrowSvg />}
    </span>
  );
}
