describe('Login with an invalid login', () => {
    it('should show error message for login with invalid Login', async () => {
        // Функція для генерації випадкового рядка
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            return result;
        }

        // Генерація випадкового Login
        const invalidLogin = generateRandomString(10);

        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Очікуємо, щоб поле "Login" було видимим
        const loginInput = await $('#user-name');
        await loginInput.waitForDisplayed({ timeout: 5000 });

        // Вводимо невірний логін
        await loginInput.setValue(invalidLogin);
        
        // Перевіряємо, що дані введені в поле "Login"
        const enteredLogin = await loginInput.getValue();
        expect(enteredLogin).toBe(invalidLogin);

        // Очікуємо, щоб поле "Password" було видимим+
        const passwordInput = await $('#password');
        await passwordInput.waitForDisplayed({ timeout: 5000 });

        // Вводимо вірний пароль
        const validPassword = 'secret_sauce';
        await passwordInput.setValue(validPassword);

        // Перевіряємо, що поле пароля приховує введені символи
        const inputType = await passwordInput.getAttribute('type');
        expect(inputType).toBe('password');

        // Клікаємо по кнопці входу
        const loginButton = await $('#login-button');
        await loginButton.waitForDisplayed({ timeout: 5000 });
        await loginButton.click();

        // Перевіряємо, що відображається помилка
        const errorMessage = await $('h3[data-test="error"]');
        await errorMessage.waitForDisplayed({ timeout: 5000 });
        const errorText = await errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        // Перевіряємо наявність елементу 'X' у полях "Login" та "Password"
        const svgLoginIcon = await $('#login_button_container > div > form > div:nth-child(1) > svg');
        await svgLoginIcon.waitForDisplayed({ timeout: 5000 });
        const isSvgLoginDisplayed = await svgLoginIcon.isDisplayed();
        expect(isSvgLoginDisplayed).toBe(true);

        const svgPasswordIcon = await $('#login_button_container > div > form > div:nth-child(2) > svg');
        await svgPasswordIcon.waitForDisplayed({ timeout: 5000 });
        const isSvgPasswordDisplayed = await svgPasswordIcon.isDisplayed();
        expect(isSvgPasswordDisplayed).toBe(true);

      // Перевіряємо колір рамки в поле "Login"
      const loginFieldError = await $('#user-name');
      await loginFieldError.waitForDisplayed({ timeout: 5000 });

      const loginBorderColor = await loginFieldError.getCSSProperty('border-bottom-color');
      console.log(loginBorderColor.value); // Для дебаггінгу, вивести значення кольору в консоль
      expect(loginBorderColor.value).toBe('rgba(226,35,26,1)'); // Це значення кольору у форматі RGB для #e2231a

      // Перевіряємо колір рамки в поле "Password"
      const passwordFieldError = await $('#password.input_error.form_input.error');
      await passwordFieldError.waitForDisplayed({ timeout: 5000 });

      const passwordBorderColor = await passwordFieldError.getCSSProperty('border-bottom-color');
      console.log(passwordBorderColor.value); // Для дебаггінгу, вивести значення кольору в консоль
      expect(passwordBorderColor.value).toBe('rgba(226,35,26,1)');  

        // Додаємо очікування, щоб завершити тест
        await browser.pause(5000);
    });
});
