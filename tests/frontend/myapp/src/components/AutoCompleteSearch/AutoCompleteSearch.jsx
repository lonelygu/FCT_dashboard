import React, { useState, useEffect } from "react";

const options = [
    { name: 'Республика Адыгея', code: 1 }, { name: 'Республика Башкортостан', code: 2 }, { name: 'Республика Бурятия', code: 3 },
    { name: 'Республика Алтай', code: 4 }, { name: 'Республика Дагестан', code: 5 }, { name: 'Республика Ингушетия', code: 6 },

    { name: 'Кабардино-Балкарская Республика', code: 7 }, { name: 'Республика Калмыкия', code: 8 }, { name: 'Карачаево-Черкесская Республика', code: 9 },
    { name: 'Республика Карелия', code: 10 }, { name: 'Республика Коми', code: 11 }, { name: 'Республика Марий Эл', code: 12 },

    { name: 'Республика Мордовия', code: 13 }, { name: 'Республика Саха (Якутия)', code: 14 }, { name: 'Республика Северная Осетия', code: 15 },
    { name: 'Республика Татарстан', code: 16 }, { name: 'Республика Тыва', code: 17 }, { name: 'Удмуртская Республика', code: 18 },

    { name: 'Республика Хакасия', code: 19 }, { name: 'Чеченская Республика', code: 20 }, { name: 'Чувашская Республика', code: 21 },
    { name: 'Алтайский край', code: 22 }, { name: 'Краснодарский край', code: 23 }, { name: 'Красноярский край', code: 24 },

    { name: 'Приморский край', code: 25 }, { name: 'Ставропольский край', code: 26 }, { name: 'Хабаровский край', code: 27 },
    { name: 'Амурская область', code: 28 }, { name: 'Архангельская область', code: 29 }, { name: 'Астраханская область', code: 30 },

    { name: 'Белгородская область', code: 31 }, { name: 'Брянская область', code: 32 }, { name: 'Владимирская область', code: 33 },
    { name: 'Волгоградская область', code: 34 }, { name: 'Вологодская область', code: 35 }, { name: 'Воронежская область', code: 36 },

    { name: 'Ивановская область', code: 37 }, { name: 'Иркутская область', code: 38 }, { name: 'Калининградская область', code: 39 },
    { name: 'Калужская область', code: 40 }, { name: 'Камчатский край', code: 41 }, { name: 'Кемеровская область', code: 42 },

    { name: 'Кировская область', code: 43 }, { name: 'Костромская область', code: 44 }, { name: 'Курганская область', code: 45 },
    { name: 'Курская область', code: 46 }, { name: 'Ленинградская область', code: 47 }, { name: 'Липецкая область', code: 48 },

    { name: 'Магаданская область', code: 49 }, { name: 'Московская область', code: 50 }, { name: 'Мурманская область', code: 51 },
    { name: 'Нижегородская область', code: 52 }, { name: 'Новгородская область', code: 53 }, { name: 'Новосибирская область', code: 54 },

    { name: 'Омская область', code: 55 }, { name: 'Оренбургская область', code: 56 }, { name: 'Орловская область', code: 57 },
    { name: 'Пензенская область', code: 58 }, { name: 'Пермский край', code: 59 }, { name: 'Псковская область', code: 60 },

    { name: 'Ростовская область', code: 61 }, { name: 'Рязанская область', code: 62 }, { name: 'Самарская область', code: 63 },
    { name: 'Саратовская область', code: 64 }, { name: 'Сахалинская область', code: 65 }, { name: 'Свердловская область', code: 66 },

    { name: 'Смоленская область', code: 67 }, { name: 'Тамбовская область', code: 68 }, { name: 'Тверская область', code: 69 },
    { name: 'Томская область', code: 70 }, { name: 'Тульская область', code: 71 }, { name: 'Тюменская область', code: 72 },

    { name: 'Ульяновская область', code: 73 }, { name: 'Челябинская область', code: 74 }, { name: 'Забайкальский край', code: 75 },
    { name: 'Ярославская область', code: 76 }, { name: 'город Москва', code: 77 }, { name: 'город Санкт-Петербург', code: 78 },

    { name: 'Еврейская автономная область', code: 79 }, { name: 'Ненецкий автономный округ', code: 83 }, { name: 'Ханты-Мансийский автономный округ', code: 86 },
    { name: 'Чукотский автономный округ', code: 87 }, { name: 'Ямало-Ненецкий автономный округ', code: 89 }, { name: 'город Севастополь', code: 92 }
];

const AutoCompleteSearch = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);  // Изначально показываем все регионы
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (inputValue) {
      // Фильтруем только если есть введенный текст
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.code.toString().includes(inputValue)
      );
      setFilteredOptions(filtered);
    } else {
      // Если строка поиска пустая, показываем все регионы
      setFilteredOptions(options);
    }
  }, [inputValue]);

  const handleSelect = (option) => {
    setInputValue(option.name);
    setShowOptions(false);
    if (onSelect) onSelect(option);
  };

  const handleClickInput = () => {
    setShowOptions(true); // Показываем список при клике на поле поиска
  };

  const handleBlur = () => {
    // Для того чтобы список закрывался, если пользователь кликнул вне поля
    setTimeout(() => {
      setShowOptions(false); // Скрывает выпадающий список после клика вне поля поиска
    }, 200); // Небольшая задержка, чтобы клики по элементам списка успели сработать
  };

    return (
      <div className="autocomplete mb-4">
        <input
          type="text"
          id="searchInput"
          placeholder="Введите название региона..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={handleClickInput}  // Показываем список только при клике
          onBlur={handleBlur}  // Скрываем список при потере фокуса
          className="p-2 bg-gray-700 text-white rounded w-full"
        />
        {showOptions && (
          <div className="autocomplete-options bg-gray-700 rounded mt-2 h-96 w-full overflow-y-auto scrollbar-custom">
            {filteredOptions.map(option => (
              <div
                key={option.code}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-gray-600 cursor-pointer"
              >
                {option.code} - {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default AutoCompleteSearch;
