import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import { ExpensesContextProvider } from './src/store/expenses-context';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function DespesasOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#312e81' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#312e81', borderTopWidth: 0 },
        tabBarActiveTintColor: '#818cf8',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('GerenciarDespesa')}
            style={{ marginRight: 20 }}
          >
            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <BottomTabs.Screen
        name="Recentes"
        component={DespesasRecentes}
        options={{ title: 'Despesas Recentes' }}
      />
      <BottomTabs.Screen
        name="Todas"
        component={TodasDespesas}
        options={{ title: 'Todas as Despesas' }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#312e81' },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen
            name="DespesasOverview"
            component={DespesasOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}