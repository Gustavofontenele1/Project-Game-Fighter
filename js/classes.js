// Knight ou Sorcerer
//LittleMonster ou BigMonster

class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }
  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 16;
    this.defense = 3;
    this.maxLife = this.life;
  }
}

class LittleMonster extends Character {
  constructor() {
    super("Little Monster");
    this.life = 40;
    this.attack = 6;
    this.defense = 4;
    this.maxLife = this.life;
  }
}

class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.life = 120;
    this.attack = 15;
    this.defense = 6;
    this.maxLife = this.life;
  }
}

class Stage {
  constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
    this.fighter1 = fighter1;
    this.fighter2 = fighter2;
    this.fighter1El = fighter1El;
    this.fighter2El = fighter2El;
    this.log = logObject;
  }

  start() {
    this.update();

    this.fighter1El
      .querySelector(".attackButton1")
      .addEventListener("click", () =>
        this.doAttack(this.fighter1, this.fighter2)
      );
    this.fighter2El
      .querySelector(".attackButton2")
      .addEventListener("click", () =>
        this.doAttack(this.fighter2, this.fighter1)
      );
  }

  update() {
    //Fighter 1
    this.fighter1El.querySelector(".name").innerHTML = `${
      this.fighter1.name
    } - ${this.fighter1.life.toFixed(1)} HP`;
    let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
    this.fighter1El.querySelector(".bar").style.width = `${f1Pct}%`;

    //Fighter 2
    this.fighter2El.querySelector(".name").innerHTML = `${
      this.fighter2.name
    } - ${this.fighter2.life.toFixed(1)} HP`;
    let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
    this.fighter2El.querySelector(".bar").style.width = `${f2Pct}%`;
  }

  doAttack(attacking, attacked) {
    if (attacking.life <= 0 || attacked.life <= 0) {
      if (attacked === this.fighter1 && attacked.life <= 0) {
        this.log.addMessage(`${attacked.name} assassinou ${attacking.name}`);
        this.update();
      } else if (attacking === this.fighter2 && attacked.life <= 0) {
        this.log.addMessage(`${attacking.name} assassinou ${attacked.name}`);
        this.update();
      }
      return;
    }

    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() * 2).toFixed(2);

    let actualAttack = attacking.attack * attackFactor;
    let actualDefense = attacked.defense * defenseFactor;

    if (actualAttack > actualDefense) {
      if (attacking === this.fighter1) {
        animationHero("heroAttack", "1.5s");
        animationMonster("monsterHurt", "1.5s");
        this.log.addMessage(
          `${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${
            attacked.name
          }`
        );

        attacked.life -= actualAttack;
      } else if (attacking === this.fighter2) {
        animationHero("heroHurt", "1.5s");
        animationMonster("monsterAttack", "1.5s");
        this.log.addMessage(
          `${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${
            attacked.name
          }`
        );
        attacked.life -= actualAttack;
      }
    } else {
      if (attacked === this.fighter1) {
        animationHero("heroDefense", "1.5s");
        animationMonster("monsterAttack", "1.5s");
        setTimeout(() => {
          this.log.addMessage(`${attacked.name} conseguiu se defender ...`);
        }, 1500);
      } else {
        animationHero("heroAttack", "1.5s");
        animationMonster("monsterDefense", "1.5s");
        setTimeout(() => {
          this.log.addMessage(`${attacked.name} conseguiu se defender ...`);
        }, 1500);
      }
    }

    if (attacking.life <= 0 || attacked.life <= 0) {
      if (attacked === this.fighter1 && attacked.life <= 0) {
        setTimeout(() => {
          this.log.addMessage(`${attacking.name} assassinou ${attacked.name}`);
          animationHeroLose("heroDeath", "1.5s");
          this.update();
        }, 1500);
      } else if (attacked === this.fighter2 && attacked.life <= 0) {
        setTimeout(() => {
          this.log.addMessage(`${attacking.name} assassinou ${attacked.name}`);
          animationMonsterLose("monsterLose", "1.5s");
          this.update();
        }, 1500);
      }
    }

    this.update();
  }
}

class Log {
  list = [];

  constructor(listEl) {
    this.listEl = listEl;
  }

  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }

  render() {
    this.listEl.innerHTML = "";

    for (let i in this.list) {
      this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
    }
  }
}

function animationHero(animation, seconds) {
  let hero = document.querySelector(".hero");
  disabledButton(true, false, 1500);
  hero.style.animation = `${animation} ${seconds}`;
  hero.style.opacity = "1";
  setTimeout(() => {
    hero.style.animation = "none";
  }, 1500);
}

function animationMonster(animation, seconds) {
  let monster = document.querySelector(".monster");
  disabledButton(true, false, 1500);
  monster.style.animation = `${animation} ${seconds}`;
  monster.style.opacity = "1";
  setTimeout(() => {
    monster.style.animation = "none";
  }, 1500);
}

function animationMonsterLose(animation, seconds) {
  let monster = document.querySelector(".monster");
  disabledButton(true, true, 0);
  monster.style.animation = `${animation} ${seconds}`;
  monster.style.opacity = "1";
  setTimeout(() => {
    monster.style.opacity = "0";
  }, seconds);
}

function animationHeroLose(animation, seconds) {
  let hero = document.querySelector(".hero");
  disabledButton(true, true, 0);
  hero.style.animation = `${animation} ${seconds}`;
  hero.style.opacity = "1";
  setTimeout(() => {
    hero.style.opacity = "0";
  }, seconds);
}

function disabledButton(boolean1, boolean2, time) {
  let button1 = document.querySelector(".attackButton1");
  let button2 = document.querySelector(".attackButton2");

  button1.disabled = boolean1;
  button2.disabled = boolean1;

  setTimeout(() => {
    button1.disabled = boolean2;
    button2.disabled = boolean2;
  }, time);
}
