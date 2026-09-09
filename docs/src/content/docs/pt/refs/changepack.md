---
title: CHANGEPACK.md
description: >-
  O único arquivo que é do projeto, e o que toda rota lê de volta dele.
sidebar:
  order: 2
---

O único arquivo que é do projeto. Todo o resto que o changepack instala é
substituído por inteiro num update, então tudo o que você decide sobre como as
changes funcionam aqui mora nesse arquivo, na raiz do repositório.

Toda rota lê ele antes de qualquer outra coisa.

```markdown
# Changepack

Como as mudanças funcionam neste repositório.

- **changepack:** 1.0.0
- **changes:** changes/
- **normative:** `CLAUDE.md`, `AGENTS.md`, `.claude/`
- **language:** Português. Tudo o que o changepack escreve aqui segue isso; o
  que ele fala com você segue a sua mensagem.
```

## Os nove campos

| Campo | Aceita | A ausência quer dizer |
|---|---|---|
| `changepack` | a versão que este projeto roda | é carimbada pela skill que está rodando |
| `changes` | um caminho, dentro deste repositório ou fora dele | `changes/` |
| `normative` | os documentos a que uma mudança posterior é cobrada, ou nenhum | `CLAUDE.md`, `AGENTS.md`, `.claude/` |
| `language` | o idioma do que for escrito no repositório | inglês |
| `version` | onde mora a versão do próprio projeto | nenhuma, e uma change não registra versão de saída |
| `validate` | um comando, ou nenhum | sem comando: as rotas relatam isso e seguem |
| `commit` | a convenção, `ask first`, e `co-author` onde o projeto precisa declarar | convencional, sem perguntar, e sem co-autor agente |
| `protect` | caminhos que ninguém pode escrever | nada é protegido |
| `updates` | `ask at closure`, `hold <versão>`, `off` | `ask at closure` |

As chaves dos campos continuam em inglês mesmo onde o arquivo é escrito em
outro idioma. São elas que a skill lê de volta.

## O que dá direito ao `normative:`

Um documento ganha o campo quando algo é cobrado por ele e ele tem unidades com
nome que você consegue nomear antes e achar depois: as specs de comportamento,
o `CLAUDE.md`, o `AGENTS.md`, o que está dentro de `.claude/`. Um arquivo
gerado não tem nenhum dos dois. Um README falha no primeiro teste, então
divergência ali é bug de documentação e não um compromisso quebrado.

Uma mudança que altera um desses carrega um
[spec-delta.md](/changepack/pt/refs/spec-delta/). Onde o campo diz que não há
nenhum, nenhuma mudança carrega.

## Os que se leem torto

O `language:` manda no que é escrito no repositório: os arquivos da change,
seus slugs, esse arquivo, as mensagens de commit. O que é falado com você segue
o idioma da sua mensagem, então os dois são independentes e quase sempre
diferem. Código segue as convenções em volta dele e não esse campo.

O `validate:` aceita um comando, e um projeto sem nenhum é comum, não
incompleto. Todo ponto de commit passa a relatar que nenhum comando rodou e
segue em frente.

O `protect:` é para caminhos que ninguém pode escrever: dado real de usuário,
segredo, saída gerada, um checkout vizinho. Neste repositório ele nomeia a
cópia da skill que o Claude Code carrega, escrita pelo `bin/install.mjs` e por
mais ninguém.

O `updates:` registra uma decisão, e não uma data. Recusar uma vez segura
aquela versão e volta a perguntar quando sair algo mais novo; `off` encerra o
check de vez, e a chamada de rede junto.

## House rules

Uma seção embaixo da lista, para qualquer coisa que uma mudança aqui tem que
respeitar e que os campos não dizem. Ela é apagada quando não existe nada.

## Quem escreve

A [init](/changepack/pt/refs/#init) escreve na primeira rodada, diz de onde
veio cada valor, marca o que ela chutou, e espera: os valores são seus para
aprovar, e o commit não toca em mais nada.

Depois disso, só o [update](/changepack/pt/refs/#update) carimba o
`changepack:` quando uma versão nova entra, e a linha do `updates:` quando você
recusa uma.
Um agente implementando um grupo de tasks nunca escreve esse arquivo.
