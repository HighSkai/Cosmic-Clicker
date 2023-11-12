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
    let score = 0;
    let clickValue = 1;

    const scoreElement = document.getElementById('score');
    const clickBtn = document.getElementById('clickBtn');
    const upgradeBtn = document.getElementById('upgradeBtn');
    const upgradeInfo = document.getElementById('upgradeInfo');

    clickBtn.addEventListener('click', () => {
        score += clickValue;
        updateScore();
    });

    upgradeBtn.addEventListener('click', () => {
        if (score >= 10) {
            score -= 10;
            clickValue += 1;
            updateScore();
            showUpgradeInfo(`Click value upgraded to ${clickValue}`);
        } else {
            showUpgradeInfo('Not enough points to upgrade!');
        }
    });

    function updateScore() {
        scoreElement.textContent = score;
    }

    function showUpgradeInfo(message) {
        upgradeInfo.textContent = message;
        setTimeout(() => {
            upgradeInfo.textContent = '';
        }, 2000);
    }
});
