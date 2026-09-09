---
title: spec-delta.md
description: >-
  As regras que uma mudança acrescenta, altera ou remove, dobradas no
  fechamento.
sidebar:
  order: 5
---

O terceiro arquivo de uma change, escrito só quando a mudança altera algo a que
uma mudança posterior vai ser cobrada. Ele guarda as regras que a mudança torna
verdadeiras, e guarda até o fechamento.

## O que dá direito a um

A pergunta é se alguém é cobrado por aquele documento, não se o projeto tem
specs de comportamento. Renomear um título não conta. Mudar o que uma regra
obriga conta.

Um documento se qualifica quando algo é cobrado por ele e ele tem unidades com
nome que você consegue nomear antes e achar depois: as specs de comportamento,
o `CLAUDE.md`, o `AGENTS.md`, o que está dentro de `.claude/`. Um README falha
no primeiro teste, então divergência ali é bug de documentação e não um
compromisso quebrado.

Onde nada normativo muda não existe delta, e o comportamento pretendido vai
para o `change.md`, embaixo de Goal.

## O formato

O frontmatter carrega o título e o `documents:`, um caminho por título abaixo e
na mesma ordem, para que uma change arquivada diga no que ela mexeu sem precisar
ser aberto.

Depois um título por documento, para que dobrar no fechamento seja um arquivo
por vez, e embaixo de cada um uma linha por regra: `+` acrescentada, `~`
alterada, `-` removida.

```markdown
## `skill/references/close.md`

- `+` **O fechamento comita sozinho**: a ida para o arquivo é um commit só
  dela, mesmo quando o último grupo de tasks aterrissou um instante antes.
- `~` **O check de update é um comando**: o fechamento roda o script e lê o
  que ele imprimiu.
- `-` **A rota resolve a tag**: nada entra no lugar. O script é o único lugar
  que diz como.
```

Cada linha é escrita como comportamento atual, nas palavras que o documento vai
carregar. O que ele vai dizer depois do fechamento, e não o que a mudança está
fazendo com ele.

## Onde ele aterrissa

Nada é escrito num documento normativo enquanto a change está aberta. O
comportamento proposto mora aqui, e o documento continua dizendo o que é
verdade hoje.

No fechamento o delta é dobrado, um título por vez, e o documento passa a
dizer o comportamento novo como atual. O delta fica na change, como o registro
do que virou normativo. Onde uma regra aterrissou diferente de como foi
declarada, a linha dela diz isso.
