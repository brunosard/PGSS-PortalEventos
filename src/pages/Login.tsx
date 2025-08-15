import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error: authError } = await signIn(email, password);
      
      if (authError) {
        setError(authError.message);
      } else {
        // Login bem-sucedido, redireciona para o dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Erro inesperado durante o login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Botão Voltar para Home */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro hover:text-cogna-roxo transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Voltar para Home</span>
          </Link>
        </div>

        {/* Card Principal */}
        <div className="bg-white dark:bg-cogna-cinzaEscuro rounded-2xl shadow-xl border border-cogna-cinzaEscuro/10 dark:border-cogna-cinzaClaro/10 overflow-hidden">
          
          {/* Conteúdo do Card */}
          <div className="px-8 py-8">
            {/* Header do Card */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src="/logo_cogna.png" 
                  alt="Cogna Educação" 
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
                Entrar no Portal
              </h1>
              <p className="text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70 text-sm">
                Acesse sua conta para gerenciar eventos
              </p>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-cogna-cinzaEscuro/50 dark:text-cogna-cinzaClaro/50" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaEscuro/20 rounded-lg bg-white dark:bg-cogna-cinzaEscuro text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro placeholder-cogna-cinzaEscuro/50 dark:placeholder-cogna-cinzaClaro/50 focus:outline-none focus:ring-2 focus:ring-cogna-roxo focus:border-transparent transition-all duration-200"
                      placeholder="seu@email.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-cogna-cinzaEscuro/50 dark:text-cogna-cinzaClaro/50" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaEscuro/20 rounded-lg bg-white dark:bg-cogna-cinzaEscuro text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro placeholder-cogna-cinzaEscuro/50 dark:placeholder-cogna-cinzaClaro/50 focus:outline-none focus:ring-2 focus:ring-cogna-roxo focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-cogna-cinzaEscuro/50 dark:text-cogna-cinzaClaro/50 hover:text-cogna-cinzaEscuro dark:hover:text-cogna-cinzaClaro transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-cogna-roxo hover:text-cogna-cinzaEscuro dark:hover:text-cogna-cinzaClaro transition-colors"
                  disabled={isLoading}
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-cogna-roxo hover:bg-cogna-cinzaEscuro dark:hover:bg-cogna-cinzaClaro hover:text-cogna-cinzaClaro dark:hover:text-cogna-cinzaEscuro focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cogna-roxo transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Entrar</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cogna-cinzaEscuro/20 dark:border-cogna-cinzaClaro/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-cogna-cinzaEscuro text-cogna-cinzaEscuro/50 dark:text-cogna-cinzaClaro/50">
                    ou
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-cogna-cinzaEscuro/70 dark:text-cogna-cinzaClaro/70">
                  Não tem uma conta?{' '}
                  <Link 
                    to="/signup" 
                    className="font-medium text-cogna-roxo hover:text-cogna-cinzaEscuro dark:hover:text-cogna-cinzaClaro transition-colors"
                  >
                    Criar conta
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer abaixo do card */}
        <div className="text-center mt-8">
          <p className="text-xs text-cogna-cinzaEscuro/50 dark:text-cogna-cinzaClaro/50">
            © 2024 Cogna Educação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 