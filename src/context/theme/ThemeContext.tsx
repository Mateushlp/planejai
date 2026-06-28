import { createContext } from "react"

export type Theme = 'ligth' | 'dark'

interface ThemeContextValue{
    theme: Theme
    toggleTheme:() => void
}
export const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined,
)