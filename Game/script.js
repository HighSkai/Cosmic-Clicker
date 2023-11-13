document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded successfully.');
    console.log('Hi there!');

    const mainContainer = document.getElementById('main-window');
    const settingsContainer = document.getElementById('settings-window');
    const upgradesContainer = document.getElementById('upgrades-window');
    const travelContainer = document.getElementById('travel-window');
    const rebirthContainer = document.getElementById('rebirth-window');

    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const closeUpgradesBtn = document.getElementById('closeUpgradesBtn');
    const closeTravelBtn = document.getElementById('closeTravelBtn');
    const closeRebirthBtn = document.getElementById('closeRebirthBtn');

    const settingsBtn = document.getElementById('settingsBtn');
    const upgradesBtn = document.getElementById('upgradesBtn');
    const travelBtn = document.getElementById('travelBtn');
    const rebirthBtn = document.getElementById('rebirthBtn');

    const giveBtn = document.getElementById('giveBtn');

    // Initially hide other windows
    settingsContainer.style.display = 'none';
    upgradesContainer.style.display = 'none';
    travelContainer.style.display = 'none';
    rebirthContainer.style.display = 'none';

    // Show the main window
    mainContainer.style.display = 'flex';

    settingsBtn.addEventListener('click', () => {
        showWindow(settingsContainer);
    });

    upgradesBtn.addEventListener('click', () => {
        updateWindowValues(upgradesContainer);
        showWindow(upgradesContainer);
    });

    travelBtn.addEventListener('click', () => {
        updateWindowValues(travelContainer);
        showWindow(travelContainer);
    });

    rebirthBtn.addEventListener('click', () => {
        updateWindowValues(rebirthContainer);
        showWindow(rebirthContainer);
    });

    closeSettingsBtn.addEventListener('click', () => {
        hideWindow(settingsContainer);
    });

    closeUpgradesBtn.addEventListener('click', () => {
        hideWindow(upgradesContainer);
    });

    closeTravelBtn.addEventListener('click', () => {
        hideWindow(travelContainer);
    });

    closeRebirthBtn.addEventListener('click', () => {
        hideWindow(rebirthContainer);
    });

    function showWindow(container) {
        // Hide all other windows
        mainContainer.style.display = 'none';
        settingsContainer.style.display = 'none';
        upgradesContainer.style.display = 'none';
        travelContainer.style.display = 'none';
        rebirthContainer.style.display = 'none';

        // Show the selected window
        container.style.display = 'flex';
    }

    function hideWindow(container) {
        // Hide the selected window
        container.style.display = 'none';

        // Show the main window
        mainContainer.style.display = 'flex';
    }

    function updateWindowValues(container) {
        // Update values in the specified container
        console.log('Currency:', currency);
        console.log('Fuel:', fuel);
        console.log('Energy:', energy);

        const currencyElement = container.querySelector('#currency');
        const fuelElement = container.querySelector('#fuel');
        const energyElement = container.querySelector('#energy');

        currencyElement.textContent = `Currency: ${currency.toFixed(1)}`;
        fuelElement.textContent = `Fuel: ${fuel.toFixed(1)}`;
        energyElement.textContent = `Energy: ${energy.toFixed(1)}`;
    }

    let fuel = 0;
    let energy = 0;
    let currency = 0;

    let fuelClickVal = 5;
    let enerClickVal = 2;
    let currClickVal = 1;

    let fuelMulti = 1;
    let enerMulti = 1;
    let currMulti = 1;

    //upgrade costs
    let currMultiUpgrade = 100;
    let autoClickUpgrade = 1000;
    let autoClickRateUpgrade = 500;

    let fuelEffUpgrade = 50;
    let fuelCapUpgrade = 100;

    let energyEffUpgrade = 50;
    let energyCapUpgrade = 100;

    const currencyElement = document.getElementById('currency');
    const fuelElement = document.getElementById('fuel');
    const energyElement = document.getElementById('energy');

    const clickBtn = document.getElementById('clickBtn');

    const currMultiBtn = document.getElementById('currMultiBtn');
    const autoClickBtn = document.getElementById('autoClickBtn');
    const autoClickRateBtn = document.getElementById('autoClickRateBtn');
    const pwrEnginesBtn = document.getElementById('pwrEnginesBtn');

    const fuelEffBtn = document.getElementById('fuelEffBtn');
    const fuelCapBtn = document.getElementById('fuelCapBtn');
    const enerEffBtn = document.getElementById('enerEffBtn');
    const enerCapBtn = document.getElementById('enerCapBtn');

    giveBtn.addEventListener('click', () => {
        giveResources();
    });

    clickBtn.addEventListener('click', () => {
        fuel += fuelClickVal * fuelMulti;
        energy += enerClickVal * enerMulti;
        currency += currClickVal * currMulti;
        updateResources();
    });


    //----------------------------------------------------------------
    currMultiBtn.addEventListener('click', () => {
        if (currency >= currMultiUpgrade) {
            currency -= currMultiUpgrade;
            currMultiUpgrade *= 1.2;
            currMulti += .5;
            updateWindowValues(upgradesContainer);
            updateResources();

        }
    });

    autoClickBtn.addEventListener('click', () => {
        if (currency >= 1000) {
            currency -= 1000;
            autoClick();
            updateResources();
        }
    });

    autoClickRateBtn.addEventListener('click', () => {
    });

    pwrEnginesBtn.addEventListener('click', () => {
    });

    fuelEffBtn.addEventListener('click', () => {
    });

    fuelCapBtn.addEventListener('click', () => {
    });

    enerEffBtn.addEventListener('click', () => {
    });

    enerCapBtn.addEventListener('click', () => {
    });

    //----------------------------------------------------------------


    function autoClick() {
        autoClickInterval = setInterval(() => {
            clickBtn.click();
        }, 1000);
    }

    function giveResources() {
        fuel += 1000000;
        energy += 1000000;
        currency += 1000000;
        updateResources();
    }

    function updateResources() {
        currencyElement.textContent = `Currency: ${currency.toFixed(1)}`;
        fuelElement.textContent = `Fuel: ${fuel.toFixed(1)}`;
        energyElement.textContent = `Energy: ${energy.toFixed(1)}`;
    }
});
