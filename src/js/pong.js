let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");
let ctx;
ctx = tela.getContext("2d");

let tecla = 0;
let largura = 1200;
let altura = 600;
let raqueteAltura = 90;
let raqueteComprimento = 10;
let xRaquete1 = 5;
let yRaquete1 = altura / 2 - raqueteAltura;
let xRaquete2 = largura - 15;
let yRaquete2 = altura / 2 - raqueteAltura;
let xBolinha = 300;
let yBolinha = 200;
let raio = 25;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 5;
let pontuaçãoJogador = 0;
let pontuaçãoOponente = 0;

function desenhaBolinha(x, y, raio) {
	pincel.fillStyle = "white";
	pincel.beginPath();
	pincel.arc(x, y, raio, 0, 2 * Math.PI);
	pincel.fill();
}

function desenhaBarra() {
	pincel.fillStyle = "white";
	pincel.fillRect(largura / 2 - 1, 0, 2, altura);
}

function desenhaRaquete() {
	pincel.fillStyle = "white";
	pincel.fillRect(xRaquete1, yRaquete1, raqueteComprimento, raqueteAltura);
	pincel.fillRect(xRaquete2, yRaquete2, raqueteComprimento, raqueteAltura);
}

function aceleraBolinha() {
	xBolinha += velocidadeXBolinha;
	yBolinha += velocidadeYBolinha;
}

function limpaTela() {
	pincel.fillStyle = "black";
	pincel.fillRect(0, 0, largura, altura);
}

function escrevePontos() {
	ctx.font = "50px monospace";
	ctx.fillStyle = "white";
	// w/4 = 1/4 da tela = metade da tela do player 1
	ctx.fillText(pontuaçãoJogador, largura / 4, 50);
	// 3*(w/4) = 3/4 da tela = metade da tela do player 2
	ctx.fillText(pontuaçãoOponente, 3 * (largura / 4), 50);
}

function colisãoBorda() {
	if (xBolinha + raio > largura) {
		velocidadeXBolinha *= -1;
		pontuaçãoJogador += 1;
		//alert("Ponto!");
	}
	if (xBolinha - raio < 0) {
		velocidadeXBolinha *= -1;
		pontuaçãoOponente += 1;
		//alert("Pontuação do oponente = " + pontuaçãoOponente);
	}
	if (yBolinha + raio > altura || yBolinha - raio < 0) {
		velocidadeYBolinha *= -1;
	}
}

document.addEventListener("keydown", function (ev) {
	// keyCode 38 = up, keycode 40 = down
	if (
		ev.keyCode == 38 ||
		ev.keyCode == 40 ||
		ev.keyCode == 37 ||
		ev.keyCode == 39
	) {
		tecla = ev.keyCode;
	}
});

document.addEventListener("keyup", function (ev) {
	// keyCode 38 = up, keycode 40 = down
	if (
		ev.keyCode == 38 ||
		ev.keyCode == 40 ||
		ev.keyCode == 37 ||
		ev.keyCode == 39
	) {
		tecla = 0;
	}
});

function moveRaquete() {
	if (tecla == 38 && yRaquete1 > 0) {
		yRaquete1 -= 10;
	} else if (tecla == 40 && yRaquete1 + raqueteAltura < altura) {
		yRaquete1 += 10;
	}
	if (velocidadeYBolinha > 0) {
		yRaquete2 += 3;
	} else {
		yRaquete2 -= 3;
	}
}

function colisãoRaquete() {
	if (
		xBolinha - raio < xRaquete1 + raqueteComprimento &&
		yBolinha + raio > yRaquete1 &&
		yBolinha - raio < yRaquete1 + raqueteAltura &&
		velocidadeXBolinha < 0
	) {
		velocidadeXBolinha *= -1;
	}
	if (
		xBolinha + raio > xRaquete2 &&
		yBolinha + raio > yRaquete2 &&
		yBolinha - raio < yRaquete2 + raqueteAltura &&
		velocidadeXBolinha > 0
	) {
		velocidadeXBolinha *= -1;
	}
}

function atualizaTela() {
	limpaTela();
	desenhaRaquete();
	desenhaBolinha(xBolinha, yBolinha, raio);
	desenhaBarra();
	colisãoBorda();
	colisãoRaquete();
	aceleraBolinha();
	moveRaquete();
	escrevePontos();
	if (pontuaçãoJogador == 10) {
		alert("VOCÊ VENCEU!!!");
		clearInterval(jogo);
		document.location.reload(true);
	}
	if (pontuaçãoOponente == 10) {
		alert("VOCÊ PERDEU!!!");
		clearInterval(jogo);
		document.location.reload(true);
	}
}

alert("Pressione ok para começar");
let jogo = setInterval(atualizaTela, 10);
