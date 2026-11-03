import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaDespesas({ despesas, fallbackText, navigation }) {
  if (despesas.length === 0) {
    return <View style={styles.fallbackContainer}><Text style={styles.fallbackText}>{fallbackText}</Text></View>;
  }

  const total = despesas.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <View style={styles.container}>
      <View style={styles.sumarioContainer}>
        <Text style={styles.sumarioLabel}>Total</Text>
        <Text style={styles.sumarioValor}>R$ {total.toFixed(2)}</Text>
      </View>
      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardItem} 
            onPress={() => navigation.navigate('GerenciarDespesa', { despesaId: item.id })}
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
  fallbackContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1b4b' },
  fallbackText: { color: '#a5b4fc', fontSize: 16 },
  sumarioContainer: { padding: 16, backgroundColor: '#3730a3', borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  sumarioLabel: { color: '#c7d2fe', fontSize: 14, fontWeight: '600' },
  sumarioValor: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  cardItem: { backgroundColor: '#312e81', padding: 14, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemDesc: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  itemData: { color: '#a5b4fc', fontSize: 12, marginTop: 2 },
  valorBadge: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  valorText: { color: '#312e81', fontWeight: 'bold' },
});