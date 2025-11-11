import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { useToast } from '@/hooks/useToast';
import { Input } from '@/ui/Input';
import { View } from 'react-native';

export function Componentes() {
  const toast = useToast();

  const handleShowToast = () => {
    toast.show({
      title: 'Sucesso!',
      description: 'Operação realizada com sucesso',
      action: 'info',
      variant: 'solid',
      placement: 'top',
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
    </View>
  );
}
