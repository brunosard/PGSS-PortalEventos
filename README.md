# Portal de Eventos PGSS

Sistema moderno e seguro para gerenciamento de eventos da Pós Graduação Stricto Sensu da Cogna Educação.

## 🚀 Sobre o Projeto

O Portal de Eventos PGSS é uma aplicação web desenvolvida com React e TypeScript, oferecendo uma solução completa para organização, gestão e participação em eventos institucionais. O sistema foi desenvolvido especificamente para atender às necessidades da Pós Graduação Stricto Sensu da Cogna Educação, garantindo segurança e eficiência no gerenciamento de eventos.

## ✨ Funcionalidades

### 🎯 Para Usuários
- **Visualização de Eventos**: Lista completa de eventos disponíveis
- **Busca e Filtros**: Sistema de busca avançada por título, localização e data
- **Detalhes dos Eventos**: Informações completas sobre cada evento
- **Inscrições**: Sistema de inscrição em eventos com controle de vagas
- **Perfil de Usuário**: Gerenciamento de inscrições e histórico

### 🛡️ Para Administradores
- **Dashboard Completo**: Visão geral de estatísticas e métricas
- **Gestão de Eventos**: Criação, edição e exclusão de eventos
- **Controle de Participantes**: Gerenciamento de inscrições e listas
- **Relatórios**: Geração de relatórios detalhados
- **Configurações**: Personalização do sistema

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context API
- **HTTP Client**: Axios

## 🎨 Design System

O projeto utiliza um sistema de design consistente com:
- **Cores**: Paleta baseada nas cores da Cogna Educação (roxo, coral, amarelo, cinzas)
- **Tipografia**: Sistema de tipografia responsivo do Tailwind CSS
- **Componentes**: Biblioteca de componentes reutilizáveis
- **Responsividade**: Design adaptável para todos os dispositivos
- **Tema**: Suporte a modo claro e escuro

## 📱 Responsividade

O sistema é totalmente responsivo, funcionando perfeitamente em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd PGSS-PortalEventos

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa linter
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   └── Footer.tsx      # Rodapé da aplicação
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Events.tsx      # Lista de eventos
│   ├── EventDetails.tsx # Detalhes do evento
│   ├── Login.tsx       # Página de login
│   └── Dashboard.tsx   # Dashboard administrativo
├── contexts/           # Contextos React
│   └── ThemeContext.tsx # Contexto de tema (light/dark)
├── types/              # Definições de tipos
├── services/           # Serviços e APIs
├── hooks/              # Hooks customizados
└── utils/              # Utilitários
```

## 🔐 Segurança

O sistema implementa várias camadas de segurança:
- **Autenticação**: Sistema de login seguro
- **Autorização**: Controle de acesso baseado em perfis
- **Validação**: Validação de dados em frontend e backend
- **HTTPS**: Comunicação criptografada
- **Sanitização**: Proteção contra ataques XSS

## 🌐 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Funcionalidades Futuras

- [ ] Sistema de notificações em tempo real
- [ ] Integração com calendários externos
- [ ] App mobile nativo
- [ ] Sistema de certificados digitais
- [ ] Integração com sistemas da PGSS
- [ ] Analytics avançados
- [ ] Sistema de backup automático

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é desenvolvido para uso exclusivo da Polícia Geral de Segurança Social (PGSS) de Angola.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Email**: eventos@cogna.com.br
- **Telefone**: +55 11 3000-0000
- **Horário**: Segunda a Sexta, 8h às 17h

## 👥 Equipe de Desenvolvimento

Desenvolvido pela equipe de TI da Cogna Educação com foco em:
- **Usabilidade**: Interface intuitiva e fácil de usar
- **Performance**: Sistema rápido e responsivo
- **Segurança**: Proteção de dados sensíveis
- **Manutenibilidade**: Código limpo e bem documentado

---

**Portal de Eventos PGSS** - Modernizando a gestão de eventos da Pós Graduação Stricto Sensu da Cogna Educação
