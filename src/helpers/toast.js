import { toast } from "react-toastify";

export function showToast(text, type, position = "bottom-right") {
  return toast[type](text, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
