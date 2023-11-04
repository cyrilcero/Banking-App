import { toast } from "react-toastify";

/**
 * Usage: used to call *DEFAULT* toastify toast with param as message
 *
 * @param {string} text
 *
 * Toast message
 */

export const toastDefault = (text) => {
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
};

// Usage: used to call *SUCCESS* toastify toast with param as message

export const toastSuccess = (text) => {
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

// Usage: used to call *ERROR* toastify toast with param as message

export const toastError = (text) => {
  toast.error(text, {
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

// Usage: used to call *INFO* toastify toast with param as message

export const toastInfo = (text) => {
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