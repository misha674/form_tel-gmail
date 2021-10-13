$( document ).ready(function() {

  var $gbForm = $('#gb-form'), // get form
      $bonusBtn = $('#gb-btn'),  // get bonus link
      $bgLoadingIcon = $('.bg-loading-icon'), // get loading icon
      $gbNotification = $('.gb-notification'), // get notifigations tag
      $gbObjEntries = $('.gb-obj-fields'); // get object fields on success

  // flag ( prevent multiple requests )
  var requestIsFinished = true;

  // prevent form from submit
  $gbForm.submit(function(e) {
    e.preventDefault(e);
  });


  function userRegistration() {

    // change flag to false
    requestIsFinished = false;

    /*
    Метод .serialize() возвращает строку пригодную для передачи через URL строку. 
    Данные могут собираться с многих объектов jQuery, 
    включая <input>, <textarea>, и <select>: $( "input, textarea, select" ).serialize();
    */
    $gbForm.serialize();

    // get form fields
    var $gbEmailVal = $('#gb-email').val(),
        $gbPhoneVal = $('#gb-phone').val();

    // return Promise
    return new Promise((resolve, reject) => {

      $.ajax({
        method: "POST",
        url: "registration-form-handler.php",
        data: {
          // pass some data to the wrap.php file
          email: $gbEmailVal,
          phone: $gbPhoneVal
        },
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        },
      })

    })

  }


  // when data recieved from the server
  function userRegistrationDataRecieved(data) {

    var obj = JSON.parse( data );

    console.log( obj );

    // - Possible obj fields ( answers from the server ):
    // obj.message
    // obj.login
    // obj.password
    // obj.success
    // obj.deposit
    // obj.main

    // on registration success
    if ( obj.success == true ) {

      // show success message
      $gbNotification.text( 'Registration Success!' );



    // on registration error
    } else {

      // show error message
      $gbNotification.text( 'Registration Error!' );

      // clear $gbObjEntries field before populating
      $gbObjEntries.text('');
      // Populate $gbObjEntries field
      Object.entries(obj).forEach(([key, value]) => $gbObjEntries.append(`<p><em>${key}: </em>${value}</p>`));

    }

  }


  // when data doesn't recieved from the server
  function userRegistrationDataError(error) {

    console.log( error );

    // show error message
    $gbNotification.text( 'Server Error' );
  }

  // on get bonus button click
  $bonusBtn.on('click', function(e){

    // remove default behavior ( disable normal link action to do some necessary stuff )
    e.preventDefault();

    // add active class to the loading icon ( ajax call begins )
    $bgLoadingIcon.addClass('active');

    // continue only if requestIsFinished is set to true
    if ( requestIsFinished === true ) {

      // run userRegistration() function
      userRegistration()
      .then((data) => {
        // do something else on success
        userRegistrationDataRecieved(data);

        // remove active class from the loading icon ( ajax call ended )
        $bgLoadingIcon.removeClass('active');

        // set flag back to true
        requestIsFinished = true;

      })
      .catch((error) => {
        // do something else on error
        userRegistrationDataError(error);

        // remove active class from the loading icon ( ajax call ended )
        $bgLoadingIcon.removeClass('active');

        // set flag back to true
        requestIsFinished = true;

      })

    }

  });

}); // on document ready




