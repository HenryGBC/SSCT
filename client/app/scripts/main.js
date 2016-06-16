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
   var dataHour = { };
   var dataCtrl = { };
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
    
    dataHour = {
      'value': hour
    };
   
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/ssct/server/setHours.php",
      data: dataHour,
      success: function success(data) {
        console.log(data);
        $('.btn').removeClass('active');
        $(event.currentTarget).addClass('active');
        
        if(hour==='off'){
          $('#enfriamiento').removeClass('active-cooling');
          $('#calefaccion').removeClass('active-heating');
        }
          
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  });
  
  
  function _getHour() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1/ssct/server/getHours.php",
      success: function success(data) {
        var dataRead = JSON.parse(data);
        //console.log(dataRead);
        dataHour = dataRead;
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  }

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
   //console.log(data);
    dataCtrl = data;
    if(data['value'] !== 'none'){
        if (data['value'] === 'calefaccion') {
        $('#enfriamiento').removeClass('active-cooling');
        $('#calefaccion').addClass('active-heating');
      } else {
        $('#calefaccion').removeClass('active-heating');
        $('#enfriamiento').addClass('active-cooling');
        
      }
      $('.btn').removeClass('active');
      $('#'+data.hour+'').addClass('active');
      if(state !== data['value'] ){
        state = data['value'];
        console.log(data.hour);
        db.ref('estado').set({
          valor: state,
          horario: data.hour,
          fecha: moment().utcOffset("+00:30").format()
        });
      }
    }
    
  }
  
  
  function _getDegrees() {
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1/ssct/server/getDegrees.php",
      success: function success(data) {
        var dataRead = JSON.parse(data);
        console.log(dataRead);
        console.log(dataCtrl);
        if(_off()){
          $('.grades').removeClass('opacity');
        }else{
          _mapDegrees(dataRead);
        }
       
      },
      catch: function _catch(err) {
        console.log(err);
      }
    });
  }
 function _mapDegrees(data) {
   var degree = data['degree'];
   var hour = moment().utcOffset("-04:00").format("h:mm:ss a");
    db.ref('temperatura').push({
      degree: degree,
      hour: hour
    });
    
   $('.grades').removeClass('opacity');
   $('.grades').each(function () {
     var dataDegree = $(this).data('degreed');
     if(dataDegree<=degree){
       $(this).addClass('opacity');
     }
   });
 }
  db.ref("temperatura").on('value', function (snapchot) {
    _updateTemperature(snapchot.val());
  }); 
  function _activate() {
    _getHour();
    _readTemperature();
    //_getDegrees();
    
      
  }
  
  function _updateTemperature(data) {
    var arrayIndex = [];
    for(var index in data){
        arrayIndex.push(index);
        if(arrayIndex.length > 10 ){
          db.ref("temperatura")
             .child(arrayIndex[0])
              .remove()
              .then(function () {
                console.log("remove");
              });
        }
    }
  }
  
  function _off() {
    return dataCtrl.hour === 'off';
  }
  
  _activate();
   setInterval(function(){ 
     // _getHour();
     console.log(dataCtrl);
     _readTemperature();
     //_getDegrees();
   }, 1000);
   setInterval(function(){ 
     console.log(dataCtrl);
    
      _getDegrees();
   }, 3000);
})();

