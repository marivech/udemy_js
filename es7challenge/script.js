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
    this.area = area; // km2
    this.treesNum = treesNum;
  }

  calculateTreeDensity() {
    return this.treesNum / this.area;
  }
};

class Street extends Obj {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear)

    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');

    return classification.get(this.size)
  }
};

const parks = [
  new Park('Park 1', 2010, 40, 100),
  new Park('Park 2', 2005, 1200, 356),
  new Park('Park 3', 2018, 200, 345)
];

const streets = [
  new Street('Street 1', 1980, 1.3, 2),
  new Street('Street 2', 1963, 4.1, 4),
  new Street('Street 3', 1968, 3.9),
  new Street('test', 1968, 2.4, 5),
];

function parkReport(p) {
  console.log('--- Park report ---');

  // task 1
  p.forEach(element => {
    console.log(`Tree density of ${element.name} is ${element.calculateTreeDensity()} trees per square km.`);
  });

  // task 2
  const ageSum = p.reduce((sum, elm) => sum + elm.age, 0);
  console.log(`Average age of parks is ${ageSum / p.length}.`);

  // task 3
  const treedParkIndex = p.findIndex(elm => elm.treesNum > 1000);
  console.log(`${p[treedParkIndex].name} has more than 1000 trees`);
}

function streetReport(s) {
  console.log('--- Street report ---');

  // task 4
  const lengthSum = s.reduce((sum, elm) => sum + elm.length, 0);
  console.log(`Total length of streets is ${lengthSum}`);
  console.log(`Average length of streets is ${lengthSum / s.length}`);

  // task 5
  s.forEach(elm => {
    console.log(`${elm.name} is ${elm.classifyStreet(this.size)}`);
  });
}

parkReport(parks);
streetReport(streets);

