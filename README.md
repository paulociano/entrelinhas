# Entrelinhas

Biblioteca pessoal com catálogo de livros, pesquisa na Open Library e estantes locais.

## Executar

Requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Descoberta editorial com coleções temáticas e pesquisa de livros/autores
- Detalhes e sinopses obtidos da Open Library
- Estantes: Quero ler, Lendo e Lido
- Avaliações e notas privadas armazenadas no navegador
- Interface acessível, responsiva e suporte a movimento reduzido
- Tratamento explícito de erros de rede e ausência de capas

## Fonte de dados

A aplicação utiliza a API pública [Open Library](https://openlibrary.org/developers/api) e as capas de [covers.openlibrary.org](https://openlibrary.org/dev/docs/api/covers). Não há integração oficial com Goodreads ou Skoob.

## Privacidade

Os dados pessoais ficam somente no localStorage deste navegador. Não há conta, backend ou sincronização entre dispositivos. Não envie informações sensíveis para o campo de notas.

## Identidade

Paleta verde-floresta, cobre e creme. SVGs da marca em `public/`.

## Implantação

Para hospedagem estática, usar comando `npm run build` e diretório de saída `dist`. Em Vercel/Netlify selecionar framework Vite. O projeto não depende de segredos no cliente.

## Verificação

O workflow `.github/workflows/ci.yml` executa `npm install` e `npm run build` em cada push/PR. A primeira execução no GitHub é a referência de sucesso do build.

## Sprint de experiências literárias

Atmosferas, DNA literário heurístico, diário de registros, retrospectiva anual e companheiro local de reflexão. Veja [critérios de aceite](docs/SPRINT-EXPERIENCIAS.md).
