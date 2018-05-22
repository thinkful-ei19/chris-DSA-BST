const BinarySearchTree = require('./binaryTrees');

/*
Draw a BST
Given the following data 3,1,4,6,9,2,5,7. 
If you were to insert this into an empty Binary Search Tree,
how would the tree look like? (Draw the tree, no coding needed here)

                3
            1       4
                2       6
                    5       9
                        7

*/
/*
Remove the root
Show how the tree would look like if you deleted the root.
(Draw the tree, no coding needed here)
Find the largest value on the left side, or the smallest value on the right.

                3
            1       4
                2       6
                    5       9
                        7
*/

/*
Create a BST class
Walk through the Binary Search Tree code in the curriculum and understand it well.
Then write a Binary Search Tree class and with its core functions
(insert, remove, find) from scratch.

Create a Binary Search Tree called BST and insert 3,1,4,6,9,2,5,7 to your tree.
Compare your result with the result from the first exercise
*/

// E A S Y Q U E S T I O N
// JavaScript will automatically compare value of alphabetical chars

// class BinarySearchTree {
//     constructor(key=null, value=null, parent=null) {
//         this.key = key;
//         this.value = value;
//         this.parent = parent;
//         this.left = null;
//         this.right = null;
//     }

//     insert(key, value) {
//         if (this.key == null) {
//             this.key = key;
//             this.value = value;
//         } 
//         else if (key < this.key) {
//                 if (this.left == null) {
//                     this.left = new BinarySearchTree(key, value, this)
//                 }
//         }

//     }

//     find() {

//     }

//     remove() {

//     }

//     _replaceWith() {

//     }

//     _findMin() {

//     }
// }

let bst = new BinarySearchTree()

bst.insert(3, 3);
bst.insert(1, 1);
bst.insert(4, 4);
bst.insert(6, 6);
bst.insert(9, 9);
bst.insert(2, 2);
bst.insert(5, 5);
bst.insert(7, 7);

/*
Height of a BST
Write an algorithm to find the height of a binary search tree. 
What is the run time of your algorithm?
*/

function findHeight(tree) {

    let currNode = tree;
    let smallest = tree.key;
    let largest = tree.key;
    while (currNode.right !== null) {
        currNode = currNode.right;
        if (currNode.key > largest) {
            largest = currNode.key   
        }
    }
    currNode = tree
    while (currNode.left !== null) {
        currNode = currNode.left;
        if (currNode.key < smallest) {
            smallest = currNode.key
        }
    }
    let highest = 0;
    for (let i=smallest; i <= largest; i++) {
        let count = tree.count(i)
        if (count > highest) {
            highest = count
        }
    }
    console.log(highest)
    return highest
}

// findHeight(bst)

/*
is it BST?
Write an algorithm to check whether an arbitrary binary tree is a binary search
tree, assuming the tree does not contain duplicates
*/

const fake = new BinarySearchTree();

fake.insert(3, 3);
fake.insert(1, 1);
fake.insert(4, 4);
fake.insert(6, 6);
fake.insert(9, 9);
fake.insert(2, 2);
fake.insert(5, 5);
fake.insert(7, 7);
/*
            3
        1      4
          2       6
                4   9
                  7
*/
// fake.left.right.key = 0 
fake.right.right.left.key = 7

function isBST(tree) {
    console.log(tree.value)
    if (tree.left !== null && tree.right !== null) {
        if (tree.key < tree.left.key) {
            return false
        } else if (tree.key > tree.right.key) {
            return false
        } else {
            if (isBST(tree.left) === false) {
                return false
            }
            if (isBST(tree.right) === false) {
                return false
            }
        }
    }
    else if (tree.left !== null) {
        if (tree.key < tree.left.key) {
            return false
        }
        if (isBST(tree.left) === false) {
            return false
        }
    }
    //tree.key > tree.right.key
    else if (tree.right !== null) {
        if (tree.key > tree.right.key) {
            return false
        }
        if (isBST(tree.right) === false) {
            return false
        }
    }
    return true;
}

// console.log(isBST(bst))
// console.log(isBST(fake))
// // console.log(fake)

/*
Third largest node
Write an algorithm to find the third largest node in a binary search tree
*/

function thirdLargestNode(tree, first = 0, second = 0, third = 0) {

    let currNode = tree;
    let smallest = tree.key;
    let largest = tree.key;
    while (currNode.right !== null) {
        currNode = currNode.right;
        if (currNode.key > largest) {
            largest = currNode.key   
        }
    }
    currNode = tree
    while (currNode.left !== null) {
        currNode = currNode.left;
        if (currNode.key < smallest) {
            smallest = currNode.key
        }
    }

    for (let i=smallest; i <= largest; i++) {
        try {
            if (tree.find(i) > third) {
                third = tree.find(i)
            }
            while (third > second) {
                let placeholder = second;
                second = third;
                third = placeholder;
            }
            while (second > first) {
                let placeholder = first;
                first = second;
                second = placeholder;
            }
        }
        catch (err) {}
    }

    return third

}

// console.log(thirdLargestNode(bst))

/*
Balanced BST
Write an algorithm that checks if a BST is balanced
(i.e. a tree where no two leaves differ in distance
from the rootby more than one).
*/

function isBalanced(tree) {
    let lowestCount = null;
    let highestCount = 0;

    let currNode = tree;
    let smallest = tree.key;
    let largest = tree.key;
    while (currNode.right !== null) {
        currNode = currNode.right;
        if (currNode.key > largest) {
            largest = currNode.key   
        }
    }
    currNode = tree
    while (currNode.left !== null) {
        currNode = currNode.left;
        if (currNode.key < smallest) {
            smallest = currNode.key
        }
    }

    for (let i=smallest; i <= largest; i++) {
        let count;
        try {
            let find = tree.findNode(i)
            if (find.left === null && find.right === null) {
                count = tree.count(i)
            }
        } catch (err) {}
        if (!lowestCount) {
            lowestCount = count
        }
        if (count > highestCount) {
            highestCount = count;
        } else if (count < lowestCount) {
            lowestCount = count;
        }
    }
    
    if (lowestCount < highestCount -1) {
        return false;
    }
    return true;

}

// isBalanced(bst);
console.log(isBalanced(bst))