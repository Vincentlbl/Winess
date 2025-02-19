CREATE DATABASE Winess;

USE Winess;

CREATE TABLE Utilisateur (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    mot_de_passe VARCHAR(50),
    age INT,
    poids DECIMAL(15,2),
    taille DECIMAL(15,2),
    imc_calculé DECIMAL(15,2),
    objectif VARCHAR(50)
);


CREATE TABLE ProgrammeSportif (
    prgrmSportif_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    description VARCHAR(50),
    niveau VARCHAR(50),
    type VARCHAR(50),
    duree_semaine INT,
    imc_cible_min DECIMAL(15,2),
    imc_cible_max DECIMAL(15,2)
);

CREATE TABLE Exercice (
    exercice_id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    description VARCHAR(50),
    type VARCHAR(50),
    duree_estimee TIME,
    calories_brulees INT
);

CREATE TABLE ObjectifUtilisateur (
    objectif_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    description VARCHAR(50),
    date_debut DATE,
    date_fin_prevue DATE,
    statut VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id) ON DELETE CASCADE
);

CREATE TABLE SuiviAlimentaire (
    SuivAlim_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    Date_ DATE,
    repas_matin VARCHAR(50),
    repas_midi VARCHAR(50),
    repas_soir VARCHAR(50),
    calorie_journalieres INT,
    commentaires VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id) ON DELETE CASCADE
);

CREATE TABLE ParticipPrgrm (
    user_id INT,
    prgrmSportif_id INT,
    date_debut DATE,
    date_fin DATE,
    statut VARCHAR(50),
    PRIMARY KEY (user_id, prgrmSportif_id),
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id) ON DELETE CASCADE,
    FOREIGN KEY (prgrmSportif_id) REFERENCES ProgrammeSportif(prgrmSportif_id) ON DELETE CASCADE
);

CREATE TABLE SeanceEffectuee (
    seance_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date_realisation DATE,
    duree_reelle TIME,
    ressenti VARCHAR(50),
    commentaires VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Utilisateur(user_id) ON DELETE CASCADE
);

CREATE TABLE Composer (
    prgrmSportif_id INT,
    exercice_id INT,
    PRIMARY KEY (prgrmSportif_id, exercice_id),
    FOREIGN KEY (prgrmSportif_id) REFERENCES ProgrammeSportif(prgrmSportif_id) ON DELETE CASCADE,
    FOREIGN KEY (exercice_id) REFERENCES Exercice(exercice_id) ON DELETE CASCADE
);
