import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'organizer' | 'participant';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cogna-roxo mx-auto mb-4"></div>
          <p className="text-cogna-cinzaEscuro dark:text-cogna-cinzaClaro">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não há usuário, redireciona para login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se há role específico requerido, verifica se o usuário tem permissão
  if (requiredRole) {
    const userRole = (user.user_metadata?.role as 'admin' | 'organizer' | 'participant') || 'participant';
    
    // Hierarquia de roles: admin > organizer > participant
    const roleHierarchy = {
      'admin': 3,
      'organizer': 2,
      'participant': 1
    };

    if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
      return (
        <div className="min-h-screen bg-cogna-cinzaClaro dark:bg-cogna-cinzaEscuro flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                Acesso Negado
              </h2>
              <p className="text-red-600 dark:text-red-400 mb-4">
                Você não tem permissão para acessar esta página.
              </p>
              <p className="text-sm text-red-500 dark:text-red-300">
                Role necessário: {requiredRole}
                <br />
                Seu role: {userRole}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Usuário autenticado e com permissão, renderiza o conteúdo
  return <>{children}</>;
};

export default ProtectedRoute; 