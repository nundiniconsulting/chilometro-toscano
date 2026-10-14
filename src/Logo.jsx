export default function Logo({ className = '', inverted = false }) {
  const ink = inverted ? '#F7F1E8' : '#2A2118'
  const paper = inverted ? 'transparent' : '#FFFCF7'

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Chilometro Toscano"
    >
      <circle cx="100" cy="100" r="98" fill={paper} />
      {!inverted && (
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="rgba(42,33,24,0.08)"
          strokeWidth="1"
        />
      )}
      <g fill={ink} transform="translate(100 38)">
        <rect x="-14" y="6" width="28" height="0.9" rx="0.4" />
        <circle cx="0" cy="-1" r="2.4" />
      </g>
      <text
        x="100"
        y="92"
        textAnchor="middle"
        fill={ink}
        style={{
          fontFamily: '"Quicksand", "Outfit", sans-serif',
          fontSize: '17px',
          fontWeight: 500,
          letterSpacing: '0.14em',
        }}
      >
        CHILOMETRO
      </text>
      <text
        x="100"
        y="122"
        textAnchor="middle"
        fill={ink}
        style={{
          fontFamily: '"Quicksand", "Outfit", sans-serif',
          fontSize: '17px',
          fontWeight: 500,
          letterSpacing: '0.28em',
        }}
      >
        TOSCANO
      </text>
    </svg>
  )
}
