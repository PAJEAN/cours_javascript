# *Binary Search Tree* (BST) ou arbre binaire de recherche

BST est une structure de données prenant la forme d'un **arbre binaire**. Les BST permettent de réaliser des opérations rapides pour tester la présence d'une valeur précise, rechercher la valeur minimale ou bien maximale d'un tableau. Les propriétés d'un BST sont les suivantes:
* Le sous-arbre situé à la gauche d'un noeud contient uniquement des noeuds dont la valeur est inférieure au noeud actuel.
* Le sous-arbre situé à la droite d'un noeud contient uniquement des noeuds dont la valeur est supérieure au noeud actuel.

![BST](images/BSTSearch.png "BST")

[Source](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)

À partir de la structure suivante, implémenter les différentes fonctions.

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

	isPresent(){
		/* Insert code */
	}

	remove(){
		/* Insert code */
	}
}
```



