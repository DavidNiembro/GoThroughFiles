# Explications détaillées

## Explications détaillées du projet

Le but premier de l’application est de pouvoir retrouver un fichier dans un dossier et ses sous-dossiers selon le cahier des charges fixé.  


Pour cela nous avons mis en place plusieurs paramètres de recherche:  


* Recherche par titre de fichier \(inclus de base\)
* Recherche par contenu dans le fichier

La recherche par titre de fichier comprend tous les fichiers ayant comme nom celui que nous recherchons. Par exemple, si nous recherchons l'année: “2018”, tous les fichiers contenant cette année dans leur titre s’affichent:

* Présentation\_2018.pdf
* 2018\_Camp\_Été.txt
* 2018.txt
* 2018.odt
* ..2018..extension

La recherche par contenu s’occupe d’afficher les fichiers contenant le ou les mots en que l'utilisateur veut rechercher. Les fichiers pris en compte actuellement sont les fichiers texte brut:

* .txt
* .md
* .rtf
* .xml
* .html
* .css

et les fichiers textes compressés:

* .pdf
* .docx

Quand le résultat est retourné il est possible d’ouvrir le fichier en appuyant sur le bouton prévu à cet effet \(“Ouvrir”\) ou de cliquer sur le fichier et voir les métadonnées s’afficher puis appuyer sur le bouton d’ouverture.  


### **Diagramme des cas d'utilisation \(Uses Cases\)**



![](https://lh6.googleusercontent.com/aCtnHP8QD7oDm6rS5oVBGFsM6PLYHSKgrCHskbElsq1ev5ecFEneM3OUY8uf_HHFiQ2623daOtXRFirafNoS2AAjUSpNj8WzIM_ircBn-Si1gv2-QOuF4hY_J9TSB1qp9ulcr0Wk)

### \*\*\*\*

### **Architecture du système**



![](https://lh4.googleusercontent.com/6pf9MjAzrDqlCMvhPjXWhj98q1cgPIHrERb07ToIB_BRikC0Zlvyo3ax8KrrGZOHRuVjmU1wI58RXvKeFm6gXHb4NPsH0LgY2PsF_t1YPJJTu3pRMlRDIirOFI9suEUHjXr4YiBf)



Nous avons d’un côté Electron qui s’occupe du Backend et de l’autre React, notre Frontend.  


La recherche se fait directement dans les dossiers et sous-dossiers sans passer par une indexation des fichiers ou une base de donnée.  
****

\*\*\*\*

