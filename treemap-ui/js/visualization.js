function getMultipleJSON(list) {
  return jQuery.when.apply(jQuery, jQuery.map(list, function(jsonfile){
    return jQuery.getJSON("data-sources/" + jsonfile);
  })).then(function(){
    var def = jQuery.Deferred();
    return def.resolve.apply(def, jQuery.map(arguments, function(response){
      return response[0];
    }));
  });
};

var allCountries = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","VG","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","HK","MO","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VI","WF","EH","YE","ZM","ZW"];
var selectedCountries = allCountries
var countryNames = {"AD": "Andorra","AE": "United Arab Emirates","AF": "Afghanistan","AG": "Antigua and Barbuda","AI": "Anguilla","AL": "Albania","AM": "Armenia","AO": "Angola","AQ": "Antarctica","AR": "Argentina","AS": "American Samoa","AT": "Austria","AU": "Australia","AW": "Aruba","AX": "Aland Islands","AZ": "Azerbaijan","BA": "Bosnia and Herzegovina","BB": "Barbados","BD": "Bangladesh","BE": "Belgium","BF": "Burkina Faso","BG": "Bulgaria","BH": "Bahrain","BI": "Burundi","BJ": "Benin","BL": "Saint Barthelemy","BM": "Bermuda","BN": "Brunei","BO": "Bolivia","BQ": "Bonaire, Saint Eustatius and Saba ","BR": "Brazil","BS": "Bahamas","BT": "Bhutan","BV": "Bouvet Island","BW": "Botswana","BY": "Belarus","BZ": "Belize","CA": "Canada","CC": "Cocos Islands","CD": "Democratic Republic of the Congo","CF": "Central African Republic","CG": "Republic of the Congo","CH": "Switzerland","CI": "Ivory Coast","CK": "Cook Islands","CL": "Chile","CM": "Cameroon","CN": "China","CO": "Colombia","CR": "Costa Rica","CU": "Cuba","CV": "Cape Verde","CW": "Curacao","CX": "Christmas Island","CY": "Cyprus","CZ": "Czechia","DE": "Germany","DJ": "Djibouti","DK": "Denmark","DM": "Dominica","DO": "Dominican Republic","DZ": "Algeria","EC": "Ecuador","EE": "Estonia","EG": "Egypt","EH": "Western Sahara","ER": "Eritrea","ES": "Spain","ET": "Ethiopia","FI": "Finland","FJ": "Fiji","FK": "Falkland Islands","FM": "Micronesia","FO": "Faroe Islands","FR": "France","GA": "Gabon","GB": "United Kingdom","GD": "Grenada","GE": "Georgia","GF": "French Guiana","GG": "Guernsey","GH": "Ghana","GI": "Gibraltar","GL": "Greenland","GM": "Gambia","GN": "Guinea","GP": "Guadeloupe","GQ": "Equatorial Guinea","GR": "Greece","GS": "South Georgia and the South Sandwich Islands","GT": "Guatemala","GU": "Guam","GW": "Guinea-Bissau","GY": "Guyana","HK": "Hong Kong","HM": "Heard Island and McDonald Islands","HN": "Honduras","HR": "Croatia","HT": "Haiti","HU": "Hungary","ID": "Indonesia","IE": "Ireland","IL": "Israel","IM": "Isle of Man","IN": "India","IO": "British Indian Ocean Territory","IQ": "Iraq","IR": "Iran","IS": "Iceland","IT": "Italy","JE": "Jersey","JM": "Jamaica","JO": "Jordan","JP": "Japan","KE": "Kenya","KG": "Kyrgyzstan","KH": "Cambodia","KI": "Kiribati","KM": "Comoros","KN": "Saint Kitts and Nevis","KP": "North Korea","KR": "South Korea","XK": "Kosovo","KW": "Kuwait","KY": "Cayman Islands","KZ": "Kazakhstan","LA": "Laos","LB": "Lebanon","LC": "Saint Lucia","LI": "Liechtenstein","LK": "Sri Lanka","LR": "Liberia","LS": "Lesotho","LT": "Lithuania","LU": "Luxembourg","LV": "Latvia","LY": "Libya","MA": "Morocco","MC": "Monaco","MD": "Moldova","ME": "Montenegro","MF": "Saint Martin","MG": "Madagascar","MH": "Marshall Islands","MK": "Macedonia","ML": "Mali","MM": "Myanmar","MN": "Mongolia","MO": "Macao","MP": "Northern Mariana Islands","MQ": "Martinique","MR": "Mauritania","MS": "Montserrat","MT": "Malta","MU": "Mauritius","MV": "Maldives","MW": "Malawi","MX": "Mexico","MY": "Malaysia","MZ": "Mozambique","NA": "Namibia","NC": "New Caledonia","NE": "Niger","NF": "Norfolk Island","NG": "Nigeria","NI": "Nicaragua","NL": "Netherlands","NO": "Norway","NP": "Nepal","NR": "Nauru","NU": "Niue","NZ": "New Zealand","OM": "Oman","PA": "Panama","PE": "Peru","PF": "French Polynesia","PG": "Papua New Guinea","PH": "Philippines","PK": "Pakistan","PL": "Poland","PM": "Saint Pierre and Miquelon","PN": "Pitcairn","PR": "Puerto Rico","PS": "Palestinian Territory","PT": "Portugal","PW": "Palau","PY": "Paraguay","QA": "Qatar","RE": "Reunion","RO": "Romania","RS": "Serbia","RU": "Russia","RW": "Rwanda","SA": "Saudi Arabia","SB": "Solomon Islands","SC": "Seychelles","SD": "Sudan","SS": "South Sudan","SE": "Sweden","SG": "Singapore","SH": "Saint Helena","SI": "Slovenia","SJ": "Svalbard and Jan Mayen","SK": "Slovakia","SL": "Sierra Leone","SM": "San Marino","SN": "Senegal","SO": "Somalia","SR": "Suriname","ST": "Sao Tome and Principe","SV": "El Salvador","SX": "Sint Maarten","SY": "Syria","SZ": "Swaziland","TC": "Turks and Caicos Islands","TD": "Chad","TF": "French Southern Territories","TG": "Togo","TH": "Thailand","TJ": "Tajikistan","TK": "Tokelau","TL": "East Timor","TM": "Turkmenistan","TN": "Tunisia","TO": "Tonga","TR": "Turkey","TT": "Trinidad and Tobago","TV": "Tuvalu","TW": "Taiwan","TZ": "Tanzania","UA": "Ukraine","UG": "Uganda","UM": "United States Minor Outlying Islands","US": "United States","UY": "Uruguay","UZ": "Uzbekistan","VA": "Vatican","VC": "Saint Vincent and the Grenadines","VE": "Venezuela","VG": "British Virgin Islands","VI": "U.S. Virgin Islands","VN": "Vietnam","VU": "Vanuatu","WF": "Wallis and Futuna","WS": "Samoa","YE": "Yemen","YT": "Mayotte","ZA": "South Africa","ZM": "Zambia","ZW": "Zimbabwe","CS": "Serbia and Montenegro","AN": "Netherlands Antilles"};
var datasets = {
  "area_km2.json": {
    data: null,
    name: "Country Area",
    label: "Area (km2)",
  },
  "co2_emissions_2016.json": {
    data: null,
    name: "CO2 Emissions",
    label: "CO2 Emissions",
  },
  "gdp_2016.json": {
    data: null,
    name: "GDP",
    label: "GDP (million USD)",
  },
  "num_64s_per_cc.json": {
    data: null,
    name: "/64 Allocations",
    label: "/64 Allocations",
  },
  "num_asns_per_cc.json": {
    data: null,
    name: "Number of ASNs",
    label: "Number of ASNs",
  },
  "population.json": {
    data: null,
    name: "Population",
    label: "Population",
  },
  "ratio_v6_v4.json": {
    data: null,
    name: "IPv6 Adoption",
    label: "IPv6 Adoption (%)",
  },
  "v6atlas.json": {
    data: null,
    name: "Number of atlas probes on v6",
    label: "Number of atlas probes on v6",
  },
  "v4atlas.json": {
    data: null,
    name: "Number of atlas probes on v4",
    label: "Number of atlas probes on v4",
  },
  "v6atlasuptime.json": {
    data: null,
    name: "Total uptime of atlas probes with v6",
    label: "Total uptime of atlas probes with v6",
  },
  "v4atlasuptime.json": {
    data: null,
    name: "Total uptime of atlas probes with v4",
    label: "Total uptime of atlas probes with v4",
  },
};


