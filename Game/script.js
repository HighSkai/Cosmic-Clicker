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
    let fuel = 0;
    let energy = 0;
    let currency = 0;
    let fuelClickVal = 5;
    let enerClickVal = 2;
    let currClickVal = 1;

    const currencyElement = document.getElementById('currency');
    const fuelElement = document.getElementById('fuel');
    const energyElement = document.getElementById('energy');
    const clickBtn = document.getElementById('clickBtn');
    const upgradeBtn = document.getElementById('upgradeBtn');

    clickBtn.addEventListener('click', () => {
        fuel += fuelClickVal;
        energy += enerClickVal;
        currency += currClickVal;
        updateResources();
    });

    upgradeBtn.addEventListener('click', () => {
        if (currency >= 10) {
            currency -= 10;
            clickValue += 1;
            updateResources();
        }
    });

    function updateResources() {
        currencyElement.textContent = `Currency: ${currency}`;
        fuelElement.textContent = `Fuel: ${fuel}`;
        energyElement.textContent = `Energy: ${energy}`;
    }
});
