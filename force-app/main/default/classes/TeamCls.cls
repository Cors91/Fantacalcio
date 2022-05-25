public class TeamCls {
   
    @AuraEnabled
    public static Map<String,Object> insertTeam(Team__c team){
        
        Map<String,Object> response = new Map<String,Object>();
        

        try {
            
            insert team;
            response.put('Status', 'OK');
            response.put('Team',team);


        } catch (DMLException e) {
            response.put('Status', 'KO');
            response.put('Error',e.getMessage());



        }
        return response;
    }




}
