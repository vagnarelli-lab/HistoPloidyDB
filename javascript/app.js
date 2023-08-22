function ShowHideDiv() {
    var dvGene = document.getElementById("dvGene");
    var dvFindGene=document.getElementById("dvFindGene")
    //dvGene.style.display = RGene.checked ? "block" : "none";
    dvGene.style.display = "none";
    //dvFindGene.style.display = RGene.checked ? "block" : "none";
    dvFindGene.style.display = "none";
    d3.select("tbody").html("");
    d3.select("p").classed('noresults', true).html("");
}
//reference for the function : https://levelup.gitconnected.com/building-a-simple-website-that-outputs-results-from-a-csv-using-users-input-bfcb782ced45

d3.csv("labdata/histo_ploidy_data.csv").then(function (data)
    {
        var histploidy = data;
        var buttonG = d3.select("#buttonGene");
        var form = d3.select("#query_form");
        buttonG.on("click", runEnter);
        form.on("submit", runEnter);
// Defining the function

    function runEnter() {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === "complete") {
                ShowHideDiv();
            }
        })

        d3.select("tbody").html("");
        d3.select("p").classed('noresults', true).html(""); // to clear previous no result message
        var inputValue;
        if (document.getElementById('RGene').checked){
            inputValue=document.getElementById('RGene').value;
        }
        
        var inputElementGene = d3.select("#user-input-gene");
        var inputValueGene = inputElementGene.property("value").toUpperCase().trim();
        //console.log(inputValueGene)
        //console.log(inputValueGene.length)
        var filteredGene = histploidy.filter(histploidy => histploidy.gene === inputValueGene); // checks datatype
        //console.log(filteredGene)    
        if (filteredGene.length === 0 && inputValueGene !=="") {
                d3.select("p").classed('noresults', true).html("<strong>No record to match this gene name. Please contact to add this to the database</strong>")
        }
        //console.log(filteredGene)
        for (var k = 0; k < filteredGene.length; k++) {
            d3.select("tbody").insert("tr").html(
                "<td>" + [k + 1] + "</td>" +
                "<td>" + (filteredGene[k]['TCGA_cancer_type']) + "</td>" +
                "<td>" + (filteredGene[k]['aneuploidy_metric']) + "</td>" +
                "<td>" + (filteredGene[k]['Pearson_correlation']) + "</td>" +
                "<td>" + (filteredGene[k]['odds_ratio']) + "</td>" +
                "<td>" + (filteredGene[k]['p']) + "</td>" +
                "<td>" + (filteredGene[k]['method']) + "</td>" +
                "<td>" + (filteredGene[k]['histone_family']) + "</td>" +
                "<td>" + (filteredGene[k]['histone_type']) + "</td>" +
                "<td>" + (filteredGene[k]['histone_alteration']) + "</td>" +
                "<td>" + (filteredGene[k]['histone_alteration_detailed']) + "</td>" )}
        }
        }

        //d3.event.preventDefault();
    );
