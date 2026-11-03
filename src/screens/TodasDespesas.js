import { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, useColorScheme, Platform } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { Colors } from '../constants/theme';

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const debouncedSearch = useDebounce(searchQuery, 300);

  const despesasFiltradas = useMemo(() => {
    return expenses.filter((d) =>
      d.descricao.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [expenses, debouncedSearch]);

  const total = despesasFiltradas.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Buscar por descrição..."
        placeholderTextColor={theme.subtext}
        style={[styles.searchInput, { backgroundColor: theme.card, color: theme.text }]}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={[styles.sumarioContainer, { backgroundColor: theme.accent }]}>
        <Text style={styles.sumarioLabel}>Total ({despesasFiltradas.length})</Text>
        <Text style={styles.sumarioValor}>R$ {total.toFixed(2)}</Text>
      </View>

      <FlatList
        data={despesasFiltradas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              Nenhuma despesa encontrada.
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.subtext }]}>
              Toque em + para adicionar uma nova.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cardItem, { backgroundColor: theme.card }, styles.shadowEffect]}
            onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
          >
            <View>
              <Text style={[styles.itemDesc, { color: theme.text }]}>{item.descricao}</Text>
              <Text style={{ color: theme.subtext, fontSize: 12 }}>{item.data} • {item.category || 'Outros'}</Text>
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
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  searchInput: { padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 },
  sumarioContainer: { padding: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  sumarioLabel: { color: '#c7d2fe', fontSize: 14, fontWeight: '600' },
  sumarioValor: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  cardItem: { padding: 14, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemDesc: { fontSize: 16, fontWeight: 'bold' },
  valorBadge: { backgroundColor: '#4f46e5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  valorText: { color: '#ffffff', fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, fontWeight: 'bold' },
  emptySubtext: { fontSize: 14, marginTop: 4 },
 
  shadowEffect: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    },
  }),
});