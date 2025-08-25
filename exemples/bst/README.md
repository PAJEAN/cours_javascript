# *Binary Search Tree* (BST) ou arbre binaire de recherche

BST est une structure de données prenant la forme d'un **arbre binaire**. Les BST permettent de réaliser des opérations rapides pour tester la présence d'une valeur précise, rechercher la valeur minimale ou bien maximale d'un tableau. Les propriétés d'un BST sont les suivantes:
* Le sous-arbre situé à la gauche d'un noeud contient uniquement des noeuds dont la valeur est inférieure au noeud actuel.
* Le sous-arbre situé à la droite d'un noeud contient uniquement des noeuds dont la valeur est supérieure au noeud actuel.

![BST](images/BSTSearch.png "BST")

[Source](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)

À partir de la structure suivante, implémenter les différentes fonctions.

Structure Javascript (BST.js):

```
class Node{
	constructor(data, left = null, right = null){
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class BST{
	constructor(){
		this.root = null;
	}

	add(data){
		/* Insert code */
	}

	findMin(){
		/* Insert code */
	}

	findMax(){
		/* Insert code */
	}

	update(){
		/* Insert code */
	}
}
```

Descriptif des fonctions:
* *add(data)* permet d'ajouter un nouveau noeud dans le graphe actuel. L'ajout de ce noeud doit considérer les propriétés du BST.
* *findMin()* recherche le noeud le plus à gauche dans le graphe.
* *findMax()* recherche le noeud le plus à droite dans le graphe.
* *isPresent()* vérifie la présence d'un noeud dans le graphe en tenant compte des propriétés du BST.
* *update()* met les inputs Minimum et Maximum de la page web à jour et affiche le graphe à partir de la librairie *viz.js*.

Stucture HTML (BST.html):

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>BST</title>
	</head>
	<body>
		<table>
			<tr><td>Minimum</td><td id="minimum"></td></tr>
			<tr><td>Maximum</td><td id="maximum"></td></tr>
		</table>
		<div>
			<input type="text" id="add">
			<button id="add-button">Ajouter</button>
		</div>

		<div id="graph"></div>

		<script src="viz.js"></script>
		<script src="full.render.js"></script>
		<script src="BST.js"></script>
	</body>
</html>
```

Exemple de la librairie [*viz.js*](https://github.com/mdaines/viz.js/wiki/Usage). Les fichiers de la librairie graphique sont présents dans le dossier exemples/librairies.

```
<script src="viz.js"></script>
<script src="full.render.js"></script>
<script>
	let viz = new Viz();
	viz.renderSVGElement('digraph { a -> b [dir="both"] }')
	.then(function(element) {
		document.body.appendChild(element);
	})
	.catch(error => {
		// Possibly display the error
		console.error(error);
	});
</script>
```



