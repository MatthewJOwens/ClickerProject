let mana = {
  total: 10000,
  perSecond: 0,
  perClick: 1,
  multiplier: 1
}

let clickUpgrades = {
  tome: {
    cost: 20,
    number: 0,
    perClick: 1
  },
  familiar: {
    summoned: false,
    cost: 500,
    multiplier: 2
  }
}

let automaticUpgrades = {
  apprentice: {
    cost: 1000,
    number: 0,
    perSecond: 1
  },
  cabal: {
    summoned: false,
    cost: 5000,
    multiplier: 3,
  }
}

function increaseMana() {
  console.log("harvesting mana");
  if (clickUpgrades.familiar.summoned == true) {
    mana.total = mana.total + ((mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)) * clickUpgrades.familiar.multiplier);
  } else {
    mana.total = mana.total + (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number))
  }
  document.getElementById("mana").textContent = mana.total.toString();
}

function buyTome() {
  mana.total = mana.total - clickUpgrades.tome.cost;
  clickUpgrades.tome.number++;
  document.getElementById("mana").textContent = mana.total.toString();
}

function summonFamiliar() {
  if (clickUpgrades.familiar.summoned == false) {
    clickUpgrades.familiar.summoned = true;
    mana.total = mana.total - clickUpgrades.familiar.cost;
    document.getElementById("familiar-btn").classList.remove("btn-outline-warning")
    document.getElementById("familiar-btn").classList.add("btn-warning")
    document.getElementById("mana").textContent = mana.total.toString();
  } else {
    alert("You already have a familiar.")
  }
}

function acceptApprentice() {

}