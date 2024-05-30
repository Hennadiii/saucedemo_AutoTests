describe('Login with "locked_out_user" user name', () => {
    it('should not allow login for locked out user', async () => {
        // Відкриваємо сайт
        await browser.url('https://www.saucedemo.com/');

        // Вводимо "locked_out_user" username
        const usernameInput = await $('#user-name');
        await usernameInput.setValue('locked_out_user');

        // Вводимо дійсний пароль
        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        // Клікаємо по кнопці входу
        const loginButton = await $('#login-button');
        await loginButton.click();

        // Перевіряємо, що з'явилося повідомлення про помилку
        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();

        // Перевіряємо текст повідомлення про помилку
        const errorText = await errorMessage.getText();
        await expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');

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
