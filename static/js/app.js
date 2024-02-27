//calling my data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//creating the promise
d3.json(url).then(function(data) {
    //checking 
    console.log("Data:", data);

    //checking 
    let ids = data.names;
    console.log("id numbers: ", ids);
    
    //checking 
    let samples = data.samples;
    console.log("samples data: ", samples);

    //grabbing the first sample
    let otuIds = samples[0].otu_ids;
    let sampleValues = samples[0].sample_values;
    let otuLabels = samples[0].otu_labels;

    // Display the default plot
    let trace1 = [{
        x: sampleValues.slice(0, 10).reverse(),
        y: otuIds.slice(0, 10).map((id) => `OTU ${id}`).reverse(), // Adds "OTU" prefix to each id
        type: 'bar',
        text: otuLabels.slice(0, 10).reverse(),
        orientation: 'h'
    }];
    //Creating adjustments
    let layout1 = {
        title: "Top 10 OTUs",
        margin: {
            l: 75,
            r: 50,
            t: 25,
            b: 15
        }
    };
    //Connecting the HTML and Plotting
    Plotly.newPlot("bar", trace1, layout1);

    let sampleValues2 = data.samples[0].sample_values;
    let otuIds2= data.samples[0].otu_ids;
    let otuLabels2= data.samples[0].otu_labels;
   

    // Display the default plot
    let trace2= {
        x: otuIds2,
        y: sampleValues2,
        text: otuLabels2,
        mode: `markers`,
        marker: {
            size: sampleValues2,
            color: otuIds2
        }
    };
   
    let graph2=[trace2];

    //Creating adjustments
    let layout2= {
        title: '',
        height:600,
        width:1200
    };
   
    //Connecting the HTML and Plotting
    Plotly.newPlot("bubble", graph2, layout2);
    
//demographic info will use the medatdata





//the dropdown will use the names




});

