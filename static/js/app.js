const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to fetch data and initialize the dashboard
function init() {
    d3.json(url).then(function(data) {
        console.log("Data:", data);

        // Extract necessary data
        let ids = data.names;
        let samples = data.samples;
        let metadata = data.metadata;

        // Populate the dropdown with sample IDs
        Dropdown(ids);

        //default charts and info
        let defaultSample = samples[0]; 
        displayCharts(defaultSample);
        updateInfo(defaultSample.id, metadata);
    });
}

// Function to populate the dropdown with sample IDs
function Dropdown(ids) {
    let dropdown = document.getElementById('selDataset');
    ids.forEach(id => {
        let option = document.createElement('option');
        option.value = id;
        option.textContent = id;
        dropdown.appendChild(option);
    });

    // Add event listener to the dropdown for changes
    dropdown.addEventListener('change', function() {
        let selectedValue = dropdown.value;
        updateDashboard(selectedValue);
    });
}

// Function to update the entire dashboard based on the selected sample ID
function updateDashboard(selectedId) {
    d3.json(url).then(function(data) {
        let samples = data.samples;
        let metadata = data.metadata;

        // Find the selected sample and its metadata
        let selectedSample = samples.find(sample => sample.id === selectedId);
        let selectedMetadata = metadata.find(meta => meta.id.toString() === selectedId); // Convert to string for comparison

        // Update charts and metadata info
        displayCharts(selectedSample);
        updateInfo(selectedMetadata);
    });
}

// Function to display charts based on the selected sample
function displayCharts(sample) {
    let otuIds = sample.otu_ids;
    let sampleValues = sample.sample_values;
    let otuLabels = sample.otu_labels;

    let trace1 = {
        x: sampleValues.slice(0, 10).reverse(),
        y: otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        type: 'bar',
        text: otuLabels.slice(0, 10).reverse(),
        orientation: 'h'
    };

    let layout1 = {
        title: "Top 10 OTUs",
        margin: { 
            l: 75, 
            r: 50, 
            t: 25, 
            b: 15 }
    };

    Plotly.newPlot("bar", [trace1], layout1);

    let trace2 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds
        }
    };

    let layout2 = {
        title: '',
        height: 600,
        width: 1200
    };

    Plotly.newPlot("bubble", [trace2], layout2);
}

// Function to update info
function updateInfo(metadata) {
    let sampleMetadata = document.getElementById("sample-metadata");
    sampleMetadata.innerHTML = ""; // resetting 

    // Loop through the sample metadata
    for (let [key, value] of Object.entries(metadata)) {
        let paragraph = document.createElement("p");
        paragraph.textContent = `${key}: ${value}`;
        sampleMetadata.appendChild(paragraph);
    }
}

// Initialize the dashboard when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});