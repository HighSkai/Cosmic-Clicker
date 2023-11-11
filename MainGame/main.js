const elements = {
    fuelAmount: document.getElementById("fuel"),
    energyAmount: document.getElementById("energy"),
    currencyAmount: document.getElementById("currency"),
    collectButton: document.getElementById("collect-button"),
    deleteDataButton: document.getElementById("delete-data-button"),
    giveResourceButton: document.getElementById("give-resource-button"),
    upgradeSpeedButton: document.getElementById("upgrade-resource"),
    upgradeCurrencyMultiplierButton: document.getElementById("upgrade-currency"),
    upgradeAutoClickButton: document.getElementById("auto-click-upgrade"),
    saveDataButton: document.getElementById("save-data-button"),

    openMoonWindowButton: document.getElementById("moon-button"),
    closeMoonWindowButton: document.getElementById("close-moon-window"),
    moonScreen: document.getElementById("moon-screen"),
    moonWindow: document.getElementById("moon-window"),

    openUpgradeWindowButton: document.getElementById("upgrade-button"),
    closeUpgradeWindowButton: document.getElementById("close-upgrade-window"),
    upgradeScreen: document.getElementById("upgrade-screen"),
    upgradeWindow: document.getElementById("upgrade-window"),

    openSettingsWindowButton: document.getElementById("open-settings-window"),
    closeSettingsWindowButton: document.getElementById("close-settings-window"),
    settingsScreen: document.getElementById("settings-screen"),
    settingsWindow: document.getElementById("settings-window"),

    efficientEnginesButton: document.getElementById("efficient-engines"),
    multiClickButton: document.getElementById("multi-click"),
    upgradeAutoClickRateButton: document.getElementById("upgrade-auto-click-rate"),

};

let fuel = 0;
let energy = 0;
let currency = 0;
let fuelMultiplier = 1;
let energyMultiplier = 1;
let currencyMultiplier = 1;
let autoClickInterval;
let autoClickActive = false;
let speedUpgradeCost = 100;
let efficiencyUpgradeCost = 200;
let efficientEnginesCost = 80;
let multiClickCost = 120;
let multiClickChance = 0.1;
let autoClickRate = 1000;
let autoClickRateUpgradeCost = 300;

function saveUserDataToLocalStorage() {
    const userData = {
        fuel,
        energy,
        currency,
        fuelMultiplier,
        energyMultiplier,
        currencyMultiplier,
        speedUpgradeCost,
        efficiencyUpgradeCost,
        autoClickActive: autoClickActive ? 1 : 0,
        efficientEnginesCost,
        multiClickCost,
        autoClickRate,
        autoClickRateUpgradeCost,
        multiClickChance,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}

function loadUserDataFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    fuel = userData.fuel || fuel;
    energy = userData.energy || energy;
    currency = userData.currency || currency;
    fuelMultiplier = userData.fuelMultiplier || fuelMultiplier;
    energyMultiplier = userData.energyMultiplier || energyMultiplier;
    currencyMultiplier = userData.currencyMultiplier || currencyMultiplier;
    speedUpgradeCost = userData.speedUpgradeCost || speedUpgradeCost;
    efficiencyUpgradeCost = userData.efficiencyUpgradeCost || efficiencyUpgradeCost;
    autoClickActive = userData.autoClickActive === 1 ? true : false;
    efficientEnginesCost = userData.efficientEnginesCost || efficientEnginesCost;
    multiClickCost = userData.multiClickCost || multiClickCost;
    autoClickRate = userData.autoClickRate || autoClickRate;
    autoClickRateUpgradeCost = userData.autoClickRateUpgradeCost || autoClickRateUpgradeCost;
    multiClickChance = userData.multiClickChance || multiClickChance;

    updateValues();

    if (autoClickActive) {
        autoClick();
        elements.upgradeAutoClickButton.disabled = true;
        elements.upgradeAutoClickButton.style.backgroundColor = "#888";
    }

    if (autoClickRate <= 0) {
        elements.upgradeAutoClickRateButton.disabled = true;
        elements.upgradeAutoClickRateButton.style.backgroundColor = "#888";
    }
}

function deleteUserData() {
    localStorage.removeItem('userData');

    resetGame();

    loadUserDataFromLocalStorage();
    updateValues();
}

function resetGame() {
    fuel = 0;
    energy = 0;
    currency = 0;
    fuelMultiplier = 1;
    energyMultiplier = 1;
    currencyMultiplier = 1;
    autoClickActive = 0;
    speedUpgradeCost = 100;
    efficiencyUpgradeCost = 200;
    efficientEnginesCost = 80;
    multiClickCost = 120;
    multiClickChance = 0.1;
    autoClickRate = 1000;
    autoClickRateUpgradeCost = 300;

    stopAutoClick();

    elements.upgradeAutoClickButton.disabled = false;
    elements.upgradeAutoClickButton.style.backgroundColor = "#0074d9";
}

