describe('HTTPS Test for All Pages', () => {
    const baseUrl = 'https://www.saucedemo.com/';
    const pages = [
        '',
        'inventory.html',
        'cart.html',
        'checkout-step-one.html',
        'checkout-step-two.html',
        'checkout-complete.html'
    ];

    before(async () => {
        await browser.url(baseUrl);

        // Log in to the application
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        // Ensure we are logged in
        await expect(browser).toHaveUrlContaining('inventory.html');
    });

    pages.forEach(page => {
        it(`should ensure all resources on ${baseUrl}${page} are loaded over HTTPS`, async () => {
            await browser.url(`${baseUrl}${page}`);

            // Get all URLs from the current page
            const allUrls = await $$('a').map(async (link) => await link.getAttribute('href'));
            for (let url of allUrls) {
                if (url && url.startsWith('http')) {
                    expect(url).toMatch(/^https:\/\//, `URL ${url} is not using HTTPS`);
                }
            }

            // Also check for any other resources like scripts, images, etc.
            const allResources = await $$('script, img, link').map(async (element) => await element.getAttribute('src') || await element.getAttribute('href'));
            for (let resourceUrl of allResources) {
                if (resourceUrl && resourceUrl.startsWith('http')) {
                    expect(resourceUrl).toMatch(/^https:\/\//, `Resource URL ${resourceUrl} is not using HTTPS`);
                }
            }
        });
    });
});
