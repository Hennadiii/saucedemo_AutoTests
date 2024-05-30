describe('Footer Links', () => {
    before(async () => {
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
    });

    it('should open social media links in new tabs', async () => {
        // Отримуємо всі іконки соціальних мереж у футері
        const twitterIcon = await $('.social_twitter a');
        const facebookIcon = await $('.social_facebook a');
        const linkedinIcon = await $('.social_linkedin a');

        // Клікаємо по іконці Twitter
        await twitterIcon.click();
        
        // Перевіряємо, що Twitter відкривається в новій вкладці
        let allHandles = await browser.getWindowHandles();
        await browser.switchToWindow(allHandles[1]);
        await expect(browser).toHaveUrlContaining('x.com');
        await browser.closeWindow();
        await browser.switchToWindow(allHandles[0]);

        // Клікаємо по іконці Facebook
        await facebookIcon.click();

        // Перевіряємо, що Facebook відкривається в новій вкладці
        allHandles = await browser.getWindowHandles();
        await browser.switchToWindow(allHandles[1]);
        await expect(browser).toHaveUrlContaining('facebook.com');
        await browser.closeWindow();
        await browser.switchToWindow(allHandles[0]);

        // Клікаємо по іконці LinkedIn
        await linkedinIcon.click();

        // Перевіряємо, що LinkedIn відкривається в новій вкладці
        allHandles = await browser.getWindowHandles();
        await browser.switchToWindow(allHandles[1]);
        await expect(browser).toHaveUrlContaining('linkedin.com');
        await browser.closeWindow();
        await browser.switchToWindow(allHandles[0]);
    });
});
