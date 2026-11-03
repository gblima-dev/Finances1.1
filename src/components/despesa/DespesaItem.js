import { View, Text, StyleSheet } from 'react-native';

export default function DespesaItem({ descricao, valor, data }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
      <View style={styles.valorContainer}>
        <Text style={styles.valor}>R$ {parseFloat(valor).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#5b21b6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  descricao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  data: { color: '#ddd', fontSize: 12 },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  valor: { color: '#5b21b6', fontWeight: 'bold' },
});