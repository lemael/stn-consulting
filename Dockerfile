# Étape 1 : Construire le frontend React
FROM node:18 AS frontend
WORKDIR /app
COPY frontend/ /app/
RUN npm install && npm run build

# Étape 2 : Backend Django
FROM python:3.10-slim

# Empêcher la création de fichiers pyc / activer affichage live
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Copier les fichiers backend
COPY backend/ /app/

# Copier les fichiers frontend compilés dans le backend
COPY --from=frontend /app/build /app/frontend_build/

# Installer les dépendances Python
RUN pip install --upgrade pip && pip install -r requirements.txt

# Collecter les fichiers statiques (React + Django)
RUN python manage.py collectstatic --noinput

# Exposer le port pour Fly.io
EXPOSE 8080

# Lancer le serveur Django avec Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8080"]
