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
    year = data.get("year", 2023)  # По умолчанию 2023 год

    file_mapping = {
        2023: "data/data1.csv",
        2024: "data/data2.csv",
        2025: "data/data3.csv"
    }

    csv_file = file_mapping.get(year, "data/data1.csv")

    passed, failed = calculate_statistics(csv_file)
    total = passed + failed
    if isinstance(total, int) or (isinstance(total, float) and total.is_integer()):
        total = int(total)  # Приводим к int, если это float с целым значением
    else:
        total = None  # Или можно выбросить ошибку
    return jsonify(
        {
            "data-container_1": {
                "content_text": f"График 1 ({year})",
                "percentage": round((passed / total) * 100 if total > 0 else 0, 2),
                "passed": passed,
                "failed": failed,
                "text_to_passed": f"Пройдено: {passed}",
                "text_to_failed": f"Не пройдено: {failed}"
            },
            "data-container_2": {
                "content_text": f"График 2 ({year})",
                "percentage": round((passed / total) * 100 if total > 0 else 0, 2) ,
                "passed": passed - 10,
                "failed": failed + 10,
                "text_to_passed": f"Пройдено: {passed - 10}",
                "text_to_failed": f"Не пройдено: {failed + 10}"
            }
        }
    )



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
