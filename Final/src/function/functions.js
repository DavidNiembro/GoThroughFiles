/* format date fonction */
export function getDate(timestamp){
    let date = new Date(timestamp)
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"};
    return date.toLocaleDateString('fr-FR', options)
}

export function fileSizeSI(a,b,c,d,e){
    return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
        +' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
}