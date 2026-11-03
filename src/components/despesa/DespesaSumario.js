import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodoNome }) {
  const total = despesas ? despesas.reduce((sum, item) => sum + item.valor, 0) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodoNome}</Text>
      <Text style={styles.valor}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e4d4f7',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodo: { fontSize: 14, color: '#4a2c7a', fontWeight: 'bold' },
  valor: { fontSize: 16, fontWeight: 'bold', color: '#3d1b6e' },
});