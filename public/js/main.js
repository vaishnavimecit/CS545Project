//TAKES INPUT FORM AND PLACES TEXT ON CARD
var input1 = document.querySelectorAll('.form1');
var input2 = document.querySelectorAll('.form2');
var textOnCard = document.getElementById('btn');

//FUNCTION THAT ALLOWS CARD TO ROTATE
var flashcard = document.querySelector('.flashcard');

flashcard.addEventListener('click', function() {
  flashcard.classList.toggle('flip');
});


//TAKE DATA FROM INPUT FIELDS, CONVERT FROM NODE LIST TO ARRAY, HAVE THEM DISPLAYED ON SCREEN ONE AT A TIME


var rightArrow = document.getElementById('rightArrow');
var leftArrow = document.getElementById('leftArrow');



$(textOnCard).on('click', function(){
    var input1 = document.querySelectorAll('.form1');
    var input2 = document.querySelectorAll('.form2');
    var flashcardFront = Array.from(input1);
    var flashcardBack = Array.from(input2);

    var number = 0;



    function cardIndex() {
      var cardIndex = (number + 1) + "/" + flashcardFront.length
      document.getElementById('cardIndex').innerHTML = cardIndex
    };

    cardIndex();

    var deleteInput = document.getElementById('delete-input');

    $('body').on('click', '#delete-input', function(e){
      $(e.target.parentNode.parentNode).remove();
      flashcardFront.slice(e);
      console.log(number)
      var flashcardFront = Array.from(input1);
      
    })

    console.log(flashcardFront);

//VALIDATION FOR EMPTY CARD

    for (var i=0; i < flashcardFront.length; i++){
      if(flashcardFront[i].value === ""){
        alert('You left a field blank!')
      } else {
        document.getElementById('flashcard__front').innerHTML = flashcardFront[number].value;
        document.getElementById('flashcard__back').innerHTML = flashcardBack[number].value;
      }
    }


// RIGHT ARROW FUNTCIONS
    function rightArrowAdd() {
      if (number >= flashcardFront.length -1){
        number = 0
      } else {
        number ++
      }
      console.log(number);

      flashcard.classList.add('fade-out','move-left')
      setTimeout(function() {
        document.getElementById('flashcard__front').innerHTML = flashcardFront[number].value;
        document.getElementById('flashcard__back').innerHTML = flashcardBack[number].value;
        flashcard.classList.remove('fade-out', 'move-left')
      }, 200);




      cardIndex();
    };


      rightArrow.addEventListener('click', rightArrowAdd);
      document.addEventListener('keyup', function(event){
        if (event.keyCode === 39 || event.which === 39) {
          rightArrowAdd();
        }
      });



//LEFT ARROW FUNCTIONS
    function leftArrowAdd() {
      if (number == 0){
        number = flashcardFront.length - 1
      } else {
        number--
      }

      flashcard.classList.add('fade-out','move-right')
      setTimeout(function() {
        document.getElementById('flashcard__front').innerHTML = flashcardFront[number].value;
        document.getElementById('flashcard__back').innerHTML = flashcardBack[number].value;
        flashcard.classList.remove('fade-out', 'move-right')
      }, 200);


      console.log(number);

      cardIndex();
    };

    leftArrow.addEventListener('click', leftArrowAdd);
    document.addEventListener('keyup', function(event){
      if (event.keyCode === 37 || event.which === 37) {
        leftArrowAdd();
      }
    });

});

//CREATES A NEW INPUT FIELD

var inputHtml = '<div class="container mt-5"><div class="row input-box"><div class="col-lg-6 d-flex justify-content-center"><input type="text" placeholder="Enter Question Here..." class="form1 input"></div><div class="col-lg-6 d-flex justify-content-center"><input type="text" placeholder="Enter Answer Here..." class="form2 input"><i class="fas fa-trash icon-delete" id="delete-input"></i></div></div></div>'

var addInputField = document.getElementById('addInputField');
var newInput = document.getElementById('newInput');

addInputField.addEventListener('click', function() {
  newInput.insertAdjacentHTML("beforebegin", inputHtml)
});

//DELETES FIELD
