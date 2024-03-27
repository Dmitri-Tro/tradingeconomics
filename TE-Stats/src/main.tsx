import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "src/App/store.ts";
import { App } from "src/App/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode> commented to avoid CORS error
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    // </React.StrictMode>,
);
