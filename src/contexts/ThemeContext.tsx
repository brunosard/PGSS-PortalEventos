import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Verifica se há uma preferência salva no localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    console.log('🚀 Inicializando ThemeContext...');
    
    const saved = localStorage.getItem('theme');
    console.log('🚀 localStorage theme:', saved);
    
    if (saved === 'light' || saved === 'dark') {
      console.log('🚀 Usando tema salvo:', saved);
      return saved as Theme;
    }
    
    // fallback: usa preferência do sistema ou light por padrão
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = preferDark ? 'dark' : 'light';
    console.log('🚀 Usando tema padrão:', defaultTheme);
    
    return defaultTheme;
  });

  // Aplica a classe 'dark' ao elemento html quando o tema for escuro
  useEffect(() => {
    console.log('🎨 Aplicando tema:', theme);
    
    const htmlElement = document.documentElement;
    console.log('🎨 HTML element:', htmlElement);
    console.log('🎨 HTML classList antes:', htmlElement.classList.toString());
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      console.log('🎨 Adicionada classe dark');
    } else {
      htmlElement.classList.remove('dark');
      console.log('🎨 Removida classe dark');
    }
    
    console.log('🎨 HTML classList depois:', htmlElement.classList.toString());
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme);
    console.log('🎨 Tema salvo no localStorage:', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('🔄 toggleTheme chamado. Tema atual:', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🔄 Novo tema será:', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  
  return context;
}; 