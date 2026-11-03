import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext();

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    async function carregarDespesas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem('@expenses');
        if (dadosSalvos !== null) {
          dispatch({ type: 'SET', payload: JSON.parse(dadosSalvos) });
        }
      } catch (error) {
        console.error('Erro ao carregar despesas', error);
      } finally {
        setIsLoaded(true);
      }
    }
    carregarDespesas();
  }, []);

  // Salvar dados sempre que a lista for alterada
  useEffect(() => {
    async function salvarDespesas() {
      if (isLoaded) {
        try {
          await AsyncStorage.setItem('@expenses', JSON.stringify(expenses));
        } catch (error) {
          console.error('Erro ao salvar despesas', error);
        }
      }
    }
    salvarDespesas();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense, isLoaded }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}