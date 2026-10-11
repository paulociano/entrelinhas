# Sprint: Experiências Literárias (2026-10-10)

## Objetivo e prioridades
Retenção 5/5 · Descoberta 4/5 · Inovação 5/5. Implementar um conjunto de experiências úteis sem obrigar login nem armazenar chaves no frontend.

## Critérios de aceite

### 1. Leitura por atmosfera
- [x] Exibir pelo menos seis atmosferas com rótulos legíveis no desktop e celular.
- [x] Selecionar atmosfera abre resultados pesquisáveis da Open Library.
- [x] Exibir claramente que a classificação é por assunto, não análise emocional verificada.

### 2. DNA literário
- [x] Construir afinidades com livros salvos, avaliados ou concluídos.
- [x] Mostrar temas e favoritos, sem inventar dados na biblioteca vazia.
- [x] Permitir pesquisar livros de um tema identificado.
- [ ] Validar relevância da afinidade com usuários reais; cálculo atual é heurístico.

### 3. Diário
- [x] Associar entradas a um livro existente, com data.
- [x] Permitir salvar, visualizar e excluir registros.
- [x] Persistir no localStorage do dispositivo.
- [ ] Sincronização entre dispositivos depende de backend futuro.

### 4. Retrospectiva anual
- [x] Permitir selecionar o ano.
- [x] Contar exclusivamente conclusões com datas registradas, sem atribuir datas antigas.
- [x] Mostrar contagem vazia honestamente quando não houver histórico.
- [ ] Total de páginas lidas precisa de registros de progresso; não estimar a partir de número de páginas de uma edição.

### 5. Companheiro literário
- [x] Fornecer sugestões locais para reflexão, claramente marcadas como não generativas.
- [x] Não expor segredos ou enviar notas privadas a terceiros.
- [ ] IA generativa real depende de backend seguro, fonte de conteúdo autorizada, proteções contra spoilers e consentimento.

## Qualidade e verificação
- Verificar instalação, compilação TypeScript e geração de dist no GitHub Actions.
- Conferir manualmente no navegador: fluxo de pesquisa, navegação móvel, salvar diário, excluir diário, estante vazia, retrospectiva e sem rede.
- Respeitar reduced motion e estados de foco.
- Não tratar a execução de CI como substituta do QA manual.

## Métricas candidatas
Adoção do laboratório, conversão de atmosfera→livro salvo, registros de diário por leitor ativo e retorno em sete dias. Coletar apenas com instrumentação consentida.

## Não objetivos
Integração não oficial com Skoob/Goodreads, resumos de livros protegidos, sincronização remota ou IA generativa simulada.

## Continuação: Diário de Leitura 2.0
- [x] Edição de um registro existente sem perder data e identificador.
- [x] Filtro por livro e ordenação cronológica reversível.
- [x] Exportação JSON dos registros pessoais.
- [x] Importação JSON validada (até 2 MB / 5.000 registros), sem sobrescrever IDs existentes.
- [x] Confirmação antes de excluir registros.
- [ ] Testes automatizados de interface, importação e backup ainda devem ser adicionados.
- [ ] Sincronização entre navegadores permanece fora do escopo.

## DNA Literário 2.0: critérios de aceite
- [x] Recuperar preferências do navegador e permitir selecionar: favoritos, concluídos ou toda a estante.
- [x] Usar assuntos bibliográficos dos livros locais como sinal de afinidade, sem transmissão das avaliações.
- [x] Buscar candidatos reais na Open Library e omitir os livros já salvos.
- [x] Mostrar justificativa de cada recomendação baseada na coincidência de assunto quando disponível.
- [x] Permitir remover e restaurar assuntos do cálculo.
- [x] Mostrar estados de carregamento, erro e falta de dados, com interface responsiva.
- [ ] Validar pertinência editorial das recomendações e precisão dos assuntos com leitores reais.
- [ ] Testes automatizados de UI, integração e performance permanecem pendentes.
- [ ] Recomendações são heurísticas, não usam inteligência artificial generativa.

## Continuação: qualidade do catálogo e navegação (2026-10-10)
- [x] Preservar até doze assuntos por obra para enriquecer afinidades literárias.
- [x] Filtrar resultados de busca para chaves válidas de obras (`/works/`).
- [x] Repetir buscas com erro mesmo quando o texto não mudou.
- [x] Mostrar erro sem exibir resultados desatualizados.
- [x] Navegação móvel: botão com `aria-controls`, estado `aria-expanded` e fechar com Escape.
- [ ] Executar testes manuais reais em navegador desktop e mobile; CI de build não substitui esses testes.

## E2E de jornadas principais
- [x] Playwright/Chromium configurado sobre a build de produção do Vite.
- [x] Cenário de busca, adição à estante, registro e persistência do progresso.
- [x] Cenário de diário: adicionar, editar e exportar anotação.
- [x] Cenário de navegação móvel e fechamento do menu por Escape.
- [x] Mock de respostas da Open Library para execução reproduzível e sem tráfego real.
- [ ] Confirmar a primeira execução do workflow Browser journeys em GitHub Actions.
- [ ] QA manual em dispositivos reais e testes de acessibilidade mais abrangentes.
