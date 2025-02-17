export const badWord = [
    "alay", "ampas", "buta", "keparat", "anjing", "anjir", "babi", "bacot",
    "bajingan", "banci", "bandot", "buaya", "bangkai", "bangsat", "bego",
    "bejat", "bencong", "berak", "bisu", "celeng", "jancuk", "bodoh",
    "berengsek", "budek", "burik", "jamban", "cocot", "congor", "culun",
    "cupu", "dongok", "dungu", "edan", "tai", "ngewe", "geblek", "gembel",
    "gila", "goblok", "iblis", "idiot", "jablay", "jembud", "jembut", "jijik",
    "kacrut", "kafir", "modar", "kampang", "kampret", "kampungan", "kimak",
    "kontol", "kunti", "tuyul", "kunyuk", "mampus", "memek", "monyet", "najis",
    "nete", "ngentot", "noob", "pecun", "perek", "sampah", "sarap", "setan",
    "silit", "bokong", "sinting", "sompret", "sontoloyo", "terkutuk", "titit",
    "pantat", "tolol", "udik", "antek", "asing", "ateis", "sitip", "autis",
    "picek", "ayam kampus", "bani kotak", "bispak", "bisyar", "bokep",
    "bong", "cacat", "cct", "cebong", "taplak", "cungkring", "gay",
    "gembrot", "gendut", "hina", "homo", "komunis", "koreng", "krempeng",
    "lengser", "lesbi", "lgbt", "lonte", "mucikari", "munafik", "ngaceng",
    "nista", "kejam", "onta", "panastak", "panasbung", "bani", "pasukan nasi",
    "porno", "seks", "rejim", "rezim", "sange", "serbet", "sipit", "transgender",

    // Kata toxic dalam bahasa Jawa
    "asu", "jancuk", "ndasmu", "gendeng", "cok", "picek", "bajigur",
    "jancok", "setan", "mbelgedes", "matamu", "raimu", "gundulmu",
    "kutho", "mbangsan", "kacuk", "goblog", "mbelgedes",

    // Singkatan
    "ajg", "anj", "mmk", "ntl", "gblk", "bgo", "kntl", "pmk", "anjg",
    "pkai", "bajngan", "ckck", "dngk", "bgt", "jmbt", "bdjngn", "ctt"
];


export const badWordFilter = (teks) => {
    const paragraph = teks.toLowerCase().split(" ");
    return paragraph.filter(word => badWord.includes(word));
};