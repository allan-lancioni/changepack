---
title: tasks.md
description: >-
  Os grupos, sua ordem, e o que prova cada item.
sidebar:
  order: 4
---

O trabalho, cortado em grupos. Ele é escrito quando a change abre e editado
conforme cada grupo aterrissa, o que faz dele o único dos três arquivos que se
mexe enquanto o trabalho corre.

## O frontmatter

O `groups:` é quantos grupos vêm abaixo. O `order:` é a ordem em que eles
rodam, com uma lista aninhada onde podem rodar em paralelo. O `blocked:` nomeia
os grupos que uma decisão em aberto segura, e é omitido quando nada está
travado.

```yaml
groups: 5
order: [1, 2, [3, 4], 5]
blocked: [1]
```

## Um grupo

Um resultado verificável, e uma validação que o prova. Os grupos são ordenados
por dependência, uma migração contra dado real de usuário é um grupo só dela ou
fica fora do escopo, e o último é limpeza e fechamento.

```markdown
## 2. A home lê bem

Status: completed

- [x] Escrever o `docs/src/content/docs/en/index.mdx` inteiro: o hero, o portão
      citado sozinho, o comando de instalação, e quatro cards.
- [ ] Escrever o gêmeo `pt` com as mesmas seções. É uma adaptação e não uma
      tradução: mesmo argumento, mesmo tamanho.

Validation:

- As duas homes renderizam as seções na ordem que o `change.md` dá.
- O `npm run lint` passa nos dois arquivos.
```

Um item é uma edição concreta que nomeia o arquivo que ela toca. Nenhum item
repete o procedimento: que um grupo é comitado, validado ou relatado é verdade
de todo grupo e não pertence a task nenhuma.

## Quem escreve, e quando

O `Status:` anda em `not started`, `in progress`, `completed`. Um grupo que
espera uma decisão diz isso ali e no `blocked:`.

O estado do item é só o checkbox, e ele é marcado no instante em que a
implementação e a validação daquele item passam. Não no commit, e não no fim do
grupo. Uma task nunca fica marcada com o trabalho dela incompleto, então uma
parada no meio de uma task deixa aquela task desmarcada.

Os agentes que implementam os grupos não escrevem nos arquivos de `changes/`.
Eles mudam o código e relatam; quem marca é a conversa que conduz, seja ela a
run despachando um agente por grupo, seja a sessão em que você mesmo está.
