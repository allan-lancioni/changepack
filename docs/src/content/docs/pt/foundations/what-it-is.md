---
title: O que é o changepack
description: >-
  Dois motivos para existir, a unidade que ele gerencia e as três coisas que
  ele se recusa a ser.
sidebar:
  order: 1
---

O changepack gerencia as mudanças no seu código que não cabem numa passada só.
Ele é markdown dentro do seu repositório e mais nada, e você nunca o invoca:
ele lê a conversa que você já está tendo e entra quando o trabalho justifica.

É isso inteiro. O resto desta página é por que ele é assim, e nada aqui prende
uma change. As regras moram nos documentos que o `normative:` nomeia. Isto aqui
é o raciocínio por trás do produto.

## Por que ele existe

Dois motivos, e eles são independentes um do outro.

**Os tokens estavam sendo devorados.** Uma sessão longa paga pelo histórico
inteiro a cada turno, então o custo de uma feature cresce com a conversa que a
produziu em vez de crescer com a feature. O changepack é pequeno porque ser
pequeno é o ponto, não porque está inacabado. A promessa que ele foi construído
para cumprir é que rodar uma change por ele custa menos do que implementar a
mesma coisa na mão. [O orçamento de contexto](/changepack/pt/foundations/context/)
é como essa promessa fica presa a um número em vez de a uma intenção.

**Ninguém deveria ter que aprender uma ferramenta para conseguir isso.** Todo
procedimento que melhora o jeito de trabalhar com um agente cobra adiantado, em
vocabulário, em comandos e em arquivos que você escreve antes de qualquer valor
chegar. Esse preço cai justamente sobre quem menos pode pagar, que é quem ainda
não usou. O changepack não cobra nada na porta.

Tudo abaixo decorre de um desses dois.

## Não há nada para aprender

Você não invoca o changepack. Você diz o que quer, com as palavras que usaria
de qualquer jeito, e ele decide se o trabalho cabe numa passada ou precisa de
uma change.

Isso funciona porque o gatilho é a palavra mais comum que existe em software.
Você ia dizer que queria mudar alguma coisa de todo modo, então nunca houve
termo para ensinar: o vocabulário já era seu. O que a skill acrescenta é um
julgamento em cima de uma palavra que você ia digitar de qualquer forma.

Duas coisas tornam isso barato. A descrição da skill fica em contexto a cada
turno, que é o que permite reconhecer o momento sem ser chamada, e ela tem
menos de quatrocentos caracteres, que é o que faz ficar ali não custar nada que
valha contar. O [SKILL.md](/changepack/pt/refs/) e as rotas só carregam depois
que a resposta é sim.

O julgamento em si não é a parte interessante. Qualquer ferramenta sabe não
rodar, e não ser invocada é o estado natural de toda skill que existe. A
diferença é que nada precisa invocar esta aqui. Você não é o roteador.

Também não existe onboarding. A skill é commitada, então o repositório a
entrega para todo mundo que clona e ninguém é treinado:
[o time roda um procedimento só](/changepack/pt/start/versioning/) e o adquiriu
clonando.

## Change driven, não spec primeiro

Spec driven development faz da especificação o artefato e do código uma saída
regenerável. Funciona, e cobra antes de pagar: adotar significa escrever specs
para um sistema que já existe, que é uma conta que chega antes de qualquer
valor.

O changepack parte do repositório. O baseline é o código como ele está, o
artefato é o delta, e a pergunta é só como sair daqui e chegar lá. É assim que
você já pensa sobre o seu próprio repositório, e é por isso que não há nada a
adotar.

A especificação não é recusada. Ela é conquistada. Uma change carrega um
[spec-delta.md](/changepack/pt/refs/spec-delta/) quando altera algo a que uma
change futura vai ser presa, e o fechamento dobra esse delta no documento a que
ele pertence. Um repositório que começa sem nada normativo acumula normativo
change a change, e só onde uma change pagou por aquilo. A especificação é o
resíduo, não a taxa de entrada.

E é também por isso que dá para confiar nela. Não existe aqui regra normativa
que não tenha sido dobrada por um fechamento que conferiu o comportamento que
ela descreve, então não há superfície acumulada esperando ser auditada contra o
código. Uma especificação escrita antes do comportamento nunca teve essa
conferência, e depois não sobra contra o que conferir: a intenção, o design e o
trabalho que a produziram já foram. O que o changepack herda é outra história.
Documento que já estava lá quando ele chegou é histórico, e nada o valida.

Então o changepack não é o oposto de uma ferramenta spec driven. Ele é a porta
de entrada que ferramenta spec driven não tem. Ditas como três posições:

- Spec primeiro pede a especificação antes do trabalho.
- O changepack não pede nada, e produz a especificação quando o trabalho fecha.
- Rodar os dois é coerente, porque o segundo alimenta o primeiro.

