#include <WiFi.h>
#include <PubSubClient.h>

// ========================
// Configurações de Wi-Fi
// ========================
const char *SSID = "Wokwi-GUEST";
const char *PASSWORD = "";

// ========================
// Configurações de MQTT
// ========================
const char *BROKER_MQTT = "broker.hivemq.com";
const int BROKER_PORT = 1883;
const char *ID_MQTT = "esp32_mqtt";
const char *TOPIC_STATUS_VAGA = "fiap/iot/vaga/status";
const char *TOPIC_DISTANCIA = "fiap/iot/vaga/distancia";

// ========================
// Definição dos pinos
// ========================
#define TRIG_PIN 5
#define ECHO_PIN 18
#define LED_VERDE 2
#define LED_VERMELHO 4

// ========================
// Inicialização de Wi-Fi e MQTT
// ========================
WiFiClient espClient;
PubSubClient client(espClient);

// ========================
// Conecta ao Wi-Fi
// ========================
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando-se à rede Wi-Fi ");
  Serial.println(SSID);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado com sucesso!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// ========================
// Reconecta ao broker MQTT, se necessário
// ========================
void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT... ");
    if (client.connect(ID_MQTT)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("Falha (rc=");
      Serial.print(client.state());
      Serial.println("). Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}

// ========================
// Faz leitura da distância com o sensor HC-SR04
// ========================
long readUltrasonicDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  long distance = duration * 0.034 / 2;
  return distance;
}

// ========================
// Setup inicial
// ========================
void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);

  setup_wifi();
  client.setServer(BROKER_MQTT, BROKER_PORT);
}

// ========================
// Loop principal
// ========================
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long distancia = readUltrasonicDistance();
  String statusVaga;

  // ========================
  // Lógica de ocupação realista da vaga
  // ========================
  if (distancia < 10) {
    statusVaga = "erro de sensor (muito perto)";
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
  } else if (distancia >= 10 && distancia < 20) {
    statusVaga = "ocupada";
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
  } else if (distancia >= 20 && distancia < 35) {
    statusVaga = "mal posicionada";
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_VERMELHO, HIGH);
  } else {
    statusVaga = "livre";
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_VERMELHO, LOW);
  }

  // ========================
  // Debug no Serial Monitor
  // ========================
  Serial.print("Distância: ");
  Serial.print(distancia);
  Serial.print(" cm | Status: ");
  Serial.println(statusVaga);

  // ========================
  // Envia dados via MQTT
  // ========================
  client.publish(TOPIC_DISTANCIA, String(distancia).c_str(), true);
  client.publish(TOPIC_STATUS_VAGA, statusVaga.c_str(), true);

  delay(5000);  // Aguarda 5 segundos para nova leitura
}
