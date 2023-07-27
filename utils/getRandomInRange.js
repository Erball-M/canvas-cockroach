export default function getRandomInRange(min, max) {
    const res = Math.floor(Math.random() * (max - min + 1)) + min
    return res
}