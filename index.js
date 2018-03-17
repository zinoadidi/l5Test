/* 
 * Array to html by Zino Adidi: L5Lab Test.
 ----------------------
 * Solution is written in JS, UI is made up of html and css. System allows for easy interaction by providing a UI to interact with.
 * arrayToHtml function can be called as requested, once the right JSON object format as specified in arrayItems is passed,
 * the code will produce required result.
-----------------------
* arrayItems: JSON object containing data;
* arrayToHtml: function that converts supplied object to html list.
*/

var arrayItems = {
    'Programming':{
        'PHP':[
            'Laravel',
            'Codeingiter'
        ],
	    'Python':'food',
	    'Java':[]
    },
	'Movies':[
        'The Matrix',
        'Lords of the ring'
    ],
	'Music':[],
	'Sports':[],
	'Lifestyle':[]
}

function arrayToHtml(arrayItems){
    //check conversion type
    var conversionBy = 'functionCall';
    try {
        if(arrayItems){
            // value is provided by default
            arrayItems = JSON.parse(JSON.stringify(arrayItems))
        }else{
            //get value from input
            conversionBy = 'inputBox';
            arrayItems = JSON.parse(document.getElementById('list').value);
        }
    } catch (error) { 
        alert('Invalid format. Please enter a valid object');
        console.log(error);
    }

    // begin conversion
    var response = '<ul>';
    for(var item in arrayItems){
        var currentItem = arrayItems[item];    
        //seprate items with basic nest from others
        if (arrayItems.hasOwnProperty(item) && currentItem.length > 0) {
            response+=`\n  <li>${item}\n    <ul>`;
            for(var counter =0;counter < currentItem.length; counter++){
                response+= `\n     <li>${currentItem[counter]}</li>`;
            }
            response+=`\n    </ul>\n  </li>`;
        }else{
            //handle special nested items
            if(Object.keys(currentItem).length){
                response+=`\n  <li>${item}\n    <ul>`;
                var item1 = [];
                var value = [];
                for(item1 in currentItem){
                    var currentItem1 = currentItem[item1];
                    // handle inner nest
                    if (Array.isArray(currentItem1) && currentItem1.length > 0) {
                        response += `\n     <li>${item1}\n      <ul>`;
                        for (var counter = 0; counter < currentItem1.length; counter++){
                            response += `\n       <li>${currentItem1[counter]}</li>`;
                        }
                        response += `\n      </ul>\n     </li>`;                        
                    }else{
                        response += `\n     <li>${item1}</li>`;
                    }
                }
                response+=`\n    </ul>\n  </li>`;
            }else{
                // if item does not contain any nest
                response+= `\n  <li>${item}</li>`;
            }
        } 
    }
    response+= '\n</ul>';   
    // end conversion. modifiy response based on call type
    if(conversionBy == 'functionCall'){
        response = response.replace(/\\n/g, "");
        response = response.replace(/\s+/g, '');
    }else{
        //extra formatting to allow readable display
        response = response.replace(/</g, "&lt;");
        response = response.replace(/>/g, "&gt;");
        response = response.replace(/\//g, "&#47;");
    }
    return response;  
}
// Allocate value of arrayItems to input box
document.getElementById('list').value = JSON.stringify(arrayItems);
//perform first call
document.getElementById('result').innerHTML = arrayToHtml();