Nada disso foi inventado do zero. O OpenSpec foi a inspiração, e é por isso que
o formato é parecido: uma pasta por mudança, um delta, um arquivo datado. O que
mudou foi a porta de entrada, e o que caiu foi a cerimônia que não se pagava.

## Roda em cima de quase qualquer coisa

Todo campo do `CHANGEPACK.md` aponta para o seu projeto em vez de prescrever
um. O `validate:` recebe o comando que você já tem, ou nenhum. O `normative:`
aponta para os documentos a que você já é preso, ou nenhum. O `commit:` segue o
seu log em vez de definir convenção, o `version:` aponta para onde a sua versão
mora, e o `changes:` aceita um caminho fora do repositório.

É uma regra só usando cinco chapéus: o changepack exige que o trabalho seja
provado e se recusa a dizer como. Prescrever um método de teste, um modelo de
branch ou um formato de documento compraria rigor em um repositório e quebraria
todos os outros.

É por isso que o alcance é tão largo:

| Onde | Como aterrissa |
|---|---|
| Um monorepo brownfield | onde melhor se encaixa. Não há especificação retroativa para escrever, e o legado é o baseline em vez do obstáculo |
| Um projeto greenfield | funciona também, e funciona especialmente bem em cima de um framework, onde as primeiras changes são todas em cima de convenções que outra pessoa definiu |
| Qualquer ecossistema | nada entra nas suas dependências. Um projeto Python, Rust ou Go não ganha manifesto, nem lockfile, nem árvore instalada |
| Um repositório que é só prosa | uma especificação espalhada por quarenta arquivos que se referenciam é uma change como outra qualquer |
| O seu harness | a configuração do próprio agente, regida pelos mesmos três arquivos |
| Um repositório regido por outra ferramenta | as especificações dela são uma superfície normativa grande, e mudá-las é uma change como outra qualquer |

A última linha é a que vale dizer em voz alta. O changepack é feito para ser
usado no harness: o seu `AGENTS.md`, o seu diretório `.claude/`, as skills e os
prompts que você foi acumulando. Esses arquivos decidem como todo o resto é
construído, e costumam ser a coisa menos governada do repositório. Uma change
também é onde você pensa, e o agente escreve a especificação junto com você,
num documento que você aprova antes de qualquer parte dele virar normativa.

Este repositório é a prova. O changepack é planejado, rodado e fechado pelo
changepack.

## A unidade é a change

Uma change é uma pasta. Ela abre quando o trabalho começa, carrega
[três arquivos](/changepack/pt/refs/change/) enquanto roda, e vai para o
arquivo com a data quando o trabalho termina.

Change é o nome curto de change package. Não existe outra unidade escondida
atrás do nome comprido.

Ela existe por um motivo, que é o trabalho não caber numa passada coerente.
Isso é tamanho e complexidade, e nunca é sobre a importância do trabalho nem
sobre ele mexer em comportamento. O que cabe, aterrissa. O que não cabe abre
uma change. O que não cabe nem em uma change vira várias.

O que faz uma change valer a escrita é ela sobreviver a tudo em volta:

- Sobrevive à sessão, porque uma sessão nova a retoma lendo a pasta.
- Sobrevive ao agente, porque é markdown e se lê sem a skill que a produziu.
- Sobrevive ao trabalho, porque o arquivo é datado e nunca é podado.
- Carrega a própria proveniência. O frontmatter registra a versão que a
  planejou e quem a abriu, e todo commit que ela produziu
  [a nomeia num trailer](/changepack/pt/start/git/).

## O que ele não é

Três coisas com que ele é confundido. Nenhuma delas é omissão.

**Não é project management.** Não há responsável, nem estimativa, nem quadro de
status, nem sprint. Uma change registra o que precisa ser verdade e o que falta
fazer, e não diz nada sobre quem faz nem sobre quando. O arquivo também não é
backlog: um ticket morre quando fecha, e uma change é escrita para ser lida
depois de fechar.

**Não é workflow engine.** Nada roda. Nenhum CLI no seu repositório, nenhum
daemon, nenhum hook instalado na sua árvore, e nenhum estado em lugar nenhum
além do próprio repositório. Comandos que o agente roda são normais; maquinário
que roda sem agente não é. No momento em que o substrato vira runtime, ele
precisa ser instalado, e ser instalável é exatamente o que o changepack recusa.

**Não é a documentação do seu sistema.** O changepack não descreve o que o seu
software faz. Ele descreve o que uma change faz com ele, e a parte dessa
descrição que sobrevive à change é dobrada num documento que você já tinha. Um
repositório sem nada normativo é válido e continua válido, e um README nunca
ganha o `normative:`, então divergência ali é bug de documentação e não
promessa quebrada.

Cada uma dessas é decisão e não buraco, e estão escritas aqui para que uma
change futura que desfaça alguma tenha que discutir com esta página antes.
