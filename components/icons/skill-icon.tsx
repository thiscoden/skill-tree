import { SvgXml } from 'react-native-svg';

import { SKILL_ICONS, findSkillIcon } from '@/constants/skill-icons';

interface SkillIconProps {
  id: string | null | undefined;
  size?: number;
}

const FALLBACK_XML = SKILL_ICONS[0].xml;

/** Renders one of our custom fantasy skill icons (see constants/skill-icons.ts). */
export function SkillIcon({ id, size = 32 }: SkillIconProps) {
  const icon = findSkillIcon(id);
  return <SvgXml xml={icon?.xml ?? FALLBACK_XML} width={size} height={size} />;
}
