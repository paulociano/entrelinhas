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
