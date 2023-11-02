import { toast } from "react-toastify";

function toastDefault(text) {
  toast(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

export default toastDefault;
