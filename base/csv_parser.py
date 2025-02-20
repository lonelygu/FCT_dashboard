import csv


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
        return passed, not_passed
    except FileNotFoundError:
        return 0, 0  # Если файла нет, возвращаем 0