function giveResources() {
    fuel += 100000000;
    energy += 100000000;
    currency += 100000000;

    updateValues();
    saveUserDataToLocalStorage();
}

function upgradeEfficientEngines() {
    if (currency >= efficientEnginesCost) {
        currency -= efficientEnginesCost;
        fuelMultiplier += 0.2;

        updateValues();

        efficientEnginesCost *= 1.1;
        elements.efficientEnginesButton.textContent = `Efficient Engines (Cost: ${efficientEnginesCost.toFixed(0)})`;
        saveUserDataToLocalStorage();
    }
}

function upgradeMultiClick() {
    if (currency >= multiClickCost) {
        currency -= multiClickCost;

        // Adjust the logic to implement a chance-based system
        const randomValue = Math.random();
        if (randomValue <= multiClickChance) {
            fuel += 5 * fuelMultiplier * 2; // Double the resources if the chance is successful
            energy += 2 * energyMultiplier * 2;
            currency += 1 * currencyMultiplier * 2;
        } else {
            fuel += 5 * fuelMultiplier;
            energy += 2 * energyMultiplier;
            currency += 1 * currencyMultiplier;
        }

        // Increase the chance for the next upgrade
        multiClickChance += 0.05;

        updateValues();

        multiClickCost *= 1.1;
        elements.multiClickButton.textContent = `Multi-Click (Cost: ${multiClickCost.toFixed(0)})`;
        saveUserDataToLocalStorage();
    }
}

function upgradeAutoClickRate() {
    if (currency >= autoClickRateUpgradeCost && autoClickRate > 0) {
        currency -= autoClickRateUpgradeCost;
        autoClickRate *= 0.9; // Reduces the auto-click rate by 10%
        autoClickRateUpgradeCost *= 10;

        autoClick(); // Restart auto-click with the updated rate

        saveUserDataToLocalStorage();
        updateValues(); // Move the updateValues call here
        updateAutoClickRate(); // Move the updateAutoClickRate call here
    }
}

function collectResources() {
    fuel += 10 * fuelMultiplier;
    energy += 5 * energyMultiplier;
    currency += 1 * currencyMultiplier;

    updateValues();
    saveUserDataToLocalStorage();
}

function openMoonWindow() {
    document.body.classList.add('window-open');
    hideButtons();
    document.querySelector(".content").style.display = "none";
    document.querySelector(".moon-screen").style.display = "flex";
}

function closeMoonWindow() {
    document.body.classList.remove('window-open');
    showButtons();
    document.querySelector(".moon-screen").style.display = "none";
    document.querySelector(".content").style.display = "flex";
}

function openUpgradeWindow() {
    document.body.classList.add('window-open');
    hideButtons();
    document.querySelector(".content").style.display = "none";
    document.querySelector(".upgrade-screen").style.display = "flex";
}

function closeUpgradeWindow() {
    document.body.classList.remove('window-open');
    showButtons();
    document.querySelector(".upgrade-screen").style.display = "none";
    document.querySelector(".content").style.display = "flex";
}

function openSettingsWindow() {
    document.body.classList.add('window-open');
    hideButtons();
    document.querySelector(".content").style.display = "none";
    document.querySelector(".settings-screen").style.display = "flex";
}

function closeSettingsWindow() {
    document.body.classList.remove('window-open');
    showButtons();
    document.querySelector(".settings-screen").style.display = "none";
    document.querySelector(".content").style.display = "flex";
}

function hideButtons() {
    document.querySelector(".buttons-left").style.visibility = "hidden";
    document.querySelector(".buttons-right").style.visibility = "hidden";
}

function showButtons() {
    document.querySelector(".buttons-left").style.visibility = "visible";
    document.querySelector(".buttons-right").style.visibility = "visible";
}


function upgradeSpeed() {
    if (currency >= speedUpgradeCost) {
        currency -= speedUpgradeCost;
        fuelMultiplier += 0.1;
        energyMultiplier += 0.05;

        updateValues();

        speedUpgradeCost *= 1.05;
        elements.upgradeSpeedButton.textContent = `Upgrade Speed (Cost: ${speedUpgradeCost.toFixed(0)})`;
        saveUserDataToLocalStorage();
    }
}

