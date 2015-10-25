var whoWins = function(wC, plyr, monstr){
  var $result = $('p.fight-result');
  if(wC == true){
    if(plyr >= monstr) {
      $result.text("WYGRANA!");
    }else{
      $result.text("PORAŻKA!");
    }
  }else{
    if(plyr > monstr) {
      $result.text("WYGRANA!");
    }else{
      $result.text("PORAŻKA!");
    }
  }
}

var changeField = function(field, add) {
  if( field.val().length == 0 ){
    field.val('0');
  }
  var tmp = parseInt(field.val());

  if(add){  
    tmp++;
    field.val(tmp);
  }else{
    tmp--;
    if(tmp < 0) tmp = 0;
    field.val(tmp);
  }
}

var zeroingInputs = function() {
  $('input#plyr-lvl, input#plyr-arm, input#monstr-lvl, input#plyr-bonus, input#monstr-bonus').val('0');
  $('input#warrior').prop("checked", false);
}

var counter = function() {
  var plyrStats;
  var monstrStats;
  var plyrBonus;
  var monstrBonus;
  var warriorCheck;

  //zeroing all inputs 
  zeroingInputs();

  // Check the field "Jesteś wojownikiem?"
  $('input#warrior').click(function() {
    warriorCheck = $(this).prop("checked");
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });
  
  // After clicking on "WALCZ!"(if fields "Twój poziom" and "Poziom potwora" are not empty):
  // -display element div that showing result of fight
  // -set the values "Ty" and "Potwór"
  // -set the the result of fight depending on fields mentioned before and the field named "Jesteś wojownikiem?"
  $('button#start-btn').click(function() {
    if( !( ($('input#plyr-lvl').val() == 0) || ($('input#monstr-lvl').val() == 0) ) ){ //check if inputs == 0
      plyrStats = parseInt( ($('input#plyr-lvl').val().length) ? $('input#plyr-lvl').val() : 1 )        // true => set the values
        + parseInt( ($('input#plyr-arm').val().length) ? $('input#plyr-arm').val() : 0 );               // of player and monster lvls
      monstrStats = parseInt( $('input#monstr-lvl').val().length ? $('input#monstr-lvl').val() : 0);    // in corresponding <p>
      plyrBonus = monstrBonus = 0;
      $('p.plyr').text("Ty: " + plyrStats);
      $('p.monstr').text("Potwór: " + monstrStats);
      whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);                              // also set WIN or LOSE div
      $('.on-fight, .fight-row').show();
    }else{
      alert("Podaj poziom Twój i/lub potwora!");
    }
  });

  // Update player's fighting level after every change of the field "Twój bonus"
  $('input#plyr-bonus').keyup(function() {
    if( $(this).val().length == 0 ){
      plyrBonus = 0;
    }else{
      plyrBonus = parseInt($(this).val());
    }
    $('p.plyr').text("Ty: " + (plyrStats+plyrBonus));
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });

  // Update monster's fighting level after every change of the field "Bonus potwora"
  $('input#monstr-bonus').keyup(function() {
    if( $(this).val().length == 0 ){
      monstrBonus = 0;
    }else{
      monstrBonus = parseInt($(this).val());
    }
    $('p.monstr').text("Potwór: " + (monstrStats+monstrBonus));
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });

  // Adding and substracting bonuses using 'plus' and 'minus' buttons
  $('button.change').click( function() {
    var $input; 

    if( $(this).hasClass('plyr') ){
      $input= $('input#plyr-bonus');
      changeField($input, $(this).hasClass('plus'))

      if( $input.val().length != 0 ){
        plyrBonus = parseInt($input.val());
      }else{
        plyrBonus = 0;
      }
      $('p.plyr').text("Ty: " + (plyrStats+plyrBonus));
      
    }else{
      $input= $('input#monstr-bonus');
      changeField($input, $(this).hasClass('plus'))

      if( $input.val().length != 0 ){
        monstrBonus = parseInt($input.val());
      }else{
        monstrBonus = 0;
      }
      $('p.monstr').text("Potwór: " + (monstrStats+monstrBonus));
    }

    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });
  //--------------------------------------------------------------------------------------

  // Click the button "Koniec walki"
  $('button#end-btn').click(function() {
    zeroingInputs();
    $('.on-fight, .fight-row').hide();
  });
}

$(document).ready(counter);