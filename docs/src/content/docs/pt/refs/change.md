---
title: change.md
description: >-
  O contexto, o objetivo, o desenho do que muda, e o custo.
sidebar:
  order: 3
---

Por que a mudança existe, e o que vai ser verdade quando ela fechar. Ele é
escrito quando o pacote abre, lido antes de cada grupo, e terminado no
fechamento. É nele que mora o porquê, e é por isso que o corpo de um commit
nunca carrega nenhum: o porquê é do pacote, e o pacote fica arquivado.

## O frontmatter

| Chave | Guarda |
|---|---|
| `title` | o pacote, nomeado pelo resultado |
| `description` | uma linha, para que uma lista de pacotes arquivados se leia sem abrir nenhum |
| `changepack` | a versão que planejou |
| `opened` | o dia em que abriu |
| `opened-by` | a identidade git que assina o commit de abertura, nome e email |
| `issue` | de onde o trabalho veio, omitida quando não veio de lugar nenhum |
| `shipped` | a versão em que saiu, preenchida no fechamento |

Uma chave sem valor é omitida em vez de escrita vazia.

## As seções

| Seção | Guarda |
|---|---|
| Context | o que é verdade hoje, e por que isso é um problema |
| Goal | o comportamento que deve ser verdade no fechamento, escrito como contrato |
| Changes | o desenho do que se move |
| Open decisions | as perguntas no caminho, com alternativas e custos |
| Decided | o que o pacote resolveu, e o que a alternativa teria custado |
| Scope | no que ele mexe, e o que ficou de fora de propósito |
| Cost | o que continua funcionando, e o que um revert não desfaz |
| Success criteria | o que o fechamento consegue conferir olhando comportamento |
| Outcome | o que saiu, o que mudou no caminho, o que ficou |
| Surprises | uma linha por grupo cujo diff não bateu com o desenho |

O template é um piso. Uma seção entra porque o trabalho tem algo a dizer ali,
nunca para preencher a página.

## O desenho

Escrito por último e lido primeiro: entenda a mudança, depois desenhe. Desenhe
o que se move e nada do que não se move, e escolha a notação pelo que se move.

| O que se move | Notação |
|---|---|
| arquivos, módulos, pacotes | uma árvore, marcada `+` entrou, `-` saiu, `~` mudou |
| coleção, tabela, campo, estado | uma tabela do que cada um vira |
| rota, stream, ordem no tempo | uma sequência |
| serviço, deploy, roteamento | um fluxo |

A maioria das mudanças move duas dessas. A árvore e a tabela têm preferência
porque se leem no terminal, na forge e no editor do mesmo jeito, sem instalar
nada. Embaixo do desenho vai só a prosa que o desenho não carrega, que é por
que essa forma e não a outra.

Onde nada estrutural se move não existe desenho, e provavelmente não existe
pacote.

O desenho não é enfeite. Enquanto o pacote roda, o diff de cada grupo é lido
contra ele, e onde os dois discordam uma linha entra em Surprises.

## As decisões

Uma decisão em aberto é a pergunta em negrito, as alternativas e seus custos
numa tabela, e a recomendação em prosa embaixo. Ela diz que é bloqueante quando
nenhuma task começa sem a resposta, e os grupos que ela segura dizem o mesmo.

Uma decisão respondida vai para Decided e não é apagada. O pacote guarda o que
foi escolhido e o que a alternativa teria custado, que é o registro que ninguém
precisa reconstruir depois.

## No fechamento

O Outcome é escrito ali: o que saiu, o que mudou no caminho, e o que ficou para
depois. Um pacote que não vai sair diz isso no lugar, com o que foi construído
e abandonado, e o que precisaria ser verdade para o trabalho voltar.

O Surprises é apagado quando nada foi escrito embaixo dele. Onde existem
linhas, elas ficam como parte do registro.
