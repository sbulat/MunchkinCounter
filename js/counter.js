var counter = function() {
  var plyrStats;
  var monstrStats;
  var plyrBonus;
  var monstrBonus;
  var warriorCheck;

  $('input#warrior').click(function() {
    warriorCheck = $(this).prop("checked");
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });
  
  $('input#start-btn').click(function() {
    plyrStats = parseInt( ($('input#plyr-lvl').val().length) ? $('input#plyr-lvl').val() : 1 ) 
      + parseInt( ($('input#plyr-arm').val().length) ? $('input#plyr-arm').val() : 0 );
    monstrStats = parseInt( $('input#monstr-lvl').val().length ? $('input#monstr-lvl').val() : 0);
    plyrBonus = monstrBonus = 0;
    $('p.plyr').text("Ty: " + plyrStats);
    $('p.monstr').text("Potwór: " + monstrStats);
    warriorCheck = $('input#warrior').prop("checked");
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
    $('.on-fight, .fight-row').show();
  });

  $('input#plyr-bonus').keyup(function() {
    plyrBonus = parseInt($(this).val());
    if( $(this).val().length == 0 ){
      plyrBonus = 0;
    }
    $('p.plyr').text("Ty: " + (plyrStats+plyrBonus));
    warriorCheck = $('input#warrior').prop("checked");
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });

  $('input#monstr-bonus').keyup(function() {
    monstrBonus = parseInt($(this).val());
    if( $(this).val().length == 0 ){
      monstrBonus = 0;
    }
    $('p.monstr').text("Potwór: " + (monstrStats+monstrBonus));
    warriorCheck = $('input#warrior').prop("checked");
    whoWins(warriorCheck, plyrStats+plyrBonus, monstrStats+monstrBonus);
  });

  $('input#end-btn').click(function() {
    $('.on-fight, .fight-row').hide();
  });
}

var whoWins = function(wC, plyr, monstr){
  var $result = $('p.fight-result');
  if( wC == true){
    if(plyr >= monstr) {
      $result.text("Pokonałeś potwora!");
    }else{
      $result.text("Zostałeś pokonany!");
    }
  }else{
    if(plyr > monstr) {
      $result.text("Pokonałeś potwora!");
    }else{
      $result.text("Zostałeś pokonany!");
    }
  }
}

$(document).ready(counter);


// Do zmiany: zerowanie wszystkich input