# Introduction

## **Introduction**

Monsieur CHEVILLAT Jérome et Monsieur HURNI Pascal possèdent un grand nombre de fichiers disposés dans des dossiers et sous-dossiers utilisés tous les jours dans le cadre de leur entreprise. Malgré le soin apporté dans la hiérarchie et la classification des fichiers, il leur est difficile de retrouver les documents dont ils ont besoin. Afin de pallier ce problème, nous devons mettre en place un système de recherche.

Le but du projet est de mettre en place une recherche simplifié pour l’entreprise de CHEVILLAT Jérome et HURNI Pascal. Les éléments à prendre en compte pour effectuer cette tâche sont les suivants:

* _Recherche de document dans un dossier spécifié et ses sous-dossiers au travers d’une interface prévue à cet effet:_
* * _Recherche par nom du fichier_
  * _Recherche par texte présent dans le fichier_

1. Recherche de document présent sur un réseau local OU sur l’ordinateur contenant le logiciel
2. Utilisation par les employés de l’entreprise seulement \(pas de droits spéciaux\)
3. Pouvoir accéder aux fichiers recherchés de manière rapide

## **Choix de la technologie**

\*\*\*\*

![](https://lh4.googleusercontent.com/USJkLjZJ9pp8qtaSKNt-_jg121E1RcnmdHgtF6vqo3CuE5XkAt0YfK_FrjfNa1NV3q-PjpewLmQSRt6YEUy8G0yeYybRDUPxN2eQHbosDSpl1kBMwEzIuhAEHFtuY94-CTS67ve6)

### **Electron**

Electron est un framework permettant de développer des applications multi-plateformes de bureau avec des technologies web \(Javascript, HTML et CSS\).

L'infrastructure \(backend\) est codée en node.js, et l'interface \(frontend\) est bâtie sur la base des outils Chromium, la partie open source de Google Chrome.

Electron a notamment permis de développer les éditeurs de texte libres Atom de Github et Visual Studio Code de Microsoft.

### **Pourquoi Electron ?**

Notre choix s’est porté sur Electron car nous voulions faire notre projet avec des langages web. Il y avait plusieurs façons de le faire mais nous avons décidé d’utiliser un nouveau framework ce qui nous permet d’en apprendre plus sur celui-ci bien que les risques de choisir une technologie qu’aucun de nous trois connaissait pouvait mener à plusieurs problèmes et prendraient plus de temps rien que pour découvrir les fonctionnalités d’Electron.  
****

![](.gitbook/assets/image%20%282%29.png)

### **React**

React est un framework qui permet de faire des interfaces avec du Javascript. Le code généré est du html et du css.

### **Pourquoi React ?**

Il aurait été possible de faire du html et css directement dans Electron. Avec cette solution, le temps de développement est plus important car on ne peut profiter des composants déjà développé par la communauté react.  


