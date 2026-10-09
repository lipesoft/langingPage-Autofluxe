import { CONTACT_EMAIL } from "../siteConfig";

type ContactValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  units: string;
  challenge: string;
};

export function buildContactMailto(values: ContactValues) {
  const subject = `Solicitação de demonstração | ${values.company || values.name} | Autofluxe`;
  const body = [
    "Olá, equipe Autofluxe!",
    "",
    "Gostaria de solicitar uma demonstração do Autofluxe. Seguem meus dados:",
    "",
    `Nome: ${values.name}`,
    `Restaurante / empresa: ${values.company}`,
    `E-mail: ${values.email}`,
    ...(values.phone ? [`Telefone / WhatsApp: ${values.phone}`] : []),
    ...(values.units ? [`Quantidade aproximada de unidades: ${values.units}`] : []),
    ...(values.challenge ? [`Principal desafio da operação: ${values.challenge}`] : []),
    "",
    "Origem: Landing page Autofluxe",
    "",
    "Autofluxe | Seu restaurante. Um fluxo só.",
  ].join("\r\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
