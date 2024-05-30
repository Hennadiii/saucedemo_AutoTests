describe('Logout', () => {
    it('should logout and redirect to the login page with empty fields', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Очікуємо, щоб поле "Username" було видимим
        const usernameInput = await $('#user-name');
        await usernameInput.waitForDisplayed({ timeout: 5000 });

        // Вводимо дійсний логін
        await usernameInput.setValue('standard_user');

        // Очікуємо, щоб поле "Password" було видимим
        const passwordInput = await $('#password');
        await passwordInput.waitForDisplayed({ timeout: 5000 });

        // Вводимо дійсний пароль
        await passwordInput.setValue('secret_sauce');

        // Клікаємо по кнопці входу
        const loginButton = await $('#login-button');
        await loginButton.waitForDisplayed({ timeout: 5000 });
        await loginButton.click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        const inventoryContainer = await $('#inventory_container');
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Клікаємо по кнопці "Burger"
        const burgerButton = await $('#react-burger-menu-btn');
        await burgerButton.waitForDisplayed({ timeout: 5000 });
        await burgerButton.click();

        // Перевіряємо, що меню розкривається і відображаються 4 елементи
        const menuItems = await $$('#inventory_sidebar_link');
        expect(menuItems).toBeElementsArrayOfSize(4);

        // Клікаємо по кнопці "Logout"
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.waitForDisplayed({ timeout: 5000 });
        await logoutButton.click();

        // Перевіряємо, що ми на сторінці входу
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://www.saucedemo.com/';
        }, { timeout: 5000, timeoutMsg: 'Expected to be redirected to login page' });

        // Перевіряємо, що поля "Username" і "Password" порожні
        const usernameValue = await usernameInput.getValue();
        const passwordValue = await passwordInput.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');

        // Додаємо очікування, щоб завершити тест
        await browser.pause(5000);
    });
});
