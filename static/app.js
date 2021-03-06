function getDemoInfo(ids) {
    d3.json("samples.json").then((data)=> {
    console.log(data)
    var metadata = data.metadata;

    // filter demo data by id
    var result = metadata.filter(meta => meta.id.toString()==ids)[0];
    var demographicInfo = d3.select("#sample-metadata");
    
    //clear demo info each time before getting data
    demographicInfo.html("");

    Object.entries(result).forEach((key) => {   
        demographicInfo.append("h5")
        .text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
});
};

function getPlots(sample) {
    //Read samples.json
    d3.json("samples.json").then((sampledata) => {
        var data = sampledata.samples;//[0].otu_ids;
        
        // filter samples values by id
        var samples = data.filter(s => s.id == sample)[0];
        //console.log(ids)

        var sampleValues= samples.sample_values.slice(0,10).reverse();
        console.log(sampleValues)

        var labels= samples.otu_labels.slice(0,10);
        console.log (labels)

        // get the top 10 OTU ids for the plot OTU and reversing it. 
        var OTU_top = samples.otu_ids.slice(0,10).reverse();

        // get the OUT ids for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);

        console.log(`OTU IDS: ${OTU_id}`);

        // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };

        // create data variable
        var data = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

            // create the bar plot
        Plotly.newPlot("bar", data, layout);
           
        
            // The bubble chart
            var trace1 = {
                x: samples.otu_ids,
                y: samples.sample_values,
            
                mode: "markers",
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids
                },
                text: samples.otu_labels
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
};

// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
};


function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        //console.log(data.names)

        // get the id data to the dropdwown menu
        data.names.forEach((name) => {
            dropdown.append("option")
            .text(name)
            .property("value",name);
        });
        // call the functions to display the data and the plots to the page
        var name = data.names[0]
        //console.log(name)
        getPlots(name);
        getDemoInfo(name);
    });
};


init();