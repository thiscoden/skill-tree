/** Hand-authored SVG (WoW-ability-icon style): gold bevel frame, radial amber glow,
 * gradient-shaded quest scroll silhouette with a wax seal. Rendered via react-native-svg's SvgXml. */
export const questScrollIconXml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
<defs>
<radialGradient id="scroll-glow" cx="50%" cy="42%" r="68%">
<stop offset="0%" stop-color="#4a3018"/>
<stop offset="55%" stop-color="#241407"/>
<stop offset="100%" stop-color="#0c0704"/>
</radialGradient>
<linearGradient id="scroll-frameOuter" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#f5d98b"/>
<stop offset="50%" stop-color="#b8863b"/>
<stop offset="100%" stop-color="#6e4a1e"/>
</linearGradient>
<linearGradient id="scroll-frameInner" x1="1" y1="1" x2="0" y2="0">
<stop offset="0%" stop-color="#3b2610"/>
<stop offset="100%" stop-color="#8b6a32"/>
</linearGradient>
<linearGradient id="scroll-parchment" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#f3e2b8"/>
<stop offset="100%" stop-color="#d8b579"/>
</linearGradient>
<linearGradient id="scroll-roll" x1="0" y1="0" x2="1" y2="0">
<stop offset="0%" stop-color="#c69a5c"/>
<stop offset="50%" stop-color="#a97c3f"/>
<stop offset="100%" stop-color="#7d5a29"/>
</linearGradient>
<radialGradient id="scroll-seal" cx="35%" cy="30%" r="70%">
<stop offset="0%" stop-color="#d84343"/>
<stop offset="100%" stop-color="#7a1414"/>
</radialGradient>
</defs>
<rect x="3" y="3" width="122" height="122" rx="16" fill="url(#scroll-glow)"/>
<rect x="27" y="46" width="14" height="38" rx="7" fill="url(#scroll-roll)"/>
<rect x="87" y="46" width="14" height="38" rx="7" fill="url(#scroll-roll)"/>
<rect x="34" y="52" width="60" height="26" fill="url(#scroll-parchment)"/>
<rect x="42" y="58" width="44" height="2.4" rx="1.2" fill="#8a6a3f" opacity="0.55"/>
<rect x="42" y="64.5" width="36" height="2.4" rx="1.2" fill="#8a6a3f" opacity="0.55"/>
<rect x="42" y="71" width="40" height="2.4" rx="1.2" fill="#8a6a3f" opacity="0.55"/>
<path d="M 40 78 Q 64 90 88 78" stroke="#6b1616" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="64" cy="80" r="8" fill="url(#scroll-seal)"/>
<circle cx="64" cy="80" r="8" fill="none" stroke="#4a0d0d" stroke-width="1.2"/>
<circle cx="61.5" cy="77.5" r="2.2" fill="#f4c98a" opacity="0.85"/>
<rect x="3" y="3" width="122" height="122" rx="16" fill="none" stroke="url(#scroll-frameOuter)" stroke-width="5"/>
<rect x="7" y="7" width="114" height="114" rx="13" fill="none" stroke="url(#scroll-frameInner)" stroke-width="2"/>
</svg>`;
