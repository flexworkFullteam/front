import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";
import "./App.css";

export const App = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
