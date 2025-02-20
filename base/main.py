from flask import Flask, Blueprint, render_template, request, jsonify
from csv_parser import  csv_parser

main = Blueprint('main', __name__)

# Dictionary with route names and corresponding templates
routes = {
    '/': 'index.html',
    '/map': 'map.html',
    '/monitoring': 'monitoring.html',
    '/analysis': 'analysis.html',
    '/admission': 'admission.html',
    '/calendar': 'calendar.html',
    '/survey': 'survey.html',
    '/technical_sup':'technical_sup.html',
    '/documentation': 'documentation.html',
    '/contact_info': 'contact_info.html'
}


@main.route("/get_data", methods=["POST"])
def get_data():
    data = request.get_json()
    year = data.get("year", 2023)  # По умолчанию 2023 год

    # Маппинг файлов для каждого года
    file_mapping = {
        2023: ["data/random_data_1.csv" , "data/random_data_2.csv", "data/random_data_3.csv"],
        2024: ["data/random_data_4.csv", "data/random_data_5.csv", "data/random_data_6.csv"],
        2025: ["data/random_data_7.csv", "data/random_data_8.csv", "data/random_data_9.csv"]
    }

    # Получаем список файлов для выбранного года
    files_for_year = file_mapping.get(year, ["data/random_data_1.csv"])

    # Создаём словарь для хранения результатов
    response_data = {}

    # Обрабатываем каждый файл для выбранного года
    for i, file_path in enumerate(files_for_year, start=1):
        passed, failed = csv_parser(file_path)
        total = passed + failed

        # Безопасное деление (чтобы избежать деления на ноль)
        percentage = round((int(passed) / max(1, int(total))) * 100, 2)

        # Формируем ответ с ключом "data-container_X"
        response_data[f"data-container_{i}"] = {
            "content_text": f"График {i} ({year})",
            "percentage": percentage,
            "passed": int(passed),
            "failed": int(failed),
            "text_to_passed": f"Пройдено: {int(passed)}",
            "text_to_failed": f"Не пройдено: {int(failed)}"
        }

    return jsonify(response_data)



# Register each route dynamically with a unique function name
for route, template in routes.items():
    def make_route(template=template):
        # Define a unique function for each route
        def dynamic_route():
            return render_template(template)
        dynamic_route.__name__ = f"dynamic_route_{route.replace('/', '')}"  # Make function name unique
        return dynamic_route

    # Create and register the route for each template
    main.add_url_rule(route, view_func=make_route(template))

app = Flask(__name__)
app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
