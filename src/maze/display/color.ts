// gen color by number from white to black
export default function genColor(num: number): string {
    const max = 255;
    const min = 30;
    const r = Math.floor(min + (max - min) * (num % 256) / 255);
    const g = Math.floor(min + (max - min) * (num % 256) / 255);
    const b = Math.floor(min + (max - min) * (num % 256) / 255);
    return `rgba(${r},${g},${b}, 30)`;
}