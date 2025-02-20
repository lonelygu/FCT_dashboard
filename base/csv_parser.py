import csv


def calculate_percentage(csv_file):
    """
    Функция для вычисления процента прошедших обучение на основе CSV.
    :param csv_file: Путь к файлу CSV
    :return: Процент прошедших обучение
    """
    passed = 0
    total = 0

    try:
        with open(csv_file, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                total += int(row["Количество"])  # Общая сумма
                if row["Статус"] == "Прошли обучение":
                    passed += int(row["Количество"])

        return round((passed / total) * 100, 2) if total > 0 else 0
    except FileNotFoundError:
        return 0  # Если файла нет, возвращаем 0


def calculate_statistics(csv_file):
    """
    Функция для вычисления процента прошедших обучение, а также количества прошедших и не прошедших.

    :param csv_file: Путь к файлу CSV
    :return: Процент прошедших обучение, количество прошедших и не прошедших обучение
    """
    passed = 0
    not_passed = 0
    total = 0

    try:
        with open(csv_file, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                total += int(row["Количество"])  # Общая сумма
                if row["Статус"] == "Прошли обучение":
                    passed += int(row["Количество"])
                elif row["Статус"] == "Не прошли":
                    not_passed += int(row["Количество"])

        # Рассчитываем процент
        percentage = (passed / total) * 100 if total > 0 else 0
        return round(percentage, 2), passed, not_passed
    except FileNotFoundError:
        return 0, 0, 0  # Если файла нет, возвращаем 0
