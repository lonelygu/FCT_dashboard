from flask import Flask, Blueprint, render_template, request, redirect, url_for, jsonify, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

from csv_parser import csv_parser
# Ваши маршруты (как в первом фрагменте)
routes = {
    '/': 'index.html',
    '/map': 'map.html',
    '/monitoring': 'monitoring.html',
    '/analysis': 'analysis.html',
    '/admission': 'admission.html',
    '/calendar': 'calendar.html',
    '/survey': 'survey.html',
    '/technical_sup': 'technical_sup.html',
    '/documentation': 'documentation.html',
    '/contact_info': 'contact_info.html'
}

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Для работы с сессиями

# Инициализация LoginManager
login_manager = LoginManager()
login_manager.init_app(app)


# Пример модели пользователя
class User(UserMixin):
    def __init__(self, id):
        self.id = id


# Эмуляция базы данных пользователей
users_db = {
    'user1': '1',
    'user2': '2'
}


# Загружаем пользователя по его ID
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)


# Блюпринт для основного функционала
main = Blueprint('main', __name__)


# Обработчик входа в систему
@main.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.dashboard'))  # Если пользователь уже авторизован, перенаправляем на панель

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Проверка, есть ли пользователь в базе данных
        if username in users_db and users_db[username] == password:
            user = User(username)
            login_user(user)
            return redirect(url_for('main.index'))  # Перенаправляем на панель после успешного входа
        else:
            flash('Неверный логин или пароль', 'error')  # Отправляем сообщение об ошибке в flash
            return render_template('login.html', username=username)  # Сохраняем введённый логин

    return render_template('login.html')


# Обработчик выхода из системы
@main.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.login'))


# Защищённый маршрут для авторизованных пользователей
@main.route('/index')
@login_required
def index():
    return render_template('index.html')


