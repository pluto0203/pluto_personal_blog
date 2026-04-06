type IconProps = {
  className?: string;
};

export function GitHubIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.69-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.27-5.24-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.17 1.17A10.9 10.9 0 0 1 12 6.03c.97 0 1.95.13 2.86.39 2.2-1.49 3.17-1.17 3.17-1.17.63 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.37-5.25 5.65.41.35.78 1.04.78 2.1 0 1.51-.01 2.73-.01 3.1 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function XIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.76 7.73L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.22-8.25L1 2h6.4l4.42 5.83L18.9 2Zm-1.1 18h1.73L6.46 3.9H4.6L17.8 20Z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-8.2h2.8l.42-3.2h-3.22V7.55c0-.93.26-1.56 1.6-1.56h1.72V3.13c-.3-.04-1.32-.13-2.5-.13-2.47 0-4.17 1.5-4.17 4.27v2.39H8.3v3.2h2.83V21h2.37Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM2.75 9.75h4.47V21H2.75V9.75ZM9.75 9.75h4.28v1.54h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.85V21h-4.45v-4.84c0-1.15-.02-2.64-1.61-2.64-1.62 0-1.87 1.26-1.87 2.56V21H9.75V9.75Z" />
    </svg>
  );
}
