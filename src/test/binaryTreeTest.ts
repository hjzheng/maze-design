import Grid from '../maze/Grid';
import BinaryTree from '../maze/gen/binaryTree';
import ascii from '../maze/display/ascii';
import svg from '../maze/display/svg';

export default function binaryTreeTest(): string {
    const grid = new Grid(10, 10);
    console.log(ascii(grid));
    const binaryTree = new BinaryTree();
    binaryTree.on(grid);
    const res = ascii(grid);
    console.log(res);
    return svg(grid);
}