/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Obj {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;

    const currentYear = new Date().getFullYear();
    this.age = currentYear - this.buildYear;
  }
}

class Park extends Obj {
  constructor(name, buildYear, treesNum, area) {
    super(name, buildYear)
    this.area = area;
    this.treesNum = treesNum;

    this.density = this.treesNum / this.area;
  }
};

class Street extends Obj {
  constructor(name, buildYear, length, size = 'normal') {
    super(name, buildYear)

    this.length = length;
    this.size = size;
  }
};
// no actual need in maps, but used to practise
const parkMap = new Map();
parkMap.set('istanbul', new Park('Стамбул', 2010, 40, 100));
parkMap.set('les', new Park('Г-О Лес', 2005, 1200, 356));
parkMap.set('kaban', new Park('озеро Кабан', 2018, 200, 345));

const streetMap = new Map();
streetMap.set('bondarenko', new Street('Бондаренко', 1980, 1.3, 'small'));
streetMap.set('chistay', new Street('Чистопольская', 1963, 4.1, 'big'));
streetMap.set('yamasheva', new Street('Ямашева', 1968, 3.9));
streetMap.set('test', new Street('test', 1968, 2.4, 'huge'));

// task 1
for (const [key, value] of parkMap) {
  console.log(`Tree density of ${value.name} is ${value.density}.`);
}

// task 2
let ageSum = 0;
for (const [key, value] of parkMap) {
  ageSum =+ value.age
}
console.log(`Average age of parks is ${ageSum / parkMap.size}.`);

// task 3
for (const [key, value] of parkMap) {
  if (value.treesNum > 1000) {
    console.log(`${value.name} has more than 1000 trees.`);
  }
}

// task 4
let streetLength = 0;
for (const [key, value] of streetMap) {
  streetLength += value.length;
}
console.log(`Total length of streets is ${streetLength}`);
console.log(`Average length of streets is ${streetLength / streetMap.size}`);

// task 5 
for (const [key, value] of streetMap) {
  console.log(`${value.name} is ${value.size}`);
}
