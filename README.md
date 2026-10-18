# Desafio Técnico - Desenvolvedor Júnior

## Tecnologias utilizadas

Durante o desenvolvimento do projeto, utilizei as seguintes tecnologias e ferramentas:

### Back-end
- **C#** — Linguagem utilizada para desenvolver a API.
- **.NET 8 / ASP.NET Core Web API** — Framework utilizado para estruturar a API e disponibilizar os endpoints.
- **JSON** — Arquivo utilizado como fonte de dados dos professores, carregados em memória durante a inicialização da API.

### Front-end
- **React** — Biblioteca utilizada para desenvolver a interface.
- **TypeScript** — Linguagem utilizada para organizar e tipar o código.
- **Vite** — Ferramenta utilizada para criar e executar o projeto front-end.
- **CSS** — Utilizado para estilização das páginas e componentes.
- **Axios** — Biblioteca utilizada para realizar as requisições HTTP.
- **TanStack React Query** — Utilizado para gerenciar as requisições e seus estados.

### Testes
- **xUnit** — Framework utilizado para desenvolver e executar os testes automatizados.
- **Moq** — Biblioteca utilizada para simular dependências durante os testes unitários.
- **Postman** — Ferramenta utilizada para testar manualmente os endpoints da API.

### Ferramentas
- **Visual Studio Code** — Editor utilizado durante o desenvolvimento.
- **Git** — Utilizado para versionamento do código.
- **GitHub** — Plataforma utilizada para armazenar o repositório e organizar as tarefas do projeto.


## Estruturação inicial

Para o desenvolvimento deste projeto, comecei analisando as tecnologias que seriam utilizadas, principalmente C# e .NET 8. Busquei entender a melhor forma de iniciar o projeto e como organizar sua estrutura.

Após finalizar esse estudo inicial, preparei algumas tarefas para orientar o desenvolvimento e organizar o versionamento do código.

Comecei pelo desenvolvimento da API. Depois de finalizá-la, passei para o front-end e, por último, preparei os testes automatizados.

## Desenvolvimento da API

No desenvolvimento da API, optei por estruturar o código seguindo o padrão MVC, de acordo com meus conhecimentos atuais.

Organizei as pastas do projeto e preparei os DTOs, Services, Interfaces, Repositories e Controllers.

Com base no arquivo **`professores.json`**, busquei identificar a melhor forma de armazenar os dados. Após algumas pesquisas, concluí que, para este desafio, a melhor opção seria manter os dados localmente, em memória.

## Persistência dos dados localmente

Para trabalhar com os dados do JSON, implementei uma inicialização que acontece sempre que a API é iniciada.

Configurei esse processo no `Program.cs`, onde o sistema realiza a leitura do arquivo JSON, mapeia os dados e os carrega em memória para serem utilizados durante a execução da aplicação.

## Lógica da busca de professores

Comecei analisando o que seria necessário para garantir os retornos esperados pela tarefa.

Primeiro, estruturei o código e implementei as validações dos filtros recebidos na requisição. Depois, comecei a desenvolver a lógica responsável por identificar os professores elegíveis e não elegíveis.

As decisões mais simples foram desenvolvidas manualmente, com base nos meus conhecimentos. Conforme surgiram dificuldades e problemas mais específicos, utilizei o auxílio de IA para entender melhor algumas situações e identificar possíveis ajustes na lógica.

## Testes manuais da API

Após finalizar a lógica inicial, configurei o Controller e defini a rota responsável pela busca de professores.

Em seguida, utilizei o Postman para realizar os primeiros testes da API.

Durante os testes, encontrei alguns problemas que fui corrigindo com base nos meus conhecimentos e com o auxílio de IA.

Para identificar os erros, utilizei principalmente depuração manual e mensagens no console, acompanhando o fluxo de execução para entender em qual etapa os problemas estavam acontecendo.

## Desenvolvimento do front-end

O desenvolvimento do front-end foi simples e direto. Desde o início, procurei organizar o projeto de uma forma que permitisse futuras atualizações, como a criação de novas páginas e a implementação de rotas públicas e privadas.

Comecei criando o projeto com **React e TypeScript** e organizando as pastas que seriam utilizadas, como `components`, `pages`, `routes`, `services`, `providers`, entre outras.

Depois, criei um arquivo de tema (`theme.css`) para centralizar os estilos do projeto. A ideia foi manter uma padronização visual que pudesse ser reutilizada em novas telas e componentes, além de servir como referência durante o desenvolvimento.

Com a estrutura inicial finalizada, desenvolvi as rotas, o fluxo de consulta e, em seguida, a página de busca de professores.

Após implementar a página e a estrutura inicial de Hooks e Services, comecei a integração com a API. Durante essa etapa, precisei configurar o CORS no back-end para permitir a comunicação com o front-end.

Com a comunicação funcionando, voltei para a página de busca e comecei a separar os elementos em componentes reutilizáveis.

Procurei desenvolver componentes que pudessem ser utilizados em diferentes partes do projeto, e não apenas na página de busca. Dessa forma, criei componentes como botões, selects e inputs, buscando manter um padrão visual e facilitar futuras alterações.

Por fim, refatorei a comunicação com a API, configurei o **TanStack React Query** e passei a organizar as requisições por meio de Hooks e Services.

## Testes automatizados

Para implementar os testes automatizados, comecei estudando as principais formas de realizar testes em C# com .NET.

Após essa análise, optei por utilizar **xUnit e Moq**, permitindo testar as regras de negócio sem precisar iniciar a API.

Preparei os testes para validar diferentes situações da busca de professores, incluindo validações dos filtros e motivos de inelegibilidade.

Durante a implementação, executei os testes, identifiquei os ajustes necessários e fui corrigindo os problemas encontrados até concluir essa etapa.

## Tarefas preparadas antes do desenvolvimento

Para organizar melhor o desenvolvimento e o versionamento do código, defini algumas tarefas antes de iniciar a implementação.

### #1 - Estruturar back-end

Criar o projeto back-end em C# com .NET 8 e organizar sua estrutura inicial, incluindo pastas como Controllers, Services, Interfaces, Repositories, entre outras.

### #2 - Permitir a busca de disponibilidade de professores

O sistema deve permitir que os alunos busquem professores disponíveis de acordo com suas necessidades.

O aluno poderá informar o idioma desejado, os dias da semana, a faixa de horário e a duração da aula para encontrar professores compatíveis com esses filtros.

### #3 - Estruturar front-end com React e TypeScript

Criar o projeto front-end utilizando React e TypeScript, organizando as pastas como Components, Pages, Features, Constants, Routes, Services, entre outras.

Também preparar a estrutura inicial de estilos e o tema visual do projeto.

### #4 - Efetuar conexão com a API

Estruturar a comunicação do front-end com a API utilizando Axios.

Configurar a URL da API por meio de variáveis de ambiente, utilizando um arquivo `.env` para o ambiente local.

### #5 - Estruturar página de busca de professores

Desenvolver a página responsável pela busca de professores.

O aluno deverá conseguir preencher e alterar os filtros disponíveis, realizando consultas de acordo com suas necessidades.

### #6 - Configurar TanStack React Query

Instalar e configurar o TanStack React Query para gerenciar as requisições realizadas pelo front-end.

Organizar as consultas por meio de Hooks, mantendo a comunicação com a API separada dos componentes visuais.