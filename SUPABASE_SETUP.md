# Configuração do Supabase - Portal de Eventos PGSS

## 📋 Visão Geral

Este documento descreve a configuração do Supabase para o Portal de Eventos da Pós Graduação Stricto Sensu da Cogna Educação.

## 🏗️ Estrutura do Banco de Dados

### Tabelas Principais

#### 1. `events` - Eventos
- **id**: UUID (chave primária)
- **title**: Título do evento
- **description**: Descrição detalhada
- **start_date**: Data de início
- **end_date**: Data de término
- **location**: Local do evento
- **max_participants**: Número máximo de participantes
- **current_participants**: Número atual de participantes
- **price**: Preço (0 para eventos gratuitos)
- **is_free**: Boolean indicando se é gratuito
- **status**: Status do evento (draft, published, cancelled, completed)
- **category**: Categoria do evento
- **image_url**: URL da imagem do evento
- **requirements**: Requisitos para participação
- **agenda**: Agenda detalhada do evento

#### 2. `users` - Usuários
- **id**: UUID (chave primária)
- **email**: Email do usuário
- **full_name**: Nome completo
- **role**: Função (admin, organizer, participant)
- **avatar_url**: URL do avatar
- **phone**: Telefone
- **institution**: Instituição

#### 3. `event_registrations` - Inscrições
- **id**: UUID (chave primária)
- **event_id**: ID do evento (foreign key)
- **user_id**: ID do usuário (foreign key)
- **status**: Status da inscrição (pending, confirmed, cancelled)
- **payment_status**: Status do pagamento (pending, paid, refunded)
- **payment_method**: Método de pagamento
- **notes**: Observações

## 🔧 Configuração dos Ambientes

### Desenvolvimento
- **Arquivo**: `env.development`
- **URL**: `https://uhylyxwjkabcomuctuqa.supabase.co`
- **Bucket**: `attachments`

### Produção
- **Arquivo**: `env.production`
- **URL**: `https://sistemasbd.pgsscogna.com.br/`
- **Bucket**: `Attachments`

## 🚀 Como Usar

### 1. Instalação
```bash
npm install @supabase/supabase-js
```

### 2. Importação
```typescript
import { supabase } from '@/lib/supabase';
```

### 3. Exemplo de Uso
```typescript
// Buscar eventos
const { data: events, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published');

// Criar evento
const { data, error } = await supabase
  .from('events')
  .insert([
    {
      title: 'Novo Evento',
      description: 'Descrição do evento',
      start_date: '2024-01-01',
      end_date: '2024-01-02',
      location: 'São Paulo, SP',
      max_participants: 100,
      price: 0,
      is_free: true,
      status: 'draft',
      created_by: 'user-id',
      category: 'Workshop'
    }
  ]);
```

## 🔐 Segurança

### Row Level Security (RLS)
- Todas as tabelas devem ter RLS habilitado
- Políticas específicas para cada tipo de usuário
- Usuários só podem ver/editar dados que lhes pertencem

### Autenticação
- Supabase Auth para login/registro
- JWT tokens para sessões
- Refresh tokens automáticos

## 📁 Storage

### Buckets
- **attachments**: Para arquivos anexados aos eventos
- **avatars**: Para avatares dos usuários
- **event-images**: Para imagens dos eventos

### Políticas de Upload
- Tamanho máximo: 10MB por arquivo
- Tipos permitidos: jpg, png, pdf, doc, docx
- Validação de conteúdo

## 🧪 Testes

### Ambiente de Teste
- Banco separado para testes
- Dados mockados para desenvolvimento
- Rollback automático após testes

## 📊 Monitoramento

### Logs
- Todas as operações são logadas
- Alertas para operações suspeitas
- Métricas de performance

### Backup
- Backup automático diário
- Retenção de 30 dias
- Restauração em caso de emergência

## 🔄 Workflow GitHub Actions

### Desenvolvimento
- Trigger: push para branch `development`
- Build: `npm run build:dev`
- Deploy: Ambiente de desenvolvimento

### Produção
- Trigger: push para branch `main`
- Build: `npm run build:prod`
- Deploy: Ambiente de produção

## 📝 Próximos Passos

1. **Configurar RLS** nas tabelas
2. **Implementar autenticação** com Supabase Auth
3. **Criar políticas** de acesso
4. **Configurar storage** buckets
5. **Implementar upload** de arquivos
6. **Testar integração** completa

## 🆘 Suporte

Para dúvidas ou problemas:
- Documentação: [Supabase Docs](https://supabase.com/docs)
- Comunidade: [Supabase Discord](https://discord.supabase.com)
- Issues: Criar issue no repositório do projeto 