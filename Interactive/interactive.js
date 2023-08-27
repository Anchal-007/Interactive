$(document).ready(function() {
  let totalSquares = 0;

  // Function to calculate area of the figure
  function calculateArea() {
    return totalSquares;
  }

  // Function to calculate perimeter of the figure
  function calculatePerimeter() {
    return totalSquares * 4;
  }

  // Get parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const expectedArea = parseInt(urlParams.get("area"));
  const expectedPerimeter = parseInt(urlParams.get("perimeter"));

  $(".square").draggable({
    helper: "clone",
    snap: ".smallgrid",
    snapMode: "inner",
    snapTolerance: 30
  });
  
  $(".smallgrid").droppable({
    drop: function(event, ui) {
      const droppedSquare = ui.helper.clone();
      $(this).append(droppedSquare);
      droppedSquare.draggable({
        snap: ".smallgrid",
        snapMode: "inner",
        snapTolerance: 30
      });
      totalSquares++;
      updateInfo();
    }
  });

  $(".reset-button").click(function() {
    $(".smallgrid").empty();
    totalSquares = 0;
    updateInfo();
  });

  $(".submit-button").click(function() {
    if (expectedArea && expectedPerimeter) {
      checkConditions(expectedArea, expectedPerimeter);
    } else if (expectedArea) {
      checkAreaCondition(expectedArea);
    } else if (expectedPerimeter) {
      checkPerimeterCondition(expectedPerimeter);
    }
  });

  function updateInfo() {
    const area = calculateArea();
    const perimeter = calculatePerimeter();

    $(".info .total-squares").text(`Total Squares: ${totalSquares}`);
    $(".info .area").text(`Area: ${area}`);
    $(".info .perimeter").text(`Perimeter: ${perimeter}`);

    // updateSideLengths();
  }

  // function updateSideLengths() {
  //   $(".grid .square").each(function(index) {
  //     $(this).text(`Side: ${index + 1}`);
  //   });
    
  // }

  function checkConditions(area, perimeter) {
    const calculatedArea = calculateArea();
    const calculatedPerimeter = calculatePerimeter();

    if (calculatedArea === area && calculatedPerimeter === perimeter) {
      showMessage("Correct Answer");
    } else {
      showMessage("Try Again");
    }
  }

  function checkAreaCondition(area) {
    const calculatedArea = calculateArea();

    if (calculatedArea === area) {
      showMessage("Correct Answer");
    } else {
      showMessage("Try Again");
    }
  }

  function checkPerimeterCondition(perimeter) {
    const calculatedPerimeter = calculatePerimeter();

    if (calculatedPerimeter === perimeter) {
      showMessage("Correct Answer");
    } else {
      showMessage("Try Again");
    }
  }

  function showMessage(message) {
    alert(message);
  }

  updateInfo();
});
