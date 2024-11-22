export const svgGradient = (icon: JSX.Element) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA600" />
          <stop offset="100%" stopColor="#FF007D" />
        </linearGradient>
      </defs>
      ${icon}
    </svg>
  );
};
