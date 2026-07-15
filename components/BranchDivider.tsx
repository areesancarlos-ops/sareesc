export default function BranchDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <svg width="220" height="28" viewBox="0 0 220 28" fill="none">
        <path
          d="M0 14 H80"
          stroke="#D9D6CC"
          strokeWidth="1"
        />
        <path
          d="M80 14 C 95 14, 100 4, 110 4 C 120 4, 125 14, 140 14"
          stroke="#C9A227"
          strokeWidth="1.5"
        />
        <circle cx="110" cy="4" r="2.5" fill="#C9A227" />
        <path
          d="M140 14 H220"
          stroke="#D9D6CC"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
