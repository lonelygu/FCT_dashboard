import pandas as pd
import numpy as np


def generate_csv_files(num_files=9, num_rows=100, num_columns=1):
    for i in range(1, num_files + 1):
        # Генерация случайных данных (0 или 1)
        data = np.random.randint(0, 2, size=(num_rows, num_columns))

        # Создание DataFrame с заголовками
        columns = [f"Column_{j + 1}" for j in range(num_columns)]
        df = pd.DataFrame(data, columns=columns)

        # Сохранение в CSV
        filename = f"random_data_{i}.csv"
        df.to_csv(filename, index=False)
        print(f"Файл {filename} создан.")


# Запуск генерации файлов
generate_csv_files()