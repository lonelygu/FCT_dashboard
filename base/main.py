from flask import Flask, Blueprint, render_template, request, jsonify
from csv_parser import  calculate_statistics

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
    year = data.get("year")

    # Определяем, какой файл использовать
    file_mapping = {
        2023: "data/data1.csv",
        2024: "data/data2.csv",
        2025: "data/data3.csv"
    }

    # По умолчанию 2023 год
    csv_file = file_mapping.get(year, "data/data1.csv")

    # Получаем данные из парсера
    percentage, passed, failed = calculate_statistics(csv_file)
    content_text = "Обучение специалистов ППЭ ЕГЭ"
    new_data = f"Прошли обучение: {passed}"
    text_to_passed = f"Прошли обучение: {passed}"
    text_to_failed = f"Не прошли обучение: {failed}"
    # Формируем и возвращаем JSON ответ
    return jsonify({
        'content_text': content_text,
        'percentage': percentage,
        'passed': passed,
        'failed': failed,
        'text_to_passed': text_to_passed,
        'text_to_failed': text_to_failed
    })


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
