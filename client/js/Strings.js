import LocalizedStrings from 'react-localization';

const Strings = new LocalizedStrings({
    en: {
        appName: "TypeDown",
        login: "Login",
        username: "Username",
        password: "Password",
        createAccount: "Create an account",
        loginError: "Wrong username or password.",
        notRegistered: "Not registered yet?",
        email: "Email address",
        create: "Create",
        registerSuccess: "Account successfuly created!",
        alreadyRegistered: "Already a member?",
        createDocument: "Create a document",
        register: "Register",
        newDocument: "New document",
        save: "Save",
        clear: "Clear",
        cancel: "Cancel",
        clearDocumentConfirmation: "Are you sure you want to clear this document?"
    },
    fr: {
        appName: "TypeDown",
        login: "Se connecter",
        username: "Pseudonyme",
        password: "Mot de passe",
        createAccount: "Créer un compte",
        loginError: "Mauvais identifiant ou mot de passe.",
        notRegistered: "Pas encore inscrit?",
        email: "Adresse email",
        create: "Créer",
        registerSuccess: "Compte enregistré avec succès!",
        alreadyRegistered: "Déjà inscrit?",
        createDocument: "Créer un document",
        register: "Créer un compte",
        newDocument: "Nouveau document",
        save: "Sauvegarder",
        clear: "Effacer",
        cancel: "Annuler",
        clearDocumentConfirmation: "Êtes-vous sûr de vouloir effacer ce document?"
    }
});

export default Strings;