describe('Burger Menu Navigation', () => {
    it('should navigate through the Burger Menu', async () => {
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

        // Відкриваємо Burger Menu
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();

        // Перевіряємо наявність пунктів меню
        const menuItems = await $$('.bm-item-list a');
        const expectedMenuItems = ['All Items', 'About', 'Logout', 'Reset App State'];
        const actualMenuItems = [];
        for (let item of menuItems) {
            actualMenuItems.push(await item.getText());
        }
        expect(actualMenuItems).toEqual(expectedMenuItems);

        // Натискаємо на "About"
        await menuItems[1].click();
        await browser.pause(2000); // Додаємо паузу для завантаження сторінки
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://saucelabs.com/');

        // Повертаємося назад на сторінку інвентарю
        await browser.url('https://www.saucedemo.com/inventory.html');
        await inventoryContainer.waitForDisplayed({ timeout: 10000 });

        // Відкриваємо Burger Menu знову
        await menuButton.click();
        await browser.pause(1000); // Додаємо паузу для завантаження меню

        // Натискаємо на "Logout"
        const logoutButton = await $('a#logout_sidebar_link');
        await logoutButton.click();
        await browser.pause(2000); // Додаємо паузу для завантаження сторінки
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://www.saucedemo.com/');

        // Знову логінимося
        await usernameInput.setValue('standard_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();
        await inventoryContainer.waitForDisplayed({ timeout: 10000 });

        // Додаємо продукт у кошик для перевірки "Reset App State"
        const addToCartButton = await $('.btn_inventory');
        await addToCartButton.click();
        const cartBadge = await $('.shopping_cart_badge');
        expect(await cartBadge.getText()).toBe('1');

        // Відкриваємо Burger Menu знову
        await menuButton.click();
        await browser.pause(1000); // Додаємо паузу для завантаження меню

        // Натискаємо "Reset App State"
        const resetAppStateButton = await $('a#reset_sidebar_link');
        await resetAppStateButton.click();
        await browser.pause(2000); // Додаємо паузу для виконання дії

        // Перевіряємо, що кошик порожній
        const cartBadgeAfterReset = await $('.shopping_cart_badge');
        expect(await cartBadgeAfterReset.isExisting()).toBe(false);

        // Обираємо продукт після Reset App State
        const firstProduct = await $('.inventory_item');
        await firstProduct.waitForDisplayed({ timeout: 10000 });
        await firstProduct.$('.inventory_item_name').click();

        // Перевіряємо, що сторінка товару відкрита
        const productPage = await $('.inventory_details_container');
        await productPage.waitForDisplayed({ timeout: 10000 });

        // Відкриваємо Burger Menu знову
        await menuButton.click();
        await browser.pause(1000); // Додаємо паузу для завантаження меню

        // Натискаємо "All Items"
        const allItemsButton = await $('a#inventory_sidebar_link');
        await allItemsButton.click();
        await browser.pause(2000); // Додаємо паузу для завантаження сторінки
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');
    });
});
