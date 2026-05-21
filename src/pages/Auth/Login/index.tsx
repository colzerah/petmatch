import { useState } from 'react';
import { Box } from '@/components//ui/box';
import { VStack } from '@/components/ui/vstack';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { AppleLogoIcon, GoogleLogoIcon } from 'phosphor-react-native';
import { Typography } from '@/components/Typography';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import { useAppDispatch } from '@/hooks/useRedux';
import { addToken, addUser, login } from '@/redux/authSlice/slice';
import type { User } from '@/redux/authSlice/slice';
import { useAppNavigation } from '@/hooks/useAppNavigation';

// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/dtos/routeDTO';

// type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function Login() {
  const navigation = useAppNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const userFake: User = {
    profiles: [
      {
        id: 3,
        profileType: {
          id: 2,
          name: 'VETERINARY_SHOP',
        },
        name: 'Pet do Jobs',
        companyName: 'Pet do Jobs LTDA',
        cnpj: '987.654.320/0011-02',
        email: 'petdojobs@gmail.com',
        whatsApp: '(61) 94444-5557',
        phone: '(61) 98765-4323',
        url: 'https://www.petdojobs.com.br',
        createdAt: new Date('2026-01-01T00:00:00Z'),
        updatedAt: new Date('2026-01-01T00:00:00Z'),
      },
      {
        id: 4,
        profileType: {
          id: 3,
          name: 'HOTEL',
        },
        name: 'Hotel do Jobs',
        companyName: 'Hotel do Jobs LTDA',
        cnpj: '987.654.320/0011-02',
        email: 'petdojobs@gmail.com',
        whatsApp: '(61) 94444-5557',
        phone: '(61) 98765-4323',
        url: 'https://www.petdojobs.com.br',
        createdAt: new Date('2026-01-01T00:00:00Z'),
        updatedAt: new Date('2026-01-01T00:00:00Z'),
      },
    ],
    id: 1,
    name: 'Dyego',
    lastName: 'T. Lima',
    fullName: 'Dyego T. Lima',
    birthDate: '1990-05-15',
    birthDateFormatted: '15/05/1990',
    whatsApp: '(61) 98112-2323',
    cpf: '123.456.789-01',
    email: 'dyego@email.com',
    url: 'https://colzera.com.br',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
  };

  async function handleLogin() {
    try {
      // Simulação de API;
      //@ts-ignore
      await new Promise(resolve => setTimeout(resolve, 3000));

      if (email === 'ruan@gmail.com' && password === '123456') {
        dispatch(addToken('FAKE_TOKEN_123'));
        dispatch(addUser(userFake));
        dispatch(login());
      }
    } catch (error) {
      console.error('erro', error);
    }
  }

  return (
    <Box className="flex flex-1 justify-center bg-primary-100">
      <VStack space="4xl">
        {/* Logo abaixo */}
        <VStack space="lg" className="items-center">
          <Box>
            <Typography size="2xl" bold title="Logo" />
          </Box>

          <VStack space="md" className="items-center">
            <Typography title="Bem-Vindo!" bold size="4xl" />
            <Typography title="Faça login para cuidar do seu pet" />
          </VStack>
        </VStack>

        <Box>
          <VStack space="lg" className="px-7">
            <Input
              placeholder="seu@email.com"
              iconLeft={MailIcon}
              label="Email"
              size="xl"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="********"
              label="Senha"
              value={password}
              onChangeText={setPassword}
              onPress={() => setShowPassword(!showPassword)}
              iconLeft={LockIcon}
              iconRight={showPassword ? EyeIcon : EyeOffIcon}
              type={showPassword ? 'text' : 'password'}
              size="xl"
            />
            <Box className="items-end">
              <Button
                variant="link"
                title="esqueci minha senha"
                onPress={() => navigation.navigate('ResetPassword')}
              />
            </Box>
          </VStack>
        </Box>

        <Box>
          <VStack space="xl" className="px-7">
            <Button title="Entrar" size="xl" onPress={handleLogin} />
            <Button
              title="Entrar com Apple"
              size="xl"
              iconLeft={AppleLogoIcon}
              secondary
            />
            <Button
              title="Entrar com Google"
              size="xl"
              secondary
              iconLeft={GoogleLogoIcon}
            />
          </VStack>
        </Box>

        <Box className="items-center">
          <HStack space="sm" className="items-center">
            <Typography title="ainda não tem uma conta?" />
            <Button
              title="cadastre-se"
              variant="link"
              onPress={() => navigation.navigate('RegisterRoutes')}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
