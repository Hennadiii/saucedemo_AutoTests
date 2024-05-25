describe('Saving the cart after logout', () => {
    it('should save the cart after logout and login again', async () => {
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

        // Отримуємо всі кнопки "Add to cart"
        const addToCartButtons = await $$('.btn_inventory');

        // Перевіряємо, що кнопки є на сторінці
        expect(addToCartButtons.length).toBeGreaterThan(0);

        // Випадково вибираємо одну з кнопок
        const randomIndex = Math.floor(Math.random() * addToCartButtons.length);
        const randomAddToCartButton = addToCartButtons[randomIndex];
        
        // Отримуємо контейнер продукту
        const productContainer = await randomAddToCartButton.parentElement().parentElement();

        // Отримуємо назву продукту, який додаємо
        const productNameElement = await productContainer.$('.inventory_item_name');
        const productName = await productNameElement.getText();

        // Виводимо назву продукту в консоль для перевірки
        console.log('Product Name:', productName);

        // Натискаємо на кнопку "Add to cart"
        await randomAddToCartButton.click();

        // Перевіряємо, що кількість біля корзини збільшується на 1
        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForDisplayed({ timeout: 5000 });
        expect(await cartBadge.getText()).toBe('1');

        // Клікаємо по кнопці "Burger"
        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();

        // Очікуємо, щоб меню відкрилося
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.waitForDisplayed({ timeout: 5000 });

        // Клікаємо по кнопці "Logout"
        await logoutButton.click();

        // Переконуємося, що ми повернулися на сторінку логіну
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        // Перевіряємо, що поля "Username" і "Password" порожні
        expect(await usernameInput.getValue()).toBe('');
        expect(await passwordInput.getValue()).toBe('');

        // Логінимося знову
        await usernameInput.setValue('standard_user');
        await passwordInput.setValue('secret_sauce');
        await loginButton.click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Клікаємо по кнопці "Cart"
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Перевіряємо, що продукт у корзині
        const cartItem = await $('.cart_item');
        await cartItem.waitForDisplayed({ timeout: 5000 });

        // Перевірка, що продукти ті ж самі, що були додані на кроці 1
        const cartItemName = await cartItem.$('.inventory_item_name').getText();
        expect(cartItemName).toBe(productName);
    });
});
