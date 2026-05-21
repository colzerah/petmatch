import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/dtos/routeDTO';

export function useAppNavigation() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
