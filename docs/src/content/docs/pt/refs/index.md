---
title: A skill
description: >-
  O que é carregado em todo turno, e as oito referências que ele busca sob
  demanda.
sidebar:
  order: 1
---

O changepack é uma skill só. O `SKILL.md` está sempre no contexto; cada rota é
um arquivo dentro de `references/`, carregado só quando aquela rota é tomada.
Esta página é todas elas, curtas. Os arquivos é que são a fonte, e eles ficam
no seu repositório.

## SKILL.md

### Ler o arquivo do projeto primeiro

O `CHANGEPACK.md`, na raiz do repositório. É ele que define o caminho das
mudanças, os documentos a que uma mudança posterior é cobrada, o idioma do que
for escrito, o comando de validação e os caminhos que ninguém pode escrever.

Onde ele não existe, a rota é a [init](#init), e nada é planejado nem
implementado no mesmo turno. Onde a versão que ele registra está atrás da skill
que está rodando, isso é dito em uma linha antes de qualquer outra coisa.

### Classificar antes de editar

| O trabalho | Rota |
|---|---|
| Cabe em uma passada coerente, sem decisão pendente no caminho | Trabalho direto, abaixo |
| Maior, ambíguo, faseado, migratório, ou cruzando contextos | [plan](#plan) |
| Rodar um pacote grupo a grupo, despachando cada um | [run](#run) |
| Implementar um grupo você mesmo | [work](#work) |
| Olhar sem mudar | [review](#review) |
| Toda task marcada e validada | [close](#close) |
| Atualizar a própria skill | [update](#update) |
| Explicar ou mudar o arquivo do projeto | [init](#init) |

Um pacote não é aberto porque o trabalho mexe em comportamento. Ele é aberto
porque uma passada só não dá conta. O trabalho direto que esbarra numa decisão
não aprovada para onde está e vai para a plan.

Abrir um é confirmado antes, com uma pergunta que oferece o pacote e a passada
direta, e nada é escrito até a resposta chegar. A pergunta só é pulada quando
você pediu um pacote com todas as letras.

### Trabalho direto

1. Nomear o comportamento pretendido antes de editar.
2. Em uma passada, mudar a implementação, seus consumidores, seus testes, e
   qualquer documento normativo que a mudança altere.
3. Não deixar documento na frente do código que o implementa.
4. Carregar a [commit](#commit) para terminar.

### Sempre

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
- Todo ponto de commit comita sem perguntar.
- Um caminho protegido nunca é escrito.

## references/

Oito arquivos, um carregado por turno. Cada um diz quando é tomado, o que
escreve, e onde para.

### init

Tomada quando o `CHANGEPACK.md` não existe, e sempre que a própria configuração
é o assunto.

Ela lê o repositório e propõe um valor para cada campo, perguntando só sobre o
que não achou. Escreve o `CHANGEPACK.md` e o diretório das mudanças, diz de
onde veio cada valor, marca o que chutou, e espera: aquele arquivo é seu, então
nada é comitado antes de você aprovar.

Ela para ali. Nada de planejar nem de implementar no mesmo turno, mesmo que a
mesma mensagem tenha pedido os dois.

### plan

Tomada quando o trabalho não cabe em uma passada coerente.

Ela escreve `changes/active/<slug>/`: o `change.md` e o `tasks.md` sempre, e o
`spec-delta.md` quando a mudança altera algo a que uma mudança posterior é
cobrada. Toda decisão em aberto entra no `change.md` como alternativas, custos
e uma recomendação. Um pacote com decisão sem resposta não é aprovável, então
ou a resposta sai agora, ou fica escrita como bloqueio.

Ela para depois de comitar o pacote. Não implementa, e não pede para
implementar.

### run

Tomada para conduzir um pacote inteiro de uma conversa só. Ela despacha, ela
valida, ela comita. Ela nunca implementa.

Um agente novo por grupo, na ordem, nunca um reaproveitado. Cada um recebe o
arquivo do projeto e o pacote por inteiro, e responde em quatro linhas: os
arquivos que tocou, a validação e o resultado, no máximo duas frases para o
próximo grupo, e se está travado. A conversa que conduz roda a validação de
novo por conta própria, lê o diff contra o desenho do `change.md`, marca os
itens, e comita aquele grupo sozinho.

Ela para num grupo travado, numa validação que rodou e falhou, e num diff que
saiu do escopo do grupo. Nesses casos nada é marcado e nada é comitado.

### work

Tomada para implementar um grupo na mão, uma task por vez, na conversa em que
você já está.

Ela lê o pacote e a autoridade atual sobre o comportamento que vai mudar,
pergunta uma vez se é para parar a cada grupo, e marca um item no instante em
que a validação daquele item passa. Uma task nunca fica marcada com o trabalho
dela incompleto.

Ela para numa decisão que o pacote não aprovou, numa validação que falhou, no
fim de um grupo quando você pediu para parar, e quando não sobra grupo.

### review

Tomada para olhar sem mudar.

Ela resolve o comportamento pretendido, lê o diff inteiro no escopo, liga cada
regra à sua implementação, aos seus consumidores e aos seus testes, e procura o
que está faltando em vez do que está escrito: um consumidor que ninguém migrou,
uma referência velha, uma regra dita duas vezes, uma decisão tomada e não
registrada. Os achados voltam na ordem do impacto, bloqueante antes de risco
antes de limpeza, cada um com arquivo e linha.

Ela não muda nada, nem o que está obviamente quebrado.

### close

Tomada quando toda task está marcada e toda dependência está pronta.

Ela audita os critérios de sucesso contra o comportamento que existe, e não
contra as tasks que estão marcadas, dobra o delta nos documentos que ele nomeia,
varre o escopo atrás de rascunhos, andaimes e referências mortas, e roda a
validação do projeto. Depois registra o resultado no `change.md`, preenche a
versão em que aquilo saiu, encerra o relatório com os commits do próprio pacote,
e move a pasta para `changes/archive/<YYYY-MM-DD>-<slug>/`.

Um pacote que não vai sair é fechado do mesmo jeito, nunca deixado aberto.

Ela para depois do commit de arquivamento, que aterrissa sozinho.

### commit

Tomada no fim de toda rota que mudou um arquivo. Três momentos comitam, e cada
um comita sozinho: o pacote quando abre, um grupo de tasks quando aterrissa, a
ida para o arquivo no fechamento.

Um check se comporta de três jeitos e só um para a rodada: ele passa e é
relatado, ele falha e nada é comitado nem marcado, ou ele não existe e uma
linha diz isso. Um check que não rodou nunca é apresentado como um check que
passou.

O assunto diz o que é verdade agora, em 72 caracteres ou menos. O corpo é
opcional, nunca passa de 300 caracteres, e carrega o que passou a se comportar
diferente em vez do porquê: o porquê é do pacote. Os commits de um pacote levam
dois trailers, `Change:` e `Changepack:`, e o trabalho direto não leva nenhum.
Nenhum agente é creditado como co-autor, a não ser que o projeto precise
declarar isso.

### update

Tomada a partir de um fechamento, ou quando você pede com todas as letras.

O diretório da skill é substituído por inteiro, então um update é uma cópia e
nunca um merge. Ela apresenta as entradas que o check imprimiu e o que cada uma
custa, nomeia qualquer uma que peça edição na mão, e espera. Depois instala
aquela versão, carimba o `changepack:` no `CHANGEPACK.md`, e comita esses dois
caminhos sozinhos: o resto do tree não faz parte disso.

Recusar também fica registrado. Agora não segura a versão e volta a perguntar
quando sair algo mais novo; nunca desliga o check, e nenhuma chamada de rede
sobrevive a essa resposta.

Ela para onde existe pacote aberto, e diz que o update roda assim que aquele
pacote fechar.
