// Write your JS here
let enemiesKilled = 0;
const myHero = {};
const hero = {
  name: "Anonymous",
  heroic: false,
  inventory: [],
  health: 10,
  weapon: { type: "pickaxe", damage: 2 }
};

function rest(person) {
  if (person.health === 10) {
    return alert("Health is already 10!");
  }
  person.health = 10;
  displayStats(hero);
  return person;
}

function pickUpItem(person, weapon) {
  person.inventory.push(weapon);
  displayStats(hero);
}

function equipWeapon(person) {
  if (person.inventory.length === 0) {
    return;
  }
  const weapon = person.inventory[0];
  person.weapon = weapon;
  displayStats(hero);
}

document.getElementById("inn").addEventListener("click", () => {
  rest(hero);
});

document.getElementById("dagger").addEventListener("click", () => {
  const weapon = {
    type: "dagger",
    damage: 2
  };
  pickUpItem(hero, weapon);
});

document.getElementById("bag").addEventListener("click", () => {
  equipWeapon(hero);
});

document.getElementById("submitNameChange").addEventListener("click", e => {
  e.preventDefault();
  const newName = document.getElementById("changeHeroName").value;
  if (newName !== "") {
    hero.name = newName;
    document.getElementById("changeHeroName").value = "";
    localStorage.setItem("username", newName);
  }
  displayStats(hero);
});

function displayStats({ name, health, weapon, inventory }) {
  const localUser = localStorage.getItem("username");
  if (localUser !== null) {
    name = localUser;
  }

  let inventToShow =
    inventory.length !== 0
      ? inventory.map(weapon => `${weapon.type}, damage: ${weapon.damage}//`)
      : "Pick Up Something";
  document.getElementById("heroScreenStats").innerHTML = `
  <h2>Hello, ${name}!</h2>
  <h3>Enemies killed: ${enemiesKilled}</h3>
  <h4>Health: ${health}.<br> 
    Weapon: ${weapon.type}, damage: ${weapon.damage}.<br>
    Inventory: ${inventToShow}.</h4>
  `;
  ifHeroAlive(hero);
}

displayStats(hero);

// Logic for enemies
let enemyCounter = 1;
let timerId;

const enemy = {
  name: "idler",
  health: 2,
  damage: 1,
  img:
    "https://cdn.pixabay.com/photo/2019/05/13/18/46/sloth-4200640_960_720.jpg"
};

function createEnemy() {
  const randTime = Math.floor(Math.random() * (1700 - 500)) + 500;
  timerId = setInterval(() => {
    document.getElementById("game").innerHTML += `
       <img
       src="${enemy.img}"
       alt="${enemy.name}"
       id="enemy${enemyCounter}"
     />
       `;
    hero.health = hero.health - 2;
    displayStats(hero);
    enemyCounter++;
  }, randTime);
}

document.getElementById("game").addEventListener("click", e => {
  if (e.target.id != "game") {
    const killed = e.target.id;
    document.getElementById(killed).remove();
    enemiesKilled++;
    displayStats(hero);
  }
});

function ifHeroAlive(person) {
  if (+person.health < 1) {
    clearInterval(timerId);
    document.getElementById("game").innerHTML = `
      <h1 id="gameOver">GAME OVER =) Sloths are faster then you. =) Just REFRESH page to continue!</h1>
    `;
  }
}

document.getElementById("gameMode").addEventListener("click", () => {
  createEnemy();
});
