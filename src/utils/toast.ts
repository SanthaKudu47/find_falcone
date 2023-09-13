import { toast, ToastOptions } from "react-toastify";
export default function appToast(
  message: string,
  type: "success" | "info" | "error"
) {
  const options: ToastOptions = {
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  switch (type) {
    case "success":
      toast.success(message, options);
      break;

    case "error":
      toast.error(message, options);
      break;

    default:
      toast.info(message, options);
      break;
  }
}
