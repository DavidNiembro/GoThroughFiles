GoThroughFiles
================

Ce programme à été initialisé dans le cadre d'un projet de développement du CPNV. Le but du travail est de créer une application qui permet de faire des recherches de documents et de contenu de documents  en local ou en réseau. L'application affiche les résultats et permet de les ouvrir dans une application par défault.

Installation
------------

* Clone le repository
* Executer  `npm install`
* Aller dans le dossier *backend* puis exectuer `composer install`
* Copier le fichier .env.exemple en .env avec la commande `cp .env.exemple .env`
* Executer la commande `php artisan key:generate` la première fois.

Execution
---------

A la racine du projet executer la commande  `npm run electron`