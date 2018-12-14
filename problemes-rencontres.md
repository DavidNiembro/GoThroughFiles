---
description: Les différents problèmes liés au développement de notre application.
---

# Problèmes rencontrés

### **Fichier trop gros impossible à uploader sur git** 

Dans le cadre de notre projet, un fichier JSON a été créé pour recenser des fichiers avec certaines extensions, ce fichier devait nous permettre de faire l’indexation. Après l’avoir créé, il a été ajouté avec  `git add` .  avant de faire un `git commit` et `git push`. Malheureusement, GitHub ne prend pas en charge les fichiers de plus de 100MB et le notre faisait 400MB. Suite à plusieurs recherches, aucune solution ne fonctionnait et malgré tout l’erreur persistait. 

L’un de nous a alors supprimé son dossier .git local pour éviter cette erreur et le push a été fait. Cela a alors supprimé tous les anciens commits présent sur GitHub. Heureusement, avant que les autres ne fassent un pull du master, une nouvelle branch a été créé avec l’ancien master présent sur l’ordinateur de l’un de nous, ce qui nous a servi car on a merge cette branche sur le master par la suite.  
****

### **Impossible de lancer un serveur php** 

Nous avons eu un problème lorsque nous avons cloner le répertoire github du projet. Ayons mis en place l’environnement de base de notre application sur le git, nous avons voulu tester si elle fonctionnait correctement sur une autre machine \(Windows 10\). Le problème est que la version PHP installé sur les PC du CPNV ne correspondait pas à la version que le framework Laravel \(5.6.35\) attendue, donc nous avons dû prendre la bonne version de PHP \(7.1\) en spécifiant le bon path pour que cela fonctionne. Ceci pour faire fonctionner la dernière version de Laravel \(5.7\).

Il suffisait de faire pointer le path d'environnement Windows sur la version PHP que nous devions utiliser.  
  
****

### **Laravel-cors**

Comme laravel et react doivent communiquer ensemble, des appels d’API depuis react vers laravel sont utilisé pour récupérer les fichiers. Même si les deux applications tourne nous le même service, laravel détermine que les appels de React viennent depuis une autre source. 

La solutions à ce problème est d’autoriser des requêtes externes et pour ce faire nous avons dû installer le paquet `laravel-cors`.  
****

### **Difficultées à lancer electron et React en même temps**

Plusieurs problèmes sont survenus lors des lancements de l’application. React ne se lance pas en même temps qu’Electron ou Electron se lance mais React n’est même pas appelé.  
****

### **Difficultées à faire communiquer Electron et React.**

Lorsqu’il a été décidé d’enlever la couche PHP qui n’était pas nécessaire, il n’était plus possible de faire communiquer le backend avec le frontend. En effet jusque là le backend était appelé par son api, mais lorsqu’ Electron est devenu le backend de l’application il n’y avait plus la solution des appels d’API. Une des pistes exploré est de sauvegarder le résultat des recherches directement sur un fichier et JSON et de le récupérer par React en appelant ce fichier. Mais cette solution ne permet pas de faire des appels ni de passer des paramètres comme par exemple les mots de la recherche.

En cherchant dans la liste des fonctions mis à disposition par Electron, il est apparu qu’Electron pouvait communiquer avec d’autres langages en utilisant `ipMain` qui permet d’envoyer des informations et d’en recevoir.  
****

### **Aléa du framework**

Lors des première tentative de faire fonctionner Electron et React ensemble, plusieurs incidents se sont produit. Lorsque tout fonctionne sur une machine que l’on transmet à deux autres machine à travers git, le comportement des deux machines sont complètement différents. Une machine réussie à lancer l’application tandis que l’autre non.

Une des tentatives ne fonctionnait pas sur Windows mais se lançait sur Mac. L’erreur semble provenir de webpack qui ne fonctionne pas de la bonne façon sur les windows.

La solution à été trouvé avec un Electron et un React qui fonctionne bien sur les deux plateformes.  
  
****

### **Indexation lente de fichier par le filewatcher**

Au vu du fait que nous avons un fichier JSON regroupant toutes les données et que nous crééons ce fichier que lors d’un changement de fichier/la première fois, il nous faut garder un oeil sur les fichiers ajoutés/supprimés/modifiés pour mettre à jour l’index.  


Pour cela nous utilisons `chokidar` \(un filewatcher reconnu et utilisé par Microsoft dans Visual Studio Code\). Pour les tests, les fichiers ont été mis sur le disque P: \(en réseau\). Cela rend l’indexation lente et les events des fichiers sont appelés des secondes \(30-120sec\) après. Durant ce laps de temps, les fichiers en question ne sont pas indexés et si une recherche est faite, ceux-ci ne sont pas pris en compte.

 Malgré cela, nous pensons qu’une personne peut se souvenir des actions effectués durant ce laps de temps et qu’elle n’a donc pas besoin de relancer une recherche pour des fichiers qu’elle vient d’ajouter/modifier.  
****

### **Extraction lecture de fichier docx/pdf/png ..etc**

L’extraction des contenus de fichier s’est avéré plus compliqué que ce qui avait été prévu initialement.  


Les fichiers comprenant des textes en clair, donc que l'application par défaut ne transforme pas, peuvent facilement être traité avec les fonctions de bases de NodeJS. Pour les docx et pdf, il est plus compliqué de le faire uniquement avec les fonctions de Nodejs. Les paquets que nous avons essayé ne fonctionnait pour la plupart plus car ne prenaient pas en charge les docx ou sont fonctionnel sur mac mais pas sur windows et vis-versa.

Pour les extensions word, le paquet utilisé fonctionne très bien sur les appareils Apple mais ne fonctionne pas comme souhaité sur les appareils Windows. En effet lorsque le paquet extrait les données du fichier, il met un certain temps pour effectuer l’opération. Avec le paquet des PDF l'exécution des commandes suivante se met en attente jusqu'à la réponse de l'extraction. Avec le paquet pour les docx, l'exécution des autres commande se pourrit sans attendre la réponse. Au final aucun résultat n’est présent dans l’objet du fichier et donc on ne peut pas faire de recherche dedans.  


