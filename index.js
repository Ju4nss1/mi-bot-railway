import WebSocket from "ws";
import notifier from "node-notifier";
import { exec } from "child_process";
import fs from "fs";

// Mapa de chatrooms y usuarios a monitorear
const chatroomUserMap = {
  1079212: "SHAAKR",
  468092: "Grim",
  204392: "Carlu",
  5375: "BigRed",
  1650958: "JoshyGambles",
  408908: "TrendyALLin",
  3840: "keekzkliks",
  4622: "thestevestream",
  22341: "Robmancan1987",
  216487: "Agusbob",
  30211: "botairtx",
  5174: "mochez",
  3573: "pulmonary",
  26199: "foss",
  28370: "rydurz",
  5671: "lepajee",
  4881: "gumbo",
  1333564: "PikaGambles",
  6531: "tck",
  3571: "submerzed",
  2772: "banksy",
  5377734: "clokyy",
  562566: "keithlocks",
  19666317: "TheSnatchers",
  957595: "PlattyyTV",
  31329: "jaekcreates",
  3015326: "Balozy",
  169114: "imbones",
  39248: "bgold",
  2954993: "Bladds",
  3996030: "VegasJoe",
  29721: "beast",
  2721660: "Rocboys",
  1393856: "Chetty",
  2505975: "LameGambles",
  14797884: "BereavedNickel7",
  92360: "radiigambles",
  3985420: "Doug",
  25650069: "MysticBert",
  2826437: "187CREW",
  328528: "CaveJob",
  382511: "RomieAddicts",
  170481: "DiceDad",
  4370246: "ZIAMW",
  176725: "shiibbbster",
  268418: "Mikhailis",
  35173: "yama", 
  85376: "benny_live11",
  120903: "25Logan25",
  17244: "rosiemae",
  1901573: "faxuty",
  33495303: "MrGamblez",
  164249: "detoo",
  53329: "OVOPhantuums",
  6392: "oneeyedgregg",
  603448: "iGypC",
  1188364: "Xale", 
  22344: "Xchng3",
  355800: "AyeZee",
  349595: "Sebm1337",
  7849973: "cryptoeboy",
  17073628: "MrTreeGambling",
  29259541: "MrchocolateSlot",
  23419100: "BenPhillips",
  467853: "Roobet-Feli",
  1859429: "Meci03",
  1190935: "Beatsuka",
  6692367: "NICKMERCS",
  2274737: "aszabokristof",
  6744176: "CompetitiveBrothers",
  7966058: "reccho",
  9338341: "ProphetJNH",
  31598429: "JoeyBooHoo",
  2330048: "terriblepker",
  12371085: "Fitt_x",
  36204: "zillas",
  23167: "island",
  4339674: "GodImSoaked",
  1233482: "tatoyann",
  1892168: "bulwark7",
  416: "diegusmoneymaker",
  45821: "barttzy",
  413152: "Jamie",
  212180: "customk",
  81471: "uni05tv",
  7828520: "RobertGamba",
  4318370: "PoiOnako",
  50844: "sebi",
  106574: "kj",
  40992: "joeySlots",
  274602: "urosh",
  2015496: "rolfirodas",
  3548: "jollyjimmy",
  27747095: "DylanJamesGG",
  35864924: "Bally_Boy",
  32316785: "Cash", 
  3714599: "ShuriK3N",
  316735: "C8NCEL",
  19327842: "Hx7878",
  24527572: "pin4tzinho",
  1603130: "ott3k",
  28515668: "FINIGUN",
  26246525: "ChiliSlots",
  22172064: "NickiTV",
  11653271: "BTx2",
  15591259: "tjrtrading",
  106574: "Rippers",
  10533461: "Hoyer28",
  4071019: "NotSdot",
  27054088: "RTPGOD",
  3714599: "codeshury",
  4233156: "Soldiertiing",
  5332: "moo",
  4300529: "VinnyVH",
  15729455: "EmreTT",
  1346860: "TORE1005",
  266127: "newname",
  2338706: "Sneakzy",
  1394192: "KingPing",
  17011: "Kuang",
  37337064: "Hellcatraz",
  4732: "everythingmad",
  19023558: "GravyBets",
  1370062: "tommyunold",
  893787: "Y345T",
  1459631: "judista",
  259786: "Elderbreaks",
  54203: "JASONR",
  16310963: "WastedWagers",
  42420688: "PYREXXGamble",
  3466825: "RavenOP",
  208791: "Boykaa",
  15381470: "rekztv",
  2709: "kennispe",
  25676202: "BarbieKICK",
  256103: "FunnySlots", 
  23144: "Darkwing",
  13772821: "HutchMF",
  3878311: "J_Burk",
  11408596: "FrequencyBenders",
  17631702: "CasaN0ah",
  31785807: "BibiCasino",
  814216: "JOk3R",
  7242463: "LaZard2209",
  1585430: "OrlandoJett",
  279106: "Tbeats",
  19844514: "scepogambles",
  1366749: "SirGime",
  36041048: "blokesonthepokes",
  3142351: "BluntSquad",
  27476461: "DegensDownUnder",
  10390073: "Perdrinkin",
  1362626: "RezReel",
  1593547: "SgVerified",
  1111658: "MarkoLasso",
  19187024: "AidenFumbles", 
  25327678: "JustinStakes",
  10258718: "Daily-Slots",
  14544651: "Austinski",
  10185554: "Jingtv",
  19533704: "yungreal",
  1640551: "SnDeez",
  1368731: "Camy", 
  1318375: "KingGee",
  2245079: "ItsLatin",
  42872633: "FakeStreamers",
  5776: "STEZZY2G",
  45313: "dizkontinued",
  666147: "lenoncsgo",
  29855143: "Bswrxsti",
  123891: "x40ozBounce",
  1067769: "IamDylan",
  242271: "milanpsiho",
  2223956: "Drunk",
  22128854: "a_funkygoat",
  1998356: "CollegeMoney",
  1666183: "VivStreams",
  6433: "Fugroo",
  23585: "fliptheswitch",
  29626: "curiouscurrie",
  27810183: "Joshi",
  52846047: "team1337",
  3342524: "gambaweener",
  4797899: "thekingandthegoat",
  218281: "gambo_tv",
  15728249: "Zeichnet",
  27607604: "MiteBalie",
  39447481: "RoobetBren",
  53762247: "RoobetShawn",
  23306: "Ruin3rs",
  52073316: "TopPull",
  5478906: "OfficialHTG",
  10756: "serekorr",
  28668852: "tdgambles",
  179932: "ffrizy",
  2386885: "Afterstay",
  463162: "GUH",
  25070417: "BALUMBAREF",
  7158034: "xFLAKAA",
  27132: "TheSaltyBoys",
  1336557: "sanchovies",
  3249081: "FacuuArgibay",
  223965: "markynextdoor",
  34382797: "Gavilancho",
  55596220: "SoakedRewards",
  24821267: "CICOBOYZ",
  240262: "BramSlots",
  981918: "rksSERVET",
  128940: "LowLimit",
  528037: "CheeseOG",
  179932: "ffrizy",
  14095046: "Nikan"
};

