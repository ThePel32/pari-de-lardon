import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageFormulaire() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        photo: null,
        sexe: '',
        prenom: '',
        poids: '',
        taille: '',
        couleurCheveux: '',
        typeCheveux: '',
        date: '',
        heure: '',
        choixPrix: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                photo: file
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom.trim()) newErrors.nom = 'Votre nom est requis';
        if (!formData.sexe) newErrors.sexe = 'Le sexe est requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!formData.poids) newErrors.poids = 'Le poids est requis';
        if (!formData.taille) newErrors.taille = 'La taille est requise';
        if (!formData.couleurCheveux) newErrors.couleurCheveux = 'La couleur des cheveux est requise';
        if (!formData.typeCheveux) newErrors.typeCheveux = 'Le type de cheveux est requis';
        if (!formData.date) newErrors.date = 'La date est requise';
        if (!formData.heure) newErrors.heure = 'L\'heure est requise';
        if (!formData.choixPrix) newErrors.choixPrix = 'Le choix du prix est requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const formDataToSend = new FormData();
            
            formDataToSend.append('nom', formData.nom.trim());
            formDataToSend.append('preference_prix', formData.choixPrix);
            
            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }
            
            const pronostics = {
                sexe: formData.sexe,
                prenom: formData.prenom.trim(),
                poids: parseFloat(formData.poids),
                taille: parseFloat(formData.taille),
                couleur_cheveux: formData.couleurCheveux,
                type_cheveux: formData.typeCheveux,
                date_naissance: formData.date,
                heure_naissance: formData.heure
            };
            
            Object.keys(pronostics).forEach(key => {
                formDataToSend.append(key, pronostics[key]);
            });

            const response = await fetch('http://localhost:3001/api/participants', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitSuccess(true);
                
                // Redirection vers la page participants après 3 secondes
                setTimeout(() => {
                    navigate('/participants');
                }, 3000);
                
            } else {
                throw new Error(result.error || 'Erreur lors de la création');
            }

        } catch (error) {
            console.error('Erreur:', error);
            setErrors({ 
                submit: error.message || 'Erreur lors de l\'envoi. Vérifiez que le serveur backend est démarré.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="formulaire-container">
                <div className="card text-center" style={{ padding: '40px', backgroundColor: '#e8f5e8' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                    <h2 style={{ color: '#2e7d32', marginBottom: '10px' }}>
                        Pronostics enregistrés !
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Merci <strong>{formData.nom}</strong> ! Vos pronostics pour <strong>{formData.prenom}</strong> ont été enregistrés avec succès.
                    </p>
                    <p style={{ color: '#666' }}>
                        Redirection vers les participants dans quelques secondes...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="formulaire-container">
            <h2 className="formulaire-title text-center">
                📝 Vos pronostics
            </h2>

            {errors.submit && (
                <div className="card" style={{ backgroundColor: '#fdeaea', border: '1px solid #f44336', marginBottom: '20px' }}>
                    <p style={{ color: '#d32f2f', margin: '10px 0' }}>
                        {errors.submit}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="card form-section form-section-info">
                    <h3 className="form-section-title">
                        👤 Vos informations
                    </h3>

                    <div className="form-group">
                        <label className="form-label">
                            Votre nom *
                        </label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Entrez votre nom"
                            className={`form-input ${errors.nom ? 'form-input-error' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.nom && <p className="form-error">{errors.nom}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Photo de profil (optionnelle) 📸
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="file-upload"
                            disabled={isSubmitting}
                        />
                        {formData.photo && (
                            <p className="file-success">
                                ✅ {formData.photo.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="card form-section form-section-predictions">
                    <h3 className="form-section-title">
                        👶 Pronostics pour Pipas
                    </h3>

                    <div className="form-group">
                        <label className="form-label">
                            Sexe *
                        </label>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="sexe"
                                    value="garcon"
                                    checked={formData.sexe === 'garcon'}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                👦 Garçon
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="sexe"
                                    value="fille"
                                    checked={formData.sexe === 'fille'}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                👧 Fille
                            </label>
                        </div>
                        {errors.sexe && <p className="form-error">{errors.sexe}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Prénom *
                        </label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="Votre idée de prénom"
                            className={`form-input ${errors.prenom ? 'form-input-error' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.prenom && <p className="form-error">{errors.prenom}</p>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Poids (kg) *
                            </label>
                            <input
                                type="number"
                                name="poids"
                                value={formData.poids}
                                onChange={handleChange}
                                placeholder="3.25"
                                min="1"
                                max="6"
                                step="0.01"
                                className={`form-input ${errors.poids ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.poids && <p className="form-error">{errors.poids}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Taille (cm) *
                            </label>
                            <input
                                type="number"
                                name="taille"
                                value={formData.taille}
                                onChange={handleChange}
                                placeholder="50.5"
                                min="35"
                                max="65"
                                step="0.1"
                                className={`form-input ${errors.taille ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.taille && <p className="form-error">{errors.taille}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Couleur cheveux *
                            </label>
                            <select
                                name="couleurCheveux"
                                value={formData.couleurCheveux}
                                onChange={handleChange}
                                className={`form-select ${errors.couleurCheveux ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            >
                                <option value="">Choisir...</option>
                                <option value="brun">Brun</option>
                                <option value="blond">Blond</option>
                                <option value="roux">Roux</option>
                                <option value="chatain">Châtain</option>
                                <option value="noir">Noir</option>
                            </select>
                            {errors.couleurCheveux && <p className="form-error">{errors.couleurCheveux}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Type cheveux *
                            </label>
                            <select
                                name="typeCheveux"
                                value={formData.typeCheveux}
                                onChange={handleChange}
                                className={`form-select ${errors.typeCheveux ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            >
                                <option value="">Choisir...</option>
                                <option value="lisse">Lisse</option>
                                <option value="ondule">Ondulé</option>
                                <option value="boucle">Bouclé</option>
                                <option value="frise">Frisé</option>
                            </select>
                            {errors.typeCheveux && <p className="form-error">{errors.typeCheveux}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                Date de naissance *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={`form-input ${errors.date ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.date && <p className="form-error">{errors.date}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Heure de naissance *
                            </label>
                            <input
                                type="time"
                                name="heure"
                                value={formData.heure}
                                onChange={handleChange}
                                className={`form-input ${errors.heure ? 'form-input-error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.heure && <p className="form-error">{errors.heure}</p>}
                        </div>
                    </div>
                </div>

                <div className="card form-section form-section-prix">
                    <h3 className="form-section-title">
                        🏆 Votre prix si vous gagnez
                    </h3>

                    <div className="form-group">
                        <label className="form-label">
                            Que préférez-vous recevoir ? *
                        </label>
                        <div className="prix-options">
                            <label className={`prix-option ${formData.choixPrix === 'jambon' ? 'prix-option-selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="choixPrix"
                                    value="jambon"
                                    checked={formData.choixPrix === 'jambon'}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <span className="prix-emoji">🥓</span>
                                <span className="prix-text">Jambon du poids de Pipas</span>
                            </label>
                            <label className={`prix-option ${formData.choixPrix === 'fromage' ? 'prix-option-selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="choixPrix"
                                    value="fromage"
                                    checked={formData.choixPrix === 'fromage'}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <span className="prix-emoji">🧀</span>
                                <span className="prix-text">Fromage du poids de Pipas</span>
                            </label>
                        </div>
                        {errors.choixPrix && <p className="form-error">{errors.choixPrix}</p>}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn-accueil-primary"
                        disabled={isSubmitting}
                        style={{ 
                            opacity: isSubmitting ? 0.6 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSubmitting ? 'Envoi en cours...' : '🎯 Valider mes pronostics'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PageFormulaire;