import Grid from '../maze/Grid';
import BinaryTree from '../maze/gen/binaryTree';

export default function binaryTreeTest(): string {
    const grid = new Grid(10, 10);
    console.log(grid.toString());
    const binaryTree = new BinaryTree();
    binaryTree.on(grid);
    console.log(grid.toString());
    return grid.toSVG();
}