$(document).ready(function() {
    // Функция для обновления прогресс-бара и статистики
    function updateProgressBar(year) {
        $.ajax({
            url: "/get_data",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ year: year }),
            success: function(response) {
                // Обновляем все данные, полученные от сервера
                let contentText = response.content_text;  // Заголовок
                let successPercentage = response.percentage;  // Процент успешных
                let passed = response.passed;  // Количество прошедших
                let failed = response.failed;  // Количество не прошедших
                let textToPassed = response.text_to_passed;
                let textToFailed = response.text_to_failed;


                // Обновляем текст с процентом
                $("#progress-text").text(successPercentage + "%");

                // Обновляем прогресс-бар
                var progressElement = document.getElementById('progress');
                progressElement.style.width = successPercentage + '%';

                // Обновляем статистику
                $("#passed").text(textToPassed);
                $("#failed").text(textToFailed);


                // Обновляем текст в карточке
                $("#card-header").text(contentText);
            },
            error: function() {
                $("#progress-text").text("Ошибка загрузки данных.");
            }
        });
    }

    // Автоматически загружаем данные за текущий год при загрузке страницы
    let currentYear = new Date().getFullYear();
    updateProgressBar(currentYear);

    // Кнопки для выбора годов
    $(".year-btn").click(function() {
        let year = $(this).data("year"); // Получаем год из data-атрибута кнопки
        updateProgressBar(year);  // Загружаем данные для выбранного года
    });
});
