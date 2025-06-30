import React, { useState } from 'react';

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
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '40px',
            color: 'var(--gris-fonce)',
            fontSize: '28px'
        }}>
            📝 Vos pronostics
        </h2>

        <div className="card" style={{ 
            background: '#f8f9fa', 
            marginBottom: '25px',
            border: '2px solid var(--gris-clair)'
        }}>
            <h3 style={{ 
            color: 'var(--gris-fonce)', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
            }}>
            👤 Vos informations
            </h3>

            <div style={{ marginBottom: '20px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
            }}>
                Votre nom *
            </label>
            <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                style={{
                width: '100%',
                padding: '12px 15px',
                border: errors.nom ? '2px solid #ff6b6b' : '2px solid var(--gris-clair)',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
                }}
            />
            {errors.nom && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.nom}</p>}
            </div>

            <div>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
            }}>
                Photo de profil (optionnelle) 📸
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{
                width: '100%',
                padding: '10px',
                border: '2px dashed var(--gris-clair)',
                borderRadius: '12px',
                fontSize: '14px',
                background: 'white'
                }}
            />
            {formData.photo && (
                <p style={{ 
                color: 'var(--gris-moyen)', 
                fontSize: '14px', 
                marginTop: '5px' 
                }}>
                ✅ {formData.photo.name}
                </p>
            )}
            </div>
        </div>

        {/* SECTION 2: Pronostics bébé */}
        <div className="card" style={{ 
            background: 'var(--jaune-creme)', 
            marginBottom: '25px',
            border: '2px solid #f0d000'
        }}>
            <h3 style={{ 
            color: 'var(--gris-fonce)', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
            }}>
            👶 Pronostics pour Pipas
            </h3>

            <div style={{ marginBottom: '20px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
            }}>
                Sexe *
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                    type="radio"
                    name="sexe"
                    value="garcon"
                    checked={formData.sexe === 'garcon'}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.2)' }}
                />
                👦 Garçon
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                    type="radio"
                    name="sexe"
                    value="fille"
                    checked={formData.sexe === 'fille'}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.2)' }}
                />
                👧 Fille
                </label>
            </div>
            {errors.sexe && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.sexe}</p>}
            </div>

            <div style={{ marginBottom: '20px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
            }}>
                Prénom *
            </label>
            <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre idée de prénom"
                style={{
                width: '100%',
                padding: '12px 15px',
                border: errors.prenom ? '2px solid #ff6b6b' : '2px solid #f0d000',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                background: 'white'
                }}
            />
            {errors.prenom && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.prenom}</p>}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
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
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.poids ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                />
                {errors.poids && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.poids}</p>}
            </div>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
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
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.taille ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                />
                {errors.taille && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.taille}</p>}
            </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
                Couleur cheveux *
                </label>
                <select
                name="couleurCheveux"
                value={formData.couleurCheveux}
                onChange={handleChange}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.couleurCheveux ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                >
                <option value="">Choisir...</option>
                <option value="brun">Brun</option>
                <option value="blond">Blond</option>
                <option value="roux">Roux</option>
                <option value="chatain">Châtain</option>
                <option value="noir">Noir</option>
                </select>
                {errors.couleurCheveux && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.couleurCheveux}</p>}
            </div>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
                Type cheveux *
                </label>
                <select
                name="typeCheveux"
                value={formData.typeCheveux}
                onChange={handleChange}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.typeCheveux ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                >
                <option value="">Choisir...</option>
                <option value="lisse">Lisse</option>
                <option value="ondule">Ondulé</option>
                <option value="boucle">Bouclé</option>
                <option value="frise">Frisé</option>
                </select>
                {errors.typeCheveux && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.typeCheveux}</p>}
            </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
                Date de naissance *
                </label>
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.date ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                />
                {errors.date && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.date}</p>}
            </div>
            <div style={{ flex: 1 }}>
                <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
                }}>
                Heure de naissance *
                </label>
                <input
                type="time"
                name="heure"
                value={formData.heure}
                onChange={handleChange}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: errors.heure ? '2px solid #ff6b6b' : '2px solid #f0d000',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                }}
                />
                {errors.heure && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '5px 0 0 0' }}>{errors.heure}</p>}
            </div>
            </div>
        </div>

        <div className="card" style={{ 
            background: '#ffe5d9', 
            marginBottom: '30px',
            border: '2px solid #ffb8a0'
        }}>
            <h3 style={{ 
            color: 'var(--gris-fonce)', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
            }}>
            🏆 Votre prix si vous gagnez
            </h3>

            <div>
            <label style={{ 
                display: 'block', 
                marginBottom: '15px', 
                fontWeight: '500',
                color: 'var(--gris-fonce)'
            }}>
                Que préférez-vous recevoir ? *
            </label>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
                padding: '15px 20px',
                border: formData.choixPrix === 'jambon ' ? '3px solid #ff6b6b' : '2px solid #ffb8a0',
                borderRadius: '15px',
                background: formData.choixPrix === 'jambon ' ? '#fff5f5' : 'white',
                transition: 'all 0.3s'
                }}>
                <input
                    type="radio"
                    name="choixPrix"
                    value="jambon "
                    checked={formData.choixPrix === 'jambon '}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.3)' }}
                />
                <span style={{ fontSize: '24px' }}>🥓</span>
                <span style={{ fontWeight: '500' }}>Jambon du poids de Pipas</span>
                </label>
                <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
                padding: '15px 20px',
                border: formData.choixPrix === 'fromage ' ? '3px solid #ff6b6b' : '2px solid #ffb8a0',
                borderRadius: '15px',
                background: formData.choixPrix === 'fromage ' ? '#fff5f5' : 'white',
                transition: 'all 0.3s'
                }}>
                <input
                    type="radio"
                    name="choixPrix"
                    value="fromage "
                    checked={formData.choixPrix === 'fromage '}
                    onChange={handleChange}
                    style={{ transform: 'scale(1.3)' }}
                />
                <span style={{ fontSize: '24px' }}>🧀</span>
                <span style={{ fontWeight: '500' }}>Fromage du poids de Pipas</span>
                </label>
            </div>
            {errors.choixPrix && <p style={{ color: '#ff6b6b', fontSize: '14px', margin: '10px 0 0 0' }}>{errors.choixPrix}</p>}
            </div>
        </div>

        <div style={{ textAlign: 'center' }}>
            <button 
            type="submit"
            className="btn-primary"
            style={{ 
                fontSize: '18px', 
                padding: '15px 40px',
                background: 'linear-gradient(45deg, var(--rose-pastel), var(--bleu-pastel))',
                border: 'none',
                color: 'white',
                fontWeight: 'bold'
            }}
            >
            🎯 Valider mes pronostics
            </button>
        </div>
        </form>
    );
}

export default PageFormulaire;