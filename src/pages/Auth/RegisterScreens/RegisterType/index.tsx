import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';

import { Typography } from '@/components/Typography';

export function RegisterType() {
  return (
    <Box className="flex flex-1 p-8 bg-primary-50">
      <VStack space="lg">
        <Box>
          <Typography title="Tipo de Cadastro" bold />
        </Box>

        <VStack>
          <Typography title="Em breve!" />
        </VStack>
      </VStack>
    </Box>
  );
}
