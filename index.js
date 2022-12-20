const express = require("express");
const treeify = require("treeify");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!

global.DEBUG = true;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/userTree", async (req, res) => {
    nums = await req.body.numbers;
    numStringArray = nums.split(",");
    arrOfNum = numStringArray.map((str) => {
        return Number(str);
    });

    const maple = new Tree();

    try {
        for (let n = 0; n < arrOfNum.length; n++) {
            maple.insert(arrOfNum[n]);
        }
    } catch {
        res.render("503");
    }
    console.log(treeify.asTree(maple, true));
    res.send(`<pre>${treeify.asTree(maple, true)}</pre>`);
});

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const recursion = (node) => {
            if (node === null) {
                return new Node(value);
            } else if (value < node.value) {
                node.left = recursion(node.left);
            } else if (value > node.value) {
                node.right = recursion(node.right);
            } else {
                throw new Error("Cannot be equal, try again please!");
            }

            if (nodeBalance(node) > 1) {
                return nodeRotateLeft(node);
            } else if (nodeBalance < -1) {
                return nodeRotateRight(node);
            } else {
                return node;
            }
        };
        this.root = recursion(this.root);
    }
    search(value) {
        const recursiveSearch = (node) => {
            if (node === null) {
                return false;
            } else if (value < node.value) {
                return recursiveSearch(node.left);
            } else if (value > node.value) {
                return recursiveSearch(node.right);
            } else {
                return true;
            }
        };
        return recursiveSearch(this.root);
    }
}
function nodeHeight(node) {
    if (node === null) {
        return -1;
    } else if (node.left === null && node.right === null) {
        return 0;
    } else {
        return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right));
    }
}
function nodeBalance(node) {
    return nodeHeight(node.right) - nodeHeight(node.left);
}
function nodeRotateLeft(node) {
    if (node === null || node.right === null) {
        return node;
    }
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;
}
function nodeRotateRight(node) {
    if (node === null || node.left === null) {
        return node;
    }
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
}

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`);
});
