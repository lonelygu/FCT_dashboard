import pandas as pd


def csv_parser(file_path):
    """
    Универсальный парсер CSV, который:
    - Определяет нужный столбец (кроме 'ID')
    - Считает количество 0 и 1
    - Возвращает (passed, failed)
    """
    try:
        df = pd.read_csv(file_path)

        # Находим первый столбец с данными (исключаем ID)
        data_column = [col for col in df.columns if col.lower() != "id"][0]

        # Подсчет значений
        counts = df.groupby(data_column)[data_column].count()

        passed = counts.get(1, 0)  # Количество значений 1
        failed = counts.get(0, 0)  # Количество значений 0

        return passed, failed
    except Exception as e:
        print(f"Ошибка при обработке файла {file_path}: {e}")
        return 0, 0
