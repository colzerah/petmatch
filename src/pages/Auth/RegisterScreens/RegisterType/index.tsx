import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';

import { Typography } from '@/components/Typography';
import { RadioCard } from '@/components/RadioCard';

export function RegisterType() {
  const [selected, setSelected] = useState('user');

  return (
    <Box className="flex flex-1 p-8 bg-primary-50">
      <VStack space="lg">
        <Box>
          <Typography title="Tipo de Cadastro" bold />
        </Box>

        <VStack>
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
        </VStack>
      </VStack>
    </Box>
  );
}
