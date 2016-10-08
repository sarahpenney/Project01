



  var currentKey;
  var TimerWalk;
  var charStep = 2;
  var charSpeed = 400;






































   $(document).ready(function() {
 	$('#character').addClass('front-stand');

   });

  $(document).keydown(function(e) {
    if (!currentKey) {

      //set the currentKey to the key that is down
      currentKey = e.keyCode;

      //execute character movement function charWalk('direction')
      switch(e.keyCode) {
        case 38: charWalk('up');    break;
        case 39: charWalk('right'); break;
        case 40: charWalk('down');  break;
        case 37: charWalk('left');  break;
        case 87: charWalk('up'); break;
        case 65: charWalk('left'); break;
        case 83: charWalk('down'); break;
        case 68: charWalk('right'); break;
      }

    }

  });

  //KeyUp Function
  $(document).keyup(function(e) {

    //don't stop the walk if the player is pushing other buttons
    //only stop the walk if the key that started the walk is released
    if (e.keyCode == currentKey) {

      //set the currentKey to false, this will enable a new key to be pressed
      currentKey = false;

      //clear the walk timer
      clearInterval(TimerWalk);

      //finish the character's movement
      $('#character').stop(true, true);

    }

  });

  //Character Walk Function
  function charWalk(dir) {

    //adjust from lang to code
    if (dir == 'up') dir = 'back';
    if (dir == 'down') dir = 'front';

    //move the character
    processWalk(dir);

    //set the interval timer to continually move the character
    TimerWalk = setInterval(function() { processWalk(dir); }, charSpeed);

  }

  //Process Character Walk Function
  function processWalk(dir) {

    //increment the charStep as we will want to use the next stance in the animation
   //if the character is at the end of the animation, go back to the beginning
    charStep++;
    if (charStep == 5) charStep = 1;

    //remove the current class
    $('#character').removeAttr('class');

    //add the new class
    switch(charStep) {
      case 1: $('#character').addClass(dir+'-stand'); break;
      case 2: $('#character').addClass(dir+'-right'); break;
      case 3: $('#character').addClass(dir+'-stand'); break;
      case 4: $('#character').addClass(dir+'-left');  break;
    }

    //move the char
    //we will only want to move the character 32px (which is 1 unit) in any direction
    switch(dir) {
      case'front':
        $('#character').animate({top: '+=32'}, charSpeed);
        break;
      case'back':
        //don't let the character move any further up if they are already at the top of the screen
        if ($('#character').position().top > 0) {
          $('#character').animate({top: '-=32'}, charSpeed);
        }
        break;
      case'left':
      //don't let the character move any further left if they are already at the left side of the screen
      if ($('#character').position().left > 0) {
          $('#character').animate({left: '-=32'}, charSpeed);
        }
        break;
      case'right':
        $('#character').animate({left: '+=32'}, charSpeed);
        break;
      }

  }
