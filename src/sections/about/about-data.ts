export interface AboutData {
  name: string;
  city: string;
  role: string;
  paragraphs: string[];
}

export const aboutData: AboutData = {
  name: 'Paola Oliveira',
  city: 'Curitiba',
  role: 'Designer de Interface',
  paragraphs: [
    'Olá! Me chamo {name}, natural de {city}, sou {role} com experiência em criação e manutenção de layouts para produtos digitais, focando em proporcionar uma experiência do usuário intuitiva e envolvente. Capacidade de otimização de usabilidade, colaboração com equipes de desenvolvimento e manutenção de Design Systems, garantindo consistência visual em todos os produtos.',
    'Capacidade de otimização de usabilidade, colaboração com equipes de desenvolvimento e manutenção de Design Systems, garantindo consistência visual em todos os produtos.',
  ],
};
