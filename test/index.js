const {DoubleLinkedList, HashTable} = require('../lib');

const table = new HashTable(32, value => value);

table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(1);
table.add(2);

table.delete(2);
table.delete(2);

table.forceExpansion();

console.log(table);