function countryToRIR(countryTwoLetterCode) {
  var map = {"US": "arin", "BR": "lacnic", "RU": "ripencc", "AU": "apnic", "DE": "ripencc", "GB": "ripencc", "CA": "arin", "CN": "apnic", "IN": "apnic", "PL": "ripencc", "NL": "ripencc", "UA": "ripencc", "FR": "ripencc", "JP": "apnic", "RO": "ripencc", "IT": "ripencc", "ES": "ripencc", "HK": "apnic", "CH": "ripencc", "ZZ": "afrinic", "SE": "ripencc", "ID": "apnic", "AR": "lacnic", "NZ": "apnic", "AT": "ripencc", "CZ": "ripencc", "IR": "ripencc", "ZA": "afrinic", "SG": "apnic", "BG": "ripencc", "TR": "ripencc", "NO": "ripencc", "DK": "ripencc", "MX": "lacnic", "BD": "apnic", "FI": "ripencc", "KR": "apnic", "BE": "ripencc", "TH": "apnic", "EU": "ripencc", "CL": "lacnic", "MY": "apnic", "PH": "apnic", "IE": "ripencc", "HU": "ripencc", "IL": "ripencc", "SI": "ripencc", "TW": "apnic", "CO": "lacnic", "VN": "apnic", "LV": "ripencc", "SK": "ripencc", "PK": "apnic", "SA": "ripencc", "GR": "ripencc", "RS": "ripencc", "PT": "ripencc", "MD": "ripencc", "EC": "lacnic", "LT": "ripencc", "KZ": "ripencc", "NG": "afrinic", "LB": "ripencc", "EE": "ripencc", "HR": "ripencc", "LU": "ripencc", "CR": "lacnic", "VE": "lacnic", "HN": "lacnic", "CY": "ripencc", "PA": "lacnic", "IQ": "ripencc", "KE": "afrinic", "GE": "ripencc", "AE": "ripencc", "PE": "lacnic", "KH": "apnic", "IS": "ripencc", "BY": "ripencc", "EG": "afrinic", "NP": "apnic", "PR": "arin", "TZ": "afrinic", "SY": "ripencc", "BA": "ripencc", "AZ": "ripencc", "AM": "ripencc", "KW": "ripencc", "PS": "ripencc", "GH": "afrinic", "MK": "ripencc", "AL": "ripencc", "MM": "apnic", "DO": "lacnic", "JO": "ripencc", "BO": "lacnic", "PY": "lacnic", "AF": "apnic", "AO": "afrinic", "MT": "ripencc", "GT": "lacnic", "UY": "lacnic", "MN": "apnic", "MU": "afrinic", "KG": "ripencc", "UZ": "ripencc", "SV": "lacnic", "UG": "afrinic", "LK": "apnic", "NI": "lacnic", "BH": "ripencc", "CW": "lacnic", "BZ": "lacnic", "MZ": "afrinic", "LI": "ripencc", "SC": "afrinic", "TT": "lacnic", "ME": "ripencc", "CD": "afrinic", "MA": "afrinic", "BW": "afrinic", "PG": "apnic", "CM": "afrinic", "BM": "arin", "ZW": "afrinic", "LA": "apnic", "ZM": "afrinic", "CI": "afrinic", "JM": "arin", "NC": "apnic", "DZ": "afrinic", "OM": "ripencc", "FJ": "apnic", "VG": "ripencc", "BJ": "afrinic", "MW": "afrinic", "GI": "ripencc", "GA": "afrinic", "HT": "lacnic", "QA": "ripencc", "MO": "apnic", "BN": "apnic", "TN": "afrinic", "MV": "apnic", "BF": "afrinic", "RW": "afrinic", "TJ": "ripencc", "BB": "arin", "SD": "afrinic", "GU": "apnic", "SN": "afrinic", "VU": "apnic", "IM": "ripencc", "CG": "afrinic", "LY": "afrinic", "KY": "arin", "MG": "afrinic", "LS": "afrinic", "SO": "afrinic", "CU": "lacnic", "BT": "apnic", "SM": "ripencc", "BI": "afrinic", "SL": "afrinic", "BS": "arin", "VI": "arin", "GM": "afrinic", "GN": "afrinic", "SZ": "afrinic", "YE": "ripencc", "SS": "afrinic", "LR": "afrinic", "SX": "lacnic", "TL": "apnic", "ML": "afrinic", "WS": "apnic", "PF": "apnic", "FO": "ripencc", "AG": "arin", "GY": "lacnic", "JE": "ripencc", "TD": "afrinic", "BQ": "lacnic", "SR": "lacnic", "LC": "arin", "GD": "arin", "TG": "afrinic", "RE": "afrinic", "GQ": "afrinic", "MF": "arin", "AD": "ripencc", "GF": "lacnic", "GL": "ripencc", "NE": "afrinic", "DM": "arin", "VA": "ripencc", "GP": "arin", "CV": "afrinic", "MC": "ripencc", "TO": "apnic", "TM": "ripencc", "SB": "apnic", "MR": "afrinic", "DJ": "afrinic", "AW": "lacnic", "AI": "arin", "GG": "ripencc", "KN": "arin", "KI": "apnic", "TC": "arin", "VC": "arin", "BL": "arin", "FM": "apnic", "NR": "apnic", "CF": "afrinic", "MP": "apnic", "ET": "afrinic", "PW": "apnic", "NF": "apnic", "KM": "afrinic", "GW": "afrinic", "AS": "apnic", "MH": "apnic", "ST": "afrinic", "WF": "apnic", "NU": "apnic", "AX": "ripencc", "IO": "apnic", "MQ": "ripencc", "CK": "apnic", "TK": "apnic", "TV": "apnic", "MS": "arin", "ER": "afrinic", "PM": "arin", "KP": "apnic", "YT": "afrinic"}
  return map[countryTwoLetterCode.toUpperCase()]
}

