import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Debug do tema
  React.useEffect(() => {
    console.log('🔍 Tema atual:', theme);
    console.log('🔍 HTML classList:', document.documentElement.classList.toString());
    console.log('🔍 localStorage theme:', localStorage.getItem('theme'));
  }, [theme]);

  const handleThemeToggle = () => {
    console.log('🔄 Alternando tema de:', theme, 'para:', theme === 'light' ? 'dark' : 'light');
    toggleTheme();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // O redirecionamento será feito automaticamente pelo AuthContext
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro shadow-sm border-b border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaClaro/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Lado esquerdo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo_cogna.png" 
              alt="Cogna Educação" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Menu e Botões - Lado direito */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
              >
                Início
              </Link>
              <Link 
                to="/events" 
                className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
              >
                Eventos
              </Link>
              {user && (
                <Link 
                  to="/dashboard" 
                  className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* User Menu / Login Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="hidden md:flex items-center space-x-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">
                  <div className="w-8 h-8 bg-cogna-roxo rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário'}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 bg-cogna-cinzaEscuro/10 dark:bg-cogna-cinzaClaro/10 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro px-3 py-2 rounded-lg hover:bg-cogna-cinzaEscuro/20 dark:hover:bg-cogna-cinzaClaro/20 transition-colors"
                  title="Sair"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline text-sm">Sair</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-cogna-roxo text-white px-4 py-2 rounded-lg hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro transition-colors"
              >
                Entrar
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-cogna-cinzaEscuro/10 dark:bg-cogna-cinzaClaro/10 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:bg-cogna-cinzaEscuro/20 dark:hover:bg-cogna-cinzaClaro/20 transition-colors"
              title={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-cogna-cinzaEscuro/10 dark:bg-cogna-cinzaClaro/10 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaClaro/20">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/events" 
                className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Eventos
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="pt-2 border-t border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaClaro/20">
                    <div className="flex items-center space-x-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-3">
                      <div className="w-6 h-6 bg-cogna-roxo rounded-full flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors w-full"
                    >
                      <LogOut size={16} />
                      <span>Sair</span>
                    </button>
                  </div>
                </>
              )}
              {!user && (
                <Link 
                  to="/login" 
                  className="bg-cogna-roxo text-white px-4 py-2 rounded-lg hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro transition-colors w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 