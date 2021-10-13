<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <link rel="stylesheet" href="style.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

  </head>

  <body>

    <div class="page">

      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col">

            <h1 class="text-center">Registration</h1>

            <!-- Error / Success notifications -->
            <div class="gb-notification text-center"></div>
      
            <!-- Registration Form -->
            <form id="gb-form" action="https://vk.com/">
              <div class="form-group">
                <label for="gb-email">Email:</label>
                <input type="email" id="gb-email" class="form-control" name="email" placeholder="Enter your email" required>
              </div>
              <div class="form-group">
                <label for="gb-phone">Phone:</label>
                <input type="tel" id="gb-phone" class="form-control" name="phone" placeholder="Enter your phone number" required>
              </div>
            </form>

            <!-- Get Bonus link -->
            <div class="gb-btn-wrapper text-center"><a href="https://betandyou.com/allgamesentrance"  target="_blank" class="regb bonbtn target_link btn btn-success" id="gb-btn">Получить бонус</a> <span class="bg-loading-icon"></span></div>

            <!-- Object fields from the server response ( JSON fields ) -->
            <div class="gb-obj-fields"></div>

          </div>
          <div class="col"></div>
        </div>
      </div>

    </div>
    
    <script src="scripts.js"></script>

  </body>

</html>






