import { View, Text, StyleSheet } from 'react-native';

export default function DespesaItem({ descricao, valor, data, categoria }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.descricao}>{descricao}</Text>
        <View style={styles.tagCategoria}>
          <Text style={styles.textoCategoria}>{categoria}</Text>
        </View>
        <Text style={styles.data}>{data}</Text>
      </View>
      <View style={styles.containerValor}>
        <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  descricao: { fontWeight: 'bold', fontSize: 16 },
  tagCategoria: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  textoCategoria: { fontSize: 12, color: '#333' },
  data: { color: '#666', fontSize: 12 },
  containerValor: { justifyContent: 'center', alignItems: 'center' },
  valor: { fontWeight: 'bold', color: '#2a9d8f' },
});