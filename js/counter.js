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

var counter = function() {
  var plyrStats;
  var monstrStats;
  var plyrBonus;
  var monstrBonus;
  var warriorCheck;

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
    if( !( ($('input#plyr-lvl').val() == 0) || ($('input#monstr-lvl').val() == 0) ) ){
      plyrStats = parseInt( ($('input#plyr-lvl').val().length) ? $('input#plyr-lvl').val() : 1 ) 
        + parseInt( ($('input#plyr-arm').val().length) ? $('input#plyr-arm').val() : 0 );
      monstrStats = parseInt( $('input#monstr-lvl').val().length ? $('input#monstr-lvl').val() : 0);
      plyrBonus = monstrBonus = 0;
      $('p.plyr').text("Ty: " + plyrStats);
      $('p.monstr').text("Potwór: " + monstrStats);
      whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
      $('.on-fight, .fight-row').show();
    }else{
      alert("Podaj poziom Twój i/lub potwora!");
    }
  });

  // Update player's fighting level after every change of the field "Twój bonus"
  $('input#plyr-bonus').keyup(function() {
    plyrBonus = parseInt($(this).val());
    if( $(this).val().length == 0 ){
      plyrBonus = 0;
    }
    $('p.plyr').text("Ty: " + (plyrStats+plyrBonus));
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });

  // Update monster's fighting level after every change of the field "Bonus potwora"
  $('input#monstr-bonus').keyup(function() {
    monstrBonus = parseInt($(this).val());
    if( $(this).val().length == 0 ){
      monstrBonus = 0;
    }
    $('p.monstr').text("Potwór: " + (monstrStats+monstrBonus));
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });


  // Four commands about adding and substracting bonuses using 'plus' and 'minus' buttons
  $('button#plyr-plus').click( function() {
    changeField($('input#plyr-bonus'), 1);
  });

  $('button#plyr-minus').click( function() {
    changeField($('input#plyr-bonus'), 0);
  });

  $('button#monstr-plus').click( function() {
    changeField($('input#monstr-bonus'), 1);
  });
  
  $('button#monstr-minus').click( function() {
    changeField($('input#monstr-bonus'), 0);
  });
  //--------------------------------------------------------------------------------------

  // Click the button "Koniec walki"
  $('button#end-btn').click(function() {
    $('input#plyr-lvl, input#plyr-arm, input#monstr-lvl, input#plyr-bonus, input#monstr-bonus').val('0');
    $('.on-fight, .fight-row').hide();
  });
}

$(document).ready(counter);