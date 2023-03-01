function getData() {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            var lines = xmlhttp.responseText;

            currentDate(lines);
            randomDate(lines);
        }
    }

    xmlhttp.open("GET", "dates.txt", true);
    xmlhttp.send();
}

function currentDate(lines) {
    const date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    d = addZero(d);
    m = addZero(m);

    var lineArr = lines.split('\n');
    var results = getResults(d, m, lineArr);

    $('#date-time').html(date);
    $('#informatia').html(results[0]);
    $('#informatia1').html(results[1]);
}

function randomDate(lines1) {
    var line;
    var found = -1;
    var result1, result2;
    var items = [];

    var lineArr = lines1.split('\n');
    console.log(lineArr.length);
    for (let index = 0; index < lineArr.length; index += 3) {
        items.push(index);
    }

    var item = items[Math.floor(Math.random() * items.length)];
    $('#random-date').html(lineArr[item]);
    $('#informatia2').html(lineArr[item + 1]);
    $('#informatia3').html(lineArr[item + 2]);
}

function getResults(d, m, lineArr) {
    var line;
    var found = -1;
    var result1, result2;
    var combined = d + '.' + m;


    for (let index = 0; index < lineArr.length; index++) {
        line = lineArr[index];

        if (line.match(combined)) {
            found = index;
            console.log(1);
            break;
        }
    }

    if (found != -1) {
        result1 = lineArr[found + 1];
        result2 = lineArr[found + 2];
    } else {
        result1 = 'No results found for date!';
        result2 = 'No results found for date!';
    }
    return [result1, result2];
}

function addZero(num) {
    if (num < 10) {
        num = 0 + "" + num;
    }
    return num;
}
getData();

function random(start, end) {

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

$('#randomBtn').click(function() {
    $('.main').hide();
    $('.random').show();
    getData();
})