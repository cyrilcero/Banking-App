import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function UsersBalanceChart({ options, data }) {
  return <Bar options={options} data={data} />;
}

export default UsersBalanceChart;
