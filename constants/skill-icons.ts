export interface SkillIconDefinition {
  id: string;
  label: string;
  keywords: string[];
  xml: string;
}

/**
 * Hand-authored fantasy skill-icon set (WoW-style talent icons), replacing SF Symbols
 * as the node icon source. Each entry is a full <svg viewBox="0 0 64 64"> string,
 * rendered via react-native-svg's SvgXml — the gradient/filter markup renders as-is,
 * no manual JSX translation needed. Grows row by row; ids are stable strings so
 * existing node.icon values never shift when more rows are added.
 */
export const SKILL_ICONS: SkillIconDefinition[] = [
  {
    id: '1',
    label: 'Grüner Totenkopf',
    keywords: ['skull', 'totenkopf', 'green', 'grün', 'gift', 'poison', 'tod'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i1-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i1-bg" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#0f1a0d"/>
      <stop offset="60%" stop-color="#060a05"/>
      <stop offset="100%" stop-color="#020302"/>
    </radialGradient>
    <linearGradient id="i1-skull" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8ffb0"/>
      <stop offset="45%" stop-color="#5ed43a"/>
      <stop offset="100%" stop-color="#1f6b12"/>
    </linearGradient>
    <filter id="i1-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i1-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i1-bg)"/>

  <g filter="url(#i1-glow)">
    <circle cx="32" cy="26" r="13" fill="#2ecc16" opacity="0.35"/>
    <path d="M32 15c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l-.4 5.6c-.1 1 .7 1.9 1.7 1.9h2.2v-4.4h2.2v4.4h4v-4.4h2.2v4.4h2.2c1 0 1.8-.9 1.7-1.9l-.4-5.6c2.8-2.1 5.4-5.4 5.4-10.4C45 20.5 40 15 32 15z" fill="url(#i1-skull)" stroke="#0d3a08" stroke-width="1"/>
    <ellipse cx="26.5" cy="27" rx="3.4" ry="4.2" fill="#08240a"/>
    <ellipse cx="37.5" cy="27" rx="3.4" ry="4.2" fill="#08240a"/>
    <path d="M32 30.5l-2 4h4l-2-4z" fill="#08240a"/>
    <path d="M25 37c1.6 1 4 1.6 7 1.6s5.4-.6 7-1.6" stroke="#08240a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '2',
    label: 'Wurfspeer',
    keywords: ['speer', 'spear', 'dagger', 'dolch', 'blade', 'waffe', 'weapon'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i2-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i2-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#3a1712"/>
      <stop offset="60%" stop-color="#200d0a"/>
      <stop offset="100%" stop-color="#0d0503"/>
    </radialGradient>
    <linearGradient id="i2-blade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4f4f4"/>
      <stop offset="45%" stop-color="#b9bec4"/>
      <stop offset="55%" stop-color="#767c82"/>
      <stop offset="100%" stop-color="#2c2f33"/>
    </linearGradient>
    <linearGradient id="i2-hilt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6b4a26"/>
      <stop offset="50%" stop-color="#3c2914"/>
      <stop offset="100%" stop-color="#1c1209"/>
    </linearGradient>
    <filter id="i2-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i2-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i2-bg)"/>

  <g transform="translate(32,32) rotate(45) translate(-32,-32)" filter="url(#i2-glow)">
    <rect x="30" y="14" width="4" height="26" fill="url(#i2-hilt)" rx="1"/>
    <path d="M32 6l6 11h-12l6-11z" fill="url(#i2-blade)" stroke="#1a1c1e" stroke-width="0.6"/>
    <rect x="24" y="38" width="16" height="4" rx="1.4" fill="#4a3620"/>
    <rect x="29" y="41" width="6" height="12" rx="2" fill="url(#i2-hilt)"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '3',
    label: 'Weiß-gelbe Explosion',
    keywords: ['explosion', 'burst', 'light', 'licht', 'blitz', 'flash', 'komet'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i3-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i3-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#241d0c"/>
      <stop offset="60%" stop-color="#100c05"/>
      <stop offset="100%" stop-color="#050402"/>
    </radialGradient>
    <radialGradient id="i3-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#fff6c8"/>
      <stop offset="65%" stop-color="#ffce4a"/>
      <stop offset="100%" stop-color="#ff9d1f" stop-opacity="0"/>
    </radialGradient>
    <filter id="i3-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="3.4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i3-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i3-bg)"/>

  <g filter="url(#i3-glow)">
    <circle cx="32" cy="32" r="16" fill="url(#i3-core)"/>
    <g fill="#fff2b8">
      <path d="M32 10 L34.5 27 L32 30 L29.5 27 Z"/>
      <path d="M32 54 L29.5 37 L32 34 L34.5 37 Z"/>
      <path d="M10 32 L27 29.5 L30 32 L27 34.5 Z"/>
      <path d="M54 32 L37 34.5 L34 32 L37 29.5 Z"/>
      <path d="M16.5 16.5 L28 25 L30 27 L27 29 Z" opacity="0.85"/>
      <path d="M47.5 47.5 L36 39 L34 37 L37 35 Z" opacity="0.85"/>
      <path d="M47.5 16.5 L36 25 L34 27 L37 29 Z" opacity="0.85"/>
      <path d="M16.5 47.5 L28 39 L30 37 L27 35 Z" opacity="0.85"/>
    </g>
    <circle cx="32" cy="32" r="6.5" fill="#ffffff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '4',
    label: 'Violette Sternschnuppen',
    keywords: ['meteor', 'sternschnuppe', 'purple', 'violett', 'stars', 'sterne'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i4-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i4-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#2a1240"/>
      <stop offset="60%" stop-color="#150822"/>
      <stop offset="100%" stop-color="#08030f"/>
    </radialGradient>
    <linearGradient id="i4-streak" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#efe0ff" stop-opacity="0"/>
      <stop offset="60%" stop-color="#c79bff"/>
      <stop offset="100%" stop-color="#7c3fe0"/>
    </linearGradient>
    <filter id="i4-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i4-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i4-bg)"/>

  <g filter="url(#i4-glow)">
    <path d="M14 16 L34 34 L31 37 L11 20 Z" fill="url(#i4-streak)"/>
    <circle cx="34" cy="34" r="3.2" fill="#f3e8ff"/>
    <path d="M30 12 L44 24 L41.5 26.5 L28.5 14.5 Z" fill="url(#i4-streak)"/>
    <circle cx="44" cy="24" r="2.4" fill="#e6d0ff"/>
    <path d="M22 30 L37 43 L34.5 45.5 L20.5 33 Z" fill="url(#i4-streak)"/>
    <circle cx="37" cy="43" r="2" fill="#e6d0ff"/>
    <g fill="#f3e8ff">
      <path d="M46 40 l1.4 3.2 3.2 1.4-3.2 1.4-1.4 3.2-1.4-3.2-3.2-1.4 3.2-1.4z"/>
      <path d="M20 44 l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z"/>
    </g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '5',
    label: 'Gehoodete Cloak-Silhouette',
    keywords: ['hood', 'kapuze', 'cloak', 'umhang', 'mage', 'magier', 'purple', 'violett'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i5-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i5-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#3b1f52"/>
      <stop offset="60%" stop-color="#1c0e2b"/>
      <stop offset="100%" stop-color="#0a0512"/>
    </radialGradient>
    <linearGradient id="i5-rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#caa0ff"/>
      <stop offset="100%" stop-color="#5a2f8a" stop-opacity="0"/>
    </linearGradient>
    <filter id="i5-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i5-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i5-bg)"/>

  <g filter="url(#i5-glow)">
    <path d="M32 12c-8 0-13 6-13 13 0 4 1.6 6.8 3 9-3.4 3.6-5.4 8.6-5.4 13.5h30.8c0-4.9-2-9.9-5.4-13.5 1.4-2.2 3-5 3-9 0-7-5-13-13-13z"
          fill="#050208" stroke="url(#i5-rim)" stroke-width="1.4"/>
    <path d="M32 16c-5.8 0-9.4 4.3-9.4 9.2 0 3.6 1.7 6 3 7.6-.5.3-.9.7-1.3 1.1 2.3 1.8 5.2 2.9 7.7 2.9s5.4-1.1 7.7-2.9c-.4-.4-.8-.8-1.3-1.1 1.3-1.6 3-4 3-7.6 0-4.9-3.6-9.2-9.4-9.2z" fill="#0d0714"/>
    <ellipse cx="32" cy="27" rx="2.6" ry="1.6" fill="#d9b8ff" opacity="0.9"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '6',
    label: 'Bronzene Klauenhand',
    keywords: ['claw', 'kralle', 'hand', 'gauntlet', 'handschuh', 'monster'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i6-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i6-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#3d1c10"/>
      <stop offset="60%" stop-color="#1e0d08"/>
      <stop offset="100%" stop-color="#0a0403"/>
    </radialGradient>
    <linearGradient id="i6-claw" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0a35c"/>
      <stop offset="50%" stop-color="#9c5f28"/>
      <stop offset="100%" stop-color="#4a2c11"/>
    </linearGradient>
    <filter id="i6-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i6-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i6-bg)"/>

  <g filter="url(#i6-glow)">
    <path d="M22 44c-1-6 1-11 3-15-2-3-3-7-1.5-9.5 1-1.7 3-1.6 3.4.3.6 2.6 1.6 5 3 6.6-.4-3.4-.6-7.6.8-9.8 1.1-1.8 3.2-1.5 3.4.6.3 2.8.3 6.4.9 8.4.2-3 .4-6.8 1.8-8.6 1.2-1.6 3.2-1 3.2 1 0 2.6-.4 5.8.2 8 1-2 2.2-4.6 3.8-5.7 1.5-1 3.1.1 2.5 2-1 3-3 6.5-3.6 10.2-.6 3.6-.4 7.4-2.4 10.5-2.4 3.7-6.6 5-10.6 5-4.6 0-7.4-1.6-7.8-4z"
          fill="url(#i6-claw)" stroke="#2a1608" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '7',
    label: 'Rennende Silhouette',
    keywords: ['run', 'rennen', 'dash', 'sprint', 'speed', 'geschwindigkeit', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i7-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i7-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#c65a1e"/>
      <stop offset="45%" stop-color="#7a2a0d"/>
      <stop offset="100%" stop-color="#210a03"/>
    </radialGradient>
    <filter id="i7-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i7-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i7-bg)"/>

  <g filter="url(#i7-glow)" fill="#0a0503">
    <circle cx="36" cy="16" r="4"/>
    <path d="M34 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
    <path d="M22 30l6 2.4-3.4 12.6c-.4 1.5.5 3 2 3.4 1.4.4 2.9-.4 3.4-1.8l3.6-10.6" opacity="0.9"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '8',
    label: 'Meditierende Silhouette (Gold)',
    keywords: ['meditate', 'meditation', 'pray', 'gold', 'gebet', 'aura', 'monk', 'capstone'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i8-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i8-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#ffdd6b"/>
      <stop offset="45%" stop-color="#c8860f"/>
      <stop offset="100%" stop-color="#3a2405"/>
    </radialGradient>
    <radialGradient id="i8-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff4c2" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#ffce4a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffce4a" stop-opacity="0"/>
    </radialGradient>
    <filter id="i8-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i8-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i8-bg)"/>

  <g filter="url(#i8-glow)">
    <circle cx="32" cy="34" r="17" fill="url(#i8-aura)"/>
    <g fill="#140c02">
      <circle cx="32" cy="20" r="4.2"/>
      <path d="M24 47c-.4-6.5 1.8-11.4 3.8-14.4-1-1.4-1.6-3.2-1.2-4.8.7-2.6 3.2-2.9 4.4-.7.9 1.6 1 3.5 1 3.5s.1-1.9 1-3.5c1.2-2.2 3.7-1.9 4.4.7.4 1.6-.2 3.4-1.2 4.8 2 3 4.2 7.9 3.8 14.4-1.9 1.4-4.9 2.2-8 2.2s-6.1-.8-8-2.2z"/>
      <path d="M22 40l-4 4.4M42 40l4 4.4" stroke="#140c02" stroke-width="2.4" stroke-linecap="round"/>
    </g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '9',
    label: 'Vermummte Henker-Silhouette',
    keywords: ['executioner', 'henker', 'hood', 'kapuze', 'dark', 'dunkel', 'purple', 'violett'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i9-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i9-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#241130"/>
      <stop offset="60%" stop-color="#100816"/>
      <stop offset="100%" stop-color="#050308"/>
    </radialGradient>
    <linearGradient id="i9-rim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8a6bb0"/>
      <stop offset="100%" stop-color="#2a1740" stop-opacity="0"/>
    </linearGradient>
    <filter id="i9-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i9-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i9-bg)"/>

  <g filter="url(#i9-glow)">
    <path d="M32 10c-9 2-14 8-14 16 0 5 2 9 4 12-4 3.4-6.4 8.4-6.6 13h33.2c-.2-4.6-2.6-9.6-6.6-13 2-3 4-7 4-12 0-8-5-14-14-16z"
          fill="#030205" stroke="url(#i9-rim)" stroke-width="1.2"/>
    <path d="M32 15c-4 2-6.4 5.6-6.4 9.8 0 3.6 1.4 6.4 3 8.4-1.6.6-3 1.8-4 3.2 2.2 2 4.8 3.2 7.4 3.2s5.2-1.2 7.4-3.2c-1-1.4-2.4-2.6-4-3.2 1.6-2 3-4.8 3-8.4 0-4.2-2.4-7.8-6.4-9.8z" fill="#0a0612"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '10',
    label: 'Blaue Eissplitter',
    keywords: ['ice', 'eis', 'shard', 'splitter', 'blue', 'blau', 'frost', 'projektil'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i10-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i10-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#0d2c4a"/>
      <stop offset="60%" stop-color="#071a2e"/>
      <stop offset="100%" stop-color="#020a14"/>
    </radialGradient>
    <linearGradient id="i10-shard" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eaf7ff"/>
      <stop offset="45%" stop-color="#7ec8f2"/>
      <stop offset="100%" stop-color="#1f5fa0"/>
    </linearGradient>
    <filter id="i10-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i10-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i10-bg)"/>

  <g filter="url(#i10-glow)">
    <path d="M22 14 L28 30 L20 28 L26 44 L14 32 L20 34 Z" fill="url(#i10-shard)" stroke="#0a2e4d" stroke-width="0.6"/>
    <path d="M40 12 L45 26 L38 24 L43 40 L48 27 L43 28 Z" fill="url(#i10-shard)" stroke="#0a2e4d" stroke-width="0.6"/>
    <path d="M32 26 L37 40 L31 38 L36 52 L24 38 L30 40 Z" fill="url(#i10-shard)" stroke="#0a2e4d" stroke-width="0.6" opacity="0.95"/>
    <circle cx="22" cy="14" r="1.6" fill="#ffffff"/>
    <circle cx="40" cy="12" r="1.4" fill="#ffffff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '11',
    label: 'Kette mit Kugelenden',
    keywords: ['chain', 'kette', 'bola', 'flail', 'metal', 'metall'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i11-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i11-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#3a1c12"/>
      <stop offset="60%" stop-color="#1c0d08"/>
      <stop offset="100%" stop-color="#080403"/>
    </radialGradient>
    <linearGradient id="i11-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef0f2"/>
      <stop offset="45%" stop-color="#a9afb6"/>
      <stop offset="100%" stop-color="#484d52"/>
    </linearGradient>
    <filter id="i11-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i11-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i11-bg)"/>

  <g filter="url(#i11-glow)">
    <path d="M18 20c4 2 6 6 10 8s8 1 12 4 5 8 8 10" fill="none" stroke="url(#i11-metal)" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0.2 5.4"/>
    <circle cx="18" cy="20" r="6" fill="url(#i11-metal)" stroke="#2c2f33" stroke-width="1"/>
    <circle cx="48" cy="42" r="6" fill="url(#i11-metal)" stroke="#2c2f33" stroke-width="1"/>
    <circle cx="18" cy="20" r="2" fill="#3a3d40"/>
    <circle cx="48" cy="42" r="2" fill="#3a3d40"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '12',
    label: 'Gelb-weißer Strahlenausbruch',
    keywords: ['burst', 'explosion', 'light', 'licht', 'flash', 'blitz'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i12-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i12-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#241c0a"/>
      <stop offset="60%" stop-color="#100c05"/>
      <stop offset="100%" stop-color="#050402"/>
    </radialGradient>
    <radialGradient id="i12-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#c9f0ff"/>
      <stop offset="70%" stop-color="#5fc9e8"/>
      <stop offset="100%" stop-color="#1c7fa3" stop-opacity="0"/>
    </radialGradient>
    <filter id="i12-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="3.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i12-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i12-bg)"/>

  <g filter="url(#i12-glow)">
    <circle cx="32" cy="32" r="15" fill="url(#i12-core)"/>
    <g fill="#eafcff">
      <path d="M32 8 L34 26 L32 30 L30 26 Z"/>
      <path d="M32 56 L30 38 L32 34 L34 38 Z"/>
      <path d="M8 32 L26 30 L30 32 L26 34 Z"/>
      <path d="M56 32 L38 34 L34 32 L38 30 Z"/>
    </g>
    <circle cx="32" cy="32" r="6" fill="#ffffff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '13',
    label: 'Grüner Geist',
    keywords: ['ghost', 'geist', 'wisp', 'spirit', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i13-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i13-bg" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#0d2a24"/>
      <stop offset="60%" stop-color="#061512"/>
      <stop offset="100%" stop-color="#020807"/>
    </radialGradient>
    <linearGradient id="i13-ghost" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8ffe6"/>
      <stop offset="45%" stop-color="#4ee0a0"/>
      <stop offset="100%" stop-color="#0f7a54" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="i13-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i13-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i13-bg)"/>

  <g filter="url(#i13-glow)">
    <path d="M32 12c-6.6 0-11 5-11 11.5 0 4 1.6 6.4 2.6 9-1.6 4.4-2.6 9-2.6 13.5 1.6-1.6 2.8-3 4.2-3 1.6 0 2.4 2 4 2s2.4-2 3.8-2 2.2 2 3.8 2 2.4-2 4-2c1.4 0 2.6 1.4 4.2 3 0-4.5-1-9.1-2.6-13.5 1-2.6 2.6-5 2.6-9 0-6.5-4.4-11.5-11-11.5z"
          fill="url(#i13-ghost)" opacity="0.9"/>
    <ellipse cx="27" cy="24" rx="2.2" ry="3" fill="#04140f"/>
    <ellipse cx="37" cy="24" rx="2.2" ry="3" fill="#04140f"/>
    <path d="M28 31c1.4 1.2 2.8 1.2 4 0" stroke="#04140f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '14',
    label: 'Gestalt über Schädelhaufen',
    keywords: ['skulls', 'schädel', 'hood', 'kapuze', 'necro', 'orange'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i14-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i14-bg" cx="50%" cy="55%" r="70%">
      <stop offset="0%" stop-color="#7a2e0d"/>
      <stop offset="55%" stop-color="#2e1006"/>
      <stop offset="100%" stop-color="#0a0402"/>
    </radialGradient>
    <filter id="i14-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i14-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i14-bg)"/>

  <g filter="url(#i14-glow)">
    <path d="M32 10c-4 6-9 14-9 22 0 3 .6 5.6 1.6 7.8h14.8c1-2.2 1.6-4.8 1.6-7.8 0-8-5-16-9-22z" fill="#050302" stroke="#2a1206" stroke-width="1"/>
    <g fill="#3a1c0c" stroke="#180a03" stroke-width="0.8">
      <circle cx="20" cy="46" r="4.4"/>
      <circle cx="30" cy="49" r="5"/>
      <circle cx="41" cy="46" r="4.6"/>
      <circle cx="49" cy="48" r="3.6"/>
    </g>
    <g fill="#0a0503">
      <ellipse cx="18.5" cy="45.5" rx="1" ry="1.3"/>
      <ellipse cx="21.5" cy="45.5" rx="1" ry="1.3"/>
      <ellipse cx="28.5" cy="48.5" rx="1.1" ry="1.4"/>
      <ellipse cx="31.5" cy="48.5" rx="1.1" ry="1.4"/>
      <ellipse cx="39.5" cy="45.5" rx="1" ry="1.3"/>
      <ellipse cx="42.5" cy="45.5" rx="1" ry="1.3"/>
    </g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '15',
    label: 'Weißer Vierzack-Stern',
    keywords: ['star', 'stern', 'shuriken', 'search', 'suche', 'sparkle'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i15-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i15-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#2a1408"/>
      <stop offset="60%" stop-color="#140a04"/>
      <stop offset="100%" stop-color="#060302"/>
    </radialGradient>
    <linearGradient id="i15-star" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#e7c98a"/>
      <stop offset="100%" stop-color="#8a6a35"/>
    </linearGradient>
    <filter id="i15-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i15-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i15-bg)"/>

  <g filter="url(#i15-glow)">
    <path d="M32 8 L37 27 L56 32 L37 37 L32 56 L27 37 L8 32 L27 27 Z" fill="url(#i15-star)" stroke="#5a4322" stroke-width="1"/>
    <circle cx="32" cy="32" r="4" fill="#3a2c14"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '16',
    label: 'Cluster roter Schädel',
    keywords: ['skull', 'schädel', 'red', 'rot', 'cluster', 'tod', 'death'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i16-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i16-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#3a1210"/>
      <stop offset="60%" stop-color="#1c0806"/>
      <stop offset="100%" stop-color="#080302"/>
    </radialGradient>
    <linearGradient id="i16-skull" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff8a70"/>
      <stop offset="50%" stop-color="#d63a2a"/>
      <stop offset="100%" stop-color="#6e1710"/>
    </linearGradient>
    <filter id="i16-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i16-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i16-bg)"/>

  <g filter="url(#i16-glow)">
    <g transform="translate(16,32) scale(0.55)">
      <path d="M32 15c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l4.6 6.1h6l4.6-6.1c2.8-2.1 5.4-5.4 5.4-10.4C45 20.5 40 15 32 15z" fill="url(#i16-skull)" stroke="#4a0e08" stroke-width="1.2"/>
      <ellipse cx="26.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
      <ellipse cx="37.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
    </g>
    <g transform="translate(40,20) scale(0.5)">
      <path d="M32 15c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l4.6 6.1h6l4.6-6.1c2.8-2.1 5.4-5.4 5.4-10.4C45 20.5 40 15 32 15z" fill="url(#i16-skull)" stroke="#4a0e08" stroke-width="1.2"/>
      <ellipse cx="26.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
      <ellipse cx="37.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
    </g>
    <g transform="translate(30,44) scale(0.48)">
      <path d="M32 15c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l4.6 6.1h6l4.6-6.1c2.8-2.1 5.4-5.4 5.4-10.4C45 20.5 40 15 32 15z" fill="url(#i16-skull)" stroke="#4a0e08" stroke-width="1.2"/>
      <ellipse cx="26.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
      <ellipse cx="37.5" cy="27" rx="3.6" ry="4.4" fill="#2a0704"/>
    </g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '17',
    label: 'Rote gebogene Klinge',
    keywords: ['blade', 'klinge', 'dagger', 'dolch', 'red', 'rot', 'blood'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i17-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i17-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#2c0f0a"/>
      <stop offset="60%" stop-color="#150705"/>
      <stop offset="100%" stop-color="#060302"/>
    </radialGradient>
    <linearGradient id="i17-blade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff9d8a"/>
      <stop offset="45%" stop-color="#d63a2a"/>
      <stop offset="100%" stop-color="#5c130c"/>
    </linearGradient>
    <filter id="i17-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i17-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i17-bg)"/>

  <g filter="url(#i17-glow)">
    <rect x="29" y="10" width="6" height="10" rx="1.4" fill="#4a2c14"/>
    <rect x="22" y="18" width="20" height="4" rx="1.4" fill="#7a5228"/>
    <path d="M32 22c5 6 8 14 8 20 0 8-4 14-8 18-4-4-8-10-8-18 0-6 3-14 8-20z" fill="url(#i17-blade)" stroke="#3a0d08" stroke-width="1"/>
    <path d="M32 24c2.6 5.6 4 12 4 17 0 5.6-1.8 10.4-4 14" stroke="#ffcfc2" stroke-width="1" fill="none" opacity="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '18',
    label: 'Fliegende Krähe',
    keywords: ['crow', 'krähe', 'raven', 'rabe', 'bird', 'vogel'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i18-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i18-bg" cx="50%" cy="40%" r="75%">
      <stop offset="0%" stop-color="#241c14"/>
      <stop offset="60%" stop-color="#100c08"/>
      <stop offset="100%" stop-color="#050402"/>
    </radialGradient>
    <filter id="i18-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i18-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i18-bg)"/>

  <g filter="url(#i18-glow)" fill="#0a0806">
    <path d="M32 26c-6-6-14-9-22-8 4 3 7 6 9 9-4 0-8 2-11 5 5 0 9 1 12 3-2 2-3 5-3 8 4-3 8-5 12-6l3-2 3 2c4 1 8 3 12 6 0-3-1-6-3-8 3-2 7-3 12-3-3-3-7-5-11-5 2-3 5-6 9-9-8-1-16 2-22 8z"/>
    <path d="M32 22l-2 6 2 3 2-3z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '19',
    label: 'Schwarze Spinne',
    keywords: ['spider', 'spinne', 'teal', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i19-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i19-bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#123038"/>
      <stop offset="60%" stop-color="#08181c"/>
      <stop offset="100%" stop-color="#03090b"/>
    </radialGradient>
    <filter id="i19-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i19-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i19-bg)"/>

  <g filter="url(#i19-glow)" fill="#080a0a" stroke="#080a0a">
    <ellipse cx="32" cy="30" rx="7" ry="8.5"/>
    <ellipse cx="32" cy="42" rx="9.5" ry="8"/>
    <g stroke-width="1.8" stroke-linecap="round" fill="none">
      <path d="M27 26 L14 18 M27 26 L12 26 M28 32 L11 34 M29 37 L14 44"/>
      <path d="M37 26 L50 18 M37 26 L52 26 M36 32 L53 34 M35 37 L50 44"/>
    </g>
    <circle cx="29" cy="27" r="1.2" fill="#7ee0ff" stroke="none"/>
    <circle cx="35" cy="27" r="1.2" fill="#7ee0ff" stroke="none"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '20',
    label: 'Kampfkunst-Faust',
    keywords: ['fist', 'faust', 'martial', 'kampfkunst', 'chi', 'monk', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i20-frame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8a7350"/>
      <stop offset="45%" stop-color="#3a2e1c"/>
      <stop offset="55%" stop-color="#1a140b"/>
      <stop offset="100%" stop-color="#6b5738"/>
    </linearGradient>
    <radialGradient id="i20-bg" cx="50%" cy="55%" r="75%">
      <stop offset="0%" stop-color="#c8940f"/>
      <stop offset="45%" stop-color="#5a3d08"/>
      <stop offset="100%" stop-color="#120c02"/>
    </radialGradient>
    <linearGradient id="i20-aura" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bfe8ff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#2a7fb0" stop-opacity="0"/>
    </linearGradient>
    <filter id="i20-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i20-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i20-bg)"/>

  <g filter="url(#i20-glow)">
    <path d="M20 52c-2-8 1-16 6-21-3-2-5-6-4-9 1.4-3.4 5-3 6 .4.6 2 .6 4 .6 4s1-3 2.4-4.6c1.8-2 4.6-.8 4.2 2-.4 2.6-2 4.6-2 4.6s2.4-2.2 4.6-2.6c2.8-.6 4 2.2 1.8 4.4-2 2-4.8 3-4.8 3 5 5 8 13 6 21-3.4 1.6-7 2.4-10.4 2.4s-7-.8-10.4-2.4z"
          fill="#050505" opacity="0.92"/>
    <path d="M32 14c-1.4 0-2.2 8-2.2 8s.8 2 2.2 2 2.2-2 2.2-2-.8-8-2.2-8z" fill="url(#i20-aura)"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '21',
    label: 'Brennende Silhouette',
    keywords: ['fire', 'feuer', 'flame', 'flamme', 'silhouette', 'burn', 'brennen'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i21-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i21-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#b8410f"/><stop offset="50%" stop-color="#5a1a06"/><stop offset="100%" stop-color="#150502"/></radialGradient>
    <linearGradient id="i21-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff5a1a"/><stop offset="50%" stop-color="#ffb23a"/><stop offset="100%" stop-color="#fff2c2"/></linearGradient>
    <filter id="i21-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i21-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i21-bg)"/>
  <g filter="url(#i21-glow)">
    <path d="M26 50c-2-3-3-6-2-9 1-3 3-4 3-4s-3 1-4 4c-3-3-3-8 0-12 2-3 5-4 5-4s-4 0-6 3c1-6 6-10 6-10s-1 5 1 8c1-4 4-6 4-6s-1 4 1 7c2-2 4-2 4-2s-2 3-1 6c2-1 4 0 4 0s-3 2-3 5c2 0 4 2 4 2s-3 0-4 2c2 1 3 3 3 3-3-1-6 0-8 2-3 2-4 4-7 5z" fill="url(#i21-flame)" opacity="0.9"/>
    <path d="M32 24c-1.8 0-3.2 1.4-3.6 3.4l-1.8 8c-.2 1 .4 2 1.4 2.2l3.8.8-1.6 8.6c-.3 1.3.6 2.4 1.9 2.4.9 0 1.7-.5 2-1.4l2.8-8.6 3.6 3c.9.8 2.2.5 2.7-.5l2.4-4.4c.5-1-.1-2.2-1.1-2.6-1-.4-2.1 0-2.6 1l-1.4 2.6-3.4-2.8 1.2-4.8c.4-1.7-.5-3.4-2.1-4-1.6-.6-3.4.2-4.2 1.7z" fill="#0a0603"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '22',
    label: 'Blauer Blitz-Handschlag',
    keywords: ['lightning', 'blitz', 'hand', 'electric', 'elektrisch', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i22-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i22-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#0d2c52"/><stop offset="60%" stop-color="#071730"/><stop offset="100%" stop-color="#020712"/></radialGradient>
    <linearGradient id="i22-bolt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#9fd8ff"/><stop offset="100%" stop-color="#2a7fd6"/></linearGradient>
    <filter id="i22-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i22-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i22-bg)"/>
  <g filter="url(#i22-glow)">
    <path d="M22 46c-2-6-1-13 2-18-2 0-4 1-4 1l6-14 3 8 5-4-2 9 6-2-8 12 4-1-9 11 2-6-5 4z" fill="#050810" opacity="0.85"/>
    <path d="M34 10 L27 27 L33 27 L26 46 L40 26 L33 26 Z" fill="url(#i22-bolt)" stroke="#0a2e4d" stroke-width="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '23',
    label: 'Frost-Krieger-Silhouette',
    keywords: ['frost', 'ice', 'eis', 'warrior', 'krieger', 'blue', 'blau', 'armor'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i23-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i23-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#123a5c"/><stop offset="60%" stop-color="#081d30"/><stop offset="100%" stop-color="#020a12"/></radialGradient>
    <linearGradient id="i23-rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8f7ff"/><stop offset="100%" stop-color="#4a9fd6" stop-opacity="0.2"/></linearGradient>
    <filter id="i23-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i23-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i23-bg)"/>
  <g filter="url(#i23-glow)">
    <path d="M32 12c-2.4 0-4.2 2-4.2 4.4 0 1.4.6 2.6 1.6 3.4-4.6 1.4-8 5.6-8 10.6 0 3.6 1.6 6.6 4 8.6-2 2.8-3.4 8-3.4 12h20c0-4-1.4-9.2-3.4-12 2.4-2 4-5 4-8.6 0-5-3.4-9.2-8-10.6 1-.8 1.6-2 1.6-3.4 0-2.4-1.8-4.4-4.2-4.4z" fill="#040d16" stroke="url(#i23-rim)" stroke-width="1.4"/>
    <path d="M24 30l3 3M40 30l-3 3" stroke="#bfe6ff" stroke-width="1.2" opacity="0.7"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '24',
    label: 'Mumie mit Feuer',
    keywords: ['mummy', 'mumie', 'bandage', 'fire', 'feuer', 'undead'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i24-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i24-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#7a2408"/><stop offset="55%" stop-color="#340f04"/><stop offset="100%" stop-color="#0c0402"/></radialGradient>
    <linearGradient id="i24-wrap" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e8d3a8"/><stop offset="50%" stop-color="#b08c5c"/><stop offset="100%" stop-color="#5c452a"/></linearGradient>
    <filter id="i24-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i24-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i24-bg)"/>
  <g filter="url(#i24-glow)">
    <ellipse cx="32" cy="22" rx="9" ry="9.5" fill="url(#i24-wrap)" stroke="#3a2c18" stroke-width="1"/>
    <path d="M23 24l18 0M24 19l16 0M25 28l14 0" stroke="#5c452a" stroke-width="1.4" opacity="0.7"/>
    <path d="M22 46c-.4-8 1.6-14 4-18l-3-3 8 2 2-2 2 2 8-2-3 3c2.4 4 4.4 10 4 18-3.6 1.8-7.6 2.8-11 2.8s-7.4-1-11-2.8z" fill="url(#i24-wrap)" stroke="#3a2c18" stroke-width="1"/>
    <path d="M20 44c1-2 2.6-3 2.6-3s-2.4.4-3.4 2c-.8-2.4 0-5.4 2-7.4-2 .4-3.6 2-3.6 2s1.4-3.4 4-4.6c-2.2-.2-4 1-4 1s2-3.4 5-4" fill="#ff8a2a" opacity="0.85"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '25',
    label: 'Grüne Klauenhand mit Energie',
    keywords: ['claw', 'kralle', 'hand', 'green', 'grün', 'energy', 'energie', 'gift', 'poison'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i25-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i25-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3020"/><stop offset="60%" stop-color="#061810"/><stop offset="100%" stop-color="#020806"/></radialGradient>
    <linearGradient id="i25-claw" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8ffb0"/><stop offset="50%" stop-color="#5ed43a"/><stop offset="100%" stop-color="#1f6b12"/></linearGradient>
    <filter id="i25-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i25-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i25-bg)"/>
  <g filter="url(#i25-glow)">
    <path d="M22 44c-1-6 1-11 3-15-2-3-3-7-1.5-9.5 1-1.7 3-1.6 3.4.3.6 2.6 1.6 5 3 6.6-.4-3.4-.6-7.6.8-9.8 1.1-1.8 3.2-1.5 3.4.6.3 2.8.3 6.4.9 8.4.2-3 .4-6.8 1.8-8.6 1.2-1.6 3.2-1 3.2 1 0 2.6-.4 5.8.2 8 1-2 2.2-4.6 3.8-5.7 1.5-1 3.1.1 2.5 2-1 3-3 6.5-3.6 10.2-.6 3.6-.4 7.4-2.4 10.5-2.4 3.7-6.6 5-10.6 5-4.6 0-7.4-1.6-7.8-4z" fill="url(#i25-claw)" stroke="#0d3a08" stroke-width="1"/>
    <g fill="#e6ffd0"><circle cx="18" cy="20" r="1.4"/><circle cx="44" cy="16" r="1.2"/><circle cx="14" cy="34" r="1"/></g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '26',
    label: 'Violette Kreuzblitze',
    keywords: ['lightning', 'blitz', 'purple', 'violett', 'cross', 'kreuz', 'magic', 'magie'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i26-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i26-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2e1350"/><stop offset="60%" stop-color="#160828"/><stop offset="100%" stop-color="#08030f"/></radialGradient>
    <linearGradient id="i26-bolt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#c79bff"/><stop offset="100%" stop-color="#6b2fc9"/></linearGradient>
    <filter id="i26-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i26-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i26-bg)"/>
  <g filter="url(#i26-glow)">
    <path d="M24 10 L18 28 L24 28 L16 46 L34 26 L27 26 Z" fill="url(#i26-bolt)" stroke="#3a1a5c" stroke-width="0.6"/>
    <path d="M42 14 L36 30 L42 30 L34 48 L50 28 L44 28 Z" fill="url(#i26-bolt)" stroke="#3a1a5c" stroke-width="0.6" opacity="0.9"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '27',
    label: 'Rotes Projektil',
    keywords: ['missile', 'projektil', 'torpedo', 'red', 'rot', 'rocket'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i27-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i27-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a1108"/><stop offset="60%" stop-color="#1c0804"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <linearGradient id="i27-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb28a"/><stop offset="45%" stop-color="#d6472a"/><stop offset="100%" stop-color="#5c150c"/></linearGradient>
    <filter id="i27-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i27-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i27-bg)"/>
  <g transform="rotate(35,32,32)" filter="url(#i27-glow)">
    <path d="M20 32c0-8 6-16 12-18 6 2 12 10 12 18s-6 16-12 18c-6-2-12-10-12-18z" fill="url(#i27-body)" stroke="#3a0d06" stroke-width="1"/>
    <path d="M32 14l-4 8h8z" fill="#ffe0c2"/>
    <path d="M22 42l-6 6 4-8zM42 42l6 6-4-8z" fill="#7a2a12"/>
    <path d="M32 20c2.6 5 4 10.4 4 15 0 3.6-1 7-2.6 9.6" stroke="#ffd9c2" stroke-width="1" fill="none" opacity="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '28',
    label: 'Violettes Auge / Portal',
    keywords: ['eye', 'auge', 'portal', 'purple', 'violett', 'seal', 'mystic'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i28-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i28-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a1050"/><stop offset="60%" stop-color="#140828"/><stop offset="100%" stop-color="#06030f"/></radialGradient>
    <radialGradient id="i28-iris" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f3e0ff"/><stop offset="45%" stop-color="#a35ce0"/><stop offset="100%" stop-color="#3a1160"/></radialGradient>
    <filter id="i28-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i28-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i28-bg)"/>
  <g filter="url(#i28-glow)">
    <circle cx="32" cy="32" r="16" fill="none" stroke="#8a6bb0" stroke-width="1.4" opacity="0.6"/>
    <path d="M14 32c4-8 11-13 18-13s14 5 18 13c-4 8-11 13-18 13s-14-5-18-13z" fill="#0a0512" stroke="#8a6bb0" stroke-width="1"/>
    <circle cx="32" cy="32" r="8" fill="url(#i28-iris)"/>
    <circle cx="32" cy="32" r="3" fill="#08040f"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '29',
    label: 'Oranger Wirbelsturm',
    keywords: ['tornado', 'wirbelsturm', 'vortex', 'orange', 'sturm', 'wind'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i29-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i29-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#8a3c0f"/><stop offset="50%" stop-color="#3a1706"/><stop offset="100%" stop-color="#0c0402"/></radialGradient>
    <linearGradient id="i29-swirl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffcf8a"/><stop offset="60%" stop-color="#e07a1f"/><stop offset="100%" stop-color="#6b2e08"/></linearGradient>
    <filter id="i29-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i29-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i29-bg)"/>
  <g filter="url(#i29-glow)" fill="none" stroke="url(#i29-swirl)" stroke-width="3" stroke-linecap="round">
    <path d="M18 22c6-6 22-6 28 0s2 16-8 16-14-8-8-13 16-3 16 3"/>
    <path d="M32 46c-4 0-8-2-8-2"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '30',
    label: 'Goldene stehende Figur',
    keywords: ['gold', 'robe', 'gewand', 'figure', 'figur', 'priest', 'stehend'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i30-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i30-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#ffdd6b"/><stop offset="45%" stop-color="#b87a10"/><stop offset="100%" stop-color="#2e1c04"/></radialGradient>
    <filter id="i30-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i30-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i30-bg)"/>
  <g filter="url(#i30-glow)" fill="#140c02">
    <circle cx="32" cy="18" r="4.4"/>
    <path d="M32 23c-3 0-5 2-5 5v2l-6 14c-.6 1.4.2 3 1.6 3.4 1.3.4 2.7-.3 3.2-1.6l3.2-8v11h6V38l3.2 8c.5 1.3 1.9 2 3.2 1.6 1.4-.4 2.2-2 1.6-3.4l-6-14v-2c0-3-2-5-5-5z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '31',
    label: 'Rennende Silhouette (rotbraun)',
    keywords: ['run', 'rennen', 'sprint', 'dash', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i31-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i31-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#6e2a12"/><stop offset="55%" stop-color="#340f06"/><stop offset="100%" stop-color="#0c0402"/></radialGradient>
    <filter id="i31-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i31-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i31-bg)"/>
  <g filter="url(#i31-glow)" fill="#0a0503">
    <circle cx="28" cy="16" r="4"/>
    <path d="M26 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '32',
    label: 'Handfläche-Silhouette (Stopp-Geste)',
    keywords: ['hand', 'stop', 'gesture', 'geste', 'gold'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i32-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i32-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#c8940f"/><stop offset="50%" stop-color="#5a3d08"/><stop offset="100%" stop-color="#120c02"/></radialGradient>
    <filter id="i32-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i32-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i32-bg)"/>
  <g filter="url(#i32-glow)" fill="#140c02">
    <path d="M26 46V28a2.4 2.4 0 0 1 4.8 0v6M30.8 34v-9a2.4 2.4 0 0 1 4.8 0v9M35.6 34v-7a2.4 2.4 0 0 1 4.8 0v9M40.4 36v-4a2.2 2.2 0 0 1 4.4 0v10c0 6-4 10-10 10h-4c-4 0-6-1.6-8.4-5l-4-6.4c-.9-1.4-.4-3.2 1-4 1.3-.7 2.9-.3 3.7.9l2.7 4z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '33',
    label: 'Oranges Feuer-Explosion',
    keywords: ['fire', 'feuer', 'explosion', 'orange', 'burst'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i33-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i33-bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#3a1c08"/><stop offset="60%" stop-color="#1a0c04"/><stop offset="100%" stop-color="#080402"/></radialGradient>
    <radialGradient id="i33-core" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff6c2"/><stop offset="35%" stop-color="#ffb23a"/><stop offset="70%" stop-color="#e05a10"/><stop offset="100%" stop-color="#7a1e04" stop-opacity="0"/></radialGradient>
    <filter id="i33-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i33-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i33-bg)"/>
  <g filter="url(#i33-glow)">
    <circle cx="32" cy="32" r="15" fill="url(#i33-core)"/>
    <g fill="#ffdca0"><path d="M32 8 L35 26 L32 30 L29 26 Z"/><path d="M32 56 L29 38 L32 34 L35 38 Z"/><path d="M8 32 L26 29 L30 32 L26 35 Z"/><path d="M56 32 L38 35 L34 32 L38 29 Z"/></g>
    <circle cx="32" cy="32" r="6" fill="#fff6c2"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '34',
    label: 'Magenta Stern-Explosion',
    keywords: ['star', 'stern', 'explosion', 'magenta', 'purple', 'violett', 'burst'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i34-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i34-bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#2a0f38"/><stop offset="60%" stop-color="#14071c"/><stop offset="100%" stop-color="#06030a"/></radialGradient>
    <radialGradient id="i34-core" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="35%" stop-color="#f0a0ff"/><stop offset="70%" stop-color="#c030d6"/><stop offset="100%" stop-color="#5a0f70" stop-opacity="0"/></radialGradient>
    <filter id="i34-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i34-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i34-bg)"/>
  <g filter="url(#i34-glow)">
    <circle cx="32" cy="32" r="14" fill="url(#i34-core)"/>
    <g fill="#fbe0ff"><path d="M32 9 L34 27 L32 30 L30 27 Z"/><path d="M32 55 L30 37 L32 34 L34 37 Z"/><path d="M9 32 L27 30 L30 32 L27 34 Z"/><path d="M55 32 L37 34 L34 32 L37 30 Z"/></g>
    <circle cx="32" cy="32" r="5.4" fill="#ffffff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '35',
    label: 'Gelbe Krallenspuren',
    keywords: ['claw', 'kralle', 'scratch', 'kratzer', 'yellow', 'gelb'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i35-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i35-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#241d0a"/><stop offset="60%" stop-color="#100c05"/><stop offset="100%" stop-color="#050402"/></radialGradient>
    <linearGradient id="i35-claw" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff6c2" stop-opacity="0"/><stop offset="50%" stop-color="#ffe066"/><stop offset="100%" stop-color="#e0a800"/></linearGradient>
    <filter id="i35-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i35-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i35-bg)"/>
  <g filter="url(#i35-glow)" stroke="url(#i35-claw)" stroke-width="3.4" stroke-linecap="round" fill="none">
    <path d="M14 14 L38 50"/>
    <path d="M22 12 L46 48"/>
    <path d="M30 10 L54 46"/>
    <path d="M38 10 L58 40"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '36',
    label: 'Dunkle Festung-Silhouette',
    keywords: ['castle', 'burg', 'festung', 'fortress', 'orange'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i36-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i36-bg" cx="50%" cy="60%" r="75%"><stop offset="0%" stop-color="#a85a1a"/><stop offset="50%" stop-color="#4a2408"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <filter id="i36-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i36-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i36-bg)"/>
  <g filter="url(#i36-glow)" fill="#0a0402">
    <rect x="14" y="30" width="8" height="18"/>
    <rect x="26" y="20" width="12" height="28"/>
    <rect x="42" y="28" width="8" height="20"/>
    <path d="M14 30l0-5 2-2 2 2 0-2 2 2v5zM42 28l0-4 2-2 2 2v4z"/>
    <rect x="30" y="26" width="4" height="6" fill="#ffb23a" opacity="0.8"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '37',
    label: 'Fledermaus-Kreatur',
    keywords: ['bat', 'fledermaus', 'creature', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i37-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i37-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#5a6a0f"/><stop offset="55%" stop-color="#283306"/><stop offset="100%" stop-color="#0a0d02"/></radialGradient>
    <filter id="i37-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i37-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i37-bg)"/>
  <g filter="url(#i37-glow)" fill="#0a0e03">
    <path d="M32 24c-6-8-16-10-22-6 4 2 8 4 10 8-5 0-9 2-12 6 5-1 9 0 12 2-2 3-2 6-1 9 3-4 6-6 9-6l4 3 4-3c3 0 6 2 9 6 1-3 1-6-1-9 3-2 7-3 12-2-3-4-7-6-12-6 2-4 6-6 10-8-6-4-16-2-22 6z"/>
    <circle cx="28" cy="24" r="1.4" fill="#c8ff6a"/>
    <circle cx="36" cy="24" r="1.4" fill="#c8ff6a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '38',
    label: 'Glühender Schädel (gelb-grün)',
    keywords: ['skull', 'schädel', 'glow', 'glühen', 'yellow', 'gelb', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i38-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i38-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#3a3a0c"/><stop offset="60%" stop-color="#1a1a06"/><stop offset="100%" stop-color="#080802"/></radialGradient>
    <linearGradient id="i38-skull" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2ffb0"/><stop offset="50%" stop-color="#c8d43a"/><stop offset="100%" stop-color="#5c6b12"/></linearGradient>
    <filter id="i38-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i38-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i38-bg)"/>
  <g filter="url(#i38-glow)">
    <circle cx="32" cy="28" r="14" fill="#d4e63a" opacity="0.3"/>
    <path d="M32 15c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l4.6 6.1h6l4.6-6.1c2.8-2.1 5.4-5.4 5.4-10.4C45 20.5 40 15 32 15z" fill="url(#i38-skull)" stroke="#3a4008" stroke-width="1"/>
    <ellipse cx="26.5" cy="27" rx="3.4" ry="4.2" fill="#242a06"/>
    <ellipse cx="37.5" cy="27" rx="3.4" ry="4.2" fill="#242a06"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '39',
    label: 'Rotes Auge',
    keywords: ['eye', 'auge', 'red', 'rot', 'watch', 'seher'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i39-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i39-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a0a08"/><stop offset="60%" stop-color="#140504"/><stop offset="100%" stop-color="#060202"/></radialGradient>
    <radialGradient id="i39-iris" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffdca0"/><stop offset="40%" stop-color="#ff4a2a"/><stop offset="100%" stop-color="#6b0f08"/></radialGradient>
    <filter id="i39-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i39-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i39-bg)"/>
  <g filter="url(#i39-glow)">
    <path d="M12 32c5-9 12-14 20-14s15 5 20 14c-5 9-12 14-20 14s-15-5-20-14z" fill="#0a0302" stroke="#7a1a10" stroke-width="1.2"/>
    <circle cx="32" cy="32" r="9" fill="url(#i39-iris)"/>
    <circle cx="32" cy="32" r="3.4" fill="#1a0402"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '40',
    label: 'Glühende Faust',
    keywords: ['fist', 'faust', 'glow', 'glühen', 'red', 'rot', 'orange', 'punch'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i40-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i40-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a1408"/><stop offset="60%" stop-color="#1c0a04"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <radialGradient id="i40-aura" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffb23a" stop-opacity="0.9"/><stop offset="70%" stop-color="#e05a10" stop-opacity="0.3"/><stop offset="100%" stop-color="#e05a10" stop-opacity="0"/></radialGradient>
    <filter id="i40-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i40-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i40-bg)"/>
  <g filter="url(#i40-glow)">
    <circle cx="32" cy="32" r="16" fill="url(#i40-aura)"/>
    <path d="M22 30v10c0 5 4 8 10 8s10-3 10-8V26a2.4 2.4 0 0 0-4.8 0v6-9a2.4 2.4 0 0 0-4.8 0v9-11a2.4 2.4 0 0 0-4.8 0v11-6a2.2 2.2 0 0 0-4.4 0z" fill="#140905"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '41',
    label: 'Weißblauer Eiskristall-Cluster',
    keywords: ['ice', 'eis', 'crystal', 'kristall', 'blue', 'blau', 'frost'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i41-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i41-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#163a5c"/><stop offset="60%" stop-color="#0a1e30"/><stop offset="100%" stop-color="#030a12"/></radialGradient>
    <linearGradient id="i41-ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#bfe6ff"/><stop offset="100%" stop-color="#4a9fd6"/></linearGradient>
    <filter id="i41-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i41-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i41-bg)"/>
  <g filter="url(#i41-glow)" fill="url(#i41-ice)" stroke="#1a4a70" stroke-width="0.6">
    <path d="M32 10 L37 26 L32 30 L27 26 Z"/>
    <path d="M18 26 L28 34 L24 38 L14 32 Z"/>
    <path d="M46 26 L36 34 L40 38 L50 32 Z"/>
    <path d="M32 32 L40 44 L32 54 L24 44 Z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '42',
    label: 'Greifende Hand-Silhouette',
    keywords: ['hand', 'grab', 'greifen', 'silhouette', 'brown', 'braun'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i42-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i42-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#5a2a10"/><stop offset="55%" stop-color="#2a1206"/><stop offset="100%" stop-color="#0a0402"/></radialGradient>
    <filter id="i42-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i42-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i42-bg)"/>
  <g filter="url(#i42-glow)" fill="#0a0503">
    <circle cx="24" cy="18" r="4"/>
    <path d="M20 24c-1.6 1-2.6 2.8-2.6 4.8v6l-4 12c-.5 1.5.3 3.1 1.8 3.6 1.4.5 3-.2 3.6-1.6l3.2-8v12h6V33l3.2 8c.5 1.4 2.1 2.1 3.5 1.6 1.5-.5 2.3-2.1 1.8-3.6l-4-12v-6c0-3-2-5.6-5-6.4-3-.8-6 .6-7.5 3.4z"/>
    <path d="M38 30l6-4 4 2-6 6z" opacity="0.85"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '43',
    label: 'Zombie-Hand aus dem Boden',
    keywords: ['zombie', 'hand', 'grave', 'grab', 'green', 'grün', 'undead'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i43-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i43-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#2a3a10"/><stop offset="55%" stop-color="#141d06"/><stop offset="100%" stop-color="#060802"/></radialGradient>
    <linearGradient id="i43-hand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8d46a"/><stop offset="60%" stop-color="#5c8020"/><stop offset="100%" stop-color="#283a0c"/></linearGradient>
    <filter id="i43-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i43-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i43-bg)"/>
  <g filter="url(#i43-glow)">
    <path d="M18 50c8-3 20-3 28 0v-6h-28z" fill="#140e08"/>
    <path d="M26 44V26a2.2 2.2 0 0 1 4.4 0v10M30.4 34V22a2.2 2.2 0 0 1 4.4 0v12M34.8 34V25a2.2 2.2 0 0 1 4.4 0v11M39.2 40v-8a2 2 0 0 1 4 0v10c0 4-2.4 6-6.6 6h-6c-3 0-5-2-5-2" fill="none" stroke="url(#i43-hand)" stroke-width="4.4" stroke-linecap="round"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '44',
    label: 'Grüne Klauenhand (Variante)',
    keywords: ['claw', 'kralle', 'hand', 'green', 'grün', 'monster'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i44-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i44-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#233a12"/><stop offset="55%" stop-color="#101d08"/><stop offset="100%" stop-color="#040802"/></radialGradient>
    <linearGradient id="i44-claw" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d4e68a"/><stop offset="50%" stop-color="#7a9c3a"/><stop offset="100%" stop-color="#2e4012"/></linearGradient>
    <filter id="i44-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i44-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i44-bg)"/>
  <g filter="url(#i44-glow)" transform="scale(-1,1) translate(-64,0)">
    <path d="M22 44c-1-6 1-11 3-15-2-3-3-7-1.5-9.5 1-1.7 3-1.6 3.4.3.6 2.6 1.6 5 3 6.6-.4-3.4-.6-7.6.8-9.8 1.1-1.8 3.2-1.5 3.4.6.3 2.8.3 6.4.9 8.4.2-3 .4-6.8 1.8-8.6 1.2-1.6 3.2-1 3.2 1 0 2.6-.4 5.8.2 8 1-2 2.2-4.6 3.8-5.7 1.5-1 3.1.1 2.5 2-1 3-3 6.5-3.6 10.2-.6 3.6-.4 7.4-2.4 10.5-2.4 3.7-6.6 5-10.6 5-4.6 0-7.4-1.6-7.8-4z" fill="url(#i44-claw)" stroke="#1a2608" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '45',
    label: 'Bombe mit Zündschnur',
    keywords: ['bomb', 'bombe', 'explosive', 'sprengstoff', 'fuse', 'zündschnur'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i45-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i45-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a1c0a"/><stop offset="60%" stop-color="#140d05"/><stop offset="100%" stop-color="#060402"/></radialGradient>
    <radialGradient id="i45-body" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="#6a6a6a"/><stop offset="50%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#0a0a0a"/></radialGradient>
    <filter id="i45-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i45-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i45-bg)"/>
  <g filter="url(#i45-glow)">
    <circle cx="32" cy="38" r="14" fill="url(#i45-body)" stroke="#000" stroke-width="1"/>
    <path d="M32 24c0-4 2-8 6-10-1 3-1 6 0 8" stroke="#8a5a20" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="38" cy="14" r="2.6" fill="#ff9d2a"/>
    <circle cx="38" cy="14" r="4.5" fill="#ffb23a" opacity="0.5"/>
    <circle cx="27" cy="33" r="3" fill="#5a5a5a" opacity="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '46',
    label: 'Schmiedehammer',
    keywords: ['hammer', 'smith', 'schmied', 'orange', 'braun', 'forge'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i46-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i46-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#7a4212"/><stop offset="55%" stop-color="#3a1e08"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <linearGradient id="i46-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eef0f2"/><stop offset="45%" stop-color="#a9afb6"/><stop offset="100%" stop-color="#484d52"/></linearGradient>
    <filter id="i46-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i46-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i46-bg)"/>
  <g transform="rotate(-30,32,32)" filter="url(#i46-glow)">
    <rect x="29" y="20" width="6" height="34" rx="2" fill="#5a3a1c"/>
    <rect x="18" y="10" width="28" height="14" rx="3" fill="url(#i46-metal)" stroke="#1a1c1e" stroke-width="1"/>
    <rect x="18" y="10" width="28" height="5" fill="#ffffff" opacity="0.3"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '47',
    label: 'Kriegshammer-Silhouette',
    keywords: ['warhammer', 'kriegshammer', 'weapon', 'waffe', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i47-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i47-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#1c1c22"/><stop offset="55%" stop-color="#0d0d10"/><stop offset="100%" stop-color="#040406"/></radialGradient>
    <linearGradient id="i47-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8ccd2"/><stop offset="50%" stop-color="#6a6f76"/><stop offset="100%" stop-color="#2a2c30"/></linearGradient>
    <filter id="i47-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i47-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i47-bg)"/>
  <g transform="rotate(20,32,32)" filter="url(#i47-glow)">
    <rect x="29" y="18" width="6" height="32" rx="2" fill="#3a2410"/>
    <rect x="16" y="8" width="32" height="14" rx="2" fill="url(#i47-metal)" stroke="#0a0a0c" stroke-width="1"/>
    <circle cx="20" cy="15" r="2.4" fill="#8a2020"/>
    <circle cx="44" cy="15" r="2.4" fill="#8a2020"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '48',
    label: 'Blaue elektrische Silhouette',
    keywords: ['electric', 'elektrisch', 'blue', 'blau', 'energy', 'energie', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i48-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i48-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#123a6c"/><stop offset="60%" stop-color="#081d38"/><stop offset="100%" stop-color="#020a16"/></radialGradient>
    <filter id="i48-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i48-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i48-bg)"/>
  <g filter="url(#i48-glow)">
    <circle cx="32" cy="16" r="4.2" fill="#0a1830"/>
    <path d="M32 21c-3 0-5 2-5 5v6l-8 8c-1 1-1 2.6 0 3.6 1 1 2.6 1 3.6 0l7.4-7.4V50h4V36.2l7.4 7.4c1 1 2.6 1 3.6 0 1-1 1-2.6 0-3.6l-8-8v-6c0-3-2-5-5-5z" fill="#0a1830"/>
    <path d="M32 24 L27 33 L31 33 L26 42 L38 30 L33 30 Z" fill="#9fd8ff" opacity="0.9"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '49',
    label: 'Eulen-Gesicht (Teal)',
    keywords: ['owl', 'eule', 'bird', 'vogel', 'teal', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i49-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i49-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a3a"/><stop offset="55%" stop-color="#061d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <linearGradient id="i49-feather" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8c8c8"/><stop offset="100%" stop-color="#3a5a5a"/></linearGradient>
    <filter id="i49-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i49-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i49-bg)"/>
  <g filter="url(#i49-glow)">
    <path d="M32 14c-8 0-14 6-14 15 0 6 3 11 7 14l-2 6 4-3 5 3 5-3 4 3-2-6c4-3 7-8 7-14 0-9-6-15-14-15z" fill="url(#i49-feather)" stroke="#1c3232" stroke-width="1"/>
    <circle cx="26" cy="26" r="5.4" fill="#eafcff"/>
    <circle cx="38" cy="26" r="5.4" fill="#eafcff"/>
    <circle cx="26" cy="26" r="2.4" fill="#0a1414"/>
    <circle cx="38" cy="26" r="2.4" fill="#0a1414"/>
    <path d="M32 30l-2.4 4h4.8z" fill="#e0a83a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '50',
    label: 'Eulen-Gesicht (Grau)',
    keywords: ['owl', 'eule', 'bird', 'vogel', 'grey', 'grau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i50-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i50-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a2a30"/><stop offset="55%" stop-color="#141418"/><stop offset="100%" stop-color="#060608"/></radialGradient>
    <linearGradient id="i50-feather" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d0d0d6"/><stop offset="100%" stop-color="#5a5a62"/></linearGradient>
    <filter id="i50-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i50-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i50-bg)"/>
  <g filter="url(#i50-glow)">
    <path d="M32 14c-8 0-14 6-14 15 0 6 3 11 7 14l-2 6 4-3 5 3 5-3 4 3-2-6c4-3 7-8 7-14 0-9-6-15-14-15z" fill="url(#i50-feather)" stroke="#2a2a30" stroke-width="1"/>
    <circle cx="26" cy="26" r="5.4" fill="#fff8ec"/>
    <circle cx="38" cy="26" r="5.4" fill="#fff8ec"/>
    <circle cx="26" cy="26" r="2.4" fill="#1a1408"/>
    <circle cx="38" cy="26" r="2.4" fill="#1a1408"/>
    <path d="M32 30l-2.4 4h4.8z" fill="#e0a83a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '51',
    label: 'Orange Pfeilspitze',
    keywords: ['arrow', 'pfeil', 'spearhead', 'pfeilspitze', 'orange'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i51-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i51-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#7a3a10"/><stop offset="55%" stop-color="#3a1a06"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <linearGradient id="i51-tip" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff2c2"/><stop offset="50%" stop-color="#ffa23a"/><stop offset="100%" stop-color="#a84e10"/></linearGradient>
    <filter id="i51-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i51-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i51-bg)"/>
  <g filter="url(#i51-glow)">
    <rect x="30" y="30" width="26" height="4" fill="#6b4322" rx="1"/>
    <path d="M12 32 L28 24 L24 32 L28 40 Z" fill="url(#i51-tip)" stroke="#6b2e08" stroke-width="0.8"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '52',
    label: 'Feuer-umhüllte Silhouette',
    keywords: ['fire', 'feuer', 'silhouette', 'burn', 'brennen', 'orange'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i52-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i52-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#c0480f"/><stop offset="50%" stop-color="#5a1a06"/><stop offset="100%" stop-color="#120502"/></radialGradient>
    <linearGradient id="i52-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff5a1a"/><stop offset="60%" stop-color="#ffb23a"/><stop offset="100%" stop-color="#fff2c2"/></linearGradient>
    <filter id="i52-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i52-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i52-bg)"/>
  <g filter="url(#i52-glow)">
    <path d="M32 50c-6 0-11-4-11-10 0-4 2-6 2-6s-1 3 1 5c-1-4 0-8 3-10-1 3 0 6 0 6s0-5 3-8c0 3 1 5 1 5s1-6 5-8c-1 4 0 7 0 7s2-3 5-3c-2 3-2 6-1 8 2-1 4 0 4 0s-3 1-3 4c1 0 2 1 2 1-1 1-2 3-2 5 0 6-3 9-9 9z" fill="url(#i52-flame)" opacity="0.55"/>
    <circle cx="32" cy="18" r="4" fill="#0a0503"/>
    <path d="M30 22c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z" fill="#0a0503"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '53',
    label: 'Weißblaue Schutzbarriere',
    keywords: ['shield', 'schild', 'barrier', 'barriere', 'protect', 'schutz', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i53-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i53-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123a5c"/><stop offset="60%" stop-color="#081d30"/><stop offset="100%" stop-color="#020a12"/></radialGradient>
    <radialGradient id="i53-shield" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="70%" stop-color="#9fd8ff" stop-opacity="0.4"/><stop offset="100%" stop-color="#4a9fd6" stop-opacity="0"/></radialGradient>
    <filter id="i53-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i53-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i53-bg)"/>
  <g filter="url(#i53-glow)">
    <circle cx="32" cy="32" r="17" fill="url(#i53-shield)"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#eafcff" stroke-width="1.4" opacity="0.8"/>
    <path d="M32 16c8 3 13 6 13 6v10c0 8-5 14-13 18-8-4-13-10-13-18V22s5-3 13-6z" fill="none" stroke="#bfe6ff" stroke-width="1.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '54',
    label: 'Rote Kreatur-Hand',
    keywords: ['claw', 'kralle', 'hand', 'red', 'rot', 'demon', 'dämon'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i54-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i54-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a1210"/><stop offset="60%" stop-color="#1c0808"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <linearGradient id="i54-claw" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff9d8a"/><stop offset="50%" stop-color="#c0392a"/><stop offset="100%" stop-color="#4a0f0a"/></linearGradient>
    <filter id="i54-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i54-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i54-bg)"/>
  <g filter="url(#i54-glow)">
    <path d="M22 44c-1-6 1-11 3-15-2-3-3-7-1.5-9.5 1-1.7 3-1.6 3.4.3.6 2.6 1.6 5 3 6.6-.4-3.4-.6-7.6.8-9.8 1.1-1.8 3.2-1.5 3.4.6.3 2.8.3 6.4.9 8.4.2-3 .4-6.8 1.8-8.6 1.2-1.6 3.2-1 3.2 1 0 2.6-.4 5.8.2 8 1-2 2.2-4.6 3.8-5.7 1.5-1 3.1.1 2.5 2-1 3-3 6.5-3.6 10.2-.6 3.6-.4 7.4-2.4 10.5-2.4 3.7-6.6 5-10.6 5-4.6 0-7.4-1.6-7.8-4z" fill="url(#i54-claw)" stroke="#2a0806" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '55',
    label: 'Rote Kometen-Rakete',
    keywords: ['comet', 'komet', 'rocket', 'rakete', 'red', 'rot', 'projectile'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i55-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i55-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a1108"/><stop offset="60%" stop-color="#1c0804"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <linearGradient id="i55-trail" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb23a" stop-opacity="0"/><stop offset="100%" stop-color="#ff5a1a"/></linearGradient>
    <filter id="i55-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i55-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i55-bg)"/>
  <g filter="url(#i55-glow)">
    <path d="M14 46 L40 20 L34 26 L44 18 L26 34 L32 28 Z" fill="url(#i55-trail)"/>
    <circle cx="42" cy="20" r="5" fill="#fff2c2"/>
    <circle cx="42" cy="20" r="8" fill="#ffb23a" opacity="0.4"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '56',
    label: 'Goldenes Rune-Medaillon',
    keywords: ['rune', 'medallion', 'medaillon', 'gold', 'seal', 'siegel'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i56-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i56-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a2a08"/><stop offset="60%" stop-color="#1c1504"/><stop offset="100%" stop-color="#080602"/></radialGradient>
    <linearGradient id="i56-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff2c2"/><stop offset="45%" stop-color="#e0a83a"/><stop offset="100%" stop-color="#8a5a12"/></linearGradient>
    <filter id="i56-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i56-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i56-bg)"/>
  <g filter="url(#i56-glow)">
    <circle cx="32" cy="32" r="17" fill="none" stroke="url(#i56-gold)" stroke-width="2.4"/>
    <circle cx="32" cy="32" r="11" fill="none" stroke="url(#i56-gold)" stroke-width="1.4"/>
    <g fill="url(#i56-gold)">
      <circle cx="32" cy="15" r="2"/><circle cx="32" cy="49" r="2"/><circle cx="15" cy="32" r="2"/><circle cx="49" cy="32" r="2"/>
      <circle cx="21" cy="21" r="1.4"/><circle cx="43" cy="21" r="1.4"/><circle cx="21" cy="43" r="1.4"/><circle cx="43" cy="43" r="1.4"/>
    </g>
    <circle cx="32" cy="32" r="4" fill="url(#i56-gold)"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '57',
    label: 'Sprint-Silhouette (Gold)',
    keywords: ['sprint', 'run', 'rennen', 'gold', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i57-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i57-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#a87a12"/><stop offset="55%" stop-color="#4a3606"/><stop offset="100%" stop-color="#0c0802"/></radialGradient>
    <filter id="i57-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i57-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i57-bg)"/>
  <g filter="url(#i57-glow)" fill="#0a0805">
    <circle cx="36" cy="16" r="4"/>
    <path d="M34 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '58',
    label: 'Schleichende Silhouette',
    keywords: ['sneak', 'schleichen', 'stealth', 'rogue', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i58-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i58-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#1c2434"/><stop offset="55%" stop-color="#0d1219"/><stop offset="100%" stop-color="#04060a"/></radialGradient>
    <filter id="i58-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i58-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i58-bg)"/>
  <g filter="url(#i58-glow)" fill="#050608">
    <circle cx="24" cy="24" r="3.6"/>
    <path d="M22 28c-4 2-7 6-8 11l-2 8c-.3 1.3.6 2.6 1.9 2.7 1.2.1 2.3-.7 2.5-1.9l1.6-7 2 12c.2 1.3 1.4 2.2 2.7 2 1.2-.2 2.1-1.4 1.9-2.7l-2-14 3-3 10 8c1 .8 2.5.6 3.2-.5.7-1 .5-2.4-.5-3.2l-9-8 2-6c3 1 6 3 8 6 .8 1.1 2.3 1.3 3.4.5 1-.8 1.3-2.2.6-3.3-3-4.4-8-7.5-13.5-7.5-2.9 0-5.4.9-7.8 2.9z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '59',
    label: 'Ninja-Silhouette mit Ziel',
    keywords: ['ninja', 'rogue', 'target', 'ziel', 'red', 'rot'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i59-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i59-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#241820"/><stop offset="55%" stop-color="#120c10"/><stop offset="100%" stop-color="#050304"/></radialGradient>
    <filter id="i59-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i59-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i59-bg)"/>
  <g filter="url(#i59-glow)">
    <circle cx="24" cy="24" r="3.6" fill="#050608"/>
    <path d="M22 28c-4 2-7 6-8 11l-2 8c-.3 1.3.6 2.6 1.9 2.7 1.2.1 2.3-.7 2.5-1.9l1.6-7 2 12c.2 1.3 1.4 2.2 2.7 2 1.2-.2 2.1-1.4 1.9-2.7l-2-14 3-3 10 8c1 .8 2.5.6 3.2-.5.7-1 .5-2.4-.5-3.2l-9-8 2-6c3 1 6 3 8 6 .8 1.1 2.3 1.3 3.4.5 1-.8 1.3-2.2.6-3.3-3-4.4-8-7.5-13.5-7.5-2.9 0-5.4.9-7.8 2.9z" fill="#050608"/>
    <circle cx="46" cy="20" r="7" fill="none" stroke="#c0392a" stroke-width="1.6"/>
    <circle cx="46" cy="20" r="3" fill="#c0392a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '60',
    label: 'Grün-gelber Schwertschlag',
    keywords: ['sword', 'schwert', 'slash', 'schlag', 'green', 'grün', 'yellow', 'gelb'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i60-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i60-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a3a0c"/><stop offset="60%" stop-color="#141d06"/><stop offset="100%" stop-color="#060802"/></radialGradient>
    <linearGradient id="i60-slash" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#c8ffb0" stop-opacity="0"/><stop offset="50%" stop-color="#c8ff6a"/><stop offset="100%" stop-color="#ffffff"/></linearGradient>
    <filter id="i60-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i60-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i60-bg)"/>
  <g filter="url(#i60-glow)">
    <path d="M12 48 C24 40 40 24 52 12 L48 12 C36 24 22 38 10 44 Z" fill="url(#i60-slash)"/>
    <path d="M14 44 C26 36 40 22 50 14" stroke="#eaffb0" stroke-width="1.2" fill="none" opacity="0.7"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '61',
    label: 'Orangener Speer',
    keywords: ['spear', 'speer', 'javelin', 'orange', 'weapon', 'waffe'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i61-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i61-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#7a3a10"/><stop offset="55%" stop-color="#3a1a06"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <linearGradient id="i61-tip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff2c2"/><stop offset="50%" stop-color="#ffa23a"/><stop offset="100%" stop-color="#a84e10"/></linearGradient>
    <filter id="i61-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i61-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i61-bg)"/>
  <g transform="rotate(45,32,32)" filter="url(#i61-glow)">
    <rect x="30" y="16" width="4" height="30" fill="#6b4322" rx="1"/>
    <path d="M32 6l6 12h-12z" fill="url(#i61-tip)" stroke="#6b2e08" stroke-width="0.6"/>
    <rect x="25" y="46" width="14" height="4" rx="1.4" fill="#4a3620"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '62',
    label: 'Frosch-Klauenhand',
    keywords: ['frog', 'frosch', 'claw', 'kralle', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i62-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i62-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#1c3a12"/><stop offset="55%" stop-color="#0d1d08"/><stop offset="100%" stop-color="#040a02"/></radialGradient>
    <linearGradient id="i62-hand" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a8e07a"/><stop offset="50%" stop-color="#4e9c2a"/><stop offset="100%" stop-color="#1e4010"/></linearGradient>
    <filter id="i62-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i62-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i62-bg)"/>
  <g filter="url(#i62-glow)">
    <path d="M24 46V30a3 3 0 0 1 6 0v8M32 38V24a3 3 0 0 1 6 0v14M40 40v-9a2.6 2.6 0 0 1 5.2 0v13c0 5.6-3.6 8-9.2 8h-6c-4 0-7-2-9-5l-3-5c-.8-1.4-.3-3.1 1-3.9 1.3-.8 2.9-.4 3.7 1l2.3 3.9" fill="url(#i62-hand)" stroke="#1a2c0c" stroke-width="1"/>
    <circle cx="24" cy="28" r="1.6" fill="#e6ffd0"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '63',
    label: 'Hand mit Stein',
    keywords: ['hand', 'stone', 'stein', 'rock', 'brown', 'braun'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i63-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i63-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a2a14"/><stop offset="55%" stop-color="#1c1408"/><stop offset="100%" stop-color="#080502"/></radialGradient>
    <linearGradient id="i63-stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a89a80"/><stop offset="50%" stop-color="#6a5c44"/><stop offset="100%" stop-color="#342a1c"/></linearGradient>
    <filter id="i63-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i63-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i63-bg)"/>
  <g filter="url(#i63-glow)">
    <path d="M22 48V32a2.4 2.4 0 0 1 4.8 0v6M26.8 38v-11a2.4 2.4 0 0 1 4.8 0v11M31.6 38v-9a2.4 2.4 0 0 1 4.8 0v11M36.4 40v-5a2.2 2.2 0 0 1 4.4 0v9c0 6-4 10-10 10h-4c-4 0-6-1.6-8.4-5" fill="#3a2c18"/>
    <path d="M30 22c4-2 9-1 11 3 2 4-1 8-6 9-4 1-8-1-9-5-1-3 0-5.5 4-7z" fill="url(#i63-stone)" stroke="#1c1409" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '64',
    label: 'Frosch-Kreatur',
    keywords: ['frog', 'frosch', 'creature', 'kreatur', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i64-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i64-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#2a4a12"/><stop offset="55%" stop-color="#132408"/><stop offset="100%" stop-color="#050a02"/></radialGradient>
    <linearGradient id="i64-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8e07a"/><stop offset="100%" stop-color="#3e7a20"/></linearGradient>
    <filter id="i64-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i64-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i64-bg)"/>
  <g filter="url(#i64-glow)">
    <ellipse cx="32" cy="36" rx="16" ry="12" fill="url(#i64-body)" stroke="#1c3a0c" stroke-width="1"/>
    <circle cx="24" cy="24" r="6" fill="url(#i64-body)" stroke="#1c3a0c" stroke-width="1"/>
    <circle cx="40" cy="24" r="6" fill="url(#i64-body)" stroke="#1c3a0c" stroke-width="1"/>
    <circle cx="24" cy="23" r="3" fill="#eafcc0"/>
    <circle cx="40" cy="23" r="3" fill="#eafcc0"/>
    <circle cx="24" cy="23" r="1.4" fill="#0a1404"/>
    <circle cx="40" cy="23" r="1.4" fill="#0a1404"/>
    <path d="M22 40c4 3 16 3 20 0" stroke="#1c3a0c" stroke-width="1.4" fill="none"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '65',
    label: 'Rotes Raketen-Geschoss',
    keywords: ['rocket', 'rakete', 'missile', 'geschoss', 'red', 'rot'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i65-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i65-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a1108"/><stop offset="60%" stop-color="#1c0804"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <linearGradient id="i65-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb28a"/><stop offset="45%" stop-color="#d6472a"/><stop offset="100%" stop-color="#5c150c"/></linearGradient>
    <filter id="i65-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i65-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i65-bg)"/>
  <g transform="rotate(45,32,32)" filter="url(#i65-glow)">
    <rect x="26" y="16" width="12" height="28" rx="6" fill="url(#i65-body)" stroke="#3a0d06" stroke-width="1"/>
    <path d="M32 10l6 10h-12z" fill="#ffe0c2"/>
    <path d="M22 38l-6 8 6-4zM42 38l6 8-6-4z" fill="#7a2a12"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '66',
    label: 'Sprint-Silhouette (Variante)',
    keywords: ['run', 'rennen', 'sprint', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i66-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i66-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#242430"/><stop offset="55%" stop-color="#121218"/><stop offset="100%" stop-color="#05050a"/></radialGradient>
    <filter id="i66-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i66-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i66-bg)"/>
  <g filter="url(#i66-glow)" fill="#050508">
    <circle cx="30" cy="16" r="4"/>
    <path d="M28 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '67',
    label: 'Pfeilbündel (Köcher)',
    keywords: ['arrows', 'pfeile', 'quiver', 'köcher', 'grey', 'grau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i67-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i67-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a2418"/><stop offset="55%" stop-color="#14110a"/><stop offset="100%" stop-color="#060502"/></radialGradient>
    <linearGradient id="i67-shaft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#c8ccd2"/><stop offset="100%" stop-color="#6a6f76"/></linearGradient>
    <filter id="i67-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i67-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i67-bg)"/>
  <g filter="url(#i67-glow)" stroke="url(#i67-shaft)" stroke-width="2.6" stroke-linecap="round">
    <path d="M18 48 L30 12"/>
    <path d="M26 48 L34 12"/>
    <path d="M34 48 L38 12"/>
    <path d="M42 48 L42 12"/>
  </g>
  <g fill="#e0442a"><path d="M30 12l-3 6 6 0z"/><path d="M34 12l-3 6 6 0z"/><path d="M38 12l-3 6 6 0z"/><path d="M42 12l-3 6 6 0z"/></g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '68',
    label: 'Geschwindigkeits-Streifen',
    keywords: ['speed', 'geschwindigkeit', 'dash', 'streifen', 'red', 'rot'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i68-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i68-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a120a"/><stop offset="55%" stop-color="#1c0705"/><stop offset="100%" stop-color="#080302"/></radialGradient>
    <linearGradient id="i68-streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ff5a3a" stop-opacity="0"/><stop offset="100%" stop-color="#ff8a5a"/></linearGradient>
    <filter id="i68-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i68-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i68-bg)"/>
  <g filter="url(#i68-glow)" fill="url(#i68-streak)">
    <path d="M10 22 L50 22 L54 26 L14 26 Z"/>
    <path d="M14 32 L54 32 L58 36 L18 36 Z"/>
    <path d="M10 42 L44 42 L48 46 L14 46 Z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '69',
    label: 'Wirbel-Handbewegung',
    keywords: ['swirl', 'wirbel', 'hand', 'wind', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i69-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i69-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123048"/><stop offset="55%" stop-color="#081824"/><stop offset="100%" stop-color="#02080e"/></radialGradient>
    <linearGradient id="i69-swirl" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff" stop-opacity="0"/><stop offset="60%" stop-color="#bfe6ff"/><stop offset="100%" stop-color="#4a9fd6"/></linearGradient>
    <filter id="i69-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i69-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i69-bg)"/>
  <g filter="url(#i69-glow)" fill="none" stroke="url(#i69-swirl)" stroke-width="2.6" stroke-linecap="round">
    <path d="M16 40c2-10 10-18 20-18s16 6 16 6"/>
    <path d="M20 46c2-8 8-14 16-14"/>
  </g>
  <path d="M20 46l-6 2 3-6z" fill="#bfe6ff"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '70',
    label: 'Späher-Silhouette mit Fernglas',
    keywords: ['scout', 'späher', 'binoculars', 'fernglas', 'watch', 'beobachten'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i70-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i70-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#241c14"/><stop offset="55%" stop-color="#120e0a"/><stop offset="100%" stop-color="#050402"/></radialGradient>
    <filter id="i70-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i70-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i70-bg)"/>
  <g filter="url(#i70-glow)" fill="#0a0806">
    <circle cx="32" cy="18" r="4"/>
    <path d="M24 26c8-4 16-4 16 0v14c0 6-4 10-8 10s-8-4-8-10z"/>
    <circle cx="26" cy="24" r="3.6" fill="none" stroke="#0a0806" stroke-width="2"/>
    <circle cx="38" cy="24" r="3.6" fill="none" stroke="#0a0806" stroke-width="2"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '71',
    label: 'Eulen-Kreatur-Gesicht (Teal)',
    keywords: ['owl', 'eule', 'creature', 'kreatur', 'teal'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i71-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i71-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#0d3a3a"/><stop offset="60%" stop-color="#061d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <filter id="i71-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i71-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i71-bg)"/>
  <g filter="url(#i71-glow)">
    <path d="M32 12c-9 0-16 7-16 17 0 7 4 12 8 16l-2 7 5-3 5 3 5-3 5 3-2-7c4-4 8-9 8-16 0-10-7-17-16-17z" fill="#0a1c1c" stroke="#2a5a5a" stroke-width="1.2"/>
    <circle cx="25" cy="27" r="6" fill="#eafcff"/>
    <circle cx="39" cy="27" r="6" fill="#eafcff"/>
    <circle cx="25" cy="27" r="2.6" fill="#0a1414"/>
    <circle cx="39" cy="27" r="2.6" fill="#0a1414"/>
    <path d="M32 32l-3 5h6z" fill="#e0a83a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '72',
    label: 'Kleiner oranger Feuerball',
    keywords: ['fireball', 'feuerball', 'orange', 'spark', 'funke'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i72-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i72-bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#3a1c08"/><stop offset="60%" stop-color="#1a0c04"/><stop offset="100%" stop-color="#080402"/></radialGradient>
    <radialGradient id="i72-ball" cx="45%" cy="40%" r="55%"><stop offset="0%" stop-color="#fff6c2"/><stop offset="40%" stop-color="#ffb23a"/><stop offset="80%" stop-color="#d6472a"/><stop offset="100%" stop-color="#6b1a0c"/></radialGradient>
    <filter id="i72-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="2.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i72-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i72-bg)"/>
  <g filter="url(#i72-glow)">
    <circle cx="32" cy="32" r="13" fill="url(#i72-ball)"/>
    <path d="M32 20c1 3-2 5-1 8s4 3 4 6-2 4-2 4 4-1 4-5-3-5-2-8 2-4 2-4-3 0-5-1z" fill="#ffe0a0" opacity="0.7"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '73',
    label: 'Blau-teal Tech-Objekt',
    keywords: ['tech', 'anchor', 'anker', 'teal', 'blau', 'metal', 'metall'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i73-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i73-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a4a"/><stop offset="60%" stop-color="#061d26"/><stop offset="100%" stop-color="#020a0e"/></radialGradient>
    <linearGradient id="i73-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eaf7ff"/><stop offset="45%" stop-color="#7ec8f2"/><stop offset="100%" stop-color="#1f5f80"/></linearGradient>
    <filter id="i73-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i73-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i73-bg)"/>
  <g filter="url(#i73-glow)" fill="url(#i73-metal)" stroke="#0a2e3d" stroke-width="0.6">
    <rect x="29" y="10" width="6" height="34" rx="2"/>
    <path d="M20 44c0 6 5 10 12 10s12-4 12-10l-5 2c-1.5 3-4 4-7 4s-5.5-1-7-4z"/>
    <circle cx="32" cy="16" r="5" fill="none" stroke="url(#i73-metal)" stroke-width="2.4"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '74',
    label: 'Stehende Figur mit Stab',
    keywords: ['staff', 'stab', 'mage', 'magier', 'purple', 'violett', 'figure'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i74-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i74-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#3b1f52"/><stop offset="60%" stop-color="#1c0e2b"/><stop offset="100%" stop-color="#0a0512"/></radialGradient>
    <filter id="i74-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i74-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i74-bg)"/>
  <g filter="url(#i74-glow)" fill="#050208">
    <circle cx="28" cy="18" r="4"/>
    <path d="M22 48c0-10 2-18 6-22l0-4 8 0 0 4c4 4 6 12 6 22-4 2-8 3-10 3s-6-1-10-3z"/>
  </g>
  <rect x="40" y="8" width="3" height="34" fill="#7a5228"/>
  <circle cx="41.5" cy="8" r="4" fill="#c79bff" opacity="0.9"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '75',
    label: 'Oranger Explosionsausbruch',
    keywords: ['explosion', 'orange', 'burst', 'fire', 'feuer'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i75-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i75-bg" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="#3a1c08"/><stop offset="60%" stop-color="#1a0c04"/><stop offset="100%" stop-color="#080402"/></radialGradient>
    <radialGradient id="i75-core" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff6c2"/><stop offset="35%" stop-color="#ffb23a"/><stop offset="70%" stop-color="#e05a10"/><stop offset="100%" stop-color="#7a1e04" stop-opacity="0"/></radialGradient>
    <filter id="i75-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i75-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i75-bg)"/>
  <g filter="url(#i75-glow)">
    <circle cx="32" cy="32" r="14" fill="url(#i75-core)"/>
    <g fill="#ffdca0"><path d="M32 10 L34.5 27 L32 30 L29.5 27 Z"/><path d="M32 54 L29.5 37 L32 34 L34.5 37 Z"/><path d="M10 32 L27 29.5 L30 32 L27 34.5 Z"/><path d="M54 32 L37 34.5 L34 32 L37 29.5 Z"/></g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '76',
    label: 'Orange Sprint-Silhouette',
    keywords: ['run', 'rennen', 'sprint', 'orange', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i76-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i76-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#a84e14"/><stop offset="55%" stop-color="#4a2208"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <filter id="i76-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i76-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i76-bg)"/>
  <g filter="url(#i76-glow)" fill="#0a0503">
    <circle cx="34" cy="16" r="4"/>
    <path d="M32 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '77',
    label: 'Violette Spinnennetz-Stränge',
    keywords: ['web', 'netz', 'spider', 'spinne', 'purple', 'violett'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i77-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i77-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a1350"/><stop offset="60%" stop-color="#140828"/><stop offset="100%" stop-color="#06030f"/></radialGradient>
    <filter id="i77-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i77-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i77-bg)"/>
  <g filter="url(#i77-glow)" stroke="#c79bff" stroke-width="1.2" fill="none" opacity="0.85">
    <path d="M32 12v40M14 32h36M18 18l28 28M46 18l-28 28"/>
    <circle cx="32" cy="32" r="8"/>
    <circle cx="32" cy="32" r="16"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '78',
    label: 'Blauer Blitzschlag',
    keywords: ['lightning', 'blitz', 'strike', 'schlag', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i78-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i78-bg" cx="50%" cy="35%" r="80%"><stop offset="0%" stop-color="#123a6c"/><stop offset="60%" stop-color="#081d38"/><stop offset="100%" stop-color="#020a16"/></radialGradient>
    <linearGradient id="i78-bolt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#9fd8ff"/><stop offset="100%" stop-color="#2a7fd6"/></linearGradient>
    <filter id="i78-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i78-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i78-bg)"/>
  <g filter="url(#i78-glow)">
    <path d="M36 8 L20 34 L30 34 L24 56 L48 26 L36 26 Z" fill="url(#i78-bolt)" stroke="#0a2e4d" stroke-width="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '79',
    label: 'Sanduhr',
    keywords: ['hourglass', 'sanduhr', 'time', 'zeit'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i79-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i79-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a2010"/><stop offset="60%" stop-color="#141008"/><stop offset="100%" stop-color="#060402"/></radialGradient>
    <linearGradient id="i79-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#eaf7ff" stop-opacity="0.2"/><stop offset="50%" stop-color="#eaf7ff" stop-opacity="0.55"/><stop offset="100%" stop-color="#eaf7ff" stop-opacity="0.2"/></linearGradient>
    <filter id="i79-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i79-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i79-bg)"/>
  <g filter="url(#i79-glow)">
    <rect x="18" y="12" width="28" height="4" rx="1.4" fill="#8a5a20"/>
    <rect x="18" y="48" width="28" height="4" rx="1.4" fill="#8a5a20"/>
    <path d="M20 16h24l-10 16 10 16h-24l10-16z" fill="url(#i79-glass)" stroke="#8a5a20" stroke-width="1"/>
    <path d="M22 18h20l-9 14h-2z" fill="#e0c078" opacity="0.7"/>
    <path d="M26 44h12l-6-6z" fill="#e0c078" opacity="0.7"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '80',
    label: 'Violettes Uhr-Symbol',
    keywords: ['clock', 'uhr', 'time', 'zeit', 'purple', 'violett'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i80-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i80-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a1350"/><stop offset="60%" stop-color="#140828"/><stop offset="100%" stop-color="#06030f"/></radialGradient>
    <linearGradient id="i80-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e6d0ff"/><stop offset="100%" stop-color="#7c3fe0"/></linearGradient>
    <filter id="i80-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i80-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i80-bg)"/>
  <g filter="url(#i80-glow)">
    <circle cx="32" cy="32" r="16" fill="none" stroke="url(#i80-face)" stroke-width="2.4"/>
    <path d="M32 20v13l9 6" stroke="#f3e8ff" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="1.8" fill="#f3e8ff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '81',
    label: 'Schwarzer Schädel mit Kiefer',
    keywords: ['skull', 'schädel', 'jaw', 'kiefer', 'black', 'schwarz', 'death', 'tod'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i81-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i81-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#1c1c22"/><stop offset="60%" stop-color="#0d0d10"/><stop offset="100%" stop-color="#040406"/></radialGradient>
    <linearGradient id="i81-skull" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8e8ec"/><stop offset="60%" stop-color="#9a9aa2"/><stop offset="100%" stop-color="#3a3a40"/></linearGradient>
    <filter id="i81-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i81-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i81-bg)"/>
  <g filter="url(#i81-glow)">
    <path d="M32 14c-8 0-13 5.5-13 12.5 0 5 2.6 8.3 5.4 10.4l-.4 5.6c-.1 1 .7 1.9 1.7 1.9h2.2v-4.4h2.2v4.4h4v-4.4h2.2v4.4h2.2c1 0 1.8-.9 1.7-1.9l-.4-5.6c2.8-2.1 5.4-5.4 5.4-10.4C45 19.5 40 14 32 14z" fill="url(#i81-skull)" stroke="#1a1a1e" stroke-width="1"/>
    <ellipse cx="26.5" cy="26" rx="3.4" ry="4.2" fill="#0a0a0c"/>
    <ellipse cx="37.5" cy="26" rx="3.4" ry="4.2" fill="#0a0a0c"/>
    <path d="M25 36c1.6 1 4 1.6 7 1.6s5.4-.6 7-1.6" stroke="#0a0a0c" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '82',
    label: 'Silbernes Schwert',
    keywords: ['sword', 'schwert', 'silver', 'silber', 'blue', 'blau', 'weapon'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i82-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i82-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#123a5c"/><stop offset="60%" stop-color="#081d30"/><stop offset="100%" stop-color="#020a12"/></radialGradient>
    <linearGradient id="i82-blade" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#bfe6ff"/><stop offset="100%" stop-color="#4a9fd6"/></linearGradient>
    <filter id="i82-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i82-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i82-bg)"/>
  <g transform="rotate(45,32,32)" filter="url(#i82-glow)">
    <path d="M31 8h2l2 32h-6z" fill="url(#i82-blade)" stroke="#1a4a70" stroke-width="0.6"/>
    <rect x="22" y="40" width="20" height="3.4" rx="1" fill="#7a5228"/>
    <rect x="29.5" y="43" width="5" height="12" rx="2" fill="#4a3620"/>
    <circle cx="32" cy="56" r="3" fill="#e0a83a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '83',
    label: 'Gelber Zickzack-Blitz',
    keywords: ['lightning', 'blitz', 'zigzag', 'zickzack', 'yellow', 'gelb'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i83-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i83-bg" cx="50%" cy="40%" r="80%"><stop offset="0%" stop-color="#3a3208"/><stop offset="60%" stop-color="#1c1804"/><stop offset="100%" stop-color="#080602"/></radialGradient>
    <linearGradient id="i83-bolt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#fff2a0"/><stop offset="100%" stop-color="#e0a800"/></linearGradient>
    <filter id="i83-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i83-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i83-bg)"/>
  <g filter="url(#i83-glow)">
    <path d="M36 8 L18 34 L28 34 L22 56 L48 26 L36 26 Z" fill="url(#i83-bolt)" stroke="#5a4a00" stroke-width="0.6"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '84',
    label: 'Teal offene Hand',
    keywords: ['hand', 'teal', 'open', 'offen', 'palm'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i84-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i84-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a3a"/><stop offset="60%" stop-color="#061d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <filter id="i84-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i84-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i84-bg)"/>
  <g filter="url(#i84-glow)" fill="#0a1c1c">
    <path d="M26 46V28a2.4 2.4 0 0 1 4.8 0v6M30.8 34v-9a2.4 2.4 0 0 1 4.8 0v9M35.6 34v-7a2.4 2.4 0 0 1 4.8 0v9M40.4 36v-4a2.2 2.2 0 0 1 4.4 0v10c0 6-4 10-10 10h-4c-4 0-6-1.6-8.4-5l-4-6.4c-.9-1.4-.4-3.2 1-4 1.3-.7 2.9-.3 3.7.9l2.7 4z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '85',
    label: 'Teal Sprint-Silhouette',
    keywords: ['run', 'rennen', 'sprint', 'teal', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i85-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i85-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a3a"/><stop offset="55%" stop-color="#061d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <filter id="i85-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i85-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i85-bg)"/>
  <g filter="url(#i85-glow)" fill="#0a1c1c">
    <circle cx="32" cy="16" r="4"/>
    <path d="M30 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '86',
    label: 'Teal Sprint-Silhouette (Variante)',
    keywords: ['run', 'rennen', 'sprint', 'teal', 'silhouette', 'dash'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i86-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i86-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123a3a"/><stop offset="55%" stop-color="#081d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <filter id="i86-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i86-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i86-bg)"/>
  <g filter="url(#i86-glow)" fill="#0a1c1c" transform="scale(-1,1) translate(-64,0)">
    <circle cx="32" cy="16" r="4"/>
    <path d="M30 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '87',
    label: 'Elektrische Humanoid-Figur',
    keywords: ['electric', 'elektrisch', 'blue', 'blau', 'energy', 'energie'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i87-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i87-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#123a6c"/><stop offset="60%" stop-color="#081d38"/><stop offset="100%" stop-color="#020a16"/></radialGradient>
    <filter id="i87-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i87-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i87-bg)"/>
  <g filter="url(#i87-glow)">
    <circle cx="32" cy="16" r="4.2" fill="#0a1830"/>
    <path d="M32 21c-3 0-5 2-5 5v6l-8 8c-1 1-1 2.6 0 3.6 1 1 2.6 1 3.6 0l7.4-7.4V50h4V36.2l7.4 7.4c1 1 2.6 1 3.6 0 1-1 1-2.6 0-3.6l-8-8v-6c0-3-2-5-5-5z" fill="#0a1830"/>
    <path d="M24 30l-5 4M40 30l5 4" stroke="#9fd8ff" stroke-width="1.6" opacity="0.8"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '88',
    label: 'Gekreuzte Speerspitzen',
    keywords: ['spear', 'speer', 'cross', 'kreuz', 'red', 'rot', 'orange'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i88-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i88-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#5a1c08"/><stop offset="55%" stop-color="#2a0d04"/><stop offset="100%" stop-color="#0a0402"/></radialGradient>
    <linearGradient id="i88-tip" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff2c2"/><stop offset="50%" stop-color="#ffa23a"/><stop offset="100%" stop-color="#a84e10"/></linearGradient>
    <filter id="i88-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i88-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i88-bg)"/>
  <g filter="url(#i88-glow)">
    <g transform="rotate(45,32,32)"><rect x="30" y="10" width="4" height="30" fill="#4a3620"/><path d="M32 4l5 10h-10z" fill="url(#i88-tip)"/></g>
    <g transform="rotate(-45,32,32)"><rect x="30" y="10" width="4" height="30" fill="#4a3620"/><path d="M32 4l5 10h-10z" fill="url(#i88-tip)"/></g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '89',
    label: 'Fledermaus-Kreatur (Rot)',
    keywords: ['bat', 'fledermaus', 'creature', 'red', 'rot'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i89-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i89-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#5a1c14"/><stop offset="55%" stop-color="#2a0d0a"/><stop offset="100%" stop-color="#0a0402"/></radialGradient>
    <filter id="i89-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i89-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i89-bg)"/>
  <g filter="url(#i89-glow)" fill="#0a0503">
    <path d="M32 26c-6-6-14-9-22-8 4 3 7 6 9 9-4 0-8 2-11 5 5 0 9 1 12 3-2 2-3 5-3 8 4-3 8-5 12-6l3-2 3 2c4 1 8 3 12 6 0-3-1-6-3-8 3-2 7-3 12-3-3-3-7-5-11-5 2-3 5-6 9-9-8-1-16 2-22 8z"/>
    <circle cx="28" cy="26" r="1.4" fill="#ff5a3a"/>
    <circle cx="36" cy="26" r="1.4" fill="#ff5a3a"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '90',
    label: 'Sprint-Silhouette mit Tempolinien',
    keywords: ['run', 'rennen', 'sprint', 'speed', 'teal', 'lines', 'linien'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i90-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i90-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a3a"/><stop offset="55%" stop-color="#061d1d"/><stop offset="100%" stop-color="#020a0a"/></radialGradient>
    <filter id="i90-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i90-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i90-bg)"/>
  <g filter="url(#i90-glow)">
    <g fill="#0a1c1c">
      <circle cx="34" cy="16" r="4"/>
      <path d="M32 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
    </g>
    <g stroke="#7ee0d0" stroke-width="1.4" opacity="0.7">
      <path d="M10 20h8M8 28h10M10 36h7"/>
    </g>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '91',
    label: 'Goldene Figur mit Wirbel-Aura',
    keywords: ['gold', 'aura', 'swirl', 'wirbel', 'figure', 'figur'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i91-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i91-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#ffdd6b"/><stop offset="45%" stop-color="#b87a10"/><stop offset="100%" stop-color="#2e1c04"/></radialGradient>
    <filter id="i91-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i91-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i91-bg)"/>
  <g filter="url(#i91-glow)">
    <path d="M20 44c-3-10 2-18 8-22M44 44c3-10-2-18-8-22" stroke="#fff2c2" stroke-width="1.6" fill="none" opacity="0.7"/>
    <circle cx="32" cy="18" r="4.4" fill="#140c02"/>
    <path d="M32 23c-3 0-5 2-5 5v2l-6 14c-.6 1.4.2 3 1.6 3.4 1.3.4 2.7-.3 3.2-1.6l3.2-8v11h6V38l3.2 8c.5 1.3 1.9 2 3.2 1.6 1.4-.4 2.2-2 1.6-3.4l-6-14v-2c0-3-2-5-5-5z" fill="#140c02"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '92',
    label: 'Faustschlag-Einschlag',
    keywords: ['fist', 'faust', 'impact', 'einschlag', 'orange', 'ground', 'boden'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i92-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i92-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#7a3c10"/><stop offset="55%" stop-color="#3a1a06"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <filter id="i92-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i92-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i92-bg)"/>
  <g filter="url(#i92-glow)">
    <path d="M12 46h40M18 46l6-8M46 46l-6-8M28 46l3-10M36 46l-3-10" stroke="#e0a83a" stroke-width="2" opacity="0.7" fill="none"/>
    <path d="M22 36v-10c0-4 3-7 7-7s7 3 7 7v10c0 5-3.6 9-9 9h-1c-4 0-7-2-9-5" fill="#140905"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '93',
    label: 'Greifende Kreatur-Hand',
    keywords: ['claw', 'kralle', 'hand', 'brown', 'braun', 'creature'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i93-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i93-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a2a10"/><stop offset="55%" stop-color="#1c1408"/><stop offset="100%" stop-color="#080502"/></radialGradient>
    <linearGradient id="i93-claw" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8a86a"/><stop offset="50%" stop-color="#8a6030"/><stop offset="100%" stop-color="#3a2812"/></linearGradient>
    <filter id="i93-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i93-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i93-bg)"/>
  <g filter="url(#i93-glow)">
    <path d="M22 44c-1-6 1-11 3-15-2-3-3-7-1.5-9.5 1-1.7 3-1.6 3.4.3.6 2.6 1.6 5 3 6.6-.4-3.4-.6-7.6.8-9.8 1.1-1.8 3.2-1.5 3.4.6.3 2.8.3 6.4.9 8.4.2-3 .4-6.8 1.8-8.6 1.2-1.6 3.2-1 3.2 1 0 2.6-.4 5.8.2 8 1-2 2.2-4.6 3.8-5.7 1.5-1 3.1.1 2.5 2-1 3-3 6.5-3.6 10.2-.6 3.6-.4 7.4-2.4 10.5-2.4 3.7-6.6 5-10.6 5-4.6 0-7.4-1.6-7.8-4z" fill="url(#i93-claw)" stroke="#2a1c0c" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '94',
    label: 'Grüne Nebel-Geistfigur',
    keywords: ['mist', 'nebel', 'ghost', 'geist', 'green', 'grün', 'fog'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i94-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i94-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#1c3a12"/><stop offset="55%" stop-color="#0d1d08"/><stop offset="100%" stop-color="#040a02"/></radialGradient>
    <linearGradient id="i94-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8ffb0" stop-opacity="0.9"/><stop offset="100%" stop-color="#3e7a20" stop-opacity="0.2"/></linearGradient>
    <filter id="i94-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i94-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i94-bg)"/>
  <g filter="url(#i94-glow)" fill="url(#i94-mist)">
    <ellipse cx="24" cy="40" rx="10" ry="14"/>
    <ellipse cx="40" cy="36" rx="9" ry="13"/>
    <ellipse cx="32" cy="30" rx="8" ry="12"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '95',
    label: 'Grüne Zombie-Figur',
    keywords: ['zombie', 'undead', 'green', 'grün', 'figure', 'figur'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i95-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i95-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#233a12"/><stop offset="55%" stop-color="#101d08"/><stop offset="100%" stop-color="#040802"/></radialGradient>
    <linearGradient id="i95-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8d46a"/><stop offset="100%" stop-color="#3e5c1c"/></linearGradient>
    <filter id="i95-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i95-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i95-bg)"/>
  <g filter="url(#i95-glow)" fill="url(#i95-body)" stroke="#1c2c0c" stroke-width="1">
    <circle cx="30" cy="18" r="4.4"/>
    <path d="M22 48c0-8 2-14 5-18l-2-6 5 4 2-2 2 2 5-4-2 6c3 4 5 10 5 18-4 2-9 3-10 3s-6-1-10-3z"/>
    <path d="M40 30l8-6 3 3-7 6z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '96',
    label: 'Schreiende Maske',
    keywords: ['scream', 'schrei', 'mask', 'maske', 'red', 'rot'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i96-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i96-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#5a1210"/><stop offset="60%" stop-color="#2a0808"/><stop offset="100%" stop-color="#0a0202"/></radialGradient>
    <linearGradient id="i96-mask" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffb28a"/><stop offset="60%" stop-color="#c0392a"/><stop offset="100%" stop-color="#4a0f0a"/></linearGradient>
    <filter id="i96-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i96-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i96-bg)"/>
  <g filter="url(#i96-glow)">
    <path d="M32 12c-8 0-13 6-13 14 0 6 3 11 6 14l-1 8c-.2 1 .6 1.9 1.6 1.9h13c1 0 1.8-.9 1.6-1.9l-1-8c3-3 6-8 6-14 0-8-5-14-13-14z" fill="url(#i96-mask)" stroke="#3a0d08" stroke-width="1"/>
    <ellipse cx="26" cy="26" rx="3" ry="4" fill="#1a0402"/>
    <ellipse cx="38" cy="26" rx="3" ry="4" fill="#1a0402"/>
    <ellipse cx="32" cy="38" rx="5" ry="7" fill="#1a0402"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '97',
    label: 'Tritt (Fuß)',
    keywords: ['kick', 'tritt', 'foot', 'fuß', 'white', 'weiß', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i97-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i97-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123a5c"/><stop offset="55%" stop-color="#081d30"/><stop offset="100%" stop-color="#020a12"/></radialGradient>
    <linearGradient id="i97-leg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eaf7ff"/><stop offset="100%" stop-color="#7ec8f2"/></linearGradient>
    <filter id="i97-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i97-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i97-bg)"/>
  <g filter="url(#i97-glow)" fill="url(#i97-leg)" stroke="#0a2e4d" stroke-width="0.8">
    <path d="M22 14c6 0 8 8 7 16l-2 12 14-2c3-.4 5 2 4 4-2 4-9 6-16 6-6 0-10-3-11-9l-2-14c-1-7 0-13 6-13z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '98',
    label: 'Dunkler Statuen-Turm',
    keywords: ['statue', 'idol', 'tower', 'turm', 'gold'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i98-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i98-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#ffdd6b"/><stop offset="45%" stop-color="#b87a10"/><stop offset="100%" stop-color="#2e1c04"/></radialGradient>
    <filter id="i98-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i98-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i98-bg)"/>
  <g filter="url(#i98-glow)" fill="#140c02">
    <rect x="22" y="46" width="20" height="4"/>
    <rect x="25" y="20" width="14" height="26"/>
    <circle cx="32" cy="14" r="5"/>
    <rect x="20" y="16" width="24" height="4"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '99',
    label: 'Blauviolette glühende Faust',
    keywords: ['fist', 'faust', 'glow', 'glühen', 'blue', 'blau', 'purple', 'violett'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i99-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i99-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#2a1c50"/><stop offset="60%" stop-color="#140e28"/><stop offset="100%" stop-color="#06040f"/></radialGradient>
    <radialGradient id="i99-aura" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#c79bff" stop-opacity="0.9"/><stop offset="70%" stop-color="#6b2fc9" stop-opacity="0.3"/><stop offset="100%" stop-color="#6b2fc9" stop-opacity="0"/></radialGradient>
    <filter id="i99-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i99-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i99-bg)"/>
  <g filter="url(#i99-glow)">
    <circle cx="32" cy="32" r="16" fill="url(#i99-aura)"/>
    <path d="M22 30v10c0 5 4 8 10 8s10-3 10-8V26a2.4 2.4 0 0 0-4.8 0v6-9a2.4 2.4 0 0 0-4.8 0v9-11a2.4 2.4 0 0 0-4.8 0v11-6a2.2 2.2 0 0 0-4.4 0z" fill="#0a0518"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '100',
    label: 'Bronze-Axt',
    keywords: ['axe', 'axt', 'weapon', 'waffe', 'brown', 'braun', 'bronze'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i100-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i100-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#4a2a10"/><stop offset="55%" stop-color="#241406"/><stop offset="100%" stop-color="#080502"/></radialGradient>
    <linearGradient id="i100-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e0c088"/><stop offset="45%" stop-color="#a0703a"/><stop offset="100%" stop-color="#4a2c12"/></linearGradient>
    <filter id="i100-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i100-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i100-bg)"/>
  <g transform="rotate(30,32,32)" filter="url(#i100-glow)">
    <rect x="29" y="14" width="6" height="38" rx="2" fill="#3a2410"/>
    <path d="M29 18c-8-4-16 0-16 8 0 6 6 8 16 6z" fill="url(#i100-metal)" stroke="#1c1006" stroke-width="1"/>
    <path d="M35 18c8-4 16 0 16 8 0 6-6 8-16 6z" fill="url(#i100-metal)" stroke="#1c1006" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '101',
    label: 'Gelbe Sprint-Silhouette',
    keywords: ['run', 'rennen', 'sprint', 'yellow', 'gelb', 'silhouette'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i101-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i101-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#8a7a10"/><stop offset="55%" stop-color="#3a3406"/><stop offset="100%" stop-color="#0a0802"/></radialGradient>
    <filter id="i101-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i101-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i101-bg)"/>
  <g filter="url(#i101-glow)" fill="#0a0805">
    <circle cx="30" cy="16" r="4"/>
    <path d="M28 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '102',
    label: 'Orange Bodeneinschlag',
    keywords: ['impact', 'einschlag', 'ground', 'boden', 'orange', 'slam'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i102-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i102-bg" cx="50%" cy="60%" r="75%"><stop offset="0%" stop-color="#a85a1a"/><stop offset="50%" stop-color="#4a2408"/><stop offset="100%" stop-color="#0c0602"/></radialGradient>
    <filter id="i102-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i102-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i102-bg)"/>
  <g filter="url(#i102-glow)">
    <ellipse cx="32" cy="46" rx="18" ry="4" fill="#000" opacity="0.4"/>
    <path d="M10 44l10-4M54 44l-10-4M18 48l8-6M46 48l-8-6" stroke="#ffb23a" stroke-width="2.2" opacity="0.8" fill="none"/>
    <path d="M22 34v-8c0-4 4-8 10-8s10 4 10 8v8c0 6-4 10-10 10s-10-4-10-10z" fill="#140905"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '103',
    label: 'Braune Reißzahn-Klaue',
    keywords: ['claw', 'kralle', 'fang', 'reißzahn', 'brown', 'braun'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i103-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i103-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#4a2c10"/><stop offset="55%" stop-color="#241606"/><stop offset="100%" stop-color="#080502"/></radialGradient>
    <linearGradient id="i103-fang" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff2dc"/><stop offset="100%" stop-color="#c8a86a"/></linearGradient>
    <filter id="i103-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i103-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i103-bg)"/>
  <g filter="url(#i103-glow)" fill="url(#i103-fang)" stroke="#3a2810" stroke-width="0.6">
    <path d="M20 20 L26 44 L22 44 L16 22 Z"/>
    <path d="M32 14 L36 46 L30 46 L28 16 Z"/>
    <path d="M44 20 L38 44 L42 44 L48 22 Z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '104',
    label: 'Grüne Doppel-Nebelfigur',
    keywords: ['mist', 'nebel', 'ghost', 'geist', 'green', 'grün', 'double', 'doppel'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i104-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i104-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#0d3a24"/><stop offset="55%" stop-color="#061d12"/><stop offset="100%" stop-color="#020a06"/></radialGradient>
    <linearGradient id="i104-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8ffe6" stop-opacity="0.8"/><stop offset="100%" stop-color="#0f7a54" stop-opacity="0.15"/></linearGradient>
    <filter id="i104-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i104-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i104-bg)"/>
  <g filter="url(#i104-glow)" fill="url(#i104-mist)">
    <ellipse cx="22" cy="38" rx="8" ry="12"/>
    <ellipse cx="42" cy="38" rx="8" ry="12"/>
    <ellipse cx="32" cy="28" rx="7" ry="10"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '105',
    label: 'Grüne Zombie-Hand (Boden)',
    keywords: ['zombie', 'hand', 'grave', 'grab', 'green', 'grün'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i105-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i105-bg" cx="50%" cy="55%" r="75%"><stop offset="0%" stop-color="#2a3a10"/><stop offset="55%" stop-color="#141d06"/><stop offset="100%" stop-color="#060802"/></radialGradient>
    <linearGradient id="i105-hand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8d46a"/><stop offset="60%" stop-color="#5c8020"/><stop offset="100%" stop-color="#283a0c"/></linearGradient>
    <filter id="i105-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i105-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i105-bg)"/>
  <g filter="url(#i105-glow)">
    <path d="M14 50c10-4 26-4 36 0v-6h-36z" fill="#140e08"/>
    <path d="M24 44V22a2.2 2.2 0 0 1 4.4 0v12M28.4 32V18a2.2 2.2 0 0 1 4.4 0v14M32.8 32V20a2.2 2.2 0 0 1 4.4 0v12M37.2 38v-6a2 2 0 0 1 4 0v10c0 4-2.4 6-6.6 6h-8c-3 0-5-2-5-2" fill="none" stroke="url(#i105-hand)" stroke-width="4.4" stroke-linecap="round"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '106',
    label: 'Rote Wut-Maske',
    keywords: ['rage', 'wut', 'mask', 'maske', 'red', 'rot', 'scream', 'schrei'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i106-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i106-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#6e1810"/><stop offset="60%" stop-color="#320c08"/><stop offset="100%" stop-color="#0a0302"/></radialGradient>
    <linearGradient id="i106-mask" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffb28a"/><stop offset="60%" stop-color="#c0392a"/><stop offset="100%" stop-color="#4a0f0a"/></linearGradient>
    <filter id="i106-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i106-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i106-bg)"/>
  <g filter="url(#i106-glow)">
    <path d="M32 12c-8 0-13 6-13 14 0 6 3 11 6 14l-1 8c-.2 1 .6 1.9 1.6 1.9h13c1 0 1.8-.9 1.6-1.9l-1-8c3-3 6-8 6-14 0-8-5-14-13-14z" fill="url(#i106-mask)" stroke="#3a0d08" stroke-width="1"/>
    <path d="M20 22l8 4M44 22l-8 4" stroke="#2a0806" stroke-width="1.8"/>
    <ellipse cx="32" cy="38" rx="6" ry="8" fill="#1a0402"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '107',
    label: 'Weißblauer Sprung-Tritt',
    keywords: ['kick', 'tritt', 'jump', 'sprung', 'white', 'weiß', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i107-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i107-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#163a5c"/><stop offset="55%" stop-color="#0a1d30"/><stop offset="100%" stop-color="#030a12"/></radialGradient>
    <linearGradient id="i107-leg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eaf7ff"/><stop offset="100%" stop-color="#7ec8f2"/></linearGradient>
    <filter id="i107-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i107-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i107-bg)"/>
  <g filter="url(#i107-glow)" fill="url(#i107-leg)" stroke="#0a2e4d" stroke-width="0.8" transform="rotate(-20,32,32)">
    <path d="M22 14c6 0 8 8 7 16l-2 12 14-2c3-.4 5 2 4 4-2 4-9 6-16 6-6 0-10-3-11-9l-2-14c-1-7 0-13 6-13z"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '108',
    label: 'Goldener Wächter-Idol',
    keywords: ['idol', 'guardian', 'wächter', 'statue', 'gold'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i108-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i108-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#c8940f"/><stop offset="45%" stop-color="#5a3d08"/><stop offset="100%" stop-color="#120c02"/></radialGradient>
    <filter id="i108-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i108-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i108-bg)"/>
  <g filter="url(#i108-glow)" fill="#140c02">
    <rect x="24" y="44" width="16" height="4"/>
    <path d="M26 44V26c0-4 3-8 6-8s6 4 6 8v18z"/>
    <rect x="20" y="20" width="24" height="4"/>
    <circle cx="32" cy="14" r="4.4"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '109',
    label: 'Blaue glühende Faust (Variante)',
    keywords: ['fist', 'faust', 'blue', 'blau', 'glow', 'glühen'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i109-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i109-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123a6c"/><stop offset="60%" stop-color="#081d38"/><stop offset="100%" stop-color="#020a16"/></radialGradient>
    <radialGradient id="i109-aura" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#9fd8ff" stop-opacity="0.9"/><stop offset="70%" stop-color="#2a7fd6" stop-opacity="0.3"/><stop offset="100%" stop-color="#2a7fd6" stop-opacity="0"/></radialGradient>
    <filter id="i109-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i109-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i109-bg)"/>
  <g filter="url(#i109-glow)">
    <circle cx="32" cy="32" r="16" fill="url(#i109-aura)"/>
    <path d="M22 30v10c0 5 4 8 10 8s10-3 10-8V26a2.4 2.4 0 0 0-4.8 0v6-9a2.4 2.4 0 0 0-4.8 0v9-11a2.4 2.4 0 0 0-4.8 0v11-6a2.2 2.2 0 0 0-4.4 0z" fill="#050d18"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '110',
    label: 'Bronze-Streitaxt (Variante)',
    keywords: ['axe', 'axt', 'weapon', 'waffe', 'bronze'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i110-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i110-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#3a2410"/><stop offset="55%" stop-color="#1c1206"/><stop offset="100%" stop-color="#060402"/></radialGradient>
    <linearGradient id="i110-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eef0f2"/><stop offset="45%" stop-color="#a9afb6"/><stop offset="100%" stop-color="#484d52"/></linearGradient>
    <filter id="i110-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i110-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i110-bg)"/>
  <g transform="rotate(-30,32,32)" filter="url(#i110-glow)">
    <rect x="29" y="14" width="6" height="38" rx="2" fill="#3a2410"/>
    <path d="M29 18c-8-4-16 0-16 8 0 6 6 8 16 6z" fill="url(#i110-metal)" stroke="#1a1c1e" stroke-width="1"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '111',
    label: 'Dunkle Kreatur mit Wirbel-Aura (Blau)',
    keywords: ['creature', 'kreatur', 'aura', 'swirl', 'wirbel', 'blue', 'blau'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i111-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i111-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#123a5c"/><stop offset="60%" stop-color="#081d30"/><stop offset="100%" stop-color="#020a12"/></radialGradient>
    <filter id="i111-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i111-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i111-bg)"/>
  <g filter="url(#i111-glow)">
    <path d="M18 44c-3-10 3-20 14-20s17 10 14 20c-3 3-9 5-14 5s-11-2-14-5z" stroke="#9fd8ff" stroke-width="1.4" fill="none" opacity="0.7"/>
    <path d="M32 16c-6 0-10 4-10 10 0 4 2 7 4 9-2 3-4 7-4 11 3 2 7 3 10 3s7-1 10-3c0-4-2-8-4-11 2-2 4-5 4-9 0-6-4-10-10-10z" fill="#040d16" stroke="#0a2e4d" stroke-width="1"/>
    <ellipse cx="27" cy="26" rx="1.8" ry="2.4" fill="#9fd8ff"/>
    <ellipse cx="37" cy="26" rx="1.8" ry="2.4" fill="#9fd8ff"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '112',
    label: 'Stier-Minotaurus-Haupt',
    keywords: ['bull', 'stier', 'minotaur', 'minotaurus', 'brown', 'braun', 'head', 'kopf'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i112-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i112-bg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#4a2e10"/><stop offset="60%" stop-color="#241606"/><stop offset="100%" stop-color="#080502"/></radialGradient>
    <linearGradient id="i112-fur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8a06a"/><stop offset="60%" stop-color="#8a5c30"/><stop offset="100%" stop-color="#3a2410"/></linearGradient>
    <linearGradient id="i112-horn" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f2ead8"/><stop offset="100%" stop-color="#a89670"/></linearGradient>
    <filter id="i112-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i112-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i112-bg)"/>
  <g filter="url(#i112-glow)">
    <path d="M18 16c-4 4-6 10-4 14l6-2z" fill="url(#i112-horn)" stroke="#5c4c2a" stroke-width="0.6"/>
    <path d="M46 16c4 4 6 10 4 14l-6-2z" fill="url(#i112-horn)" stroke="#5c4c2a" stroke-width="0.6"/>
    <path d="M32 18c-8 0-13 6-13 13 0 8 5 15 13 15s13-7 13-15c0-7-5-13-13-13z" fill="url(#i112-fur)" stroke="#241606" stroke-width="1"/>
    <ellipse cx="26" cy="30" rx="2.6" ry="3.2" fill="#1c1006"/>
    <ellipse cx="38" cy="30" rx="2.6" ry="3.2" fill="#1c1006"/>
    <ellipse cx="32" cy="40" rx="5" ry="4" fill="#2a1a0c"/>
    <circle cx="27" cy="40" r="1.4" fill="#f2ead8"/>
    <circle cx="37" cy="40" r="1.4" fill="#f2ead8"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
  {
    id: '113',
    label: 'Grüne Sprint-Silhouette mit Wirbel-Aura',
    keywords: ['run', 'rennen', 'sprint', 'aura', 'green', 'grün', 'swirl', 'wirbel'],
    xml: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="i113-frame" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a7350"/><stop offset="45%" stop-color="#3a2e1c"/><stop offset="55%" stop-color="#1a140b"/><stop offset="100%" stop-color="#6b5738"/></linearGradient>
    <radialGradient id="i113-bg" cx="50%" cy="45%" r="75%"><stop offset="0%" stop-color="#1c3a12"/><stop offset="55%" stop-color="#0d1d08"/><stop offset="100%" stop-color="#040a02"/></radialGradient>
    <filter id="i113-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="8" fill="url(#i113-frame)"/>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="url(#i113-bg)"/>
  <g filter="url(#i113-glow)">
    <path d="M16 40c-2-8 2-16 10-20M48 40c2-8-2-16-10-20" stroke="#a8ff6a" stroke-width="1.6" fill="none" opacity="0.7"/>
    <circle cx="32" cy="16" r="4" fill="#0a1404"/>
    <path d="M30 20c-2 0-3.6 1.4-4 3.2l-2.4 9c-.3 1.2.5 2.4 1.7 2.6l5 .9-2 10.3c-.3 1.4.7 2.7 2.1 2.7 1 0 1.9-.6 2.2-1.6l3.4-10.4 4.6 4c1 .9 2.5.6 3.2-.6l3-5.4c.6-1.1.2-2.5-.9-3.1-1.1-.6-2.5-.2-3.1.9l-1.8 3.2-4.4-3.8 1.6-6c.5-1.9-.5-3.9-2.3-4.6-1.9-.8-3.9.2-4.9 1.7z" fill="#0a1404"/>
  </g>
  <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="1"/>
</svg>`,
  },
];

export function findSkillIcon(id: string | null | undefined): SkillIconDefinition | undefined {
  if (!id) return undefined;
  return SKILL_ICONS.find((icon) => icon.id === id);
}

export function searchSkillIcons(query: string): SkillIconDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return SKILL_ICONS;
  return SKILL_ICONS.filter(
    (icon) => icon.label.toLowerCase().includes(q) || icon.keywords.some((k) => k.includes(q))
  );
}
