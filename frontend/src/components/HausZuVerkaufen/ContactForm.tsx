import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    gender: "Herr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [adresseSaisie, setAdresseSaisie] = useState("");
  const [adresseValide, setAdresseValide] = useState<boolean | null>(null);
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setPhoneValid(isPhoneValid(value));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isAdresseStructureValide = (adresse: string): boolean => {
    const pattern = /^[a-zA-ZäöüÄÖÜß\s]+\s[\w-]+,\s\d{5}\s[a-zA-ZäöüÄÖÜß\s-]+$/;
    return pattern.test(adresse.trim());
  };

  const isPhoneValid = (phone: string): boolean => {
    if (!phone) return true; // Optionnel
    const pattern = /^\+?[0-9\s\-()]{8,}$/;
    return pattern.test(phone.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdresseStructureValide(adresseSaisie)) {
      setAdresseValide(false);
      setMessage(
        "⚠️ Bitte gib die Adresse im Format 'Straße Hausnummer, PLZ Ort' ein."
      );
      return;
    }

    if (!isPhoneValid(formData.phone)) {
      setPhoneValid(false);
      setMessage(
        "⚠️ Bitte gib eine gültige Telefonnummer ein oder lasse das Feld leer."
      );
      return;
    }

    // Valide !
    setAdresseValide(true);
    setPhoneValid(true);
    setMessage("✅ Anfrage erfolgreich übermittelt!");
    console.log("Form submitted:", {
      ...formData,
      adresse: adresseSaisie,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-white shadow-sm"
    >
      <h4 className="mb-3">Kontaktieren Sie uns</h4>

      {/* Anrede */}
      <div className="mb-3">
        <label className="form-label">Anrede</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Herr"
              checked={formData.gender === "Herr"}
              onChange={handleChange}
            />
            <label className="form-check-label">Herr</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Frau"
              checked={formData.gender === "Frau"}
              onChange={handleChange}
            />
            <label className="form-check-label">Frau</label>
          </div>
        </div>
      </div>

      {/* Vorname */}
      <div className="mb-3">
        <input
          className="form-control"
          name="firstName"
          placeholder="Vorname"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      {/* Nachname */}
      <div className="mb-3">
        <input
          className="form-control"
          name="lastName"
          placeholder="Nachname"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {/* E-Mail */}
      <div className="mb-3">
        <input
          className="form-control"
          name="email"
          type="email"
          placeholder="E-Mail"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Telefon (Optional) */}
      <div className="mb-3">
        <label className="form-label">
          Telefon <span className="text-muted">(Optional)</span>
        </label>
        <input
          className={`form-control ${
            phoneValid === false
              ? "is-invalid"
              : phoneValid === true
              ? "is-valid"
              : ""
          }`}
          name="phone"
          type="tel"
          placeholder="z. B. +49 152 000000"
          value={formData.phone}
          onChange={handleChange}
        />
        {phoneValid === false && (
          <div className="invalid-feedback">
            ❌ Ungültige Telefonnummer. Mind. 8 Ziffern erforderlich.
          </div>
        )}
      </div>

      {/* Adresse manuelle */}
      <div className="mb-3">
        <small className="text-muted d-block mb-1">
          Format Adresse: <i>z. B. Musterstraße 12A, 12345 Berlin</i>
        </small>
        <input
          type="text"
          className={`form-control ${
            adresseValide === false
              ? "is-invalid"
              : adresseValide === true
              ? "is-valid"
              : ""
          }`}
          value={adresseSaisie}
          onChange={(e) => {
            const saisie = e.target.value;
            setAdresseSaisie(saisie);
            setAdresseValide(isAdresseStructureValide(saisie));
          }}
          placeholder="Adresse eingeben"
        />
        {adresseValide === false && (
          <div className="invalid-feedback">❌ Ungültiges Adressformat</div>
        )}
        {adresseValide === true && (
          <div className="valid-feedback">✅ Adresse korrekt</div>
        )}
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-warning w-100 mt-2">
        Kontaktanfrage senden
      </button>

      {/* Feedback */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </form>
  );
};

export default ContactForm;
