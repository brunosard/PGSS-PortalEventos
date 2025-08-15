# Instruções de Instalação e Execução

## 🚀 Instalação Rápida

### 1. Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn instalado
- Git instalado

### 2. Clone e Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd PGSS-PortalEventos

# Instale as dependências
npm install
```

### 3. Execução
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm run preview
```

## 📋 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa o linter do código |

## 🌐 Acesso ao Sistema

Após executar `npm run dev`, o sistema estará disponível em:
- **URL**: http://localhost:5173
- **Porta padrão**: 5173

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente
Copie o arquivo `env.example` para `.env` e configure as variáveis:

```bash
cp env.example .env
```

### Configurações Recomendadas
- **Desenvolvimento**: Use as configurações padrão
- **Produção**: Configure `VITE_API_BASE_URL` para sua API
- **Testes**: Configure `VITE_ANALYTICS_ENABLED=false`

## 📱 Funcionalidades Disponíveis

### ✅ Implementadas
- [x] Página inicial com hero section
- [x] Listagem de eventos com busca e filtros
- [x] Detalhes dos eventos com inscrição
- [x] Sistema de login
- [x] Dashboard administrativo
- [x] Design responsivo
- [x] Sistema de temas
- [x] Navegação entre páginas

### 🚧 Em Desenvolvimento
- [ ] Integração com API backend
- [ ] Sistema de autenticação real
- [ ] Gestão de usuários
- [ ] Upload de arquivos
- [ ] Notificações em tempo real

## 🐛 Solução de Problemas

### Erro de Build
```bash
# Se houver erro de build, tente:
npm run build

# Se persistir, limpe o cache:
rm -rf node_modules
npm install
```

### Erro de Porta
Se a porta 5173 estiver ocupada, o Vite tentará automaticamente a próxima porta disponível.

### Problemas de Dependências
```bash
# Limpe o cache do npm
npm cache clean --force

# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

## 📁 Estrutura do Projeto

```
PGSS-PortalEventos/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── styles/             # Estilos e tema
│   ├── types/              # Definições de tipos
│   └── main.tsx            # Ponto de entrada
├── public/                  # Arquivos estáticos
├── dist/                    # Build de produção
├── package.json             # Dependências e scripts
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Documentação principal
```

## 🔒 Segurança

### Desenvolvimento
- O sistema roda em modo desenvolvimento
- Não há validação de autenticação real
- Dados são mockados para demonstração

### Produção
- Configure HTTPS obrigatório
- Implemente autenticação real
- Configure CORS adequadamente
- Use variáveis de ambiente para configurações sensíveis

## 📊 Performance

### Otimizações Implementadas
- Code splitting automático
- Lazy loading de componentes
- Otimização de imagens
- Minificação de código
- Gzip compression

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🌍 Navegadores Suportados

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📞 Suporte

Para suporte técnico:
- **Email**: eventos@pgss.gov.ao
- **Telefone**: +244 222 000 000
- **Horário**: Segunda a Sexta, 8h às 17h

---

**Portal de Eventos PGSS** - Sistema de Gerenciamento de Eventos da Pós Graduação Stricto Sensu da Cogna Educação 