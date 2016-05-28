'use strict';

(function () {
  'use strict';

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

  $('.btn').on('click', function (event) {
    var hour = $(event.currentTarget).data('hour');

    console.log(hour);
    var data = {
      value: hour
    };
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
    if (data['value'] == 'calefaccion') {
      $('#calefaccion').addClass('active-heating');
    } else {
      $('#enfriamiento').addClass('active-cooling');
    }
  }

  function _activate() {
    console.log('hola bebe');
   // _readTemperature();
  }

  _activate();
/*  setInterval(function(){ 
      _readTemperature();
   }, 1000);*/
})();

