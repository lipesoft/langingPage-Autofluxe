# Configuração do formulário Autofluxe

O formulário envia os leads por uma função serverless em `/api/contact` usando a API do Resend. O destino é fixo no servidor: `autofluxe.totens@gmail.com`. A página não grava os dados em banco de dados. A entrega e a caixa de entrada também dependem do Resend e do provedor de e-mail destinatário.

## Configuração necessária

1. No Resend, cadastre e valide um domínio que a equipe Autofluxe controla. Configure os registros DNS solicitados (incluindo SPF e DKIM) e confirme que o domínio está verificado. Um endereço `gmail.com` não deve ser usado como remetente autenticado.
2. No painel do Resend, crie uma API Key com permissão para enviar e-mails. Copie o valor uma única vez para uma variável privada; não o coloque em `VITE_*`, código-fonte ou no navegador.
3. No projeto correto da Vercel, abra **Settings → Environment Variables** e configure:

   | Variável | Valor | Onde obter / preencher |
   | --- | --- | --- |
   | `RESEND_API_KEY` | Sua chave secreta do Resend | Resend → API Keys. Marque-a como Sensitive/Secret se a opção estiver disponível. |
   | `RESEND_FROM_EMAIL` | Um endereço do domínio verificado, por exemplo `leads@seudominio.com` | Escolha um endereço do domínio Autofluxe validado no Resend. Não use o Gmail de destino como remetente. |
   | `PUBLIC_SITE_URL` | Origem pública HTTPS da landing, sem caminho, por exemplo `https://autofluxe.vercel.app` | Use o domínio que realmente publica esta versão. O canonical atual do `index.html` aponta para esse domínio; confirme o domínio associado ao projeto antes de configurar. |

   Aplique as variáveis ao ambiente **Production**. Para testar uma implantação Preview ou local, configure também o ambiente correspondente, usando uma URL pública válida para previews quando o e-mail precisar exibir a logo.
4. Salve as variáveis e faça um novo deploy. A URL absoluta da imagem no e-mail é formada pela `PUBLIC_SITE_URL` seguida de `/autofluxe-logo.jpeg`; o asset oficial está em `public/autofluxe-logo.jpeg`.

## Desenvolvimento local

Copie `.env.example` para `.env.local`, preencha os mesmos valores e execute `npx vercel dev` depois de vincular este checkout ao projeto Vercel correto. O servidor Vite isolado não executa `/api/contact`; por isso o formulário mostra a mensagem de fallback quando testado apenas com `npm run dev`.

Não compartilhe `.env.local`, chaves ou capturas que revelem seus valores. `.env*` (exceto este arquivo de exemplo) está ignorado pelo Git.

## Testar o envio

1. Confirme que o projeto Vercel está conectado ao repositório desta landing e que as três variáveis estão no ambiente de destino.
2. Faça um deploy novo e envie um contato de teste com dados que você controla.
3. Confirme o recebimento em `autofluxe.totens@gmail.com`; verifique também spam e o painel de logs do Resend/Vercel se a mensagem não chegar.
4. Responda pelo botão “Responder este lead” para confirmar que o `Reply-To` aponta para o e-mail usado no teste. O botão de WhatsApp só aparece para um número brasileiro com DDD validado.
5. Valide o HTML em Gmail e Outlook, e confira a versão `text/plain` no detalhe da mensagem. A função envia ambas no mesmo e-mail; o cliente escolhe a representação compatível.

Enquanto as credenciais e o domínio de remetente não forem configurados, a função responde com indisponibilidade e não simula sucesso. Nesse caso, o formulário oferece o endereço comercial como alternativa manual.

## Proteção contra abuso

A função já limita o corpo a 8 KB, valida os campos no servidor, escapa conteúdo no template, valida a origem, usa um honeypot e não registra o conteúdo do lead em logs. O limite por IP deve ser ativado na camada WAF da Vercel porque instâncias serverless não compartilham memória confiável para rate limiting. No projeto Vercel, configure uma regra de rate limit para `POST /api/contact`; um ponto inicial conservador é até 5 envios por IP por minuto, ajustando conforme o tráfego e os limites do plano disponível. Essa regra exige configuração no painel e não fica ativa apenas por este código.
