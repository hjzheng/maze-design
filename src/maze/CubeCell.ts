import Cell from "./Cell";

export default class CubeCell extends Cell {
    face: number;

    constructor(face: number, row: number, column: number) {
        super(row, column);
        this.face = face;
    }
}