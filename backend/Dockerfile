# Используем официальный базовый образ для Python 3.12
FROM python:3.12

# Устанавливаем рабочую директорию для приложения
WORKDIR /app

# Копируем файл зависимостей
COPY backend/requirements.txt backend/requirements.txt

# Устанавливаем Python зависимости
RUN pip3 install --no-cache-dir -r backend/requirements.txt

# Копируем остальную часть приложения
COPY . .

ENTRYPOINT ["python3", "app.py"]