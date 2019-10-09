import mu from 'mu';

const targetGraph = "http://mu.semte.ch/graphs/organizations/kanselarij";

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
    return parseSparqlResults(data);
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
