
$(() => {
  $('#start').on('click', startGame);

  $('#reset').on('click', resetGame);

  createImageArray();
})

const game = {
  currentPlayer: 0,      // 0 or 1 (player1 or player2)
  matches1: 0,
  matches2: 0,
  misses1: 0,
  misses2: 0,
  player1: '',
  player2: ''
};

let currentGame = {};

// container for selected 'targets (images)'
let selectedTargets = [];

// comtainer for image paths of selected images;
// used when comparing to see if the selections match
let selectedImages = [];

let imageBack = './img/back.jpg';

let images = ['./img/tawny_owl.jpg',
                './img/ural_owl.jpg',
                './img/snowy_owl.jpg',
                './img/owl_burrowing.jpg',
                './img/great_grey_owl.jpg',
                './img/great_horned_owl.jpg',
                './img/tawny_owl.jpg',
                './img/ural_owl.jpg',
                './img/snowy_owl.jpg',
                './img/owl_burrowing.jpg',
                './img/great_grey_owl.jpg',
                './img/great_horned_owl.jpg'
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
  currentGame = {};
}

const flipImage = (event) => {
  let $target = $( event.currentTarget );
  $target.toggleClass('flipped');
  let $divback = $target.children('div.back');

  // keep track of what images/targets are selected
  // let imageid = $divback.attr('image-id');
  selectedImages.push( $divback.attr('image-id') );
  selectedTargets.push( $target );

  console.log( selectedImages );

  // enough selections to check for a match?
  if (selectedImages.length === 2) {
    checkForMatch(event);
  }
  event.preventDefault();
}

const checkForMatch = (event) => {
  // get outer html from $target.children('div.back'); this has the image name
  let $target = $( event.currentTarget );
  let $divback = $target.children('div.back');

  if (selectedImages[0] === selectedImages[1]) {
    // setTimeout(matchedImages, 2000);
    let $msg  = (currentGame.currentPlayer === 0) ? $('#msg1') : $('#msg2');
    $msg.text('Matched!!!');
    updateGame('match');
  } else {
    setTimeout(resetImages, 1500);

    updateGame('miss');
    game.currentPlayer = !game.currentPlayer;
  }
}

const resetImages = () => {
  // flip them over; reset selected Images
  selectedTargets[0].toggleClass('flipped', false);
  selectedTargets[1].toggleClass('flipped', false);

  selectedImages = [];
  selectedTargets = [];
}

const updateGame = (outcome) => {
  // check who is the current player
  if (currentGame.currentPlayer === 0) {
    if (outcome === 'match') {
      currentGame.matches1++;
    } else {
      currentGame.misses1++;
    }
  } else {
    if (outcome === 'match') {
      currentGame.matches2++;
    } else {
      currentGame.misses2++;
    }
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
    let playerToStart = Math.ceil(Math.random() * 1);

    // update the game details
    currentGame.currrentPlayer = playerToStart;

    // TODO: change this to message on the page...
    let starter = (playerToStart === 0) ? currentGame.player1 : currentGame.player2;

    alert(`${starter} starts the game. First player with 3 matches and less than 3 "misses" wins. Good Luck!`);
    console.log(starter);
  }
}
