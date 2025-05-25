# Sensor de Estacionamento de Moto com ESP32, MQTT, Wokwi e Dashboard Node-RED

## Descrição do Problema

Em estacionamentos de motos, é comum a dificuldade de identificar rapidamente vagas livres e ocupadas. Este projeto propõe uma solução IoT para monitoramento em tempo real, facilitando a gestão e o uso eficiente das vagas.

## Solução Proposta

O sistema utiliza um ESP32 simulado no Wokwi, equipado com um sensor ultrassônico (HC-SR04) para detectar a presença de uma moto. Os dados são enviados via MQTT para um dashboard Node-RED, que exibe a distância e o status da vaga em tempo real.

## Funcionalidades

- **Conexão Wi-Fi**: O ESP32 conecta-se automaticamente à rede Wi-Fi simulada.
- **Sensor Ultrassônico**: Mede a distância até a moto para determinar se a vaga está ocupada (< 20cm) ou livre (>= 20cm).
- **Comunicação MQTT**: Publica o status da vaga e a distância medida em tópicos MQTT.
- **Dashboard Node-RED**: Visualização em tempo real dos dados, com gauge, gráfico e status textual.
- **Simulação no Wokwi**: Teste completo sem necessidade de hardware físico.

## Tecnologias Utilizadas

- ESP32 (simulado no Wokwi)
- Sensor HC-SR04
- MQTT (broker público HiveMQ)
- Node-RED (dashboard)

## Pré-requisitos

- Conta no Wokwi
- Node.js e Node-RED instalados
- Broker MQTT público (ex: HiveMQ)

## Instalação e Execução

### 1. Simule no Wokwi
- Importe o código `main.cpp` para o Wokwi.
- Importe o código `diagram.json` disponível no repositório diretamente no Wokwi para montar o circuito automaticamente, ou siga a imagem abaixo para montar manualmente:

<img src="./img/circuito-wokwi.png" alt="Circuito Wokwi" width="300"/>

**Componentes utilizados:**
- **ESP32:** Microcontrolador com Wi-Fi integrado, ideal para projetos IoT.
- **Sensor Ultrassônico HC-SR04:** Mede a distância até um objeto usando pulsos de ultrassom, permitindo detectar a presença de uma moto na vaga.

**Conexões:**
- **VCC (vermelho):** Alimentação 3V3 do ESP32 para o HC-SR04.
- **GND (preto):** Terra do ESP32 para o HC-SR04.
- **TRIG (amarelo):** GPIO 5 do ESP32 para o pino TRIG do HC-SR04 (envia o pulso).
- **ECHO (verde):** GPIO 18 do ESP32 para o pino ECHO do HC-SR04 (recebe o pulso refletido).

O ESP32 envia um pulso pelo pino TRIG, o HC-SR04 responde com um pulso no pino ECHO proporcional à distância do objeto à frente do sensor. O código interpreta esse tempo para calcular a distância e publica o resultado via MQTT.

**Atenção:**
- No Wokwi, é necessário instalar a biblioteca PubSubClient nas Project Libraries do projeto para que a simulação funcione corretamente.
- Como instalar:
1. No Wokwi, clique em Libraries (ícone de livro na barra lateral).
2. Pesquise por PubSubClient.
3. Clique em Install ao lado da biblioteca oficial.

### 2. Configure o Node-RED e o Dashboard
- **Instale o Node-RED Dashboard:**
  1. No Node-RED, clique no menu (três linhas no canto superior direito) > **Manage palette**.
  2. Vá até a aba **Install**.
  3. Pesquise por `node-red-dashboard` e clique em **Install**.
- Importe o fluxo do dashboard:
  1. No Node-RED, clique em Menu > Import.
  2. Cole o conteúdo do arquivo `dashboard.json` deste repositório.
  3. Clique em Import e depois em Deploy.
- Configure o broker MQTT como `broker.hivemq.com`, porta `1883`.
- Rode o node-red no terminal:
 ```sh
node-red
```
- Acesse o dashboard em [http://localhost:1880/ui](http://localhost:1880/ui).

### 3. Teste o sistema
- Movimente o objeto no Wokwi para simular a presença/ausência da moto.
- Veja o status e a distância mudando no dashboard em tempo real.

## Tópicos MQTT utilizados

- **Status da vaga:** `fiap/iot/vaga/status`
- **Distância:** `fiap/iot/vaga/distancia`

## Prints

## Fluxo Node-RED:
<img src="./img/fluxo-node-red.png" alt="Fluxo Node-RED" width="500"/>

## Dashboard Node-RED:
<img src="./img/dashboard.png" alt="Dashboard Node-RED" width="800"/>

## Vídeo

[Link para o vídeo no YouTube (não listado)](COLE_O_LINK_AQUI)
