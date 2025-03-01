import RouteConfig from "@/routes/RouteConfig";
import { Provider } from "react-redux";
import { store } from "@/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </>
  );
}

export default App;