function upgradeEfficiency() {
    if (currency >= efficiencyUpgradeCost) {
        currency -= efficiencyUpgradeCost;
        currencyMultiplier += 0.2;

        updateValues();

        efficiencyUpgradeCost *= 1.05;
        elements.upgradeCurrencyMultiplierButton.textContent = `Upgrade Efficiency (Cost: ${efficiencyUpgradeCost.toFixed(0)})`;
        saveUserDataToLocalStorage();
    }
}

function upgradeAutoClick() {
    if (currency >= 500 && !autoClickActive) {
        currency -= 500;
        autoClickActive = true;

        updateValues();

        autoClick();
        elements.upgradeAutoClickButton.disabled = true;
        elements.upgradeAutoClickButton.style.backgroundColor = "#888";

        saveUserDataToLocalStorage();
    }
}

function autoClick() {
    autoClickInterval = setInterval(() => {
        elements.collectButton.click();
    }, 1000);
}

function stopAutoClick() {
    clearInterval(autoClickInterval);
}

function updateResourceAmounts() {
    elements.fuelAmount.textContent = fuel.toFixed(2);
    elements.energyAmount.textContent = energy.toFixed(2);
    elements.currencyAmount.textContent = currency.toFixed(2);
}

function updateMultiplierValues() {
    document.getElementById("fuel-multiplier").textContent = `Fuel Multiplier: ${fuelMultiplier.toFixed(1)}x`;
    document.getElementById("energy-multiplier").textContent = `Energy Multiplier: ${energyMultiplier.toFixed(1)}x`;
    document.getElementById("currency-multiplier").textContent = `Currency Multiplier: ${currencyMultiplier.toFixed(1)}x`;
}

function updateUpgradeValues() {
    elements.upgradeSpeedButton.textContent = `Upgrade Speed (Cost: ${speedUpgradeCost.toFixed(0)})`;
    elements.upgradeCurrencyMultiplierButton.textContent = `Upgrade Efficiency (Cost: ${efficiencyUpgradeCost.toFixed(0)})`;
    elements.efficientEnginesButton.textContent = `Efficient Engines (Cost: ${efficientEnginesCost.toFixed(0)})`;
    elements.multiClickButton.textContent = `Multi-Click (Cost: ${multiClickCost.toFixed(0)})`;
    elements.upgradeAutoClickButton.textContent = `Upgrade Auto Click (Cost: 500)`;

    // Update auto-click rate upgrade cost and display it
    elements.upgradeAutoClickRateButton.textContent = `Upgrade Auto-Click Rate (Cost: ${autoClickRateUpgradeCost.toFixed(0)})`;


    if (autoClickActive) {
        elements.upgradeAutoClickButton.disabled = true;
        elements.upgradeAutoClickButton.style.backgroundColor = "#888";
    }
}

function updateAutoClickRate() {
    const autoClickRateDisplay = document.getElementById("auto-click-rate");
    autoClickRateDisplay.textContent = `Auto-Click Rate: ${(autoClickRate / 1000).toFixed(2)} seconds`;

    if (autoClickRate <= 0.09) {
        elements.upgradeAutoClickRateButton.disabled = true;
        elements.upgradeAutoClickRateButton.style.backgroundColor = "#888";
    } else {
        elements.upgradeAutoClickRateButton.disabled = false;
        elements.upgradeAutoClickRateButton.style.backgroundColor = "#0074d9";
    }
}

function updateValues() {
    updateResourceAmounts();
    updateMultiplierValues();
    updateUpgradeValues();
    updateAutoClickRate();
}

elements.deleteDataButton.addEventListener("click", deleteUserData);
elements.giveResourceButton.addEventListener("click", giveResources);
elements.collectButton.addEventListener("click", collectResources);
elements.openUpgradeWindowButton.addEventListener("click", openUpgradeWindow);
elements.closeUpgradeWindowButton.addEventListener("click", closeUpgradeWindow);
elements.upgradeSpeedButton.addEventListener("click", upgradeSpeed);
elements.upgradeCurrencyMultiplierButton.addEventListener("click", upgradeEfficiency);
elements.upgradeAutoClickButton.addEventListener("click", upgradeAutoClick);
elements.saveDataButton.addEventListener("click", saveUserDataToLocalStorage);
elements.openSettingsWindowButton.addEventListener("click", openSettingsWindow);
elements.closeSettingsWindowButton.addEventListener("click", closeSettingsWindow);
elements.efficientEnginesButton.addEventListener("click", upgradeEfficientEngines);
elements.multiClickButton.addEventListener("click", upgradeMultiClick);
elements.upgradeAutoClickRateButton.addEventListener("click", upgradeAutoClickRate);

elements.openMoonWindowButton.addEventListener("click", openMoonWindow);
elements.closeMoonWindowButton.addEventListener("click", closeMoonWindow);


loadUserDataFromLocalStorage();
updateValues();