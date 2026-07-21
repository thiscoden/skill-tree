/** Hand-authored SVG (WoW-ability-icon style): gold bevel frame, radial teal glow,
 * gradient-shaded mystical tree-of-life silhouette with glowing leaves and mirrored roots.
 * Rendered via react-native-svg's SvgXml. */
export const treeOfLifeIconXml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
<defs>
<radialGradient id="tree-glow" cx="50%" cy="40%" r="68%">
<stop offset="0%" stop-color="#1b3a33"/>
<stop offset="55%" stop-color="#0e1f1c"/>
<stop offset="100%" stop-color="#070d0c"/>
</radialGradient>
<linearGradient id="tree-frameOuter" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#f5d98b"/>
<stop offset="50%" stop-color="#b8863b"/>
<stop offset="100%" stop-color="#6e4a1e"/>
</linearGradient>
<linearGradient id="tree-frameInner" x1="1" y1="1" x2="0" y2="0">
<stop offset="0%" stop-color="#3b2610"/>
<stop offset="100%" stop-color="#8b6a32"/>
</linearGradient>
<linearGradient id="tree-bark" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="#5a4632"/>
<stop offset="100%" stop-color="#2c2016"/>
</linearGradient>
<radialGradient id="tree-leaf" cx="35%" cy="30%" r="70%">
<stop offset="0%" stop-color="#eaffb0"/>
<stop offset="55%" stop-color="#8fd15b"/>
<stop offset="100%" stop-color="#3f7a2a"/>
</radialGradient>
<linearGradient id="tree-groundGlow" x1="0" y1="0" x2="1" y2="0">
<stop offset="0%" stop-color="#9be7ff" stop-opacity="0"/>
<stop offset="50%" stop-color="#9be7ff" stop-opacity="0.85"/>
<stop offset="100%" stop-color="#9be7ff" stop-opacity="0"/>
</linearGradient>
</defs>
<rect x="3" y="3" width="122" height="122" rx="16" fill="url(#tree-glow)"/>
<path d="M64 76C78 80 88 92 94 104" stroke="url(#tree-bark)" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.85"/>
<path d="M64 76C50 80 40 92 34 104" stroke="url(#tree-bark)" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.85"/>
<path d="M64 76C60 86 60 96 64 106" stroke="url(#tree-bark)" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.85"/>
<line x1="30" y1="76" x2="98" y2="76" stroke="url(#tree-groundGlow)" stroke-width="2"/>
<path d="M 60 76 C 59 66 60 58 64 48 C 68 58 69 66 68 76 Z" fill="url(#tree-bark)"/>
<path d="M64 50C50 46 40 34 34 22" stroke="url(#tree-bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M64 50C78 46 88 34 94 22" stroke="url(#tree-bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M64 50C60 40 60 30 64 20" stroke="url(#tree-bark)" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="48" cy="30" r="3.5" fill="url(#tree-leaf)"/>
<circle cx="80" cy="30" r="3.5" fill="url(#tree-leaf)"/>
<circle cx="34" cy="22" r="5" fill="url(#tree-leaf)"/>
<circle cx="94" cy="22" r="5" fill="url(#tree-leaf)"/>
<circle cx="64" cy="18" r="5.5" fill="url(#tree-leaf)"/>
<rect x="3" y="3" width="122" height="122" rx="16" fill="none" stroke="url(#tree-frameOuter)" stroke-width="5"/>
<rect x="7" y="7" width="114" height="114" rx="13" fill="none" stroke="url(#tree-frameInner)" stroke-width="2"/>
</svg>`;
