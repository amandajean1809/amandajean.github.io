
$(() => {
  // $( '.flex-container' ).on('click', () => {
  //   console.log('clicked image');
  // });
  $('#start').on('click', () => {

  });

  $('#reset').on('click', resetImages);

  createImageArray();
})

// state of game; gets set when 'game' begins
let state = 0

// container for image objects
let imageObjects = [];

// image object; contains properties of images added to game board
const imageObject = {
  front: '',
  back: '',
  id: ''
};

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

const createBoard = () => {

};

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
  console.log(imageOrder);
}

const createImageArray = () => {
  createImageOrder();

  //select container to add images
  const $flexContainer = $( '.flex-container' );
  // const $gameBoard = $('#game-board');

  let arrayIdx = 0;
  let imageid  = 0;
  let imageToDisplay = '';

  // add to $flexContainer
  for (let i = 0; i < imageOrder.length; i++) {
    //create an image and add a unique id
    arrayIdx = imageOrder[i];
    // let imageid = `image${arrayIdx}`;
    imageid = arrayIdx;

    // based on game state select front or background
    imageToDisplay = (state === 0) ? imageBack : images[arrayIdx];
    const $image = $( '<img>' )
      .attr("src", imageToDisplay)
      .attr("id", imageid)
      .addClass('image');

    let imageObj = {};
    imageObj.front = images[arrayIdx];
    imageObj.back = imageBack;
    imageObj.id = arrayIdx;

    imageObjects.push($image);


    //add an event listner/handler that toggles the class selected for the card that is clicked
    $image.one('click', flipImage) ;

    // $(image).one('click', () => {
    //   console.log('image ' + $(image));
    // })
    $flexContainer.append( $image );
  }
}

const resetImages = () => {
  selectedImages = [];
}

const flipImage = (event) => {
  let imageId = $(event.currentTarget).attr('id');
  // get the image from the array
  let image = images[imageId];

  // keep track of what images are selected
  selectedImages.push(image);
  console.log(selectedImages);

  // enough selections to check for a match?
  if (selectedImages.length === 2) {
    checkForMatch();
  }

}

const checkForMatch = () => {
  if (selectedImages[0] === selectedImages[1]) {
    alert('matched');
  } else {
    // flip them over; reset selected Images
    selectedImages = [];
  }


}
