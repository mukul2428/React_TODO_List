import { createContext } from "react";
import { Theme } from "../components/Todo"

export const ThemeContext = createContext<Theme>("white");