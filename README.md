# 🏠 STN Production

**STN Production** ist eine **Immobilienplattform**, die sich auf die Verwaltung und Präsentation von Mietobjekten spezialisiert.  
Die Plattform ermöglicht es den Nutzern, **aktuelle Mietangebote zu durchsuchen** und sich einen Überblick über verfügbare Objekte zu verschaffen.

---

## 📌 Details

- 🔍 **Nutzer**: können die verschiedenen Mietangebote ansehen und den **Vermieter über ein Kontaktformular** erreichen.
- 🛠️ **Administratoren**: haben Zugriff auf ein **umfassendes Dashboard**, um:
  - Neue Angebote zu erstellen und zu veröffentlichen
  - **Feedback und Nachrichten von Nutzern** einzusehen
  - Inhalte der Plattform zu verwalten (Häuser, Nutzer, Kontaktanfragen, usw.)

---

## 🚀 Projektvorschau

🎥 Eine Demo-Video-Vorschau ist bald hier verfügbar:  
➡️ [link video](./backend/media/1.webm)

---

## ⚙️ Verwendete Technologien

- **Frontend**: React (TypeScript)
- **Backend**: Django Rest Framework (Python)
- **Datenbank**: PostgreSQL (packen in Docker)
- **Authentifizierung**: JWT
- **Hosting**: Fly.io 
- **Weitere Tools**: Docker, GitHub Actions, etc.

---

## 🧑‍💻 Projekt starten

### 1. Repository klonen

```bash
git clone https://github.com/lemael/stn-consulting.git
cd stn-production

### 2. Backend starten
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### 3. Frontend starten

cd frontend
npm install
npm start

# 🙋‍♂️ Autor

Mael Rostand Tchinde Fosso
📧 mael.fosso@tu-dortmund.de
