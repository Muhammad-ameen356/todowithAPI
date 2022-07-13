import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Screens/Home/Home";

function App() {
  const { value } = useSelector((state) => state.counter);
  console.log(value);

  return (
    <>
      <Home />
      <ToastContainer hideProgressBar={true} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
