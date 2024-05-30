describe('Valid Login', () => {
    it('should log in with valid credentials and redirect to inventory page', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Вводимо дійсний логін
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('standard_user');

        // Вводимо дійсний пароль
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        // Перевіряємо, що дані введені
        expect(await usernameInput.getValue()).toBe('standard_user');
        expect(await passwordInput.getValue()).toBe('secret_sauce');

        // Клікаємо по кнопці входу
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        const inventoryContainer = await $('#inventory_container');
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Переконуємось, що користувач був перенаправлений на сторінку інвентарю
        await expect(browser).toHaveUrlContaining('inventory.html');

        // Перевіряємо, що продукти і корзина відображаються
        const products = await $$('.inventory_item');
        expect(products.length).toBeGreaterThan(0);

        const cartIcon = await $('.shopping_cart_link');
        expect(await cartIcon.isDisplayed()).toBe(true);
    });
});
