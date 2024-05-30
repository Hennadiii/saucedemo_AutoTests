describe('Auto Logout after inactivity', () => {
    it('should log out the user after inactivity', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Вводимо дійсний логін
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        // Вводимо дійсний пароль
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        // Клікаємо по кнопці входу
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        const inventoryContainer = await $('#inventory_container');
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Імітуємо бездіяльність
        await browser.pause(50000);  

        // Виконуємо будь-яку дію, щоб перевірити, чи користувач все ще залогінений
        await browser.refresh();

        // Перевіряємо, чи користувач розлогінений
        const currentUrl = await browser.getUrl();
        if (currentUrl !== 'https://www.saucedemo.com/') {
            console.log('Test passed: User is logged out after inactivity');
        } else {
            console.error('Test failed: User is not logged out after inactivity');
        }
    });
});
