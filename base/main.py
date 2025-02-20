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


# Функция для вычисления данных
@main.route("/get_data", methods=["POST"])
def get_data():
    data = request.get_json()
    year = data.get("year", 2023)  # По умолчанию 2023 год

    # Маппинг файлов для каждого года
    file_mapping = {
        2023: ["data/random_data1.csv", "data/random_data2.csv","data/random_data3.csv"],
        2024: ["data/random_data4.csv", "data/random_data5.csv","data/random_data6.csv"],
        2025: ["data/random_data7.csv", "data/random_data8.csv","data/random_data9.csv"]
    }

    # Получаем список файлов для выбранного года
    files_for_year = file_mapping.get(year, ["data/data1.csv"])

    # Переменная для хранения результатов
    response_data = []

    # Обрабатываем каждый файл для выбранного года
    for i, file_path in enumerate(files_for_year, start=1):
        passed, failed = csv_parser(file_path)
        total = passed + failed

        if isinstance(total, int) or (isinstance(total, float) and total.is_integer()):
            total = int(total)  # Приводим к int, если это float с целым значением
        else:
            total = None  # Или можно выбросить ошибку

        # Формируем ответ для каждого графика
        response_data.append({
            "content_text": f"График {i} ({year})",
            "percentage": round((passed / total) * 100 if total > 0 else 0, 2),
            "passed": passed,
            "failed": failed,
            "text_to_passed": f"Пройдено: {passed}",
            "text_to_failed": f"Не пройдено: {failed}"
        })

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
