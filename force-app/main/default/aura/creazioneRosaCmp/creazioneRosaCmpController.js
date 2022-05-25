({
    doInit : function(component, event, helper) {

        var myPageRef = component.get('v.pageReference');
        var par = myPageRef.state.c__team;
        component.set('v.oggettoTeam',par);
        console.log(JSON.stringify(component.get('v.oggettoTeam')))



    }
})
