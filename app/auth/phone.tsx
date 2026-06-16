import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from '../../components/Button';
import { useAuth } from '../../lib/auth-context';
import { isValidEgyptMobile, toE164, EGYPT_COUNTRY_CODE } from '../../lib/phone';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function PhoneStep() {
  const { signInWithPhone } = useAuth();
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!isValidEgyptMobile(localNumber)) {
      setError("That doesn't look like an Egyptian mobile number.");
      return;
    }
    setError(null);
    setLoading(true);
    const e164 = toE164(localNumber);
    const { error: signInError } = await signInWithPhone(e164);
    setLoading(false);
    if (signInError) { setError(signInError); return; }
    router.push({ pathname: '/auth/verify', params: { phone: e164 } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your number?</Text>
        <Text style={styles.subtitle}>We'll text you a code. No password.</Text>

        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>{EGYPT_COUNTRY_CODE}</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="10 123 4567"
            placeholderTextColor={colors.textMutedDark}
            value={localNumber}
            onChangeText={(v) => { setLocalNumber(v); setError(null); }}
            autoFocus
            maxLength={11}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View style={styles.footer}>
        <Button label="Send code" onPress={handleSend} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.espresso, justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { ...typography.title, color: colors.textLight },
  subtitle: { ...typography.body, color: colors.textMutedDark, marginTop: spacing.sm },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    backgroundColor: colors.surfaceDark,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderDark,
    paddingHorizontal: spacing.lg,
  },
  countryCode: { ...typography.body, fontSize: 20, color: colors.textMutedDark, marginRight: spacing.sm },
  input: { flex: 1, paddingVertical: spacing.md, fontSize: 20, color: colors.textLight },
  error: { ...typography.body, color: colors.overdue, marginTop: spacing.sm },
  footer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
});
