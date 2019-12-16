import mu from 'mu';

export async function checkAlerts() {
    const query = `
    PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
      
    SELECT ?notification  
    WHERE { 
        GRAPH <http://mu.semte.ch/graphs/public> {
            ?notification a ext:SysteemNotificatie .
        }
    }`;

    const data = await mu.query(query);
    const alerts = parseSparqlResults(data);
    return Array.isArray(alerts)
        ? console.log('HEALTHY!')
        : throwError(alerts);
}

function parseSparqlResults(data) {
    const vars = data.head.vars;
    return data.results.bindings.map(binding => {
        let obj = {};
        vars.forEach(varKey => {
            if (binding[varKey]) {
                obj[varKey] = binding[varKey].value;
            }
        });
        return obj;
    })
}

function throwError(alerts) {
    throw new Error(`Alerts query does not return expected result: \n ${JSON.stringify(alerts, null, 4)}`);
}
