var gpio = require('rpi-gpio');

gpio.setup(22, gpio.DIR_OUT, function() {
        gpio.write(22, true, function(err){
                if (err) console.log('ERRO AO ESCREVER' + err);
                else console.log('ESCREVEU CANAL 22');
        });
});

gpio.setup(7, gpio.DIR_LOW, function(){
	gpio.read(7, function(err, value) {
		console.log('Pino 7 - ' + value);
	});
});

gpio.setup(11, gpio.DIR_LOW, function(){
	gpio.read(11, function(err, value) {
		console.log('Pino 11 - ' + value);
	});
});

gpio.setup(13, gpio.DIR_LOW, function(){
	gpio.read(13, function(err, value) {
		console.log('Pino 13 - ' +  value);
	});
});

gpio.setup(15, gpio.DIR_LOW, function() {
	gpio.read(15, function(err, value) {
		console.log('Pino 15 - ' + value);
	});
});

/*
P1 - 3.3v 	01 	02 	5v
I2C SDA 	03 	04 	--
I2C SCL 	05 	06 	Ground
GPIO 		07 	08 	TX
-- 		09 	10 	RX
GPIO 		11 	12 	GPIO
GPIO 		13 	14 	--
GPIO 		15 	16 	GPIO
-- 		17 	18 	GPIO
SPI MOSI 	19 	20 	--
SPI MISO 	21 	22 	GPIO
SPI SCLK 	23 	24 	SPI CE0
-- 		25 	26 	SPI CE1
Model A+ and Model B+ additional pins
ID_SD 		27 	28 	ID_SC
GPIO 		29 	30 	--
GPIO 		31 	32 	GPIO
GPIO 		33 	34 	--
GPIO 		35 	36 	GPIO
GPIO 		37 	38 	GPIO
-- 		39 	40 	GPIO 
*/
