document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded successfully.');
    console.log('Hi there!');

    const mainContainer = document.getElementById('main-window');
    const settingsContainer = document.getElementById('settings-window');
    const upgradesContainer = document.getElementById('upgrades-window');
    const travelContainer = document.getElementById('travel-window');

    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const closeUpgradesBtn = document.getElementById('closeUpgradesBtn');
    const closeTravelBtn = document.getElementById('closeTravelBtn');

    const settingsBtn = document.getElementById('settingsBtn');
    const upgradesBtn = document.getElementById('upgradesBtn');
    const travelBtn = document.getElementById('travelBtn');

    // Initially hide other windows
    settingsContainer.style.display = 'none';
    upgradesContainer.style.display = 'none';
    travelContainer.style.display = 'none';

    // Show the main window
    mainContainer.style.display = 'flex';

    settingsBtn.addEventListener('click', () => {
        showWindow(settingsContainer);
    });

    upgradesBtn.addEventListener('click', () => {
        showWindow(upgradesContainer);
    });

    travelBtn.addEventListener('click', () => {
        showWindow(travelContainer);
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

    function showWindow(container) {
        // Hide all other windows
        mainContainer.style.display = 'none';
        settingsContainer.style.display = 'none';
        upgradesContainer.style.display = 'none';
        travelContainer.style.display = 'none';

        // Show the selected window
        container.style.display = 'flex';
    }

    function hideWindow(container) {
        // Hide the selected window
        container.style.display = 'none';

        // Show the main window
        mainContainer.style.display = 'flex';
    }

    // Your existing game logic goes here...
    let autoClickInterval = 1000;

    let fuel = 0;
    let energy = 0;
    let currency = 0;
    let fuelClickVal = 5;
    let enerClickVal = 2;
    let currClickVal = 1;
    let fuelMulti = 1;
    let enerMulti = 1;
    let currMulti = 1;

    const currencyElement = document.getElementById('currency');
    const fuelElement = document.getElementById('fuel');
    const energyElement = document.getElementById('energy');
    const clickBtn = document.getElementById('clickBtn');
    const currMultiBtn = document.getElementById('currMultiBtn');
    const autoClickBtn = document.getElementById('autoClickBtn');

    clickBtn.addEventListener('click', () => {
        fuel += fuelClickVal * fuelMulti;
        energy += enerClickVal * enerMulti;
        currency += currClickVal * currMulti;
        updateResources();
    });

    currMultiBtn.addEventListener('click', () => {
        if (currency >= 100) {
            currency -= 100;
            currMulti += .5;
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

    function autoClick() {
        autoClickInterval = setInterval(() => {
            clickBtn.click();
        }, 1000);
    }

    function updateResources() {
        currencyElement.textContent = `Currency: ${currency.toFixed(1)}`;
        fuelElement.textContent = `Fuel: ${fuel.toFixed(1)}`;
        energyElement.textContent = `Energy: ${energy.toFixed(1)}`;
    }
});
