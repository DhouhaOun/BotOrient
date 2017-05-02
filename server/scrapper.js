var Xray = require("x-ray");
var Qpromise = require("q");
var xray = new Xray();
var wagner = require('wagner-core');
require('../models/modelDiploma')(wagner);
module.exports = function(wagner, npages) {

    var deferred = Qpromise.defer();

    xray('https://www.orientation.com/diplomes/?filter%5Bkeywords%5D=&filter%5BformationType%5D%5B%5D=1&filter%5BformationType%5D%5B%5D=2&filter%5BformationType%5D%5B%5D=3&filter%5BformationType%5D%5B%5D=4&filter%5BformationType%5D%5B%5D=5&filter%5BformationType%5D%5B%5D=7&filter%5BformationType%5D%5B%5D=12&filter%5BformationType%5D%5B%5D=13&filter%5BformationType%5D%5B%5D=15&filter%5BformationType%5D%5B%5D=19&filter%5BformationType%5D%5B%5D=20&filter%5BformationType%5D%5B%5D=21&filter%5BformationType%5D%5B%5D=22&filter%5BformationType%5D%5B%5D=23', '.main',
        {
            titles: ['h3.ellipsis > a'],
            descriptions: ['div.ellipsis-x-rows']
        }
    ).paginate('a[rel~=next]@href')
        .limit(npages)
        (saveData);

    // Parse and Save Data
    function saveData(err, obj){

        // Iterate through the scraped data from reddit
        // then populating the array documents with
        // object {title: String, numComments: Number}
        var documents = [];

        obj.forEach(function(page, index){


            for(i = 0; i < page.titles.length; i++){

                documents.push(
                    {
                        title: page.titles[i],
                        description:page.descriptions[i]

                    }
                );
            }


        })

        // Purge the DB then Store the data
        // [{{title: String, numComments: Number}}]
        wagner.invoke(function(diploma) {
            diploma
                .remove({})
                .then(function(error){
                    SaveAll(diploma, documents, documents.length);
                })
        });
        // --------- Helper Functions ----------------//

        // Save all the data
        function SaveAll(Model, docs, len) {

            var page = new Model (docs.shift());
            page.save(function(err, doc){
                if (err) deferred.reject(new Error(err));
            });
            if (--len) SaveAll(Model, docs, len);
            else deferred.resolve('');
        }

        // Parse the comment section of the scraped data
        // input : "125 comments"
        // output: 125

    }

    return deferred.promise;
}
