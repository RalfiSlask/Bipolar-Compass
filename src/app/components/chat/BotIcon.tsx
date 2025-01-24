const BotIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <path
          d="M100 50 C70 50 50 70 50 100 C50 130 70 150 100 150 V50 Z"
          fill="#46737c"
        />

        <path
          d="M100 50 C130 50 150 70 150 100 C150 130 130 150 100 150 V50 Z"
          fill="#659598"
        />

        <circle
          cx="100"
          cy="25"
          r="10"
          fill="#eff7f7"
          stroke="#46737c"
          stroke-width="3"
        />
        <line
          x1="100"
          y1="15"
          x2="100"
          y2="5"
          stroke="#46737c"
          stroke-width="2"
        />
        <line
          x1="100"
          y1="35"
          x2="100"
          y2="45"
          stroke="#46737c"
          stroke-width="2"
        />
        <line
          x1="110"
          y1="25"
          x2="120"
          y2="25"
          stroke="#46737c"
          stroke-width="2"
        />
        <line
          x1="90"
          y1="25"
          x2="80"
          y2="25"
          stroke="#46737c"
          stroke-width="2"
        />
        <polygon
          points="100,20 105,30 100,25 95,30"
          fill="#659598"
          stroke="#46737c"
          stroke-width="1"
        />

        <line
          x1="100"
          y1="30"
          x2="100"
          y2="50"
          stroke="#46737c"
          stroke-width="5"
        />

        <circle cx="80" cy="90" r="8" fill="#eff7f7" />
        <circle cx="120" cy="90" r="8" fill="#eff7f7" />
        <circle cx="80" cy="90" r="4" fill="#19505b" />
        <circle cx="120" cy="90" r="4" fill="#19505b" />

        <path
          d="M75 120 Q100 140 125 120"
          fill="none"
          stroke="#eff7f7"
          stroke-width="5"
          stroke-linecap="round"
        />
        <circle cx="75" cy="120" r="3" fill="#eff7f7" opacity="0.7" />
        <circle cx="125" cy="120" r="3" fill="#eff7f7" opacity="0.7" />

        <rect x="40" y="80" width="10" height="40" fill="#46737c" />
        <rect x="150" y="80" width="10" height="40" fill="#46737c" />
        <line
          x1="45"
          y1="85"
          x2="45"
          y2="115"
          stroke="#D0E8E6"
          stroke-width="2"
        />
        <line
          x1="155"
          y1="85"
          x2="155"
          y2="115"
          stroke="#D0E8E6"
          stroke-width="2"
        />

        <defs>
          <linearGradient id="headGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: '#ffffff', stopOpacity: 0.2 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#000000', stopOpacity: 0.1 }}
            />
          </linearGradient>
        </defs>
        <rect
          x="50"
          y="50"
          width="100"
          height="100"
          rx="50"
          ry="50"
          fill="url(#headGradient)"
          opacity="0.2"
        />
      </svg>
    </>
  );
};

export default BotIcon;
