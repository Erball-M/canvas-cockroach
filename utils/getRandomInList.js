export default function getRandomInList(...list) {
    const res = Math.floor(Math.random() * list.length)
    return list[res]
}