import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface AppState {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
}

type AppAction =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "TOGGLE_NOTIFICATIONS" };

const initialState: AppState = {
  theme: "light",
  language: "en",
  notifications: true,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "TOGGLE_NOTIFICATIONS":
      return { ...state, notifications: !state.notifications };
    default:
      return state;
  }
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
