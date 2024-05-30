describe('Behavior of the "Add to cart" button when adding an item to the cart and clicking the "Reset application state" point', () => {
    it('should reset app state after adding "Sauce Labs Backpack" to the cart', async () => {
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
        await inventoryContainer.waitForDisplayed({ timeout: 10000 });

        // Додаємо "Sauce Labs Backpack" у кошик
        const addToCartButton = await $('#add-to-cart-sauce-labs-backpack');
        await addToCartButton.click();

        // Перевіряємо збільшення кількості товарів у кошику
        const cartBadge = await $('.shopping_cart_badge');
        expect(await cartBadge.getText()).toBe('1');

        // Перевіряємо, що кнопка змінилася на "Remove"
        const removeButton = await $('#remove-sauce-labs-backpack');
        expect(await removeButton.isExisting()).toBe(true);
        console.log('кнопка "Remove" для "Sauce Labs Backpack" присутня на сторінці');

        // Відкриваємо Burger Menu
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();

        // Перевіряємо, що меню відкрилося і відображає 4 пункти
        const menuItems = await $$('.bm-item-list a');
        expect(menuItems.length).toBe(4);

        // Натискаємо "Reset App State"
        const resetAppStateButton = await $('#reset_sidebar_link');
        await resetAppStateButton.click();

        // Перевіряємо, що кошик порожній після скидання стану
        await browser.pause(2000); // Пауза для завершення дії Reset App State
        const cartBadgeAfterReset = await $('.shopping_cart_badge');
        expect(await cartBadgeAfterReset.isExisting()).toBe(false);

        // Перевіряємо, що кнопка "Add to cart" для "Sauce Labs Backpack" присутня на сторінці
        const resetAddToCartButton = await $('#add-to-cart-sauce-labs-backpack');
        if (await resetAddToCartButton.isExisting()) {
            console.log('кнопка "Add to cart" для "Sauce Labs Backpack" присутня на сторінці');
        } else {
            const resetRemoveButton = await $('#remove-sauce-labs-backpack');
            if (await resetRemoveButton.isExisting()) {
                console.log('кнопка "Remove" для "Sauce Labs Backpack" присутня на сторінці');
            } else {
                console.error('Кнопка для "Sauce Labs Backpack" не знайдена на сторінці');
            }
        }

        expect(await resetAddToCartButton.isExisting()).toBe(true);
    });
});
