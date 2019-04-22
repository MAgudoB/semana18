var canvas;
var context;
var canvasHeight;
var canvasWidth;

var playButton;

var url = "wss://semana17-magudob.c9users.io:8082/echobot";
var socket;
var dirx = 0;
var diry = 0;
var firstMessage = false;
var connected = false;

var gapx = 0;
var gapy = 0;

//Images
var ship1 = new Image();
var ship2 = new Image();
var ship3 = new Image();
var ship4 = new Image();
var ship5 = new Image();
var ship6 = new Image();
var cannonBall = new Image();

//
var player;
var players = new Array();
var localBullets = new Array();
var bullets = new Array();

//Tipos de mensajes enviados
GET_ID = 0;
UPDATE_PLAYER = 1;
NEW_BULLET = 2;

//Tipos de mensajes recibidos
UPDATE_ID = 0;
UPDATE_PLAYERS = 1;
UPDATE_BULLETS = 2;
REMOVE_PLAYERS = 3;
REMOVE_BULLETS = 4;
COLLISION = 5;

TIME_TO_SHOOT = 50;
var canvas;
var context;
var canvasHeight;
var canvasWidth;

var playButton;

var url = "wss://semana17-magudob.c9users.io:8082/echobot";
var socket;
var dirx = 0;
var diry = 0;
var firstMessage = false;
var connected = false;

var gapx = 0;
var gapy = 0;

//Images
var ship1 = new Image();
var ship2 = new Image();
var ship3 = new Image();
var ship4 = new Image();
var ship5 = new Image();
var ship6 = new Image();
var cannonBall = new Image();

//
var player;
var players = new Array();
var localBullets = new Array();
var bullets = new Array();

//Tipos de mensajes enviados
GET_ID = 0;
UPDATE_PLAYER = 1;
NEW_BULLET = 2;

//Tipos de mensajes recibidos
UPDATE_ID = 0;
UPDATE_PLAYERS = 1;
UPDATE_BULLETS = 2;
REMOVE_PLAYERS = 3;
REMOVE_BULLETS = 4;
COLLISION = 5;
PLAYER_QUIT = 6;

TIME_TO_SHOOT = 50;
