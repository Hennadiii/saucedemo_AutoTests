describe('Valid Checkout', () => {
    it('should successfully complete the checkout process', async () => {
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
        
        // Натискаємо на кнопку "Add to cart"
        await randomAddToCartButton.click();

        // Перевіряємо, що кількість біля корзини збільшується на 1
        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForDisplayed({ timeout: 5000 });
        expect(await cartBadge.getText()).toBe('1');

        // Клікаємо по кнопці "Cart"
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Перевіряємо, що продукт у корзині
        const cartItem = await $('.cart_item');
        await cartItem.waitForDisplayed({ timeout: 5000 });

        // Клікаємо по кнопці "Checkout"
        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        // Очікуємо, щоб форма Checkout була видимою
        const checkoutForm = await $('.checkout_info');
        await checkoutForm.waitForDisplayed({ timeout: 5000 });

        // Заповнюємо поля форми валідними даними
        const firstNameInput = await $('#first-name');
        await firstNameInput.setValue('John');

        const lastNameInput = await $('#last-name');
        await lastNameInput.setValue('Doe');

        const postalCodeInput = await $('#postal-code');
        await postalCodeInput.setValue('12345');

        // Клікаємо по кнопці "Continue"
        const continueButton = await $('#continue');
        await continueButton.click();

        // Очікуємо, щоб сторінка Overview була видимою
        const overviewContainer = await $('.summary_info');
        await overviewContainer.waitForDisplayed({ timeout: 5000 });

        // Перевіряємо, що продукт відображається на сторінці Overview
        const overviewCartItem = await $('.cart_item');
        expect(await overviewCartItem.isDisplayed()).toBe(true);

        // Перевіряємо загальну ціну
        const itemTotal = await $('.summary_subtotal_label');
        const itemTotalText = await itemTotal.getText();
        const itemTotalValue = parseFloat(itemTotalText.replace('Item total: $', ''));
        expect(itemTotalValue).toBeGreaterThan(0);

        // Клікаємо по кнопці "Finish"
        const finishButton = await $('#finish');
        await finishButton.click();

        // Очікуємо, щоб сторінка Checkout Complete була видимою
        const completeHeader = await $('.complete-header');
        await completeHeader.waitForDisplayed({ timeout: 5000 });
        expect(await completeHeader.getText()).toBe('Thank you for your order!');

        // Клікаємо по кнопці "Back Home"
        const backHomeButton = await $('#back-to-products');
        await backHomeButton.click();

        // Перевіряємо, що ми повернулися на сторінку інвентарю
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Перевіряємо, що корзина порожня
        const cartBadgeAfter = await $('.shopping_cart_badge');
        expect(await cartBadgeAfter.isDisplayed()).toBe(false);
    });
});
