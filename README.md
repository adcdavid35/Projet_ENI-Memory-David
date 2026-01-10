# Projet_ENI-Memory-David

Projet de Memory de David THEBAULT

## Sommaire
1. [Remerciements](#remerciements)
2. [Contexte general](#contexte-general)
3. [Iterations](#iterations)
4. [Explication de mes choix et de ma logique de programmation](#explication-de-mes-choix-et-de-ma-logique-de-programmation)
5. [Multimedia](#multimedia)


## Remerciements
    Je souhaite tout d’abord remercier les formateurs de l’ENI École Informatique pour la qualité de leur enseignement et la bienveillance de leurs conseils.
    Ce projet, premier de la formation, est entièrement orienté côté client.

## Contexte general
    Ce projet intervient au cours du premier mois de formation, juste après deux semaines dédiées au « Front » (HTML, CSS et JavaScript).

    Le temps prévu pour sa réalisation est de 35 heures. Cependant :

- 3,5 heures ont été consacrées à la présentation du projet, à l’apprentissage de GitHub et au paramétrage du dossier du projet.
- 3,5 heures ont été utilisées pour une information annexe.
- 2,5 heures ont servi à la présentation des différents projets des autres stagiaires.

Ainsi, comme l’indique l’historique GitHub, la réalisation complète s’est déroulée en deux phases :

- la première en novembre, au sein de l’école,

- la seconde pendant les fêtes de Noël 2025/2026.

Pour la première phase, j’ai suivi la liste des exigences du « client », en respectant les itérations imposées.
Lors de la seconde phase, je me suis davantage appuyé sur mon intuition pour rendre le site plus agréable visuellement et plus ludique, tout en ajoutant les fonctionnalités prévues pour les dernières itérations (à partir de la 3.3, voir ci‑dessous).

Disclaimer sur l’utilisation de l’IA :
Bien que l’IA puisse coder ce jeu en moins de 10 minutes, il nous a été interdit de l’utiliser pour programmer directement certaines parties du projet. Cependant, face à la quantité de travail et au temps limité, j’ai choisi de l’employer de manière raisonnable pour :

- Mieux comprendre certaines fonctionnalités et ainsi apprendre plus rapidement.
- Identifier des fonctions plus facilement que dans la documentation parfois trop dense, en privilégiant l’efficacité plutôt que de perdre du temps à chercher une solution correspondant à ma logique de programmation.
- Simplifier la relecture du code en cas de bug ou d’erreur (par exemple, une balise fermante manquante suite à un copier-coller ou une suppression accidentelle).

## Iterations
    3.1 La base:

    - Réalisation de la structure globale du site.(pages / formulaires).
    - programmation de la mécanique du jeu.

      3.2 L’authentification et la gestion des utilisateurs:

    - Gestion des utilisateurs (formulaire d'inscription avec ses règles, enregistrement dans le LocalStorage, vérification d'usage).
    - Connexion de l'utilisateur.
    - Gestion de son profil.

      3.3 Gestion des scores et du jeu

    - Enregistrement de la configuration du profil.
    - Affichage des scores.

      3.4 Choix des jeux

    - Avant de commencer une partie, choix du thème.
    - Cryptage du mot de passe.

## Explication de mes choix et de ma logique de programmation
    Introduction:
    Le site est optimisé pour Google Chrome. Certaines fonctionnalités ne sont pas encore pleinement compatibles avec Firefox (version 146.0.1, 64 bits, à la date d’édition).
    J’ai fait de mon mieux pour assurer une compatibilité mobile et un affichage responsive.
    Cependant, quelques problèmes de mise à l’échelle subsistent sur certains modèles de tablettes.

    4.1 HTML (index essentiellement):
    <body> Le thème par défaut est celui de la savane. J'avais l'idée de faire une boucle infinie pour présenter les différents thèmes mais j'ai finalement pensé que c'était inutile avec le thème préféré (celui choisi dans le 	profil).
    <aside> J'ai décidé de placer ma navbar dans un aside car à terme, je voulais la masquer.
    <div class="rotate-message"> Pour m'éviter trop de contrainte responsives avec ma mise en page, j'ai bloqué l'option portrait en Smartphone.
    <header> & <footer> : Sans PHP, il prend pas mal de place ici. J'ai réduit à portion congrue le footer dans les autres pages.

    4.2 CSS
    J'ai essayé de programmer à peu près tout ce que j'ai pu glaner comme style intéressant.
    Je ne suis ni designer, ni graphiste. Le rendu me semble satisfaisant pour montrer l'essentiel : que ca fonctionne.

    4.3 Multimédia
    Sans être graphiste, j'ai remanier les images pour les mettre aux même format (.png) pour me faciliter dans le code.

    4.4 JavaScript
    J'ai choisi de faire une page .js par page HTML pour que ce soit plus visible pour moi. Seule exception: la page memory qui regroupe les fonctions communes

        4.4.1 index
        	Pas de  index.js pour la page, tout est dans memory.js

        4.4.2 inscription
        Cette page ne regroupe que les changements de style suite au remplissage des inputs (inclus des tests primaires (regex)).
        	Action sur le bouton reset = RAZ de la page

        	4.4.3 auth

    Cette page reprend la partie inscription / action sur le bouton submit.

        	J'ai fait des tests sur les pseudos :
        	- test 1 : s' il est présent dans la liste des joueurs inscrits actuellement. (LocalStorage / users).
        	- test 2 : si un pseudo a déjà été utilisé dans le passé par un joueur qui s'est désinscrit depuis (LocalStorage / scores).

        	Si inscription réussie = redirection vers la connexion.

        	action sur le bouton submit :
        	teste si l'email correspond au pseudo.
        	Si connexion réussie = redirection vers le profil.

        	Action sur le bouton reset = RAZ de la page

    4.4.4 profil
    Remplissage des inputs (via Profil()) quand joueur connecté.

        Remplissage du tableau des scores personnels (showScorePlayer()). Je garde les 5 meilleurs scores par type de grille.

        Création des 2 selects (Choix de jeu et taille du plateau)
        !!!!!! On peut donc ajouter ici d'autres jeux ou tailles de plateau pour faire évoluer le site !!!!

        	Action sur le bouton submit:
        	Création des préférences dans (LocalStorage / users / préférences)

    Appel de saveConfig pour stocker la config de jeu dansLocalStorage. J'en ai besoin pour showScore();

        Action sur le bouton reset = Suppression du profil dans le (LocalStorage / users). Mais je garde les scores du joueur dans le LocalStorage / scores.

        4.4.5 Play
        Remplissage du tableau des meilleurs scores pour ce plateau tou joueurs confondus : showScore();

        J'initialise la partie LocalStorage / scores.
        J'initialise le nom du jeu en fonction du choix du profil.
        J'initialise le plateau de jeu en fonction du choix de la grille dans le profil et je génère le plateau.

        dans le init() :
        - je vérifie que le joueur est connecté. Pas de connexion = pas de jeu possible.
        - pour rendre moins monotone les jeux avec de petites grilles, je rend la base de départ de comptage des cartes pseudo aléatoires. getRandomInt() (comme ca on peu aussi jouer avec les numéros plus élevés en 4 		X 3.)

        - Je crée donc ensuite un tableau de paires (push (i,i)) avec le nombre de cartes dont j'ai besoin pour remplir la grille (nbreCarteDiff) et enfin je mélange ce tableau (melangeCards()).

        - La mécanique du jeu :
        Je créé un tableau de paire que je réinitialise à chaque fois qu'il atteint une taille de 2.
        Si la paire est identique, je supprime la possibilité d'être retournée(disableCard(card))
        A chaque "double" click j'incrémente le compteur de tour.
        Je laisse 500 ms de délai pour mémoriser les mauvais choix.

        - Contrôle de la victoire checkVictory()
        A chaque fin de tour : test de victoire
        Si plus de carte à retourner c'est bon!

        Lancement de majScore();
        Mise à jour du (LocalStorage / users / score) pour le profil
        Mise à jour du (LocalStorage / scores) pour la page jouer

        - relance du jeu si on appui sur la touche espace (ou double-tap en smartphone)

        4.4.6 memory
        Action sur le bouton reset (commun à toutes les pages) = déconnecte l'utilisateur.

        On retrouve l'action qui modifie le fond ainsi que 'image "global" qui représente l'ensemble des cartes d'un jeu = agit sur index et profil.

        La fonction findPlateau () permet de connaitre le plateau en cours d'utilisation.

        J'ai également un changement de couleur de texte en fonction du thème choisi.

## Multimedia
    On retrouvera dans le dossier "Images" l'ensemble des images nécessaires au bon fonctionnement du jeu.
    J'ai choisi de transformer l'ensemble des images de fond, cartes de jeux et planches globale en PNG pour profiter de la transparence du fond et me faciliter la programmation.
    Chaque choix de jeu dans le Profil fait changer le fond, la planche globale et les cartes de jeux.

    Il est possible de compléter ce dossier, in fine, avec votre propre thème.
    Il faudra des images en PNG (triptyque : fond, global et cartes). Faire un dossier spécifique en respectant la numérotation. (20 cartes max sauf si vous augmentez la taille du plateau)
    Pensez a compléter le code des select du profil.
