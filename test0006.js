describe('Product Sorting', () => {
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

    it('should sort products by all sorting options', async () => {
        const sortingOptions = [
            { value: 'lohi', description: 'Price (low to high)' },
            { value: 'hilo', description: 'Price (high to low)' },
            { value: 'az', description: 'Name (A to Z)' },
            { value: 'za', description: 'Name (Z to A)' },
        ];

        for (const option of sortingOptions) {
            // Вибираємо опцію сортування
            const sortingDropdown = await $('.product_sort_container');
            await sortingDropdown.selectByAttribute('value', option.value);

            // Очікуємо, щоб продукти відсортувалися
            await browser.pause(1000); // Додаємо паузу, щоб сортування могло відбутися

            // Отримуємо всі продукти
            const productElements = await $$('.inventory_item');

            // Перевіряємо, що кнопки є на сторінці
            expect(productElements.length).toBeGreaterThan(0);

            // Отримуємо назви продуктів або ціни в залежності від сортування
            const productValues = [];
            for (const productElement of productElements) {
                let value;
                if (option.value === 'lohi' || option.value === 'hilo') {
                    const priceElement = await productElement.$('.inventory_item_price');
                    const priceText = await priceElement.getText();
                    value = parseFloat(priceText.replace('$', ''));
                } else {
                    const nameElement = await productElement.$('.inventory_item_name');
                    value = await nameElement.getText();
                }
                productValues.push(value);
            }

            // Перевіряємо, що продукти відсортовані коректно
            const sortedValues = [...productValues];
            if (option.value === 'lohi') {
                sortedValues.sort((a, b) => a - b);
            } else if (option.value === 'hilo') {
                sortedValues.sort((a, b) => b - a);
            } else if (option.value === 'az') {
                sortedValues.sort();
            } else if (option.value === 'za') {
                sortedValues.sort().reverse();
            }

            console.log(`Sorting by ${option.description}`);
            console.log('Product Values:', productValues);
            console.log('Sorted Values:', sortedValues);

            expect(productValues).toEqual(sortedValues);
        }
    });
});
