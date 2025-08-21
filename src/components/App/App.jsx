import { Suspense } from "react";
import Loader from "../Loader/Loader.jsx";
import RouteList from "../RouteList/RouteList.jsx";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouteList />
    </Suspense>
  );
}

export default App;
