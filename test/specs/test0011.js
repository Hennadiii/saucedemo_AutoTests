describe('Remove Product from Cart when User is on the Cart Page ', () => {
    it('should allow user to remove a product from the cart', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Логінимося в систему
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Очікуємо, щоб сторінка інвентарю була видимою
        const inventoryContainer = await $('#inventory_container');
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });

        // Додаємо продукт до корзини
        const addToCartButton = await $('#add-to-cart-sauce-labs-backpack');
        await addToCartButton.click();

        // Перевіряємо, що продукт додано до корзини
        const cartBadge = await $('.shopping_cart_badge');
        await cartBadge.waitForDisplayed({ timeout: 5000 });
        expect(await cartBadge.getText()).toBe('1');

        // Переходимо до корзини
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Очікуємо, щоб сторінка корзини була видимою
        const cartContainer = await $('#cart_contents_container');
        await cartContainer.waitForDisplayed({ timeout: 5000 });

        // Видаляємо продукт з корзини
        const removeButton = await $('#remove-sauce-labs-backpack');
        await removeButton.click();

        // Перевіряємо, що продукт видалено з корзини
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);

        // Перевіряємо, що кількість продуктів у корзині зменшилась
        const cartBadgeAfterRemoval = await $('.shopping_cart_badge');
        const isCartBadgeDisplayed = await cartBadgeAfterRemoval.isDisplayed();
        expect(isCartBadgeDisplayed).toBe(false);
    });
});
