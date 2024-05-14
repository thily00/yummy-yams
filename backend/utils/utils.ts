import { WinningSuit } from "../enums/WinningSuit.enum";

export const rollDice = () => {
    // Créer un tableau pour stocker les valeurs des dés
    let diceValues: number[] = [];

    // Lancer les cinq dés
    for (let i = 0; i < 5; i++) {
        // Générer un nombre aléatoire entre 1 et 6 (inclus)
        let roll = Math.floor(Math.random() * 6) + 1;
        // Ajouter la valeur du dé au tableau
        diceValues.push(roll);
    }

    // Retourner les valeurs des dés
    return diceValues;
}


export const checkWinningCombination = (diceValues: number[]) => {
    // Tri des valeurs des dés pour faciliter la vérification des combinaisons
    diceValues.sort();

    // Vérification des combinaisons gagnantes
    if (diceValues.every(value => value === diceValues[0])) {
        return WinningSuit.YAMS;
    } else if (diceValues.filter((value, index) => index < 3 && value === diceValues[index + 1] && value === diceValues[index + 2]).length === 3) {
        return WinningSuit.CARRE;
    } else if ((diceValues[0] === diceValues[1] && diceValues[2] === diceValues[3]) || (diceValues[0] === diceValues[1] && diceValues[3] === diceValues[4]) || (diceValues[1] === diceValues[2] && diceValues[3] === diceValues[4])) {
        return WinningSuit.DOUBLE;
    }  else {
        return null;
    }
}