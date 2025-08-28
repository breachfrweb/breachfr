async function quickSearchHome() {
    try {
        const query = document.getElementById('homeSearchBarInput').value.trim();
        if (!query) {
            showNotification('Veuillez entrer une cible à rechercher.', 'warning');
            return;
        }

        // VÉRIFICATION : Pas de compte = pas de recherche
        if (!currentUser) {
            showNotification('🔒 Vous devez vous connecter pour effectuer des recherches. Créez un compte si nécessaire.', 'error');
            if (typeof notifications !== 'undefined' && Array.isArray(notifications)) {
                notifications.unshift({ title: 'Action requise', message: 'Connectez-vous pour effectuer des recherches.', timestamp: Date.now(), type: 'warning' });
            }
            showPage('login');
            return;
        }

        // VÉRIFICATION : Limites de recherche par plan
        const searchLimits = {
            'Free': 5,
            'Starter': 50,
            'Professional': 500,
            'Enterprise': 9999999 // Illimité
        };

        const userPlan = currentUser.plan || 'Free';
        const dailySearches = currentUser.dailySearches || 0;
        const searchLimit = searchLimits[userPlan];

        if (dailySearches >= searchLimit) {
            showNotification(`🚫 Limite de recherches atteinte (${searchLimit}/jour). Passez à un plan supérieur !`, 'error');
            showPage('premium');
            return;
        }

        // Incrémenter le compteur de recherches
        currentUser.dailySearches = (currentUser.dailySearches || 0) + 1;

        showNotification(`Lancement de la recherche pour: ${query}... (${currentUser.dailySearches}/${searchLimit} aujourd'hui)`, 'info');
        logAction('Home Page Quick Search Initiated', { query: query, user: currentUser.email, plan: userPlan, searchCount: currentUser.dailySearches }, 'info');

        // Déterminer le type de recherche
        let searchType;
        if (query.includes('@') && query.includes('.')) {
            searchType = 'email';
        } else if (query.includes('.')) {
            searchType = 'domain';
        } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query)) {
            searchType = 'ip';
        } else {
            searchType = 'breach';
        }

        // Faire l'appel à l'API de recherche
        const apiResponse = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                type: searchType,
                query: query
            })
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        const apiData = await apiResponse.json();

        if (!apiData.success) {
            throw new Error(apiData.message || 'Une erreur est survenue lors de la recherche');
        }

        // Traiter les résultats
        let formattedResults = [];
        let title = `🔍 Recherche pour "${query}"`;

        if (apiData.data && apiData.data.results && apiData.data.results.length > 0) {
            title = `✨ ${apiData.data.results_found || apiData.data.results.length} résultat(s) trouvé(s) pour "${query}"`;

            apiData.data.results.forEach(breach => {
                let breachInfo = [];
                
                // Source
                breachInfo.push(`🚨 Source: ${breach.dbname || 'Inconnu'}`);

                // Informations personnelles
                if (breach.email) breachInfo.push(`📧 Email: ${breach.email}`);
                if (breach.first_name) breachInfo.push(`👤 Prénom: ${Array.isArray(breach.first_name) ? breach.first_name.join(', ') : breach.first_name}`);
                if (breach.last_name) breachInfo.push(`👤 Nom: ${Array.isArray(breach.last_name) ? breach.last_name.join(', ') : breach.last_name}`);
                if (breach.civility) breachInfo.push(`🎭 Civilité: ${breach.civility}`);

                // Date de naissance
                if (breach.user_birth_date) {
                    const date = new Date(breach.user_birth_date);
                    if (!isNaN(date)) {
                        breachInfo.push(`🎂 Date de naissance: ${date.toLocaleDateString('fr-FR')}`);
                    }
                }

                // Adresse
                let adresseParts = [];
                if (breach.streetNumber) adresseParts.push(breach.streetNumber);
                if (breach.address_street) {
                    if (Array.isArray(breach.address_street)) {
                        adresseParts.push(breach.address_street.join(' '));
                    } else {
                        adresseParts.push(breach.address_street);
                    }
                }
                if (breach.zip_code) adresseParts.push(breach.zip_code);
                if (breach.city) {
                    if (Array.isArray(breach.city)) {
                        adresseParts.push(breach.city.join(' '));
                    } else {
                        adresseParts.push(breach.city);
                    }
                }
                if (adresseParts.length > 0) {
                    breachInfo.push(`🏠 Adresse: ${adresseParts.join(' ')}`);
                }
                if (breach.supplement) breachInfo.push(`📍 Complément: ${breach.supplement}`);

                // Contact
                if (breach.phone_number) breachInfo.push(`📞 Téléphone: ${breach.phone_number}`);
                if (breach.number && breach.number !== breach.phone_number) breachInfo.push(`📞 Numéro: ${breach.number}`);
                if (breach.phone2 && breach.phone2 !== breach.phone_number && breach.phone2 !== breach.number) breachInfo.push(`📞 Téléphone 2: ${breach.phone2}`);
                if (breach.telVoip) breachInfo.push(`📞 VoIP: ${breach.telVoip}`);

                // Informations bancaires
                if (breach.iban) breachInfo.push(`💳 IBAN: ${breach.iban}`);
                if (breach.bic) breachInfo.push(`🏦 BIC: ${breach.bic}`);

                // Informations professionnelles
                if (breach.society) breachInfo.push(`🏢 Société: ${breach.society}`);

                // Ajouter aux résultats formatés
                formattedResults.push(breachInfo.join('\n'));
            });
        } else {
            formattedResults.push('✅ Aucune fuite de données trouvée pour cette cible.');
        }

        // Sauvegarder les résultats
        currentSearchResults = formattedResults;
        currentPage = 1;

        // Afficher les résultats
        if (formattedResults && formattedResults.length > 0) {
            displaySearchResults(title);
            showNotification('✨ Recherche terminée avec succès !', 'success');
            logAction('Search Success', { query, resultsCount: formattedResults.length }, 'success');
        } else {
            showNotification('ℹ️ Aucun résultat trouvé pour cette recherche.', 'info');
            logAction('Search Success', { query, resultsCount: 0 }, 'info');
        }

    } catch (error) {
        console.error('❌ Error during search:', error);
        showNotification(`🚫 Erreur: ${error.message}`, 'error');
        logAction('Search Error', { query, error: error.message }, 'error');
    }
}
