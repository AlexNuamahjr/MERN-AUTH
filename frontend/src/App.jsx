import { Outlet } from "react-router-dom";
import Header from "./components/Header";


export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App;
