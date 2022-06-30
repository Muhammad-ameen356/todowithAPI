import { useSelector } from "react-redux";
import Home from "./Screens/Home/Home";

function App() {
  const { value } = useSelector((state) => state.counter);
  console.log(value);

  return <Home />;
}

export default App;
