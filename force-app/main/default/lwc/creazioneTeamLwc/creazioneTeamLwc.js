import { LightningElement } from 'lwc';
import insertTeam from '@salesforce/apex/TeamCls.insertTeam';
import {NavigationMixin} from 'lightning/navigation';
//modulo per implentare la navigazione cioè l'attiviamo


export default class CreazioneTeamLwc extends NavigationMixin(LightningElement) {
    nomeSquadra;
    nomePresidente;
    nomeSede;
    errorCall = false;
    errorMessage;
    thanksPage = false;
    registerTeam = true;
    valueCombo = 'Seleziona Categoria';
    bottonDis = true;
    Team = {NomeSquadra__c:'',Presidente__c:'',Sede__c:'',Password__c:'',Categoria__c:'',Privacy__c:false};
    // creato l'oggetto dove potrò farci un ciclo per prenderci i dati e riempirli
    idTeam;
    error;
    errorPswdPage = false;
    errorPswdMessage;
    oggettoTeam;



    get options() {
        return [
            { label: 'Serie A', value: 'Serie A' },
            { label: 'Serie B', value: 'Serie B' },
            { label: 'Serie C', value: 'Serie C' },
        ];
    }

    handleChange(event) {
    let inputs=this.template.querySelectorAll("lightning-input");
    let validationInputText = true;
    let count = 0;
    let validationPswd = false;    
        



    inputs.forEach(item => {
        //logica per la validazione degli input tramite onchange del bottone --> se i dati sono giusti il bottone si accende sbagliati no!
            if(item.name == 'Password__c'){
                if(item.value.length > 0){
                this.Team[item.name]=item.value;
                var passw=/^[A-Za-z]\w{7,14}$/;
                if(item.value.match(passw)){
                    this.errorPswdPage = false;
                    validationPswd = true;

                } else {

                    this.errorPswdPage = true;

                    this.errorPswdMessage = 'Password errata';

                    validationPswd = false;

                }
                            
            }


            }



            else if(item.name == 'Privacy__c'){

                if(item.checked == false){
                    count+=1;  
                    let test = 'ciao';
                               }
                                    this.Team[item.name]=item.checked; // per le checkbox non si usa il .value visto che il valore non esiste in una checkbox
                                    //
                                      
                                      } else {
 
                                            this.Team[item.name] = item.value;
                                                if(item.value == '' || item.value == null){
                                                count+=1;  
                                           } 
                                         }

                                });



    let comboBox=this.template.querySelector("lightning-combobox");
    this.Team['Categoria__c']=comboBox.value;
    let comboBoxValid = true;                         
                   if(comboBox.value == 'Seleziona Categoria'){

                    comboBox = false;

                   }             
                
                   
     if(count>0){

        validationInputText = false;

    }

    if(validationInputText && comboBoxValid && validationPswd){


        this.bottonDis = false;



    } else {


        this.bottonDis = true;
    }




    }

    handleInsert(){

        insertTeam({team:this.Team})
        .then((result)=>{

            this.idTeam = result.Team.Id;
            this.nomeSquadra = result.Team.NomeSquadra__c;
            this.nomePresidente = result.Team.Presidente__c;
            this.nomeSede = result.Team.Sede__c;
            this.thanksPage = true;
            this.registerTeam = false;
            this.oggettoTeam = result.Team;
        })
        .catch((error)=>{

        this.error=error;
        this.errorCall = true;   
         this.errorMessage = error;



        })




    }

    handleReset(){

        let inputs=this.template.querySelectorAll("lightning-input");
        let comboBox=this.template.querySelector("lightning-combobox");
        comboBox.value = 'Selezione Categoria';
        this.bottonDis = true;


        inputs.forEach(item => {

            if(item.name == 'Privacy__c'){

                item.checked = false;



            } else {


                item.value = '';


            }









        })

    }
    handleBack(){



        this.thanksPage = false;
        this.registerTeam = true;


    }

    handleRosa(){ 
        //metodo per navigiare
        //metodo fisso per navigare this[NavigationMixin]
        this[NavigationMixin.Navigate]({

            // il tipo di navigazione in questo caso fra due componenti
            type:"standard__component",
            attributes:{
                //qui definisco gli attributi e quindi su che componenti andrò a navigare specificandone il nome (AuraComponent)
            componentName:"c__creazioneRosaCmp"



            },
            state :{
                // sarebbero i paramentri che devo passare al componente su cui andrò a navigare lo state e facoltativo
                c__team:this.oggettoTeam
                

            },


        }


        );




    }


}