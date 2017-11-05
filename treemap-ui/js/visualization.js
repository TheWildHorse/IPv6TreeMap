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
};


function countryToRIR(countryTwoLetterCode) {
  var map = {  "FR": "apnic",  "EU": "ripencc",  "GB": "apnic",  "IT": "arin","AE": "apnic","IL": "arin","RU": "ripencc","SE": "apnic","KZ": "ripencc","PT": "ripencc","GR": "ripencc","SA": "apnic","DK": "ripencc","ES": "apnic","IR": "apnic","NO": "apnic","DE": "apnic","SY": "ripencc","UA": "ripencc","CY": "ripencc","CZ": "arin","CH": "arin","IQ": "ripencc","NL": "afrinic","TR": "apnic","RO": "apnic","LB": "ripencc","GE": "ripencc","AZ": "ripencc","AT": "arin","PS": "ripencc","LT": "ripencc","OM": "ripencc","RS": "ripencc","FI": "arin","IS": "ripencc","BE": "arin","HU": "ripencc","BG": "ripencc","SI": "ripencc","MD": "ripencc","MK": "ripencc","EE": "ripencc","LI": "ripencc","US": "apnic","HR": "ripencc","PL": "ripencc","BA": "ripencc","LV": "ripencc","JO": "ripencc","KG": "ripencc","IE": "arin","IM": "apnic","LY": "afrinic","LU": "arin","AM": "ripencc","YE": "ripencc","BY": "ripencc","GI": "apnic","SK": "ripencc","MT": "ripencc","QA": "ripencc","VG": "apnic","AL": "ripencc","JE": "ripencc","SM": "ripencc","KW": "ripencc","ME": "ripencc","TJ": "ripencc","UZ": "ripencc","BH": "ripencc","NC": "apnic","SC": "afrinic","GL": "ripencc","VA": "ripencc","BZ": "apnic","FO": "ripencc","GG": "ripencc","MC": "ripencc","IN": "afrinic","AD": "ripencc","AF": "apnic","BR": "apnic","TM": "ripencc","MQ": "arin","EG": "afrinic","AU": "apnic","HK": "apnic","MY": "apnic","CR": "lacnic","BM": "arin","AX": "ripencc","MP": "apnic","SG": "apnic","SL": "afrinic","NG": "afrinic","CN": "apnic","CA": "afrinic","GP": "arin","PA": "apnic","MZ": "afrinic","TH": "apnic","NaN": "afrinic","TN": "afrinic","KE": "afrinic","UG": "afrinic","TG": "afrinic","BI": "afrinic","ZM": "afrinic","TZ": "afrinic","BW": "afrinic","CW": "lacnic","BN": "apnic","ZA": "afrinic","KY": "arin","VN": "apnic","NZ": "apnic","YT": "afrinic","JP": "apnic","RE": "afrinic","MA": "afrinic","MO": "apnic","arin": "2.3","AI": "arin","JM": "arin","PR": "arin","PM": "arin","VI": "arin","BS": "arin","BB": "arin","GD": "arin","DM": "arin","AG": "arin","LC": "arin","BL": "arin","TC": "arin","MF": "arin","MX": "lacnic","KN": "arin","DO": "lacnic","VC": "arin","GU": "apnic","TW": "apnic","MS": "arin","KR": "apnic","lacnic": "2.3","AR": "lacnic","CL": "lacnic","HN": "lacnic","EC": "lacnic","BO": "lacnic","SV": "lacnic","PE": "lacnic","GT": "lacnic","CO": "apnic","NI": "lacnic","UY": "lacnic","PY": "lacnic","TT": "lacnic","GF": "lacnic","VE": "lacnic","SX": "lacnic","GY": "lacnic","BQ": "lacnic","AW": "lacnic","HT": "lacnic","CU": "lacnic","SR": "lacnic","apnic": "2.3","PH": "apnic","BD": "apnic","PK": "apnic","ID": "apnic","PG": "apnic","NP": "apnic","TK": "apnic","KH": "apnic","MV": "apnic","FJ": "apnic","MN": "apnic","WF": "apnic","MM": "apnic","LA": "apnic","LK": "apnic","BT": "apnic","NR": "apnic","VU": "apnic","WS": "apnic","FM": "apnic","PF": "apnic","TL": "apnic","TO": "apnic","NU": "apnic","SB": "apnic","KI": "apnic","PW": "apnic","NF": "apnic","MH": "apnic","AS": "apnic","KP": "apnic","TV": "apnic","IO": "apnic","MU": "afrinic","CK": "apnic","afrinic": "2","DZ": "afrinic","ZZ": "afrinic","AO": "afrinic","SD": "afrinic","GH": "afrinic","CM": "afrinic","GA": "afrinic","ZW": "afrinic","SZ": "afrinic","ML": "afrinic","RW": "afrinic","ET": "afrinic","GM": "afrinic","BF": "afrinic","LS": "afrinic","NE": "afrinic","BJ": "afrinic","MR": "afrinic","CI": "afrinic","ER": "afrinic","DJ": "afrinic","CD": "afrinic","MW": "afrinic","SS": "afrinic","KM": "afrinic","CG": "afrinic","MG": "afrinic","GN": "afrinic","CF": "afrinic","LR": "afrinic","GQ": "afrinic","SN": "afrinic","SO": "afrinic","TD": "afrinic","CV": "afrinic","GW": "afrinic","ST": "afrinic"}
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

  allCountries.forEach(function(country) {
    if(countryToRIR(country) !== undefined && dataset1.data[country] !== undefined && dataset2.data[country] !== undefined &&
     countryToRIR(country) !== null && dataset1.data[country] !== null && dataset2.data[country] !== null)
      rawData.push([country, 'World', dataset1.data[country], dataset2.data[country]]);
  });


  var data = google.visualization.arrayToDataTable(rawData);
  if(tree !== null) {
    tree.clearChart()
  }
  tree = new google.visualization.TreeMap(document.getElementById('chart_div'));
  tree.draw(data, {
    minColor: '#0066cc',
    maxColor: '#cc6600',
    headerHeight: 25,
    fontColor: 'black',
    showScale: true,
    generateTooltip: function(row, size, value) {
      return   '<div class="alert alert-info">' +
      '<b>' + countryNames[data.getValue(row, 0)] + '</b><br />' +
      'row: ' + row + '<br />' + 
      dataset2.label + ': ' + size + '<br />' + 
      dataset1.label + ': ' + value +  '<br />' + 
      '</div>';
    },
  });
}

google.charts.load('current', {'packages':['treemap']});
google.charts.setOnLoadCallback(loadDatasets);