# Логика получения данных (по примеру из первого фрагмента)
@main.route("/get_data", methods=["POST"])
def get_data():
    data = request.get_json()
    year = data.get("year", 2023)  # По умолчанию 2023 год

    # Маппинг файлов для каждого года
    file_mapping = {
        2023: ["data/random_data_1.csv", "data/random_data_2.csv", "data/random_data_3.csv"],
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


# Пример событий
events = [
    {"date": "2025-02-27", "event": "ГИА-9", "description": "Сбор сведений о ГИА-9"},
    {"date": "2025-02-27", "event": "ГИА-11", "description": "Ведение РИС ГИА-11"},
    {"date": "2025-02-27", "event": "Конференция", "description": "Обсуждение итогов обучения"},
    {"date": "2025-02-27", "event": "Семинар", "description": "Обсуждение новых образовательных стандартов"},
    {"date": "2025-02-27", "event": "ГИА-9", "description": "Начало ГИА-9 по русскому языку"},
    {"date": "2025-02-28", "event": "ГИА-11", "description": "Экзамен по математике"},
    {"date": "2025-02-28", "event": "Конференция", "description": "Педагогический совет"},
    {"date": "2025-02-28", "event": "Семинар", "description": "Методические рекомендации по ГИА"},
    {"date": "2025-02-28", "event": "ГИА-9", "description": "Подведение итогов ГИА-9"},
    {"date": "2025-02-28", "event": "ГИА-11", "description": "Подведение итогов ГИА-11"},
    {"date": "2025-08-15", "event": "Конференция", "description": "Обсуждение новых образовательных программ"},
    {"date": "2025-09-01", "event": "Семинар", "description": "Совещание перед началом учебного года"},
    {"date": "2025-09-10", "event": "ГИА-9", "description": "Пробное тестирование ГИА-9"},
    {"date": "2025-09-20", "event": "ГИА-11", "description": "Пробное тестирование ГИА-11"},
    {"date": "2025-10-05", "event": "Конференция", "description": "Совещание преподавателей"},
    {"date": "2025-10-15", "event": "Семинар", "description": "Анализ образовательных программ"},
    {"date": "2025-10-25", "event": "ГИА-9", "description": "Консультации по ГИА-9"},
    {"date": "2025-11-05", "event": "ГИА-11", "description": "Консультации по ГИА-11"},
    {"date": "2025-11-15", "event": "Конференция", "description": "Обсуждение методик преподавания"},
    {"date": "2025-11-25", "event": "Семинар", "description": "Новые подходы к дистанционному обучению"},
    {"date": "2025-12-01", "event": "ГИА-9", "description": "Подготовка к итоговому сочинению"},
    {"date": "2025-12-10", "event": "ГИА-11", "description": "Подготовка к итоговому экзамену"},
    {"date": "2025-12-20", "event": "Конференция", "description": "Обсуждение образовательных стандартов"},
    {"date": "2026-01-05", "event": "Семинар", "description": "Методология подготовки к экзаменам"},
    {"date": "2026-01-15", "event": "ГИА-9", "description": "Репетиция экзамена по математике"},
    {"date": "2026-01-25", "event": "ГИА-11", "description": "Репетиция экзамена по русскому языку"},
    {"date": "2026-02-10", "event": "Конференция", "description": "Рассмотрение итогов первого полугодия"},
    {"date": "2026-02-20", "event": "Семинар", "description": "Практические задания для подготовки к ГИА"},
    {"date": "2026-03-05", "event": "ГИА-9", "description": "Промежуточная аттестация по истории"},
    {"date": "2026-03-15", "event": "ГИА-11", "description": "Промежуточная аттестация по физике"},
    {"date": "2026-04-01", "event": "Конференция", "description": "Работа с образовательными платформами"},
    {"date": "2026-04-10", "event": "Семинар", "description": "Тренинг по ведению уроков"},
    {"date": "2026-04-20", "event": "ГИА-9", "description": "Пробный экзамен по химии"},
    {"date": "2026-05-01", "event": "ГИА-11", "description": "Пробный экзамен по биологии"},
    {"date": "2026-05-10", "event": "Конференция", "description": "Обсуждение новых учебных планов"},
    {"date": "2026-06-01", "event": "Семинар", "description": "Современные технологии в обучении"},
    {"date": "2026-06-10", "event": "ГИА-9", "description": "Проверка знаний по географии"},
    {"date": "2026-07-01", "event": "ГИА-11", "description": "Проверка знаний по информатике"},
    {"date": "2026-07-10", "event": "Конференция", "description": "Подготовка к следующему учебному году"},
    {"date": "2026-08-01", "event": "Семинар", "description": "Советы по обучению школьников"},
    {"date": "2026-08-10", "event": "ГИА-9", "description": "Старт подготовки к новому ГИА"},
    {"date": "2026-08-20", "event": "ГИА-11", "description": "Старт подготовки к итоговым экзаменам"},
    {"date": "2026-09-01", "event": "Конференция", "description": "Начало нового учебного года"},
    {"date": "2026-09-15", "event": "Семинар", "description": "Психология в образовательном процессе"},
    {"date": "2026-10-01", "event": "ГИА-9", "description": "Пробный экзамен по английскому языку"},
    {"date": "2026-10-10", "event": "ГИА-11", "description": "Пробный экзамен по обществознанию"},
    {"date": "2026-10-20", "event": "Конференция", "description": "Развитие школьного образования"},
    {"date": "2026-11-01", "event": "Семинар", "description": "Новые подходы к тестированию знаний"},
    {"date": "2026-11-10", "event": "ГИА-9", "description": "Предварительная подготовка к ГИА"},
    {"date": "2026-12-01", "event": "ГИА-11", "description": "Предварительная подготовка к ЕГЭ"},
    {"date": "2026-12-15", "event": "Конференция", "description": "Итоговое заседание преподавателей"},
]
# Получение списка событий
@main.route('/get-events')
def get_events():
    return jsonify(events)


# Динамическая регистрация маршрутов для каждого шаблона
# Динамическая регистрация маршрутов для каждого шаблона
for route, template in routes.items():
    def make_route(template=template, route=route):  # добавлен параметр для маршрута
        # Уникальная функция для каждого маршрута
        def dynamic_route():
            if current_user.is_authenticated:
                return render_template(template)
            else:
                return redirect(url_for('main.login'))  # Перенаправление для неавторизованных пользователей

        dynamic_route.__name__ = f"dynamic_route_{route.replace('/', '')}"  # Уникальное имя функции
        return dynamic_route

    # Создание и регистрация маршрута
    main.add_url_rule(route, view_func=make_route(template, route))


# Регистрируем блюпринт
app.register_blueprint(main)

if __name__ == '__main__':
    app.run(debug=True)
