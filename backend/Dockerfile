# Используем официальный базовый образ для Python 3.12
FROM python:3.12-slim

# Устанавливаем рабочую директорию для приложения
WORKDIR /backend

# Копируем файл зависимостей
COPY backend/requirements.txt requirements.txt

# Устанавливаем Python зависимости
RUN pip3 install --no-cache-dir -r requirements.txt

# Копируем модель
COPY backend/application/embedmodel/cc.ru.300.bin.gz /backend/application/embedmodel/cc.ru.300.bin.gz

# Копируем остальную часть приложения
COPY backend/ .

# Устанавливаем команду запуска
ENTRYPOINT ["python3", "app.py"]
