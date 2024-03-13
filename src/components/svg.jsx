function Draw({ backgroundColor, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <circle cx="28" cy="28" r="28" fill={backgroundColor}></circle>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M28 35l7-7 3 3-7 7-3-3z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M34 29l-1.5-7.5L18 18l3.5 14.5L29 34l5-5zM18 18l7.586 7.586"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M27 29a2 2 0 100-4 2 2 0 000 4z"
      ></path>
    </svg>
  );
}

function Edit({ backgroundColor, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <circle cx="28" cy="28" r="28" fill={backgroundColor}></circle>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M27 20.121h-7a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M34.5 18.621a2.121 2.121 0 013 3l-9.5 9.5-4 1 1-4 9.5-9.5z"
      ></path>
    </svg>
  );
}

function Home({ backgroundColor, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <circle cx="28" cy="28" r="28" fill={backgroundColor}></circle>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 24l9-7 9 7v11a2 2 0 01-2 2H21a2 2 0 01-2-2V24z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M25 37V27h6v10"
      ></path>
    </svg>
  );
}

function Setting({ backgroundColor, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      fill="none"
      viewBox="0 0 56 56"
    >
      <circle cx="28" cy="28" r="28" fill={backgroundColor}></circle>
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_81_523)"
      >
        <path d="M28 31a3 3 0 100-6 3 3 0 000 6z"></path>
        <path d="M35.4 31a1.65 1.65 0 00.33 1.82l.06.06a1.998 1.998 0 010 2.83 1.998 1.998 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V37a2 2 0 01-4 0v-.09A1.65 1.65 0 0025 35.4a1.65 1.65 0 00-1.82.33l-.06.06a1.998 1.998 0 01-2.83 0 1.998 1.998 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H19a2 2 0 010-4h.09A1.65 1.65 0 0020.6 25a1.65 1.65 0 00-.33-1.82l-.06-.06a1.998 1.998 0 010-2.83 1.998 1.998 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H25a1.65 1.65 0 001-1.51V19a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a1.998 1.998 0 012.83 0 1.998 1.998 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V25a1.65 1.65 0 001.51 1H37a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path>
      </g>
      <defs>
        <clipPath id="clip0_81_523">
          <path
            fill={color}
            d="M0 0H24V24H0z"
            transform="translate(16 16)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function ActiveDot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="7"
      fill="none"
      viewBox="0 0 7 7"
    >
      <circle cx="3.5" cy="3.5" r="3" fill="#fff" stroke="#1681FF"></circle>
    </svg>
  );
}

function RoundTable() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 50 50"
    >
      <circle cx="25" cy="25" r="25" fill="#8B8B8B"></circle>
    </svg>
  );
}

function ReactTable() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="69"
      height="40"
      fill="none"
      viewBox="0 0 69 40"
    >
      <rect width="69" height="40" fill="#8B8B8B" rx="6"></rect>
    </svg>
  );
}

function SqaureTable() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <rect width="40" height="40" fill="#8B8B8B" rx="6"></rect>
    </svg>
  );
}

function Chair() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="18"
      fill="none"
      viewBox="0 0 28 18"
    >
      <rect width="28" height="18" fill="#8B8B8B" rx="6"></rect>
    </svg>
  );
}

function HighChair() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="#8B8B8B" rx="6"></rect>
    </svg>
  );
}

function Sofa() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="69"
      height="27"
      fill="none"
      viewBox="0 0 69 27"
    >
      <rect width="69" height="27" fill="#8B8B8B" rx="6"></rect>
    </svg>
  );
}

export {
  Draw,
  Edit,
  Home,
  Setting,
  ActiveDot,
  RoundTable,
  ReactTable,
  SqaureTable,
  Chair,
  HighChair,
  Sofa,
};
