# Installation développement

## **Installation Build & Packaging développement**

Si vous voulez passer par une installation depuis le repository de notre GitHub, vous devez faire une git clone de notre projet.

```bash
Git clone https://github.com/DavidNiembro/GoThroughFiles.git
```

Ensuite, ne pas oublier d'installer les modules nécessaires en lançant ces deux commande.

```bash
yarn
npm install
```

Puis pour créer une version compilé pour packager notre application, vous devez lancer cette commande

```bash
yarn build
```

à la racine de l’application. Cette commande va faire un pre-packaging de notre application en compilant notre code dans un dossier Build.



Puis pour faire le packaging sur les trois plateformes, il faut lancer ces trois commandes

```
pour Windows : npm run windows
```

```bash
pour Linux : npm run linux
```

```bash
pour Mac : npm run mac
```

Pour créer le setup, c’est la même chose que pour le packaging. Il faut lancer ces trois commandes

```bash
pour Windows : npm run create-installer-win
```

```bash
pour Linux : npm run create-debian-installer
```

```bash
pour Mac : npm run create-installer-mac
```

{% hint style="info" %}
Attention, pour lancer les versions Mac et Linux, il faut impérativement être sur une machine qui à le même système d'exploitation que le package que vous voulez faire.
{% endhint %}

Et les exécutables se trouvent dans un dossier.  
****

## **Installation utilisateur**

Ce que le client va recevoir, dépendant de la plateforme où il travaille, est le fichier exécutable qui va permettre le lancement de notre application. Les différents setup se trouvent dans Release sur le github.  
****

**`Cf : GoThroughFiles_setup.exe (pour Windows)`**  


Le logiciel utilisé sous windows se nomme “Squirrel”. Il va lancer une version portable de notre application, c’est-à-dire que notre application ne va pas s’installer sur votre système d’exploitation, il va directement le lancer quand “Squirrel” aura terminé de décompresser tous les packages dont l’application a besoin et vous aurez votre application à partir de n’importe quel endroit \(ex. à partir d’une clé USB ou d’un disque dur externe pour autant qu’ils soient branchés sur votre PC\)  


{% hint style="info" %}
Vu que nous n'avons pas signé notre application, il se peut que votre antivirus réagisse faussement à notre application au lancement du setup, veuillez l'ignorer et accepter l'installation.
{% endhint %}



