# Используем официальный базовый образ для Python 3.12
FROM python:3.12-slim

# Устанавливаем Python зависимости
COPY backend/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

WORKDIR /backend
COPY backend/ .

# Используем ENTRYPOINT для запуска Python приложения
ENTRYPOINT ["python3", "app.py"]
