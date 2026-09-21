document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");

    if (!form) {
        return;
    }


    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const agreementInput = document.getElementById("agreement");

    const wordCounter = document.getElementById("wordCounter");
    const charCounter = document.getElementById("charCounter");
    const formResult = document.getElementById("formResult");


    /*
     * Подсчёт слов
     */

    function countWords(text) {

        const trimmedText = text.trim();

        if (trimmedText === "") {
            return 0;
        }

        return trimmedText
            .split(/\s+/)
            .filter(word => word.length > 0)
            .length;
    }


    /*
     * Обновление счётчиков
     */

    function updateCounters() {

        const text = messageInput.value;

        const words = countWords(text);
        const characters = text.length;

        wordCounter.textContent =
            `Слов: ${words} / минимум 10`;

        charCounter.textContent =
            `Символов: ${characters} / 3000`;


        if (words >= 10) {
            wordCounter.classList.add("counter-valid");
        } else {
            wordCounter.classList.remove("counter-valid");
        }


        if (characters >= 50 && characters <= 3000) {
            charCounter.classList.add("counter-valid");
        } else {
            charCounter.classList.remove("counter-valid");
        }

    }


    messageInput.addEventListener("input", updateCounters);


    /*
     * Проверка email
     */

    emailInput.addEventListener("input", function () {

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailPattern.test(emailInput.value)) {

            emailInput.setCustomValidity("");

        } else {

            emailInput.setCustomValidity(
                "Введите полный корректный адрес электронной почты."
            );

        }

    });


    /*
     * Проверка сообщения
     */

    messageInput.addEventListener("input", function () {

        const words = countWords(messageInput.value);


        if (words < 10) {

            messageInput.setCustomValidity(
                "Сообщение должно содержать минимум 10 слов."
            );

        } else if (messageInput.value.length < 50) {

            messageInput.setCustomValidity(
                "Сообщение должно содержать минимум 50 символов."
            );

        } else {

            messageInput.setCustomValidity("");

        }

    });


    /*
     * Отправка формы
     */

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const words = countWords(messageInput.value);


        /*
         * Проверяем количество слов
         */

        if (words < 10) {

            messageInput.setCustomValidity(
                "Сообщение должно содержать минимум 10 слов."
            );

        } else if (messageInput.value.length < 50) {

            messageInput.setCustomValidity(
                "Сообщение должно содержать минимум 50 символов."
            );

        } else {

            messageInput.setCustomValidity("");

        }


        /*
         * Проверяем email
         */

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (!emailPattern.test(emailInput.value)) {

            emailInput.setCustomValidity(
                "Введите полный корректный адрес электронной почты."
            );

        } else {

            emailInput.setCustomValidity("");

        }


        /*
         * Проверяем стандартную HTML5-валидацию
         */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;
        }


        /*
         * Если все проверки пройдены
         */

        formResult.textContent =
            "✓ Сообщение успешно подготовлено к отправке! Спасибо за ваше обращение.";

        formResult.classList.add("success");


        /*
         * Очищаем форму
         */

        form.reset();

        updateCounters();


        /*
         * Убираем сообщение через 7 секунд
         */

        setTimeout(function () {

            formResult.textContent = "";
            formResult.classList.remove("success");

        }, 7000);

    });


    /*
     * Первоначальное состояние счётчиков
     */

    updateCounters();

});