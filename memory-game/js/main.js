
$(() => {
  $('#start').on('click', startGame);

  $('#reset').on('click', resetGame);

  createImageArray();
})

const game = {
  started: false,
  currentPlayer: '',      // 0 or 1 (player1 or player2)
  matches1: 0,
  matches2: 0,
  player1: '',
  player2: ''
};

let currentGame = game;
// let currentGame = {};
// container for selected 'targets (images)'
let selectedTargets = [];

// comtainer for image paths of selected images;
// used when comparing to see if the selections match
let selectedImages = [];

let imageBack = './img/forest.jpg';

let images = ['./img/tawny_owl.jpg',
                './img/snowy_owl.png',
                './img/spectacled_owl.png',
                './img/great_grey_owl.jpg',
                './img/great_horned_owl.jpg',
                './img/owl_bird_young.jpg',
                './img/tawny_owl.jpg',
                './img/snowy_owl.png',
                './img/spectacled_owl.png',
                './img/great_grey_owl.jpg',
                './img/great_horned_owl.jpg',
                './img/owl_bird_young.jpg'
];

// retains order of image ids in the display createImageArray
let imageOrder = [];

// randomize the order in which the images are displayed
const createImageOrder = () => {
  let index = 0;
  let filled = false;

  while (!filled) {
    index = Math.floor(Math.random() * images.length);

    // can't have the same number twice...
    if (imageOrder.indexOf(index) === -1) {
      imageOrder.push(index);
    }
    // all images populated??
    if (imageOrder.length === images.length) {
      filled = true;
    }
  }
}

const createImageArray = () => {
  createImageOrder();

  //select container to add images
  const $flexContainer = $( '.flex-container' );

  let imageid  = 0;
  let imageToDisplay = '';

  // add to $flexContainer
  for (let i = 0; i < imageOrder.length; i++) {
    //create an image and add a unique id
    imageid = imageOrder[i];

    // create 'container div'
    const $section = $('<section>')
      .addClass('container');

    const $cardDiv = $('<div>')
      .addClass('card')
      .on('click', flipImage);

    const $front = $('<div>')
      .css('background-image', 'url(' + imageBack + ')')
      .addClass('front');

    const $back = $('<div>')
      .css('background-image', 'url(' + images[imageid] + ')')
      .attr('image-id', images[imageid])
      .addClass('back');

    $section.append( $cardDiv );
    $cardDiv.append( $front );
    $cardDiv.append( $back );

    $flexContainer.append( $section );
  }
}

const resetGame = () => {
  selectedImages = [];
  selectedTargets = [];
  currentGame = game;

  $('#score1').text('');
  $('#score2').text('');

  $('#msg1').text('');
  $('#msg1').text('');

  // $label1 = $('#label1');
  $('#label1').css('color', 'black');
  $('#label1').css('font-weight', 'normal');

  // $label2 = $('#label2');
  $('#label2').css('color', 'black');
  $('#label2').css('font-weight', 'normal');

  // remove images from $flexContainer
  $('section').remove();
  createImageArray();
}

const flipImage = (event) => {
  // make sure game is ready to player
  if (currentGame.started === false) {
    alert('Player details need to be entered before game can begin');
    return;
  }
  let $target = $( event.currentTarget );
  $target.toggleClass('flipped');
  let $divback = $target.children('div.back');

  // keep track of what images/targets are selected (save image path and $target). 'image-id' will be used to compare if selections are equal
  selectedImages.push( $divback.attr('image-id') );
  selectedTargets.push( $target );

  // enough selections to check for a match?
  if (selectedImages.length === 2) {
    checkForMatch(event);
  }
  // TODO: needed??
  event.preventDefault();
}

const checkForMatch = (event) => {

  if (selectedImages[0] === selectedImages[1]) {
    let $msg  = (currentGame.currentPlayer === currentGame.player1) ? $('#msg1') : $('#msg2');
    $msg.text('Matched!!!');
    setTimeout(clearStatus, 4000);
    updateGame('match');
    selectedImages = [];
    selectedTargets = [];

  } else {
    setTimeout(resetImages, 2000);
    updateGame('miss');
    game.currentPlayer = (game.currentPlayer === game.player1) ? game.player2 : game.player1;
  }
}

const showActivePlayer = () => {
  // draw red border around player selecting Images
  let $label1 = '';
  let $label2 = '';

  if (game.currentPlayer === game.player1) {
    $label1 = $('#label1');
    $label1.css('color', '#cc0003').css('font-weight', 'bold');

    $label2 = $('#label2');
    $label2.css('color', 'black').css('font-weight', 'normal');
  } else {
    $label2 = $('#label2');
    $label2.css('color', '#cc0003').css('font-weight', 'bold');

    $label1 = $('#label1');
    $label1.css('color', 'black');
    $label1.css('font-weight', 'normal');
  }
}

const clearStatus = () => {
  $('#msg1').text('');
  $('#msg2').text('');
}

const resetImages = () => {
  // switch playerToStart
  showActivePlayer();

  // flip them over; reset selected Images
  selectedTargets[0].toggleClass('flipped', false);
  selectedTargets[1].toggleClass('flipped', false);

  selectedImages = [];
  selectedTargets = [];
}

const updateGame = (outcome) => {
  // check who is the current player
  if (currentGame.currentPlayer === currentGame.player1) {
    if (outcome === 'match') {
      currentGame.matches1++;
      $('#score1').text(currentGame.matches1);
    }
  } else if (outcome === 'match') {
      currentGame.matches2++;
      $('#score2').text(currentGame.matches2);
  }
  checkForGameEnd();
}
/*
  if all images are flipped, then compare the scores.
  Display the winner
*/
const checkForGameEnd = () => {

  if (currentGame.matches1 + currentGame.matches2 === (images.length/2)) {
    let winner = (currentGame.matches1 > currentGame.matches2) ? currentGame.player1 : currentGame.player2;
    let matches = (currentGame.matches1 > currentGame.matches2) ? currentGame.matches1 : currentGame.matches2;

    alert(`GAME OVER! ${winner} wins with ${matches} matches.\nThanks for pairing up the owls!`)
  }
}
const startGame = () => {
  // get player input; save in game object
  currentGame.player1 = $( '#player1' ).val();
  currentGame.player2 = $( '#player2' ).val();

  // check to make sure both input fields are populated
  if ((currentGame.player1 === '') || (currentGame.player2 === '')) {
    alert('Both players need to enter a name before the game can begin.\nPlease enter both player\'s names and restart the game');
  } else {
    let playerToStart = (Math.floor(Math.random() * (2 - 1 + 1)) + 1);

    // update the game details
    currentGame.currentPlayer = (playerToStart === 1) ? currentGame.player1 : currentGame.player2 ;
    currentGame.started = true;

    // TODO: change this to message on the page...
    let starter = (playerToStart === 0) ? currentGame.player1 : currentGame.player2;

    alert(`${currentGame.currentPlayer} starts the game. Good luck!`);

    // highlight the active player
    if (game.currentPlayer === game.player1) {
      $label1 = $('#label1');
      $label1.css('color', '#cc0003').css('font-weight', 'bold');
    } else {
      $label2 = $('#label2');
      $label2.css('color', '#cc0003').css('font-weight', 'bold');

    }
  }
}
