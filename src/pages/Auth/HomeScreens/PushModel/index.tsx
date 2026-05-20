import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { deleteInstallation } from '@/services/push/notifications';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { getDeviceInfo } from '@/services/push/notifications';

export function PushModel() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFcmToken();
  }, []);

  const fetchFcmToken = async () => {
    try {
      setLoading(true);
      const info = await getDeviceInfo();
      if (info) {
        setFcmToken(info.fcmToken);
      }
      setLoading(false);
    } catch (err: Error | any) {
      setError(err?.message || 'Erro ao obter FCM do dispositivo.');

      setLoading(false);
    }
  };

  const handleDeleteInstallation = async () => {
    await deleteInstallation();
    setFcmToken(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>ℹ️ O que é cada ID?</Text>

        <Text style={styles.infoText}>
          <Text style={styles.bold}>FCM Token:</Text> Token usado para enviar
          notificações push para este dispositivo.
        </Text>
      </View>

      {error && (
        <View style={styles.errorSection}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <Text style={styles.errorHint}>
            Verifique o console (Cmd+D → Debug) para mais detalhes
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>📨 FCM Token:</Text>
        <Text style={styles.value} selectable>
          {fcmToken || 'Não disponível'}
        </Text>
        <Button
          title="Obter FCM Token"
          onPress={fetchFcmToken}
          disabled={loading}
        />
        <Divider />
        <Button
          title="🗑️ Deletar Instalação"
          onPress={handleDeleteInstallation}
          action="negative"
          disabled={loading}
        />
      </View>
    </View>
  );
}
