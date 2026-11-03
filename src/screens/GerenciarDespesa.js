import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ onAdicionarDespesa }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  function valorChangeHandler(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function salvarHandler() {
    if (!descricao.trim() || !valor || !categoria) {
      Alert.alert('Campos inválidos', 'Preencha todos os campos antes de salvar!');
      return;
    }

    const novaDespesa = {
      id: Math.random().toString(),
      descricao,
      valor: parseFloat(valor),
      categoria,
      data: data.toISOString().split('T')[0],
    };

    onAdicionarDespesa(novaDespesa);
    setDescricao('');
    setValor('');
    setCategoria('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Despesa</Text>

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <TextInput
        placeholder="Valor (ex: 45.50)"
        value={valor}
        onChangeText={valorChangeHandler}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.containerCategorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.btnCategoria, categoria === cat && styles.catSelecionada]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={categoria === cat ? styles.txtBranco : styles.txtEscuro}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => setMostrarDatePicker(true)} style={styles.btnData}>
        <Text>Data: {data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>

      {mostrarDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Pressable style={styles.btnSalvar} onPress={salvarHandler}>
        <Text style={styles.txtBranco}>Salvar Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 8, margin: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 12 },
  label: { fontWeight: 'bold', marginBottom: 6 },
  containerCategorias: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  btnCategoria: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  catSelecionada: { backgroundColor: '#007bff', borderColor: '#007bff' },
  btnData: { padding: 10, backgroundColor: '#eee', borderRadius: 6, marginBottom: 12 },
  btnSalvar: { backgroundColor: '#28a745', padding: 12, borderRadius: 6, alignItems: 'center' },
  txtBranco: { color: '#fff', fontWeight: 'bold' },
  txtEscuro: { color: '#000' },
});