import { toast } from "react-toastify";

/**
 * Usage: used to call *INFO* toastify toast with param as message
 * 
 * @param {string} text
 * 
 * Toast message
 */
function toastInfo(text) {
  toast.info(text, {
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

export default toastInfo;
