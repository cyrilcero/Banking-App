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

const adminAccount = [
  {
    email: "admin@email.com",
    password: "admin00",
    firstName: "Admin",
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "00"),
    isAdmin: true,
  },
];

if (localStorage.getItem("UserAccounts") === null) {
  setLocalStorage("UserAccounts", adminAccount);
}

const adminAccount = [
  {
    email: "admin@email.com",
    password: "admin00",
    firstName: "Admin",
    accountID: Date.now()
      .toString()
      .replace(/^\d{3}/, "00"),
    isAdmin: true,
  },
];

if (localStorage.getItem("UserAccounts") === null) {
  setLocalStorage("UserAccounts", adminAccount);
}

const users = allUsers.filter((item) => item.isAdmin === false);
const users_email = users.map((item) => item.email);
const users_balance = users.map((item) => Number(item.accountBalance));

const labels = users_email;
const balance = users_balance;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
const data = {
  labels,
  datasets: [
    {
      label: "Account Balance",
      data: balance,
      backgroundColor: "rgba(62, 157, 208, 1)",
    },
  ],
};

function UsersBalanceChart() {
function UsersBalanceChart({ options, data }) {
  return <Bar options={options} data={data} />;
}

export default UsersBalanceChart;
