const values = ['Work','Personal']

function categoryRetriever(){
    return new Promise(function(resolve, reject) {
        resolve(values);
    }); 
}

export default categoryRetriever;