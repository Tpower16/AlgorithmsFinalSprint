class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

class BinarySearchTree {
    constructor(CompareFn = this.defaultCompare) {
        this.CompareFn = CompareFn;
        this.root = null;
    }
    defaultCompare(a, b) {
        if (a === b) {
            return Compare.EQUALS;
        }
        return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN

    }

    insert(key) {
        if (this.root === null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }

    }
    insertNode(node, key) {
        if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }

        } else {
            if (node.right === null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }

    }
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);

        }

    }

    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)

    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }

    }

    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);

        }
    }

    min() {
        return this.minNode(this.root);

    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;

    }

    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }

    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.CompareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);

        } else {
            return true;
        }

    }

    //Removing a node
    remove(key) {
        this.root = this.removeNode(this.root, key); // {1}
    }
    removeNode(node, key) {
        if (node == null) { // {2}
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // {3}
            node.left = this.removeNode(node.left, key); // {4}
            return node; // {5}
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) { // {6}
            node.right = this.removeNode(node.right, key); // {7}
            return node; // {8}
        } else {
            // key is equal to node.item
            // case 1
            if (node.left == null && node.right == null) { // {9}
                node = null; // {10}
                return node; // {11}
            }
            // case 2
            if (node.left == null) { // {12}
                node = node.right; // {13}
                return node; // {14}
            } else if (node.right == null) { // {15}
                node = node.left; // {16}
                return node; // {17}
            }
            // case 3
            const aux = this.minNode(node.right); // {18}
            node.key = aux.key; // {19}
            node.right = this.removeNode(node.right, aux.key); // {20}
            return node; // {21}
        }
    }

}



//AVL TREE

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    defaultCompare(a, b) {
        if (a === b) {
            return Compare.EQUALS;
        }
        return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1;
    }
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    rotationLL(node) {
        const tmp = node.left; // {1}
        node.left = tmp.right; // {2}
        tmp.right = node; // {3}
        return tmp;
    }
    rotationRR(node) {
        const tmp = node.right; // {1}
        node.right = tmp.left; // {2}
        tmp.left = node; // {3}
        return tmp;
    }
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    //Inserting a node in an AVL tree works the same way as in BST.

    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        // insert node as in BST tree
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node; // duplicated key
        }
        // balance the tree if needed
        const balanceFactor = this.getBalanceFactor(node); // {1}
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {2}
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) { // {3}
                node = this.rotationLL(node); // {4}
            } else {
                return this.rotationLR(node); // {5}
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {6}
            if (
                this.compareFn(key, node.right.key) === Compare.BIGGER_THAN
            ) { // {7}
                node = this.rotationRR(node); // {8}
            } else {
                return this.rotationRL(node); // {9}
            }
        }
        return node;
    }

    //Removing a node from the AVL Tree

    removeNode(node, key) {
        node = super.removeNode(node, key); // {1}
        if (node == null) {
            return node; // null, no need to balance
        }
        // verify if tree is balanced
        const balanceFactor = this.getBalanceFactor(node); // {2}
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) { // {3}
            const balanceFactorLeft = this.getBalanceFactor(node.left); // {4}
            if (
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) { // {5}
                return this.rotationLL(node); // {6}
            }
            if (
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) { // {7}
                return this.rotationLR(node.left); // {8}
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) { // {9}
            const balanceFactorRight = this.getBalanceFactor(node.right); // {10}
            if (
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) { // {11}
                return this.rotationRR(node); // {12}
            }
            if (
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) { // {13}
                return this.rotationRL(node.right); // {14}
            }
        }
        return node;
    }
}

// defaultCompare(a, b) {
//     if (a === b) {
//         return Compare.EQUALS;
//     }
//     return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
// }
const printNode = (value) => console.log(value);


const tree1 = new BinarySearchTree();

const tree = new AVLTree(tree1.CompareFn);
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(6);
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)




tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);