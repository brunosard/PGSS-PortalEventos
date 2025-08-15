CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Verificar se o usuário foi criado pelo Portal de Eventos
  -- através dos metadados
  IF new.raw_user_meta_data->>'source' = 'portal_eventos' THEN
    -- Usuário criado pelo Portal de Eventos
    INSERT INTO public.usuario_portal (
      id_users, 
      email, 
      nome_completo, 
      tp_categoria, 
      ativo
    )
    VALUES (
      new.id, 
      new.email, 
      COALESCE(new.raw_user_meta_data->>'full_name', ''), 
      'Comunidade Externa'::public.tp_categoria_portal, -- Valor padrão para novos usuários
      true
    );
  ELSE
    -- Usuário criado pelo sistema interno (lógica original)
    -- Se o usuário já existe na tabela usuario, apenas atualizar o id_users
    UPDATE public.usuario 
    SET id_users = new.id
    WHERE email = new.email;
    
    -- Se nenhuma linha foi atualizada, significa que o usuário não existe
    -- Neste caso, inserir novo usuário
    IF NOT FOUND THEN
      INSERT INTO public.usuario (id_users, email, nome_completo, tp_perfil, ativo, tp_documento, documento)
      VALUES (new.id, new.email, '', 1, true, 1, '');
    END IF;
  END IF;
  
  return new;
END;
$function$;