$(document).ready(function() {
    function updateProgressBars(year) {
        $.ajax({
            url: "/get_data",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ year: year }),
            success: function(response) {

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
    updateProgressBars(currentYear);

    $(".year-btn").click(function() {
        let year = $(this).data("year");
        updateProgressBars(year);
    });
});
