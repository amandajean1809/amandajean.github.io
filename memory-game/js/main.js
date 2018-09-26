
$(() => {
  $('#start').on('click', () => {

  });

  $('#reset').on('click', resetImages);

  createImageArray();
})

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
    imageid = imageOrder[i];
    // let imageid = `image${arrayIdx}`;
    // imageid = arrayIdx;

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

    $section.append($cardDiv);
    $cardDiv.append($front);
    $cardDiv.append($back);
    // create inner div
    // const $cardDiv = $('<div>')
    //   .addClass('card')
    //   .attr("id", imageid)
    //   .on('click', flipImage);
    //
    // // create 'front' div
    // const $frontDiv = $('<div>')
    //   .addClass('front');
    //
    // const $front = $( '<img>' )
    //   .attr("src", imageBack);
    //
    // // create 'back' div
    // const $backDiv = $('<div>')
    //   .addClass('back');
    //
    // const $back = $( '<img>' )
    //   .attr("src", images[arrayIdx]);
    //
    // $section.append($cardDiv);
    // $cardDiv.append($frontDiv);
    // $cardDiv.append($backDiv);
    // $backDiv.append($back);
    // $frontDiv.append($front);

    $flexContainer.append( $section );
  }
}

const resetImages = () => {
  selectedImages = [];
}

const flipImage = (event) => {
  let $target = $(event.currentTarget);
  let $cardChildren = $( event.currentTarget).children();
  let $front = $( event.currentTarget).children('div:first');
  // let $card = ($('.card')).getParent();
  // console.log($card);
  $target.toggleClass('flipped');
  // $target.attr("backface-visibility", "hidden");
  // console.log($(event.target));
  // console.log($(event.currentTarget));
  // // get the image from the array
  // let image = images[imageId];
  //
  // // keep track of what images are selected
  // selectedImages.push(image);
  // console.log(selectedImages);
  //
  // // enough selections to check for a match?
  // if (selectedImages.length === 2) {
  //   checkForMatch();
  // }
  event.preventDefault();
}

const checkForMatch = () => {
  if (selectedImages[0] === selectedImages[1]) {
    alert('matched');
  } else {
    // flip them over; reset selected Images
    selectedImages = [];
  }

  // create 'container div'
  // const $flipBoxDiv = $('<div>')
  //   .addClass('flip-box');
  //
  // // create inner div
  // const $flipBoxInnerDiv = $('<div>')
  //   .addClass('flip-box-inner')
  //   .on('click', flipImage);
  //
  // // $flipBoxDiv.append($flipBoxInnerDiv);
  //
  // // create 'front' div
  // const $flipBoxFrontDiv = $('<div>')
  //   .addClass('flip-box-front');
  //
  // // $flipBoxInnerDiv.append($flipBoxFrontDiv);
  //
  // const $imagefront = $( '<img>' )
  //   .attr("src", images[arrayIdx])
  //   .attr("id", imageid);
  //
  // // $flipBoxFrontDiv.append($imagefront);
  //
  // // create 'back' div
  // const $flipBoxBackDiv = $('<div>')
  //   .addClass('flip-box-back');
  //
  // const $imageback = $( '<img>' )
  //   .attr("src", imageBack)
  //   .attr("id", imageid);
  //
  // $flipBoxFrontDiv.append($imagefront);
  // $flipBoxBackDiv.append($imageback);
  // $flipBoxInnerDiv.append($flipBoxFrontDiv);
  // $flipBoxInnerDiv.append($flipBoxBackDiv);
  // $flipBoxDiv.append($flipBoxInnerDiv);

}
