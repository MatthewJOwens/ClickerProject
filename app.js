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
    perClick: 5
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
    perSecond: 50
  },
  cabal: {
    joined: false,
    cost: 5000,
    multiplier: 3,
  }
}

let intervalStarted = false
let manaGainOnClick = 1


function increaseMana() {
  console.log("harvesting mana");
  if (clickUpgrades.familiar.summoned == true) {
    mana.total = mana.total + manaGainOnClick
    // mana.total = mana.total + (manaGainOnClick * clickUpgrades.familiar.multiplier);
    // mana.total = mana.total + (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number) * clickUpgrades.familiar.multiplier);
  } else {
    mana.total = mana.total + manaGainOnClick
    // mana.total = mana.total + mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)
  }
  document.getElementById("mana").textContent = mana.total.toString();
}

function buyTome() {
  if (mana.total >= clickUpgrades.tome.cost) {
    mana.total = mana.total - clickUpgrades.tome.cost;
    clickUpgrades.tome.number++;
    clickUpgrades.tome.cost = Math.ceil(clickUpgrades.tome.cost * 1.2)
    document.getElementById("tome-cost").textContent = clickUpgrades.tome.cost.toString()
  }
  document.getElementById("tomes-owned").textContent = clickUpgrades.tome.number.toString()
  if (clickUpgrades.familiar.summoned == true) {
    manaGainOnClick = (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)) * clickUpgrades.familiar.multiplier;
  } else {
    manaGainOnClick = mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)
  }
  document.getElementById("mana").textContent = mana.total.toString();
  document.getElementById("mana-per-click").textContent = manaGainOnClick.toString()
  // document.getElementById("mana-per-click").textContent = (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)).toString()
}

function summonFamiliar() {
  if (mana.total >= clickUpgrades.familiar.cost) {
    if (clickUpgrades.familiar.summoned == false) {
      clickUpgrades.familiar.summoned = true;
      mana.total = mana.total - clickUpgrades.familiar.cost;
      manaGainOnClick = (mana.perClick + (clickUpgrades.tome.perClick * clickUpgrades.tome.number)) * clickUpgrades.familiar.multiplier;
      document.getElementById("familiar-btn").classList.remove("btn-outline-warning")
      document.getElementById("familiar-btn").classList.add("btn-warning")
      document.getElementById("mana").textContent = mana.total.toString();
      document.getElementById("familiar-cost").textContent = "--"
      document.getElementById("mana-per-click").textContent = manaGainOnClick.toString()
    } else {
      alert("You already have a familiar.")
    }
  }
}

function acceptApprentice() {
  if (mana.total >= automaticUpgrades.apprentice.cost) {
    if (intervalStarted == false) {
      intervalStarted = true
      startInterval()
    }
    mana.total = mana.total - automaticUpgrades.apprentice.cost;
    automaticUpgrades.apprentice.number++;
    automaticUpgrades.apprentice.cost = Math.ceil(automaticUpgrades.apprentice.cost * 1.3)
    document.getElementById("apprentice-cost").textContent = automaticUpgrades.apprentice.cost.toString()
  }
  document.getElementById("apprentices").textContent = automaticUpgrades.apprentice.number.toString()
  document.getElementById("mana").textContent = mana.total.toString();
  if (automaticUpgrades.cabal.joined == true) {
    mana.perSecond = (automaticUpgrades.apprentice.perSecond * automaticUpgrades.apprentice.number) * automaticUpgrades.cabal.multiplier
  } else {
    mana.perSecond = automaticUpgrades.apprentice.perSecond * automaticUpgrades.apprentice.number
  }
  document.getElementById("mana-per-second").textContent = mana.perSecond.toString()
}

function joinCabal() {
  if (mana.total >= automaticUpgrades.cabal.cost && automaticUpgrades.apprentice.number >= 5) {
    if (intervalStarted == false) {
      intervalStarted = true
      startInterval()
    }
    if (automaticUpgrades.cabal.joined == false) {
      mana.total = mana.total - automaticUpgrades.cabal.cost;
      automaticUpgrades.cabal.joined = true
      mana.perSecond = (automaticUpgrades.apprentice.perSecond * automaticUpgrades.apprentice.number) * automaticUpgrades.cabal.multiplier
      document.getElementById("mana").textContent = mana.total.toString();
      document.getElementById("familiar-btn").classList.remove("btn-outline-warning")
      document.getElementById("familiar-btn").classList.add("btn-warning")
      document.getElementById("mana-per-second").textContent = mana.perSecond.toString()
    } else {
      alert("You've already joined a wizard cabal.")
    }
  } else {
    alert("You must have " + automaticUpgrades.cabal.cost + " mana and 5 apprentices before you can join a cabal.")
  }
}

function startInterval() {
  let collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function collectAutoUpgrades() {
  if (automaticUpgrades.cabal.joined == true) {
    mana.total = mana.total + ((automaticUpgrades.apprentice.perSecond * automaticUpgrades.apprentice.number) * automaticUpgrades.cabal.multiplier)

  } else {
    mana.total = mana.total + (automaticUpgrades.apprentice.perSecond * automaticUpgrades.apprentice.number)
  }
  document.getElementById("mana").textContent = mana.total.toString();
}