const channelPrefix = "chatrooms";
const logFilePath = "chatlog.txt";
let webSocketInstances = {}; // Almacena las instancias de WebSocket
let notifiedMessages = {}; // Mantener un registro de mensajes notificados para evitar repeticiones

// Crea o abre el archivo de registro y agrega un mensaje de inicio
fs.appendFileSync(logFilePath, "Inicio del registro de chat:\n");

// Función para verificar si un mensaje contiene el patrón específico para un usuario
function containsPattern(username, message) {
  // Patrón flexible: dos letras, dos números, dos letras
  const specificPattern = /[A-Za-z]{2}\d{2}[A-Za-z]{2}/;

  // Verificar si el mensaje cumple con el patrón
  return specificPattern.test(message);
}

// Función para notificar y reproducir la alarma
function notifyAndAlarm(username, message) {
  // Verificar si el mensaje ya ha sido notificado
  if (notifiedMessages[username] === message) {
    console.log(`Mensaje ya notificado anteriormente: ${message}`);
    return; // No reproducir la alarma nuevamente
  }

  // Agregar el mensaje al registro de mensajes notificados
  notifiedMessages[username] = message;

  notifier.notify({
    title: `Nuevo mensaje de ${username}`,
    message: message,
  });

  console.log(`Mensaje notificado: ${message}`); // Mostrar el mensaje en la consola

  playAlarm();
}

