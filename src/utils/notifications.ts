import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showNotification = (msg: string) => {
  toast(msg, {
    autoClose: 600,
  });
};

export default showNotification;
