
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Layout from "./Pages/Layout/Layout";
import { useEffect, useReducer, useState } from "react";
import { updateEnvironment } from "./Env/Environment";


function App() {

  const [items, dispatch] = useReducer(() => false, true);
  const [isLoad , setLoad] = useState(false);
  async function isLoaded(){
  await updateEnvironment();
  dispatch();
}
  useEffect(()=>{
    isLoaded();
  },[isLoad])

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
