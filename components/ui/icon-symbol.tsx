// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.down': 'expand-more',
  'folder.fill': 'folder',
  'hexagon.fill': 'hexagon',
  'person.fill': 'person',
  'plus': 'add',
  'plus.circle.fill': 'add-circle',
  'xmark': 'close',
  'xmark.circle.fill': 'cancel',
  'pencil': 'edit',
  'trash': 'delete',
  'trash.fill': 'delete',
  'gear': 'settings',
  'checkmark': 'check',
  'checkmark.circle.fill': 'check-circle',
  'lock.fill': 'lock',
  'lock.open.fill': 'lock-open',
  'sparkles': 'auto-awesome',
  'square.fill': 'crop-square',
  'questionmark.circle': 'help-outline',
  'arrow.up': 'arrow-upward',
  'ellipsis': 'more-horiz',
  'archivebox.fill': 'archive',
  'arrow.uturn.backward': 'undo',
  'line.3.horizontal': 'menu',
  'magnifyingglass': 'search',
  'mic.fill': 'mic',
  'stop.fill': 'stop',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
