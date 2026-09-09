---
title: As rotas
description: >-
  Oito arquivos, dos quais um é carregado por vez, e o que escolhe entre eles.
sidebar:
  order: 1
---

O `SKILL.md` está sempre no contexto. Ele guarda o portão, a tabela que
classifica o trabalho, e o trabalho direto em si. Tudo o que obriga mais que um
parágrafo mora em um de oito arquivos dentro de `references/`, e cada turno
carrega o que precisa.

Antes de qualquer um deles, o agente lê o `CHANGEPACK.md`. É esse arquivo que
define o caminho das mudanças, os documentos a que uma mudança posterior é
cobrada, o idioma, o comando de validação e os caminhos que ninguém pode
escrever. Onde ele não existe, a única rota disponível é a
[init](/changepack/pt/routes/init/).

## O que escolhe a rota

| O trabalho | Rota |
|---|---|
| Cabe em uma passada coerente, sem decisão pendente no caminho | Trabalho direto, no `SKILL.md` |
| Maior, ambíguo, faseado, migratório, ou cruzando contextos | [plan](/changepack/pt/routes/plan/) |
| Rodar um pacote grupo a grupo, despachando cada um | [run](/changepack/pt/routes/run/) |
| Implementar um grupo você mesmo | [work](/changepack/pt/routes/work/) |
| Olhar sem mudar | [review](/changepack/pt/routes/review/) |
| Toda task marcada e validada | [close](/changepack/pt/routes/close/) |
| Atualizar a própria skill | [update](/changepack/pt/routes/update/) |
| Explicar ou mudar o arquivo do projeto | [init](/changepack/pt/routes/init/) |

O portão não lê o assunto do trabalho. Mexer em comportamento não é o que abre
um pacote; uma passada só não dar conta é. O trabalho direto que esbarra numa
decisão que ninguém aprovou para onde está e vai para a plan.

## Onde cada uma para

Uma rota é escrita para terminar em algum lugar, e onde ela termina é a maior
parte do que ela diz.

| Rota | Escreve | Para |
|---|---|---|
| init | o `CHANGEPACK.md`, e o diretório das mudanças | antes de planejar ou implementar qualquer coisa |
| plan | o pacote | antes de uma linha de implementação |
| run | o `tasks.md`, o `change.md`, e um commit por grupo | num grupo travado, numa validação que falhou, ou num diff fora do escopo |
| work | a implementação, e o `tasks.md` | no fim de um grupo, ou numa decisão em aberto |
| review | nada | ela não muda nada, nem o que está obviamente quebrado |
| close | o resultado, e a ida para o arquivo | depois do commit de arquivamento |
| commit | o commit | depois de relatar o hash e o que ficou no tree |
| update | o diretório da skill, e uma linha do `CHANGEPACK.md` | antes de tocar em qualquer outra coisa no tree |

## Toda rota que mudou um arquivo termina no commit

A [commit](/changepack/pt/routes/commit/) não é escolhida na tabela acima. Ela
é carregada no fim de qualquer rota que escreveu algo, e é o único lugar que
valida, relata e comita. Três momentos comitam, e cada um comita sozinho: o
pacote quando abre, um grupo de tasks quando aterrissa, a ida para o arquivo no
fechamento.

## Um arquivo por vez

As rotas estão em arquivos separados porque um turno paga pelo que carregou. O
portão custa uma página. Uma rota custa uma página. Um pacote rodando custa uma
página, seus próprios arquivos, e quatro linhas de volta a cada grupo.

Cada arquivo tem um teto de caracteres, segurado por um check em todo commit,
então o orçamento é um fato do repositório e não uma intenção.