function loadDatasets() {
  getMultipleJSON(Object.keys(datasets))
   .done(function() {
      var input = arguments
      var count = 0;
      $.each(datasets,function(i, item) {
        datasets[i].data = input[count]
        count++
      });
      options = ""
      $.each(datasets, function(i, option) {
        options += "<option value=\""+ i +"\">" + option.name + "</option>"
      }) 
      $('#size_metric').html(options);
      $('#size_metric > option[value="ratio_v6_v4.json"]').prop("selected", true);
      $('#color_metric').html(options);
      $('#color_metric > option[value="gdp_2016.json"]').prop("selected", true);
      $('#advanced-filter .dataset').html(options);
      drawChart();
   })
}

var tree = null

function drawChart() {
  $('#size_metric,#color_metric').on('change', function() {
    drawChart();
  });

  dataset1 = datasets[$('#size_metric').val()]
  dataset2 = datasets[$('#color_metric').val()]

  var rawData = [
    ['Country', 'RIR', dataset1.label, dataset2.label],
    ['World', null, 0, 0],
  ];

  selectedCountries.forEach(function(country) {
    if(countryToRIR(country) !== undefined && dataset1.data[country] !== undefined && dataset2.data[country] !== undefined &&
     countryToRIR(country) !== null && dataset1.data[country] !== null && dataset2.data[country] !== null)
      rawData.push([country, 'World', dataset1.data[country], dataset2.data[country]]);
  });


  var data = google.visualization.arrayToDataTable(rawData);
  if(tree !== null) {
    tree.clearChart()
  }
  tree = new google.visualization.TreeMap(document.getElementById('chart_div'));
  google.visualization.events.addListener(tree, 'ready', function() {
    $('.hide-node').click(function() {
      $('.filter.country input[data-country-code='+$(this).data('country-code')+']').prop('checked', false)
      filterChart()
    })
  })
  tree.draw(data, {
    minColor: '#0066cc',
    maxColor: '#cc6600',
    headerHeight: 25,
    fontColor: 'black',
    showScale: true,
    generateTooltip: function(row, size, value) {
      return '<div class="alert alert-info">' +
      '<b>' + countryNames[data.getValue(row, 0)] + '</b> (' + data.getValue(row, 0) + ')<br />' +
      'RIR: ' + countryToRIR(data.getValue(row, 0)) + '<br />' + 
      dataset1.label + ': ' + dataset1.data[data.getValue(row, 0)] + '<br />' + 
      dataset2.label + ': ' + dataset2.data[data.getValue(row, 0)] +  '<br />' + 
      '<button class="hide-node" data-country-code="'+data.getValue(row, 0)+'">HIDE</button>'+
      '</div>';
    },
  });
}

