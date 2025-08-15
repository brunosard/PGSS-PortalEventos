import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo_cogna.png" 
                alt="Cogna Educação" 
                className="h-8 w-auto"
              />
            
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Portal de Eventos da Pós Graduação Stricto Sensu da Cogna Educação. 
              Conectando a comunidade acadêmica através de eventos de excelência.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                <Phone size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-cogna-roxo transition-colors">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Mail size={16} />
                <span className="text-sm">contato@cogna.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Phone size={16} />
                <span className="text-sm">(11) 3000-0000</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2024 Cogna Educação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 