import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';

import { Typography } from '@/components/Typography';
import { RadioCard } from '@/components/RadioCard';
import { Button } from '@/components/Button';
import { HStack } from '@/components/ui/hstack';

import { useAppNavigation } from '@/hooks/useAppNavigation';

export function RegisterType() {
  const [selected, setSelected] = useState('user');
  const navigation = useAppNavigation();

  return (
    <Box className="flex flex-1 p-8 bg-primary-50">
      <VStack space="lg">
        <Box>
          <Typography title="Tipo de Cadastro" bold />
        </Box>

        <VStack space="md">
          <RadioCard
            options={[
              {
                title: 'Usuário',
                subTitle: 'Cadastro para tutor e uso pessoal do App',
                value: 'user',
              },
              {
                title: 'Estabelecimento Comercial',
                subTitle: 'Pet Shop, Clínica, loja ou empresa parceira.',
                value: 'establishment',
              },
              {
                title: 'Serviço Autônomo',
                subTitle: 'Profissionais independentes que atendem pets',
                value: 'service',
              },
            ]}
            value={selected}
            onChange={setSelected}
          />
          <Typography
            title="Ao selecionar o tipo, o formulário é ajustado automaticamente"
            textColor="#A88A72"
          />
        </VStack>

        <Box className="mt-10">
          <Button title="Continuar" size="xl" />
        </Box>
      </VStack>

      <Box className="absolute bottom-10 left-0 right-0">
        <HStack space="sm" className="items-center justify-center">
          <Typography title="Já tem uma conta?" textColor="#A88A72" />
          <Button
            title="Entrar"
            variant="link"
            onPress={() => navigation.navigate('Login')}
          />
        </HStack>
      </Box>
    </Box>
  );
}
