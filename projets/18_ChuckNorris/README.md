# API Chuck Norris fact

## Objectif

Mettre en œuvre le patron de conception MVC (Model – View – Controller) en JavaScript, en utilisant la propriété des fonctions de première classe pour assurer la communication entre les différentes couches de l’application. Dans cet exercice, le Controller se limite à une classe chargée d’assurer la liaison des fonctions entre le Model et la View.

# Énoncé

Vous devez développer une application JavaScript permettant d’afficher dynamiquement une Chuck Norris Fact récupérée depuis une API publique.

L’application doit respecter l’architecture MVC et fonctionner de la manière suivante :

* Un bouton est affiché à l’écran.
* Lorsqu’un utilisateur clique sur ce bouton, une requête HTTP est envoyée vers une API distante.
* Le texte retourné par l’API est ensuite affiché dans la page sans rechargement.

## L'architecture MVC (Modèle-Vue-Controleur)

Un modèle MVC est une manière d'organiser votre code.

* Le modèle (*Model*) gère les données et le contenu algorithmique de votre application.
* La vue (*View*) est la représentation visuelle du modèle.
* Le controleur (*Controller*) réalise le lien entre l'utilisateur (la vue) et le système (le modèle).

![MVC](MVC.png "MVC")

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

### Model

* Le Model doit être responsable de la récupération des données depuis l’API https://api.chucknorris.io/jokes/random.
* Il ne doit pas manipuler directement le DOM.
* Il doit **exposer une méthode** permettant de notifier le Controller lorsque les données sont disponibles (binding).

### View

* La View doit être responsable de l’affichage (création du bouton et du texte).
* Elle ne doit pas accéder directement au Model.
* Elle doit pouvoir déclencher une action lorsqu’un utilisateur clique sur le bouton.

### Controller

* Le Controller doit faire le lien entre le Model et la View.
* Il doit assurer **le binding des méthodes** afin de préserver le contexte (this) lors des appels de fonctions. Un exemple, il doit lier l'une de ses fonctions (qui intéragit avec la Vue) avec un attribut du Model afin que le Model puisse l'éxécuter et communiquer indirectement avec la Vue.