// Función para reproducir la alarma
function playAlarm() {
  exec("start C:\\Users\\Ju4ns\\Documents\\GitHub\\KickChatConnection\\alarm.mp3", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al reproducir el sonido de la alarma: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Error al reproducir el sonido de la alarma: ${stderr}`);
      return;
    }
    console.log("Sonando alarma...");
  });
}

// Función para crear y manejar el WebSocket
function createAndHandleWebSocket(chatroomNumber, userToMonitor) {
  const chat = new WebSocket(
    "wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false"
  );

  // Almacena la instancia WebSocket en el objeto
  webSocketInstances[chatroomNumber] = chat;

  chat.on("open", function open() {
    chat.send(
      JSON.stringify({
        event: "pusher:subscribe",
        data: { auth: "", channel: `${channelPrefix}.${chatroomNumber}.v2` },
      })
    );

    console.log(
      "\x1b[33m%s\x1b[0m",
      `Connected to Kick.com Streamer Chat: ${chatroomNumber} - Monitoring: ${userToMonitor}`
    );
  });

  chat.on("error", function error(err) {
    console.error("WebSocket error:", err);
  });

  chat.on("message", function message(data) {
    try {
      const jsonData = JSON.parse(data);

      if (jsonData.data) {
        const jsonDataSub = JSON.parse(jsonData.data);

        if (jsonDataSub && jsonDataSub.chatroom_id === parseInt(chatroomNumber)) {
          if (jsonDataSub.sender && jsonDataSub.sender.username) {
            const senderUsername = jsonDataSub.sender.username;
            const messageContent = jsonDataSub.content;

            // Verificar si el mensaje es de un usuario que deseas monitorear
            if (Object.values(chatroomUserMap).includes(senderUsername)) {
              // Si el mensaje cumple con el patrón y es del usuario específico, notificar
              if (userToMonitor === senderUsername && containsPattern(senderUsername, messageContent)) {
                console.log(`Mensaje de ${senderUsername}: ${jsonDataSub.content}`);
                notifyAndAlarm(senderUsername, jsonDataSub.content);

                // Guardar el mensaje en el archivo de registro
                const logMessage = `[${new Date().toLocaleString()}] ${senderUsername}: ${jsonDataSub.content}\n`;
                fs.appendFileSync(logFilePath, logMessage);
              } else {
                // Si no es un mensaje específico para notificar, solo mostrar en la consola
                console.log(`Mensaje de ${senderUsername}: ${jsonDataSub.content}`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// Función para reiniciar el WebSocket para todos los chatrooms
function restartWebSocketForAllChatrooms() {
  // Cerrar todas las conexiones WebSocket existentes
  for (const chatroomNumber in webSocketInstances) {
    webSocketInstances[chatroomNumber].terminate(); // Usar terminate() en lugar de close()
  }

  // Limpiar el objeto que almacena las instancias de WebSocket
  webSocketInstances = {};

  // Volver a crear WebSocket para cada chatroom
  for (const [chatroomNumber, userToMonitor] of Object.entries(chatroomUserMap)) {
    createAndHandleWebSocket(chatroomNumber, userToMonitor);
  }
}

// Iniciar WebSocket para cada chatroom
for (const [chatroomNumber, userToMonitor] of Object.entries(chatroomUserMap)) {
  createAndHandleWebSocket(chatroomNumber, userToMonitor);
}

// Reiniciar el WebSocket para todos los chatrooms cada 5 minutos
setInterval(restartWebSocketForAllChatrooms, 300000);