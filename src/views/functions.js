export function getDate(timestamp){
    let date = new Date({timestamp})
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"};
    return date.toLocaleDateString('fr-FR', options)
}