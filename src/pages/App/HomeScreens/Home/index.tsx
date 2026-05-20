import { View, Text } from "react-native";
import { container } from "./styles";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Button } from "@/components/Button";
import { logout } from "@/redux/authSlice/slice";

export function Home() {
  const auth = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  const { user, token, isAuthenticated } = auth;

  const { email, name } = user;

  const handleLogout = () => {
    console.log("cheguei aqui?");
    dispatch(logout());
  };

  return (
    <View style={container}>
      <Text>Home Screen</Text>
      <Text>
        Autenticado? {""}
        {isAuthenticated ? "sim" : "não"}
      </Text>
      <Text>Nome: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Token: {token}</Text>
      <Button title="sair" onPress={handleLogout} />
    </View>
  );
}
