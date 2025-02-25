$(document).ready(function() {
    function updateProgressBars(year, url, formType) {
        console.log('Sending request with formType:', formType);  // Логируем formType
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ year: year, formType: formType }),  // Добавляем formType в запрос
            success: function(response) {
                console.log('Received response:', response);  // Логируем ответ
                $(".bar_graph").each(function(index, element) {
                    let containerId = "data-container_" + (index + 1);
                    let data = response[containerId];

                    if (data) {
                        let percentage = Math.min(100, parseFloat(data.percentage) || 0); // Ограничение 0-100%

                        $(element).find(".card-header").text(data.content_text);
                        $(element).find(".progress-text").text(percentage + "%");
                        $(element).find(".progress").css("width", percentage + "%");
                        $(element).find(".passed").text(data.text_to_passed);
                        $(element).find(".failed").text(data.text_to_failed);
                    }
                });
            },
            error: function() {
                console.error("Ошибка загрузки данных.");
            }
        });
    }

    let currentYear = new Date().getFullYear();
    let currentPageUrl = window.location.pathname; // Получаем текущий URL
    // Изменяем условие проверки на includes, чтобы правильно обработать /gia
    let formType = (currentPageUrl.includes('/monitoring/gia')) ? '/monitoring/gia' : '/'; // Передаем правильный formType
    console.log('Current page URL:', currentPageUrl);  // Логируем текущую страницу
    let dataUrl = '/get_data'; // Единый URL для обоих случаев

    updateProgressBars(currentYear, dataUrl, formType); // Передаем formType

    $(".year-btn").click(function() {
        let year = $(this).data("year");
        updateProgressBars(year, dataUrl, formType); // Передаем formType
    });
});
