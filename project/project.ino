// card reader
#include <SPI.h>
#include <MFRC522.h>

// lcd display
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

// Configurable
#define RST_PIN 9
#define SS_PIN 10

// Create MFRC522 instance
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

String message = "Bienvenido";

void setup() {
  // Initialize serial communications with the PC
	Serial.begin(9600);

  // Do nothing if no serial port is opened
	while (!Serial);
	
	// Init SPI bus
	SPI.begin();
  
  // Init MFRC522
	mfrc522.PCD_Init();

  // Optional delay time after init to be ready
	delay(4);

  // Show details of PCD - MFRC522 Card Reader details
	mfrc522.PCD_DumpVersionToSerial();	
	Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));

  // initialize the LCD
  lcd.begin();

  // Turn on the blacklight and print a message.
  lcd.backlight();
  lcd.print(message);
}

void loop() {
	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if ( ! mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

	// Select one of the cards
	if ( ! mfrc522.PICC_ReadCardSerial()) {
		return;
	}

  // Dump debug info about the card; PICC_HaltA() is automatically called
	// mfrc522.PICC_DumpToSerial(&(mfrc522.uid));

  //	Serial.print("UID:");
  message = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) {
      // Serial.print(" 0");
      message += " 0";
    } else {
      // Serial.print(" ");
      message += " ";
    }
      // Serial.print(mfrc522.uid.uidByte[i], HEX);
      message += String(mfrc522.uid.uidByte[i], HEX);
  }
  // Serial.println();
  lcd.clear();
  lcd.print(message);
  mfrc522.PICC_HaltA();
}
