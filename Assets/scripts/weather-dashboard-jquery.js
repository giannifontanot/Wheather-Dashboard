    $(document).ready(function(){


           // $('#input-city')autocomplete({source: ["uno", "dos", "tres"]});

        $( "#input_city" ).autocomplete({
          source: [ "Austin", "Rockwall", "Houston", "New York", "San Antonio", "Dallas", "Galveston" ]
        });
   });