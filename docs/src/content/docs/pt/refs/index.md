---
title: SKILL.md
description: >-
  O único arquivo sempre no contexto: o arquivo do projeto, o portão, e o
  trabalho direto.
sidebar:
  order: 1
---

O único arquivo que está sempre carregado. Ele lê o arquivo do projeto,
classifica o trabalho, e carrega o trabalho direto em si. Todo o resto é uma
referência, carregada quando a rota é tomada.

## Ler o arquivo do projeto primeiro

O `CHANGEPACK.md`, na raiz do repositório. É ele que define o caminho das
mudanças, os documentos a que uma mudança posterior é cobrada, o idioma do que
for escrito, o comando de validação e os caminhos que ninguém pode escrever.

Onde ele não existe, a rota é a [init](/changepack/pt/refs/init/), e nada é
planejado nem implementado no mesmo turno. Onde a versão que ele registra está
atrás da skill que está rodando, isso é dito em uma linha antes de qualquer
outra coisa.

## Classificar antes de editar

| O trabalho | Rota |
|---|---|
| Cabe em uma passada coerente, sem decisão pendente no caminho | Trabalho direto, abaixo |
| Maior, ambíguo, faseado, migratório, ou cruzando contextos | [plan](/changepack/pt/refs/plan/) |
| Rodar um pacote grupo a grupo, despachando cada um | [run](/changepack/pt/refs/run/) |
| Implementar um grupo você mesmo | [work](/changepack/pt/refs/work/) |
| Olhar sem mudar | [review](/changepack/pt/refs/review/) |
| Toda task marcada e validada | [close](/changepack/pt/refs/close/) |
| Atualizar a própria skill | [update](/changepack/pt/refs/update/) |
| Explicar ou mudar o arquivo do projeto | [init](/changepack/pt/refs/init/) |

Um pacote não é aberto porque o trabalho mexe em comportamento. Ele é aberto
porque uma passada só não dá conta. O trabalho direto que esbarra numa decisão
não aprovada para onde está e vai para a plan.

Abrir um é confirmado antes, com uma pergunta que oferece o pacote e a passada
direta, e nada é escrito até a resposta chegar. A pergunta só é pulada quando
você pediu um pacote com todas as letras.

## Trabalho direto

1. Nomear o comportamento pretendido antes de editar.
2. Em uma passada, mudar a implementação, seus consumidores, seus testes, e
   qualquer documento normativo que a mudança altere.
3. Não deixar documento na frente do código que o implementa.
4. Carregar a [commit](/changepack/pt/refs/commit/) para terminar.

## Sempre

- O trabalho que não é seu é preservado. Um arquivo sujo que ninguém tocou
  nunca é resetado, restaurado, desmarcado nem reformatado, e um arquivo
  compartilhado é relido imediatamente antes de ser alterado.
- A implementação para antes de uma decisão sobre domínio, schema,
  persistência, compatibilidade, autorização ou comportamento observável. As
  alternativas e suas consequências vão para você, a resposta é registrada, e
  então ela segue.
- O que é escrito no repositório segue o idioma que o `CHANGEPACK.md` registra.
  O que é dito a você segue o idioma da sua mensagem. Os dois são independentes
  e quase sempre diferem.
- Todo ponto de commit comita sem perguntar: o pacote quando abre, cada grupo
  de tasks quando aterrissa, a ida para o arquivo no fechamento.
- Um caminho protegido nunca é escrito.
