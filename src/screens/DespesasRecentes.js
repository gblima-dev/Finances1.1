import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useExpenses } from '../store/expenses-context';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();

  const recentes = expenses.filter((despesa) => {
    const hoje = new Date();
    const dataDespesa = new Date(despesa.data);
    const diferencaTempo = hoje.getTime() - dataDespesa.getTime();
    const diferencaDias = Math.floor(diferencaTempo / (1000 * 3600 * 24));
    return diferencaDias >= 0 && diferencaDias <= 7;
  });

  const total = recentes.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <View style={styles.container}>
      <View style={styles.sumarioContainer}>
        <Text style={styles.sumarioLabel}>Últimos 7 Dias</Text>
        <Text style={styles.sumarioValor}>R$ {total.toFixed(2)}</Text>
      </View>

      <FlatList
        data={recentes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
          >
            <View>
              <Text style={styles.itemDesc}>{item.descricao}</Text>
              <Text style={styles.itemData}>{item.data}</Text>
            </View>
            <View style={styles.valorBadge}>
              <Text style={styles.valorText}>R$ {item.valor.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1b4b', paddingHorizontal: 16 },
  sumarioContainer: {
    padding: 16,
    backgroundColor: '#3730a3',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  sumarioLabel: { color: '#c7d2fe', fontSize: 14, fontWeight: '600' },
  sumarioValor: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  cardItem: {
    backgroundColor: '#312e81',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDesc: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  itemData: { color: '#a5b4fc', fontSize: 12, marginTop: 2 },
  valorBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  valorText: { color: '#312e81', fontWeight: 'bold' },
});