import { View, StyleSheet, Text } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodoNome, fallbackText }) {
  let conteudo = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (despesas && despesas.length > 0) {
    conteudo = <DespesaLista despesas={despesas} />;
  }

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodoNome={periodoNome} />
      {conteudo}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  infoText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});