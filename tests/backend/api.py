from flask import Blueprint, jsonify, request
from flask_cors import CORS

# Создаем Blueprint для API
api = Blueprint('api', __name__)

# Разрешаем CORS для всех маршрутов в этом Blueprint
CORS(api)

# Пример данных для разных годов
data1 = {
    2023: {"passed": [124], "failed": [30]},
    2024: {"passed": [234], "failed": [37]},
    2025: {"passed": [504], "failed": [300]},
}

data2 = {
    2023: {"passed": [1240], "failed": [300]},
    2024: {"passed": [2340], "failed": [370]},
    2025: {"passed": [5040], "failed": [3000]},
}

data3 = {
    2023: {"passed": [12400], "failed": [3000]},
    2024: {"passed": [23400], "failed": [3700]},
    2025: {"passed": [50400], "failed": [3000]},
}

# Пример списка событий
events = [
    {"title": "Открытие года", "description": "Церемония открытия нового года.", "type": "Официальное", "start_date": "2025-01-10", "end_date": "2025-01-10"},
    {"title": "Конференция по технологиям", "description": "Обсуждение новых трендов.", "type": "Конференция", "start_date": "2025-02-15", "end_date": ""},
    {"title": "Хакатон", "description": "Соревнование программистов.", "type": "Соревнование", "start_date": "2025-03-20", "end_date": "2025-03-22"},
    {"title": "Форум лидеров", "description": "Встреча руководителей.", "type": "Форум", "start_date": "2025-04-05", "end_date": "2025-04-06"},
    {"title": "Открытие года", "description": "Церемония открытия нового года.", "type": "Официальное", "start_date": "2025-02-10", "end_date": "2025-02-10"},
    {"title": "Конференция по технологиям", "description": "Обсуждение новых трендов.", "type": "Конференция", "start_date": "2025-03-15", "end_date": ""},
    {"title": "Хакатон", "description": "Соревнование программистов.", "type": "Соревнование", "start_date": "2025-03-25", "end_date": "2025-03-27"},
    {"title": "Форум лидеров", "description": "Встреча руководителей.", "type": "Форум", "start_date": "2025-05-05", "end_date": "2025-05-06"},
    {"title": "Выставка инноваций", "description": "Презентация новых технологий.", "type": "Выставка", "start_date": "2025-05-12", "end_date": "2025-05-14"}
]

@api.route("/statistics_1", methods=["GET"])
def get_statistics_1():
    year = request.args.get("year", type=int)
    return jsonify(data1.get(year, {"error": "Данные для этого года не найдены"})), 200 if year in data1 else 404

@api.route("/statistics_2", methods=["GET"])
def get_statistics_2():
    year = request.args.get("year", type=int)
    return jsonify(data2.get(year, {"error": "Данные для этого года не найдены"})), 200 if year in data2 else 404

@api.route("/statistics_3", methods=["GET"])
def get_statistics_3():
    year = request.args.get("year", type=int)
    return jsonify(data3.get(year, {"error": "Данные для этого года не найдены"})), 200 if year in data3 else 404

@api.route("/events", methods=["GET"])
def get_events():
    return jsonify({"events": events}), 200
