'use strict';

(function () {
  'use strict';
  var config = {
      apiKey: "AIzaSyDDfGHsuNiZ8h2MU8oG_1H9FJBMzfjYbMc",
      authDomain: "project-6124785050910967847.firebaseapp.com",
      databaseURL: "https://project-6124785050910967847.firebaseio.com",
      storageBucket: "project-6124785050910967847.appspot.com",
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  
  var state = '';
   var dataHour = {
      value: 'normal'
    }
  /*var ref = new Firebase('https://ssct.firebaseio.com/');
   ref.child('temperatureact').on('value', function(element){
    let tempAct = element.val();
    console.log(tempAct.value);
    if(tempAct.value==='calefaccion'){
      $('#calefaccion').addClass('active-cooling');
    }else{
      $('#enfriamiento').addClass('active-cooling');
    }
   });*/

  // Escoger horario
  var tiempo = 3000;
  $('.btn').on('click', function (event) {
    var hour = $(event.currentTarget).data('hour');

    console.log(hour);
    var data = {
      value: hour
    };
    
    dataHour = data;
   
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/ssct/server/setHours.php",
      data: data,
      success: function success(data) {
        console.log(data);
        $(event.currentTarget).addClass('active');
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  });

  function _readTemperature() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1/ssct/server/getTemperature.php",
      success: function success(data) {
        var dataRead = JSON.parse(data);
        _setData(dataRead);
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  }

  function _setData(data) {
    console.log(data);
    var date = new Date();
    date = date.toString();
    if (data['value'] === 'calefaccion') {
      $('#enfriamiento').removeClass('active-cooling');
      $('#calefaccion').addClass('active-heating');
    } else {
      $('#calefaccion').removeClass('active-heating');
      $('#enfriamiento').addClass('active-cooling');
       
    }
    if(state !== data['value'] ){
      state = data['value'];
      db.ref('estado').set({
        valor: state,
        horario: dataHour.value,
        fecha: date
      });
    }
  }
  
  
  function _getDegrees() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1/ssct/server/getDegrees.php",
      success: function success(data) {
        var dataRead = JSON.parse(data);
        console.log(dataRead);
        _mapDegrees(dataRead);
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  }
 function _mapDegrees(data) {
   var degree = data['degree'];
   $('#degree-'+degree.toString()).addClass('opacity');
 }
  function _activate() {
    _readTemperature();
    _getDegrees();
  }

  _activate();
   setInterval(function(){ 
     // _readTemperature();
   }, tiempo);
})();

