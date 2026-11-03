import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 150.0, categoria: 'Alimentação', data: '2026-03-01' },
  { id: 'd2', descricao: 'Uber', valor: 25.5, categoria: 'Transporte', data: '2026-03-02' },
  { id: 'd3', descricao: 'Cinema', valor: 40.0, categoria: 'Lazer', data: '2026-03-03' },
];

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesaHandler(novaDespesa) {
    setDespesas((despesasAtuais) => [novaDespesa, ...despesasAtuais]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GerenciarDespesa onAdicionarDespesa={adicionarDespesaHandler} />
      <TodasDespesas despesas={despesas} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', paddingTop: 30 },
});