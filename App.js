import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import IconButton from './src/components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 150.0, categoria: 'Alimentação', data: '2026-03-01' },
  { id: 'd2', descricao: 'Uber', valor: 25.5, categoria: 'Transporte', data: '2026-03-02' },
  { id: 'd3', descricao: 'Cinema', valor: 40.0, categoria: 'Lazer', data: '2026-03-03' },
];

function BottomTabScreen({ despesas }) {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#3e2465' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#3e2465' },
        tabBarActiveTintColor: '#ffbb00',
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      >
        {(props) => <DespesasRecentes {...props} despesas={despesas} />}
      </Tab.Screen>

      <Tab.Screen
        name="TodasDespesas"
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => <TodasDespesas {...props} despesas={despesas} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesaHandler(novaDespesa) {
    setDespesas((despesasAtuais) => [novaDespesa, ...despesasAtuais]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3e2465' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Despesas"
          options={{ headerShown: false }}
        >
          {(props) => <BottomTabScreen {...props} despesas={despesas} />}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Gerenciar Despesa' }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              onAdicionarDespesa={(nova) => {
                adicionarDespesaHandler(nova);
                props.navigation.goBack();
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}