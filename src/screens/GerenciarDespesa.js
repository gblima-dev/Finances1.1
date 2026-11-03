import { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useExpenses } from '../store/expenses-context';

// Lista fixa de Categorias exigida no Modal
const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia', 'Outros'];

export default function GerenciarDespesa({ route, navigation }) {
  const { addExpense, updateExpense, deleteExpense, expenses } = useExpenses();

  const despesaId = route.params?.expenseId;
  const isEditing = !!despesaId;
  const despesaSelecionada = isEditing ? expenses.find((e) => e.id === despesaId) : null;

  // 1. Estado único do formulário (exigência da Tarefa 3)
  const [form, setForm] = useState({
    description: despesaSelecionada ? despesaSelecionada.descricao : '',
    amount: despesaSelecionada ? despesaSelecionada.valor.toString() : '',
    date: despesaSelecionada ? despesaSelecionada.data : new Date().toISOString().split('T')[0],
    category: despesaSelecionada ? despesaSelecionada.category || '' : '',
  });

  const [errors, setErrors] = useState({});
  const [modalCategoriaVisivel, setModalCategoriaVisivel] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  // Função centralizada para alterar o estado do formulário
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Limpa a mensagem de erro do campo assim que o utilizador começa a corrigir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  // 2. Validação com as 4 regras exatas da rubrica
  function validate(values) {
    const errs = {};

    if (!values.description || values.description.trim().length < 3) {
      errs.description = 'A descrição deve ter no mínimo 3 caracteres.';
    }

    const parsedAmount = parseFloat(values.amount);
    if (!values.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      errs.amount = 'O valor deve ser maior que zero.';
    }

    if (!values.date) {
      errs.date = 'A data é obrigatória.';
    } else {
      const hoje = new Date().toISOString().split('T')[0];
      if (values.date > hoje) {
        errs.date = 'A data não pode ser futura.';
      }
    }

    if (!values.category) {
      errs.category = 'Selecione uma categoria.';
    }

    return errs;
  }

  function salvarHandler() {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Bloqueia o salvamento se houver erros
    }

    const dadosDespesa = {
      descricao: form.description.trim(),
      valor: parseFloat(form.amount),
      data: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(despesaId, dadosDespesa);
    } else {
      addExpense({ id: Math.random().toString(), ...dadosDespesa });
    }

    navigation.goBack();
  }

  function excluirHandler() {
    Alert.alert('Excluir Despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(despesaId);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Campo Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Ex: Mercado"
          placeholderTextColor="#9ca3af"
          style={[styles.input, errors.description && styles.inputError]}
          value={form.description}
          onChangeText={(val) => handleChange('description', val)}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        {/* Campo Valor com máscara regex de 2 casas decimais */}
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          placeholder="Ex: 49.90"
          placeholderTextColor="#9ca3af"
          keyboardType="decimal-pad"
          style={[styles.input, errors.amount && styles.inputError]}
          value={form.amount}
          onChangeText={(val) => {
            if (/^\d*\.?\d{0,2}$/.test(val)) {
              handleChange('amount', val);
            }
          }}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

        {/* Campo Data */}
        <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
        <TextInput
          placeholder="Ex: 2026-11-03"
          placeholderTextColor="#9ca3af"
          style={[styles.input, errors.date && styles.inputError]}
          value={form.date}
          onChangeText={(val) => handleChange('date', val)}
        />
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

        {/* Campo Categoria (Modal) */}
        <Text style={styles.label}>Categoria</Text>
        <TouchableOpacity
          style={[styles.input, styles.categoryPicker, errors.category && styles.inputError]}
          onPress={() => setModalCategoriaVisivel(true)}
        >
          <Text style={{ color: form.category ? '#ffffff' : '#9ca3af', fontSize: 16 }}>
            {form.category || 'Selecione uma categoria...'}
          </Text>
        </TouchableOpacity>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

        {/* Botões de Ação */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={salvarHandler}>
            <Text style={styles.btnText}>{isEditing ? 'Atualizar' : 'Salvar'}</Text>
          </TouchableOpacity>
        </View>

        {isEditing && (
          <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.btnDelete} onPress={excluirHandler}>
              <Text style={styles.btnText}>Excluir Despesa</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal para Seleção de Categoria */}
        <Modal visible={modalCategoriaVisivel} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha a Categoria</Text>
              <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      handleChange('category', item);
                      setModalCategoriaVisivel(false);
                    }}
                  >
                    <Text style={styles.categoryItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[styles.btn, styles.btnCancel, { marginTop: 12 }]}
                onPress={() => setModalCategoriaVisivel(false)}
              >
                <Text style={styles.btnText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1b4b', padding: 24 },
  label: { color: '#c7d2fe', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  input: {
    backgroundColor: '#312e81',
    color: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 6,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3730a3',
  },
  inputError: { borderColor: '#ef4444', borderWidth: 1.5 },
  errorText: { color: '#ef4444', fontSize: 12, marginBottom: 12, fontWeight: '500' },
  categoryPicker: { justifyContent: 'center' },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginBottom: 24 },
  btn: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  btnCancel: { backgroundColor: '#3730a3' },
  btnSave: { backgroundColor: '#4f46e5' },
  deleteContainer: { borderTopWidth: 1, borderTopColor: '#3730a3', paddingTop: 20, alignItems: 'center' },
  btnDelete: { backgroundColor: '#ef4444', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#312e81', padding: 20, borderRadius: 12, maxHeight: '70%' },
  modalTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  categoryItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#3730a3' },
  categoryItemText: { color: '#ffffff', fontSize: 16, textAlign: 'center' },
});