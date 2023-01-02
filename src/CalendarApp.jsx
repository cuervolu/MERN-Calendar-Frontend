import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { store } from "./store";
import "./styles.css";
import 'animate.css';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
