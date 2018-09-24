// console.log($);

$(() => {
  const $flexContainer =  $( '.flex-container' );
  console.log($flexContainer);

  $flexContainer.on('click', () => {
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
                      './img/owl_burrowing.jpg'];

// retains order of image ids in the display createImageArray
let imageOrder = [];

const createImages = () => {

};

const addImages = () => {
  //select container to add images
  const $flexContainer = $( '.flex-container' );
  // const $gameBoard = $('#game-board');

  // add to $flexContainer
  for (let i = 0; i < images.length; i++) {
    //create an image and add a unique id
    let imageid = `image${i}`;
    // console.log('id: ' + imageid);

    const $image = $( '<img>' );
    $image.attr("src", images[i]);
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
