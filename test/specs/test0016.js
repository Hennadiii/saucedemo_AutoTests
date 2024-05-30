describe('Cookies Test for Sensitive Information', () => {
    const baseUrl = 'https://www.saucedemo.com/';
    const sensitiveKeywords = ['password', 'secret', 'auth']; // Exclude 'user'

    before(async () => {
        await browser.url(baseUrl);

        // Log in to the application
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Ensure we are logged in
        await expect(browser).toHaveUrlContaining('inventory.html');
    });

    it('should not store sensitive information in cookies', async () => {
        const cookies = await browser.getCookies();

        cookies.forEach(cookie => {
            // Check for sensitive information
            sensitiveKeywords.forEach(keyword => {
                if (cookie.value.toLowerCase().includes(keyword)) {
                    throw new Error(`Sensitive information found in cookie: ${cookie.name}`);
                }
            });

            // Check if cookies are HttpOnly and Secure
            if (!cookie.httpOnly) {
                throw new Error(`Cookie ${cookie.name} is not HttpOnly`);
            }
            if (!cookie.secure) {
                throw new Error(`Cookie ${cookie.name} is not Secure`);
            }
        });
    });
});
