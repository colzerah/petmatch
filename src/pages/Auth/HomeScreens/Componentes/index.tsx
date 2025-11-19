import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { useToast } from '@/hooks/useToast';
import { Input } from '@/components/Input';
import { View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Alert } from '@/components/Alert';
import { Menu } from '@/components/Menu';

export function Componentes() {
  const toast = useToast();

  const handleShowToast = () => {
    toast.show({
      title: 'Sucesso!',
      description: 'Operação realizada com sucesso',
      action: 'success',
      variant: 'solid',
      placement: 'bottom',
      duration: 3000,
    });
  };

  return (
    <View>
      <Button title="Click" onPress={() => handleShowToast()} />
      <Divider />
      <Input placeholder="Input teste" />
      <Divider />

      <HStack space="md">
        <Avatar fallbackText="Dyego Lima" />
        <Avatar fallbackText="Dyego Lima" showBadge />
        <Avatar
          showBadge
          fallbackText="Dyego Lima"
          uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
      </HStack>
      <Divider />

      <Divider />
      <HStack>
        <Badge
          action="info"
          variant="outline"
          size="lg"
          title="Senha"
          iconName="EyeIcon"
        />
      </HStack>
      <Divider />
      <HStack>
        <Alert
          action="error"
          variant="solid"
          title="Teste de Alert"
          iconName="InfoIcon"
        />
      </HStack>
      <Divider />
      <HStack>
        <Menu
          title="Menu "
          items={[
            { value: 'Site', iconName: 'GlobeIcon' },
            { value: 'Configurações', iconName: 'SettingsIcon' },
            { value: 'Ajuda', iconName: 'HelpCircleIcon' },
          ]}
        />
      </HStack>
    </View>
  );
}
