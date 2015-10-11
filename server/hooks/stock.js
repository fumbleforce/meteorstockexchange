Stock.getCollection().after.update(function (userId, doc, fieldNames, mod) {
    
    if (doc.volume === 0) {
            
        console.log("Removing stock of ", doc.ticker, "with 0 volume");
        
        Stock.remove(doc.id);
    }
});