# *Snake*, le projet

L'objectif de ce projet orienté est de concevoir en JavaScript le jeu Snake au travers d'un modèle [MVC](https://www.taniarascia.com/javascript-mvc-todo-app/) (*Model, View, Controller*) sans utiliser de *framework* dédié. Cet exercice vous permettra de mettre en oeuvre la plupart des notions étudiées lors de ce cours telles que la programmation orientée objet, les fonctions d'ordre supérieur, la manipulation des tableaux ou bien le dessin avec l'élément canvas.

Ce projet représente l'évaluation pour la matière technologie du Web. À la fin, vous devrez présenter votre travail au sein d'un rapport et partager votre code source avec l'encadrant. Le rapport devra notamment notifier des différents choix algorithmiques choisis lors de la construction du modèle et la manière dont le code est structuré (le rapport ne doit pas contenir de code - ou alors uniquement les éléments importants -). La note tiendra compte de la qualité du rapport, de la rigueur du code et de l'attitude lors des séances de projet.

## Le cahier des charges

### Le modèle MVC

Un modèle MVC est une manière populaire d'organiser votre code.

* Le modèle (*Model*) gère les données et le contenu algorithmique de votre application.
* La vue (*View*) est la représentation visuelle du modèle.
* Le controleur (*Controller*) réalise le lien entre l'utilisateur (la vue) et le système (le modèle).

![MVC](images/readme/mvc-role-diagram.png "MVC")
[Source](https://www.codeproject.com/Articles/879896/Programming-in-Java-using-the-MVC-Architecture)

Au sein de cet exercice, le modèle représente le *snake* et son environnement, à savoir: la grille dans laquelle le *snake* évolue, l'emplacement du *snake* et de la nourriture, la condition de victoire et les conditions de défaite et enfin le score. La vue, quant à elle, contient la manière de représenter visuellement le déplacement du *snake*, les conditions de victoire et de défaite et le score. Enfin, le controleur connecte la vue et le modèle pour faire transiter les données de l'utilisateur (par exemple appuyer sur une touche directionnelle) vers le système afin de modifier les données actuelles.

```
class Model {
  constructor() {}
}

class View {
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}

const app = new Controller(new Model(), new View())
```

### Les fonctionnalités de base du *snake*

Dans le jeu du [*snake*](https://www.youtube.com/watch?v=D4AYZGbHZmM), le joueur dirige un "serpent" (symbolisé par une ligne), au sein d'une grille. Ce serpent grandit lorsqu'il mange un fruit (la taille de la ligne grandit de une unité). Le jeu prend fin lorsque le serpent touche un bord de la grille ou alors sa propre queue. L'objectif est de réussir à obtenir le score le plus élevé symbolisant le nombre de fruits mangés.

Un fruit est initialisé au début de la partie et lorsqu'il est mangé, un nouveau fruit est généré au sein de la grille de manière aléatoire en tenant compte de la position du serpent.

L'utilisateur doit pouvoir modifier la direction qu'emprunte le serpent au travers des touches directionnelles du clavier. Lorsqu'un serpent possède une queue, ses mouvements sont restreints à trois positions au lieu de quatre. En effet, s'il se dirige vers la droite, il ne peut pas immédiatement revenir sur sa gauche (sinon il se mord directement la queue).

Lorsque la partie prend fin, le joueur doit avoir la possibilité de recommencer une partie.

### Les fonctionnalités bonus

* Ajouter un *Highscore*.
* Modifier le *skin* du serpent.
