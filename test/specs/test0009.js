describe('Checkout without products', () => {
    it('should display an error and remain on the Cart page when trying to checkout with an empty cart', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Логінимося в систему
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        const inventoryContainer = await $('#inventory_container');
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Переходимо до корзини
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Очікуємо, щоб сторінка корзини була видимою
        const cartContainer = await $('#cart_contents_container');
        await cartContainer.waitForDisplayed({ timeout: 5000 });

        // Перевіряємо, що корзина порожня
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);

        // Клікаємо по кнопці "Checkout"
        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        // Перевіряємо фактичний URL після натискання кнопки "Checkout"
        const currentUrl = await browser.getUrl();
        console.log('Current URL:', currentUrl);

        // Перевіряємо наявність повідомлення про пусту корзину
        let errorMessageDisplayed = false;
        try {
            const errorMessage = await $('.error-message-container');
            await errorMessage.waitForDisplayed({ timeout: 5000 });
            const errorMessageText = await errorMessage.getText();
            console.log('Error message:', errorMessageText);
            errorMessageDisplayed = errorMessageText.includes('Your cart is empty');
        } catch (err) {
            console.log('Error message not displayed');
        }

        // Очікуваний результат: Користувач повинен залишитись на сторінці корзини
        // Фактичний результат: Перехід на сторінку checkout-step-one
        const expectedUrl = 'https://www.saucedemo.com/cart.html';
        if (currentUrl !== expectedUrl && !errorMessageDisplayed) {
            console.error('Bug: Expected to remain on the Cart page with an error message, but navigated to checkout-step-one.html');
        }

        // Перевірка наявності помилки або неправильного переходу
        expect(currentUrl).toBe(expectedUrl);
        expect(errorMessageDisplayed).toBe(true);
    });
});
