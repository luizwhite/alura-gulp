# Projeto alura-gulp
Atualização do projeto de **Gulp** da Alura, para sua versão **[4.0.2]**.

## O que foi utilizado
- **NodeJS LTS** versão **[12.18.3]**
- **npm** como gerenciador de pacotes versão **[6.14.8]**

## Atualizações
- A primeira grande mudança da nova estrutura do **Gulp 4**, é que as *tasks* agora são funções (que retornam uma *stream*), as quais podem ser organizadas **sequencialmente** ou de modo **paralelo** ao chamá-las:
  * *`sequentialFunctionCall = series(task1, task2)`*
  * *`parallelFunctionCall = parallel(task1, task2)`*
- A segunda grande mudança é a utilização do *module pattern* na hora de exportar as *tasks*:
  * *`exports.default = build`* ou *`module.exports = { default: build }`*, em que *build* é a função ou *call* desejada para rodar com o comando padrão *gulp*
- Utilizado o *node module* [***del***](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md) para apagar arquivos e pastas, já que o gulp-clean foi descontinuado
- Optei por utilizar o pré-processador ***sass*** ou invés do *less*, com o *plugin* [***gulp-sass***](https://github.com/dlmanning/gulp-sass#readme)
  * precisa de um *compiler*, e optei por utilizar o ***node-sass***
- Separei o *build* do *css* em três partes, para poder realizar o *lint* quando há uma modificação nos estilos, antes do arquivo ser minificado, facilitando o diagnóstico:
  * ***compileCss*** - compilador *sass*
  * ***cssLint*** - *lint* do *css*
  * ***minifyCss*** - minificador *css*
  * o motivo de criar essas etapas era para efeito de compreender melhor o funcionamento dos *plugins*, mas acaba criando um segundo arquivo *css*, então é um ponto a ser considerado posteriormente para melhorar o projeto.
- Adicionei o *formatter* ***stylish*** para o relatório do *csslint* [(*csslint-stylish*)](https://github.com/SimenB/csslint-stylish#readme)
- Utilizado o *plugin* [***purgecss***](https://purgecss.com/plugins/gulp.html), responsável em remover conteúdo/seletores *css* não utilizados
- Optei por utilizar o [***gulp-eslint***](https://github.com/adametry/gulp-eslint#readme) ao invés do *jshint*
  * para isso foi necessário criar um arquivo de configuração e importá-lo na *stream* do *watcher* dos arquivos *js*
  * neste arquivo de configuração, nomeado *eslintconfig.js*, inserido na pasta `./src`, foi necessário incluir o *environment* ***jquery***
- Para meu ***gulp-autoprefixer*** versão **[7.0.1]** funcionar, foi obrigatório incluir em meu *package.json* um valor para *"browserslist"*:
  * `"browserslist": ["last 2 versions"]` - neste projeto foi escolhido atender às 2 últimas versões de navegadores
- As instâncias [*chokidar*](https://gulpjs.com/docs/en/getting-started/watching-files#using-the-watcher-instance) (dependência versão [2.0.0] instalada com o *gulp*) não carregam mais o argumento *path* direto e não um *event object* o qual precisamos acessar a propriedade *path* (*e.path*)
- O **`browserSync.init()`** tem um *shorthand* para definir o *server path*, que é `browserSync.init({ server: './src' })`.
- Optei por definir algumas *rules* do *csslint*, como o ***ids*** e o ***order-alphabetical***.
- *csslint* acusou outros *warnings*, provavelmente devido a sua versão **[1.0.1]** mais atualizada, entre elas [*box-model*](http://bit.ly/2CTDy9q-box-model), [*qualified-headings*](http://bit.ly/2QfXI0c-qualified-headings), [*text-indent*](http://bit.ly/3aMfdi5-text-indent), [*regex-selectors*](http://bit.ly/3j1fC3c-regex-selectors), [*fallback-colors*](http://bit.ly/3gjYCDt-fallback-colors) e [*unique-headings*](http://bit.ly/34sMQEN-unique-headings)
- o arquivo de manutenção de estilos é o *styles.scss*, o qual importa os demais *css* e/ou *scss*

## Tasks

***(em construção...)***
