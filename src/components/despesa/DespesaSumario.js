import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);
  
  const valorEstilo = somaDespesas > 200 ? styles.valorAlto : styles.valorNormal;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, valorEstilo]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  periodo: { fontSize: 14, color: '#495057' },
  soma: { fontSize: 18, fontWeight: 'bold' },
  valorNormal: { color: '#212529' },
  valorAlto: { color: '#d90429' },
});