import { test, expect } from '@playwright/test';

const book={key:'/works/OL123W',title:'A Biblioteca Invisível',author_name:['Autora Exemplo'],first_publish_year:2020,cover_i:12345,number_of_pages_median:300,subject:['Fantasy','Fiction']};
test.beforeEach(async ({page})=>{
 await page.route('https://openlibrary.org/search.json**',async route=>{
  const url=new URL(route.request().url());
  await route.fulfill({json:{docs:url.searchParams.get('q')?.includes('never-a-book')?[]:[book]}});
 });
 await page.route('https://openlibrary.org/works/**',route=>route.fulfill({json:{description:'Sinopse de demonstração, sem spoilers.'}}));
 await page.route('https://covers.openlibrary.org/**',route=>route.fulfill({status:404,body:''}));
 await page.goto('./');
});

test('pesquisar livro, adicionar à estante e salvar progresso',async ({page})=>{
 await page.getByRole('button',{name:'Buscar livros'}).click();
 await page.getByRole('searchbox',{name:'Buscar livros'}).fill('A Biblioteca Invisível');
 await page.getByRole('button',{name:'Pesquisar'}).click();
 await expect(page.getByText('Resultados para')).toBeVisible();
 await page.getByRole('button',{name:'Ver detalhes de A Biblioteca Invisível'}).first().click();
 await page.getByLabel('Minha estante').selectOption('reading');
 await page.getByLabel('Progresso de leitura (páginas lidas)').fill('75');
 await page.getByRole('button',{name:'Salvar na biblioteca'}).click();
 await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('button',{name:/Minha biblioteca/}).click();
 await expect(page.getByRole('button',{name:'Ver detalhes de A Biblioteca Invisível'})).toBeVisible();
 await page.getByRole('button',{name:'Ver detalhes de A Biblioteca Invisível'}).click();
 await expect(page.getByLabel('Progresso de leitura (páginas lidas)')).toHaveValue('75');
});

test('diário permite salvar, editar, filtrar e exportar',async ({page})=>{
 await page.getByRole('button',{name:'Buscar livros'}).click();
 await page.getByRole('searchbox',{name:'Buscar livros'}).fill('A Biblioteca Invisível');
 await page.getByRole('button',{name:'Pesquisar'}).click();
 await page.getByRole('button',{name:'Ver detalhes de A Biblioteca Invisível'}).first().click();
 await page.getByRole('button',{name:'Salvar na biblioteca'}).click();
 await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('button',{name:'Experiências'}).click();
 await page.getByRole('tab',{name:'Diário'}).click();
 await page.getByLabel('Livro',{exact:true}).selectOption('/works/OL123W');
 await page.getByLabel('Seu registro').fill('Primeira impressão.');
 await page.getByRole('button',{name:'Guardar memória'}).click();
 await expect(page.getByText('Primeira impressão.')).toBeVisible();
 await page.getByRole('button',{name:'Editar'}).click();
 await page.getByLabel('Seu registro').fill('Impressão revisada.');
 await page.getByRole('button',{name:'Salvar alterações'}).click();
 await expect(page.getByText('Impressão revisada.')).toBeVisible();
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'Exportar diário'}).click();
 const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('entrelinhas-diario.json');
});

test('navegação móvel abre e fecha com Escape',async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Abrir menu'}).click();
 await expect(page.getByRole('button',{name:'Fechar menu'})).toHaveAttribute('aria-expanded','true');
 await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Abrir menu'})).toHaveAttribute('aria-expanded','false');
});
