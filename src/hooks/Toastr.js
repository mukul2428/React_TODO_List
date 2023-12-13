import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Toastr() {
  const notify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return notify;
}
export default Toastr;
