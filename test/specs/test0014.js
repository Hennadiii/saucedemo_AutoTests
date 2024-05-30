// SQL Injection Test 
const sqlInjectionTestData = "' OR '1'='1";

describe('SQL Injection Test', () => {
    it('should test for SQL injection vulnerability on login', async () => {
        await browser.url('https://www.saucedemo.com/');
        
        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue(sqlInjectionTestData);
        await passwordInput.setValue(sqlInjectionTestData);
        await loginButton.click();
        
        // Validate that login failed
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
    });
});
// XSS Test 
const xssTestData = "<script>alert('XSS');</script>";

describe('XSS Test', () => {
    it('should test for XSS vulnerability on login', async () => {
        await browser.url('https://www.saucedemo.com/');
        
        const usernameInput = await $('#user-name');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue(xssTestData);
        await passwordInput.setValue(xssTestData);
        await loginButton.click();
        
        // Validate no XSS alert appears
        const alertIsPresent = await browser.isAlertOpen();
        if (alertIsPresent) {
            await browser.acceptAlert();
        }
        expect(alertIsPresent).toBe(false);
    });
});
