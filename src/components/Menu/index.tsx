import { View } from 'react-native';
import { container } from './styles';

import {
  Menu as MenuGluestack,
  MenuItem,
  MenuItemLabel,
} from '@/components/ui/menu';
import { MenuProps } from './menuDTO';

import { Icon } from '../ui/icon';
import { ICON_MAP } from '@/dtos/iconDTO';
import { Button } from '../Button';

export function Menu({
  items,
  offset,
  placement,
  disabledKeys,
  title,
}: MenuProps) {
  return (
    <View style={container}>
      <MenuGluestack
        placement={placement}
        offset={offset}
        disabledKeys={disabledKeys}
        trigger={({ ...triggerProps }) => {
          return <Button {...triggerProps} title={title} />;
        }}
      >
        {items.map(item => {
          const IconComponent = item.iconName ? ICON_MAP[item.iconName] : null;
          return (
            <MenuItem key={item.value} textValue={item.value}>
              {IconComponent && <Icon as={IconComponent} className="mr-2" />}
              <MenuItemLabel>{item.value}</MenuItemLabel>
            </MenuItem>
          );
        })}
      </MenuGluestack>
    </View>
  );
}
