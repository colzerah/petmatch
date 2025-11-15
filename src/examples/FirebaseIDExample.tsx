import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import {
  getInstallationId,
  getInstallationAuthToken,
  getDeviceToken,
  getDeviceInfo,
  deleteInstallation,
} from '../services/notifications';

/**
 * Componente de exemplo para demonstrar como usar os IDs do Firebase
 *
 * Para usar, adicione no seu App ou em uma tela de Debug:
 * import FirebaseIDExample from '@examples/FirebaseIDExample';
 * <FirebaseIDExample />
 */
export default function FirebaseIDExample() {
  const [installationId, setInstallationId] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstallationId = async () => {
    setLoading(true);
    setError(null);
    try {
      const id = await getInstallationId();
      if (id) {
        setInstallationId(id);
      } else {
        setError('Installation ID retornou null - verifique os logs');
      }
    } catch (err: any) {
      setError(`Erro: ${err.message || err}`);
    }
    setLoading(false);
  };

  const fetchAuthToken = async () => {
    setLoading(true);
    const token = await getInstallationAuthToken();
    setAuthToken(token);
    setLoading(false);
  };

  const fetchFcmToken = async () => {
    setLoading(true);
    const token = await getDeviceToken();
    setFcmToken(token);
    setLoading(false);
  };

  const fetchAllInfo = async () => {
    setLoading(true);
    const info = await getDeviceInfo();
    if (info) {
      setInstallationId(info.installationId);
      setFcmToken(info.fcmToken);
    }
    setLoading(false);
  };

  const handleDeleteInstallation = async () => {
    // Em produção, use Alert.alert do React Native
    await deleteInstallation();
    setInstallationId(null);
    setAuthToken(null);
    setFcmToken(null);
  };

  useEffect(() => {
    fetchAllInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔥 Firebase IDs Debug</Text>

      {/* Error Message */}
      {error && (
        <View style={styles.errorSection}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <Text style={styles.errorHint}>
            Verifique o console (Cmd+D → Debug) para mais detalhes
          </Text>
        </View>
      )}

      {/* Installation ID */}
      <View style={styles.section}>
        <Text style={styles.label}>📱 Installation ID:</Text>
        <Text style={styles.value} selectable>
          {installationId || 'Não disponível'}
        </Text>
        <Button
          title="Obter Installation ID"
          onPress={fetchInstallationId}
          disabled={loading}
        />
      </View>

      {/* Installation Auth Token */}
      <View style={styles.section}>
        <Text style={styles.label}>🔐 Installation Auth Token:</Text>
        <Text style={styles.value} selectable>
          {authToken || 'Não disponível'}
        </Text>
        <Button
          title="Obter Auth Token"
          onPress={fetchAuthToken}
          disabled={loading}
        />
      </View>

      {/* FCM Token */}
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
      </View>

      {/* Ações */}
      <View style={styles.section}>
        <Button
          title="🔄 Obter Todos os IDs"
          onPress={fetchAllInfo}
          disabled={loading}
        />
        <View style={styles.spacer} />
        <Button
          title="🗑️ Deletar Instalação"
          onPress={handleDeleteInstallation}
          color="red"
          disabled={loading}
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoTitle}>ℹ️ O que é cada ID?</Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Installation ID:</Text> ID único da
          instalação do app. Muda quando app é reinstalado.
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Auth Token:</Text> Token de autenticação
          usado internamente pelo Firebase.
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>FCM Token:</Text> Token usado para enviar
          notificações push para este dispositivo.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  spacer: {
    height: 10,
  },
  info: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  errorSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    fontSize: 14,
    color: '#c62828',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
