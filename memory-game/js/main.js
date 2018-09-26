
$(() => {
  $('#start').on('click', startGame);

  $('#reset').on('click', resetGame);

  createImageArray();
})

const game = {
  currentPlayer: 0,      // 0 or 1 (player1 or player2)
  matches1: 0,
  matches2: 0,
  chances1: 0,
  chances2: 0,
  player1: '',
  player2: ''
};

let currentGame = {};

// container for image objects
let imageObjects = [];

let selectedImages = [];

let imageBack = './img/back.jpg';

let images = ['./img/tawny_owl.jpg',
                './img/ural_owl.jpg',
                './img/snowy_owl.jpg',
                './img/owl_burrowing.jpg',
                './img/tawny_owl.jpg',
                './img/ural_owl.jpg',
                './img/snowy_owl.jpg',
                './img/owl_burrowing.jpg'];

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
      .attr("id", imageid)
      .on('click', flipImage);

    const $front = $('<div>')
      .css('background-image', 'url(' + imageBack + ')')
      .addClass('front');

    const $back = $('<div>')
      .css('background-image', 'url(' + images[imageid] + ')')
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
  // let $cardChildren = $( event.currentTarget ).children();
  let $card = $( event.currentTarget ).children('div:first');
  $target.toggleClass('flipped');

  // // keep track of what images are selected
  selectedImages.push( $card );
  console.log( selectedImages );

  // enough selections to check for a match?
  if (selectedImages.length === 2) {
    checkForMatch();
  }
  event.preventDefault();
}

const checkForMatch = () => {
  if (selectedImages[0] === selectedImages[1]) {
    alert('matched');
  } else {
    // flip them over; reset selected Images
    selectedImages = [];
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
    let playerToStart = Math.floor(Math.random() * 1);

    // update the game details
    currentGame.currrentPlayer = playerToStart;

    // TODO: change this to message on the page...
    let starter = (playerToStart === 0) : currentGame.player1 : currentGame.player2;

    alert(`${starter} starts the game. First player with 3 matches and less than 3 "misses" wins. Good Luck!`);
    console.log(starter);
  }
}
