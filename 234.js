function inTrash(id) {
let ntr = 0;
let lbi = libById(id);
if (lbi) {
let name = lbi.title;
ntr = sql('SELECT COUNT(*) FROM "' + name + '" WHERE removed = 1').asInt();
} 
return ntr;
}
