import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  return <DespesaSaida despesas={despesas} periodo="Últimos dias" />;
}