google.charts.load('current', {'packages':['treemap']});
google.charts.setOnLoadCallback(loadDatasets);


var filters = ""
$.each(allCountries, function(i, country) {
  filters += "<input type=\"checkbox\" data-country-code=\""+country+"\"> " + countryNames[country] + "<br>"
})
$('.filter.country').html(filters)
$('.filter.country input').prop('checked', true)
function filterChart() {
  selectedCountries = []
  $('.filter.country input:checked').each(function() {
    selectedCountries.push($(this).data('country-code'))
  })
  drawChart()
}
$('.filter.country input').click(filterChart)
$('#select_all').click(function() {
  $('.filter.country input').prop('checked', true)
  filterChart()
});
$('#deselect_all').click(function() {
  $('.filter.country input').prop('checked', false)
  filterChart()
});

// Advanced filter
$("#advanced-filter").submit(function(e) {
  e.preventDefault()
  datasetName = $("#advanced-filter .dataset").val()
  operation = $("#advanced-filter .operation").val()
  value = $("#advanced-filter .amount").val()

  newSelectedCountries = []
  selectedCountries.forEach(function(country) {
    pluckOut = false;
    switch(operation) {
      case '>':
        if(datasets[datasetName].data[country] > value)
          pluckOut = true;
        break;
      case '=':
        if(datasets[datasetName].data[country] == value)
          pluckOut = true;
        break;
      case '<':
        if(datasets[datasetName].data[country] < value)
          pluckOut = true;
        break;
    }

    if(pluckOut) {
      $('.filter.country input[data-country-code='+country+']').prop('checked', false)
    } 
  })
  filterChart()
})

