import { toast } from "react-toastify";

/**
 * Usage: used to call *DEFAULT* toastify toast with param as message
 * 
 * @param {string} text
 * 
 * Toast message
 */

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
