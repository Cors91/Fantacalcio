import { LightningElement, api } from 'lwc';

export default class CreazioneRosaLwc extends LightningElement {

    //con l'annotation @api indico che è una variabile pubblica dato che è stata creata dal padre e in questo caso la stiamo passando al figlio
    @api team;
    valueCombo = 'Seleziona Ruolo';
    errorMessage;
    errorCall = false;

    get options() {
        return [
            { label: 'Portiere', value: 'Por' },
            { label: 'Difensore', value: 'Dif' },
            { label: 'Centrocampista', value: 'Ccr' },
            { label: 'Attaccante', value: 'Att' }
        ];
    }
    handleChange(event) {

        if(event.name == 'Ruolo__c'){

            this.valueCombo = event.target.value;


        }



    }



}