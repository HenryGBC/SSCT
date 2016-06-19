(function() {
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDDfGHsuNiZ8h2MU8oG_1H9FJBMzfjYbMc",
    authDomain: "project-6124785050910967847.firebaseapp.com",
    databaseURL: "https://project-6124785050910967847.firebaseio.com",
    storageBucket: "project-6124785050910967847.appspot.com",
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  
  var ctx = $("#myChart");
   $("#myChart").css('width', '70vh');
   $("#myChart").css('height', '56vh');
  var arrayDegrees = [];
  var arrayHours = [];


function initChart() {
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrayHours,
        datasets: [{
            label: '# of Votes',
            data: arrayDegrees,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
    
  function _getDate(){
    var hour = moment().utcOffset("-04:00").format(" h:mm:ss a");
    var date = moment().utcOffset("-04:00").format(" D/MM");
    
    console.log(date);
    $('#date').text(date);
    $('#hora').text(hour);
  }
  
  function _setEstado(data) {
    if(data.valor==='enfriamiento'){
      $('.color-estado').removeClass('heat');
      $('.color-estado').addClass('cold');
    }else{
      $('.color-estado').removeClass('cold');
      $('.color-estado').addClass('heat');
    }
      
    $('#state').text(data.valor);
    console.log(data);
    $('#horarioState').text(data.horario);
  }
  
  function _setTemperature(data) {
    
    for(var index in data){
        arrayDegrees.push(data[index].degree);
        arrayHours.push(data[index].hour);
        if(arrayDegrees.length>10){
          arrayDegrees.shift();
          arrayHours.shift();
        }
        
        
    }
   console.log(arrayDegrees);
    console.log(arrayHours);
    
    initChart();
  }
  
  
  
  db.ref("estado").on('value', function (snapchot) {
    _setEstado(snapchot.val());
  }); 
  db.ref("temperatura").on('value', function (snapchot) {
    _setTemperature(snapchot.val());
  }); 
  _getDate();
  setInterval(function(){ 
     _getDate();
   }, 1000);
})();
 