// console.log($);

$(() => {
  $( '.flex-container' ).on('click', () => {
    console.log('clicked image');
  });

  addImages();
})

// container for image objects
let imageObjects = [];

// image object; contains properties of images added to game board
let image = {
  front: '',
  back: '',
  id: ''
};

let selectedImages = [];

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
const createBoard = () => {

};

const createImageOrder = () => {
  let index = 0;
  let filled = false;

  while (!filled) {
    // for (let i = 0; i < images.length; i++) {
    index = Math.floor(Math.random() * (images.length - 0 + 1));
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

const addImages = () => {
  createImageOrder();

  //select container to add images
  const $flexContainer = $( '.flex-container' );
  // const $gameBoard = $('#game-board');

  // add to $flexContainer
  for (let i = 0; i < imageOrder.length; i++) {
    //create an image and add a unique id
    let arrayIdx = imageOrder[i];
    let imageid = `image${arrayIdx}`;
    // console.log('id: ' + imageid);

    const $image = $( '<img>' );
    $image.attr("src", images[arrayIdx]);
    $image.attr("id", imageid);
    $image.addClass('image');
    //add an event listner/handler that toggles the class selected for the card that is clicked

    $flexContainer.append( $image );
    // $gameBoard.append( $image );
  }
}

const createImageArray = () => {

}

const flipImage = () => {

}

const checkForMatch = () => {

}
