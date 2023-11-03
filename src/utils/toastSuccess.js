import { toast } from "react-toastify";

/**
 * Usage: used to call *SUCCESS* toastify toast with param as message
 * 
 * @param {string} text
 * 
 * Toast message
 */
function toastSuccess(text) {
  toast.success(text, {
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

export default toastSuccess;