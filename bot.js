
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

/* Déclaration d'une variable stockant l'état du bot ( initialisé <1> ou non <0> ) */
var g_bot_init = 0;

/* Déclaration d'une fonction stockant un timer [ms] */
var g_bot_timer = 60000;

/* Déclaration d'une fonction stockant les canals de travail */
var g_bot_channel = [];

/* Déclaration d'une variable référençant les timers */
var g_bot_timer = [];

/* Déclaration d'une fonction stockant l'heure de pop du message */
var g_bot_hour = 17;

/* Déclaration d'une variable stockant la minute de pop du message */
g_bot_minutes = 0;

/* Déclaration d'un verrou générale */
var g_bot_lock = 0;

/* ********************************************************************************************************************************** */

function bot_generate_file_name ( )
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

function bot_is_time ( p_hour, p_minute )
{
	/* Si il est temps de transmettre un message */
	if ( ( new Date().getHours() == p_hour ) && ( new Date().getMinutes() >= p_minute ) && ( g_bot_lock == 0 ) )
	{
		/* Actualisation du verrou global */
		g_bot_lock = 1;
		
		/* Retour */
		return 1;
	}
	
	/* Sinon si un message a été transmis et l'heure suivante est apparue */
	else if ( ( new Date().getHours() != p_hour ) && ( g_bot_lock == 1 ) )
	{
		/* Actualisation du verrou global */
		g_bot_lock = 0;
		
		/* Retour */
		return 0;
	}
	
	/* Sinon */
	else
	{
		/* Ne rien faire */
	}
	
	/* Retour */
	return 0;
}

/* ********************************************************************************************************************************** */

function bot_timer_60min (  )
{
	/* Détermination du nombre de channel existant */
	l_bot_channel_length = g_bot_channel.length;
	
	/* S'il est temps d'émettre un message */
	if ( bot_is_time ( g_bot_hour, g_bot_minutes )
	{
		/* Récupération d'un nom de fichier */
		l_file = bot_generate_file_name ( );
		
		/* Pour le nombre de serveur à déservir */
		for ( l_channel_counter = 0 ; l_channel_counter < l_bot_channel_length ; l_channel_counter++ )
		{
			/* Transmission de l'image */
			g_bot_channel [ l_channel_counter ].send ( { files: [ { attachment: l_file [ 0 ], name: l_file [ 1 ] } ] } );
		
			/* Affichage de la date courante */
			console.log ( 'Une crêpe (' + l_file [ 2 ] + ') envoyée à ' + new Date().getHours() + ' heures et ' + new Date().getMinutes() + ' minutes. [chn=' + g_bot_channel [ l_channel_counter ] + '].' );
		}
	}
	
	/* Sinon */
	else
	{
		/* Ne rien faire */
	}
}


/* ********************************************************************************************************************************** */

function bot_check_channel ( p_channel )
{
	/* Détermination du nombre de channel existant */
	l_bot_channel_length = g_bot_channel.length;
	
	/* Parcours des canaux référencés */
	for ( l_channel_counter = 0 ; l_channel_counter < l_bot_channel_length ; l_channel_counter++ )
	{
		/* Si le canal est déjà référencé */
		if ( g_bot_channel [ l_channel_counter ] == p_channel )
		{
			/* Retour */
			return 0;
		}
		
		/* Sinon */
		else
		{
			/* Ne rien faire */
		}
	}
	
	/* Retour */
	return 1;
}

/* ********************************************************************************************************************************** */

function bot_check_remove_channel ( p_channel )
{
	/* Détermination du nombre de channel existant */
	g_bot_channel_length = g_bot_channel.length;
	
	/* Parcours des canaux référencés */
	for ( l_channel_counter = 0 ; l_channel_counter < g_bot_channel_length ; l_channel_counter++ )
	{
		/* Si le canal est référencé */
		if ( g_bot_channel [ l_channel_counter ] == p_channel )
		{
			/* Suppression de l'élément */
			g_bot_channel.splice( l_channel_counter, 1 )
			
			/* Retour */
			return 1;
		}
		
		/* Sinon */
		else
		{
			/* Ne rien faire */
		}
	}
	
	/* Retour */
	return 0;
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
	  if ( ( p_message.content == "!=crepe,=start" ) )
	  {
		  /* Si le canal n'est pas référencé */
		  if ( bot_check_channel ( p_message.channel ) == 1 )
		  {
			/* Affichage d'un message */
		  	p_message.channel.send ( "Crêpes en cours de préparation ..." );
			  
			/* Ajout d'un nouveau canal de travail */
			g_bot_channel.push( p_message.channel );
			  
			/* Si le nombre de canal est égale à 1 */
			if ( g_bot_channel.length == 1 )
			{
				/* Déclenchement d'une fonction temporisée */  
		  		g_bot_interval = setInterval ( bot_timer_60min, 60000 ); 	
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
	  }

	  /* Sinon si une commande d'arrêt est lancée */
	  else if ( ( p_message.content == "!=crepe,=stop" ) )
	  {
		  /* Suppression du canal s'il existe */
		  if ( bot_check_remove_channel ( p_message.channel ) == 1 )
		  {
			/* Affichage d'un message */
		  	p_message.channel.send ( "Arrêt du service !" );
		  }
		  
		  /* Sinon */
		  else
		  {
			/* Ne rien faire */	  
		  }
		  
		  /* Arrêt du timer si plus aucun channel n'est référencé */
		  if ( g_bot_channel.length == 0 )
		  {
			/* Arrêt du timer */  
		  	clearInterval ( g_bot_interval );   
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
  }
  
  /* Sinon */
  else
  {
	  /* Ne rien faire */
  }
  	
});

/* ********************************************************************************************************************************** */

client.login(process.env.BOT_TOKEN);
