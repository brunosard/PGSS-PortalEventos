# Configuração das Variáveis de Ambiente - Portal de Eventos PGSS

## 📋 Visão Geral

Este documento explica como configurar as variáveis de ambiente para o Portal de Eventos PGSS usando Supabase.

## 🔧 Arquivos de Ambiente

### 1. `.env.development` - Ambiente de Desenvolvimento
```bash
VITE_SUPABASE_URL=https://uhylyxwjkabcomuctuqa.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeWx5eHdqa2FiY29tdWN0dXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTM2NDIsImV4cCI6MjA2NTA2OTY0Mn0.FxqOh6lQGakMCYfmnsrInbegQJTeLQupPgKnz_mGrn8
VITE_STORAGE_BUCKET_NAME=attachments
VITE_APP_URL=http://localhost:3001
VITE_APP_ENV=development
VITE_IS_PRODUCTION=false
```

### 2. `.env.production` - Ambiente de Produção
```bash
VITE_SUPABASE_URL=https://sistemasbd.pgsscogna.com.br/
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzEyNjMxNjAwLAogICJleHAiOiAxODcwMzk4MDAwCn0.oT8zRFT5MD4ITFwHe_RzdzyBqo2VlViblVyj3BMDNWc
VITE_STORAGE_BUCKET_NAME=Attachments
VITE_APP_URL=https://portaldeeventos.pgsscogna.com.br
VITE_APP_ENV=production
VITE_IS_PRODUCTION=true
```

## 🚀 Como Configurar

### 1. Desenvolvimento Local
```bash
# Copie o arquivo de exemplo
cp .env.development .env.local

# Ou crie manualmente
touch .env.local
```

### 2. Produção
```bash
# O arquivo .env.production será usado automaticamente
# durante o build de produção
npm run build:prod
```

## 🔐 Variáveis Obrigatórias

### Supabase
- **`VITE_SUPABASE_URL`**: URL do seu projeto Supabase
- **`VITE_SUPABASE_ANON_KEY`**: Chave anônima pública do Supabase

### Storage
- **`VITE_STORAGE_BUCKET_NAME`**: Nome do bucket para arquivos

### App
- **`VITE_APP_URL`**: URL base da aplicação
- **`VITE_APP_ENV`**: Ambiente (development/production)
- **`VITE_IS_PRODUCTION`**: Boolean indicando se é produção

## ⚠️ Importante

### 1. Nomes dos Arquivos
- **Desenvolvimento**: `.env.development` ou `.env.local`
- **Produção**: `.env.production`
- **Exemplo**: `env.example`

### 2. Prefixo VITE_
- Todas as variáveis devem começar com `VITE_`
- Isso é necessário para o Vite expor as variáveis no cliente

### 3. Segurança
- **NUNCA** commite arquivos `.env*` no Git
- Use `.gitignore` para excluir arquivos de ambiente
- As chaves do Supabase são públicas, mas mantenha-as seguras

## 🧪 Testando a Configuração

### 1. Verificar Build
```bash
npm run build:dev    # Desenvolvimento
npm run build:prod   # Produção
```

### 2. Verificar Desenvolvimento
```bash
npm run dev
```

### 3. Verificar no Browser
```javascript
// No console do browser
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_APP_ENV);
```

## 🔄 Workflow GitHub Actions

### 1. Secrets Necessários
```yaml
VITE_SUPABASE_URL_DEV: URL do Supabase de desenvolvimento
VITE_SUPABASE_ANON_KEY_DEV: Chave de desenvolvimento
VITE_SUPABASE_URL_PROD: URL do Supabase de produção
VITE_SUPABASE_ANON_KEY_PROD: Chave de produção
```

### 2. Build Automático
- **Branch `development`**: Usa variáveis de desenvolvimento
- **Branch `main`**: Usa variáveis de produção

## 🆘 Solução de Problemas

### Erro: "Missing Supabase environment variables"
1. Verifique se o arquivo `.env.development` existe
2. Verifique se as variáveis começam com `VITE_`
3. Reinicie o servidor de desenvolvimento
4. Verifique se não há quebras de linha nas chaves

### Erro: "Cannot find module"
1. Verifique se o arquivo está na raiz do projeto
2. Verifique se o nome está correto (com ponto)
3. Verifique se o Vite está configurado corretamente

### Variáveis não carregando
1. Verifique se o arquivo está na raiz do projeto
2. Verifique se não há espaços extras
3. Reinicie o servidor de desenvolvimento
4. Verifique se o arquivo não está no `.gitignore`

## 📝 Exemplo de .gitignore
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Mas mantenha os exemplos
!.env.example
```

## 🎯 Próximos Passos

1. **Configurar Supabase** com as variáveis corretas
2. **Testar autenticação** localmente
3. **Configurar GitHub Actions** com secrets
4. **Deploy automático** para produção

## 🆘 Suporte

Para problemas com variáveis de ambiente:
- Verifique a documentação do Vite
- Verifique se os arquivos estão na raiz
- Verifique se as variáveis começam com `VITE_`
- Reinicie o servidor após mudanças 