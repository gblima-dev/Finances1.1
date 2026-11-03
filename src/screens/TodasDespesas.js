import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function TodasDespesas({ despesas }) {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const despesasExibidas = categoriaFiltro === 'Todas'
    ? despesas
    : despesas.filter((d) => d.categoria === categoriaFiltro);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerFiltro}>
        <Text style={styles.labelFiltro}>Filtrar por Categoria:</Text>
        <View style={styles.botoesContainer}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.btnFiltro,
                categoriaFiltro === cat && styles.btnFiltroAtivo,
              ]}
              onPress={() => setCategoriaFiltro(cat)}
            >
              <Text style={categoriaFiltro === cat ? styles.txtAtivo : styles.txtInativo}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <DespesaSaida despesas={despesasExibidas} periodo={`Total (${categoriaFiltro})`} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerFiltro: { padding: 12, backgroundColor: '#fff' },
  labelFiltro: { fontWeight: 'bold', marginBottom: 6 },
  botoesContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  btnFiltro: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  btnFiltroAtivo: { backgroundColor: '#007bff' },
  txtAtivo: { color: '#fff', fontWeight: 'bold' },
  txtInativo: { color: '#333' },
});