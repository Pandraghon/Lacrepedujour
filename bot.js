
/* https://discordapp.com/login?redirect_to=%2Fdevelopers%2Fapplications%2F */
/* https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8 */

/* ********************************************************************************************************************************** */

/* Ajout du module discord.js */
const Discord = require('discord.js');

/* Création d'une instance d'un client discord */
const client = new Discord.Client();

/* ********************************************************************************************************************************** */

/* Déclaration du nom du bot */
const g_bot_name   = "La crêpe du Jour !";

/* Déclaration de l'identifiant du bot */
const g_bot_id   = '512333371729379331';

/* Déclaration du préfix des commandes */
const g_bot_cmd = "!=crp,=";

/* Déclaration du répertoire contenant les fichiers */
const g_bot_path = "img/"

/* Déclaration du préfix des fichiers */
const g_bot_file_name = "File ";

/* Déclaration de l'extention des fichiers */
const g_bot_ext = ".jpg"

/* ********************************************************************************************************************************** */

/* Déclaration d'une variable stockant le nom des fichiers */
var g_file_liste = 0;

/* Déclaration d'une variable stockant l'intervalle du timer */
var g_bot_interval = 0;

/* Déclaration d'une variable stockant l'état du bot ( initialisé <1> ou non <0> ) */
var g_bot_init = 0;

/* Déclaration d'une fonction stockant un timer [ms] */
var g_bot_timer = 60000;

/* Déclaration d'une fonction stockant le canal de travail */
var g_bot_channel = 0;

/* Déclaration d'une fonction stockant l'heure de pop du message */
var g_bot_hour = 7;

/* ********************************************************************************************************************************** */

function generate_file_name ( )
{
	/* Déclaration de la variable de retour */
	l_result = ["", ""];
	
	/* Récupération d'un nombre aléatoire */
	l_rand_value = Math.floor((Math.random() * g_file_liste.length) + 1 ) - 1;
	
	/* Concaténation */
	l_result [ 0 ] = g_bot_path + g_bot_file_name + '(' + l_rand_value + ')' + g_bot_ext;
	l_result [ 1 ] = g_bot_file_name + '(' + l_rand_value + ')' + g_bot_ext;
	l_result [ 2 ] = l_rand_value;
	
	/* Retour */
	return l_result;	
}

/* ********************************************************************************************************************************** */

function timer_60min (  )
{
	/* Si un message doit POP */
	if ( new Date().getHours() == g_bot_hour )
	{
		/* Récupération d'un nom de fichier */
		l_file = generate_file_name ( );
		
		/* Transmission de l'image */
		g_bot_channel.send ( { files: [ { attachment: l_file [ 0 ], name: l_file [ 1 ] } ] } );
		
		/* Affichage de la date courante */
		console.log ( 'Une crêpe (' + l_file [ 2 ] + ') envoyée à ' + new Date().getHours() + ' heures et ' + new Date().getMinutes() + ' minutes.' );
	}
	
	/* Sinon */
	else
	{
		/* Ne rien faire */
	}
}

/* ********************************************************************************************************************************** */

/* Ready Event */
client.on( 'ready', () => {
  
  /* Démarrage de l'application ... */
  console.log( 'Lecture du répertoire de données ... ' ); 
  
  /* Récupération des fichiers disponibles */
  fs = require( 'fs' );
  g_file_liste = fs.readdirSync( 'img' );
  
  /* Fin init */
  console.log( 'Terminée !' );
  
});

/* ********************************************************************************************************************************** */

/* Message Event */
client.on('message', p_message => {
  
  /* Si Mac a lancé la commande */	
  if ( p_message.author.id === "283332409070452737" )
  {
	  /* Si une commande de démarrage est lancée */
	  if ( ( p_message.content == "!=crepe,=start" ) && ( g_bot_init != 1 ) )
	  {
		  /* Basculement de la variable */
		  g_bot_init = 1;

		  /* Déclenchement d'une fonction temporisée */  
		  g_bot_interval = setInterval ( timer_60min, 5400000 ); 

		  /* Enregistrement du channel de travail */
		  g_bot_channel = p_message.channel;

		  /* Affichage d'un message */
		  p_message.channel.send ( "Crêpes en cours de préparation ..." );
	  }

	  /* Sinon si une commande d'arrêt est lancée */
	  else if ( ( p_message.content == "!=crepe,=stop" ) && ( g_bot_init == 1 ) )
	  {
		  /* Basculement de la variable */
		  g_bot_init = 0;

		  /* Arrêt du timer */  
		  clearInterval ( g_bot_interval ); 

		  /* Affichage d'un message */
		  p_message.channel.send ( "Arrêt du service !" );
	  }	  

	  /* Sinon */
	  else
	  {
		  /* Ne rien faire */
	  }
  }
  
  /* Sinon */
  else
  {
	  /* Ne rien faire */
  }
  	
});

/* ********************************************************************************************************************************** */

client.login(process.env.BOT_TOKEN);
