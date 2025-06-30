import { useState } from 'react';

function PageFormulaire() {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Formulaire valide:', formData);
            alert('Pronostics enregistrés ! 🎉\n(Pour le moment juste dans la console)');
            // TODO: Envoyer au backend
        }
    };

    return (
        <div className="formulaire-container">
            <h2 className="formulaire-title text-center">
                📝 Vos pronostics
            </h2>

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
                                placeholder="3.5"
                                min="1"
                                max="6"
                                step="0.1"
                                className={`form-input ${errors.poids ? 'form-input-error' : ''}`}
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
                                placeholder="50"
                                min="35"
                                max="65"
                                className={`form-input ${errors.taille ? 'form-input-error' : ''}`}
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
                    >
                        🎯 Valider mes pronostics
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PageFormulaire;