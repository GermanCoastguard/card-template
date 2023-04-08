const parentOfCardContainerOffsetWidth = 800;
const depandParagraphDuration = 500;

    function togglePRandPSClass(cardImages) {
        cardImages.forEach((el) => {
          el.addEventListener("click", (event) => {
            const clickedElement = event.target;
            const isCardImage = clickedElement.classList.contains("card-image");
      
                /* offsetWidth is paired with 
               "parent-of-card-container" containerQuery
                */
            if(parentOfCardContainer.offsetWidth > parentOfCardContainerOffsetWidth) {
                return;
            }
            else 
            // If clicked element is the "card-image" element, toggle the classList of its parent
            if (isCardImage) {
              clickedElement.parentElement.classList.toggle("PR");
              clickedElement.parentElement.classList.toggle("PS");
            } else {
              clickedElement.classList.toggle("PR");
              clickedElement.classList.toggle("PS");
            }
          });
        });
      }
      const cardImages = document.querySelectorAll(".card__image-column");
togglePRandPSClass(cardImages);



const parentOfCardContainer = document.querySelector(".parent-of-card-container");
// const cardContainer = document.querySelector(".card-container");

window.addEventListener("resize", () => {
         /* offsetWidth is paired with 
               "parent-of-card-container" containerQuery
                */
    if(parentOfCardContainer.offsetWidth < parentOfCardContainerOffsetWidth) {
        cardImages.forEach((el) => {
            el.classList.toggle("PS", false);
            el.classList.toggle("PR", true);
        })
    }
});


window.addEventListener("resize", () => {
         /* offsetWidth is paired with 
               "parent-of-card-container" containerQuery in
                */
    if(parentOfCardContainer.offsetWidth > parentOfCardContainerOffsetWidth) {
        cardImages.forEach((el) => {
            el.classList.toggle("PS", true);
            el.classList.toggle("PR", false);
        })
    }
});

window.addEventListener("load", () => {
    if(parentOfCardContainer.offsetWidth < parentOfCardContainerOffsetWidth) {
        cardImages.forEach((el) => {
            el.classList.toggle("PS", false);
            el.classList.toggle("PR", true);
        })
    }
});




const cardParagraphExpander = document.querySelectorAll(".card-paragraph__expander");

cardParagraphExpander.forEach((el) => {
    el.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const elementsParent = clickedElement.parentElement;
      if (elementsParent.getAttribute("aria-expanded") === "true") {
        scrollToCardTop(clickedElement);
        setTimeout(() => {
            toggleAriaExpanded(event);
        }, depandParagraphDuration);
      } else {
        toggleAriaExpanded(event);
      }
    });
  });

function toggleAriaExpanded(event) {
    // Get the clicked element
    const clickedElement = event.target;
  
    // Get the parent and grandparent elements
    const parentElement = clickedElement.parentElement;
    const grandparentElement = parentElement.parentElement;
  
    // Get the current value of the "aria-expanded" attribute of the parent element
    const parentAriaExpanded = parentElement.getAttribute("aria-expanded");
  
    // Toggle the value of the "aria-expanded" attribute of the parent and grandparent elements
    parentElement.setAttribute("aria-expanded", parentAriaExpanded === "true" ? "false" : "true");
    grandparentElement.setAttribute("aria-expanded", parentAriaExpanded === "true" ? "false" : "true");
  }
  
  // Add an event listener to each clickable element
  const clickableElements = document.querySelectorAll(".clickable");
  clickableElements.forEach((element) => {
    element.addEventListener("click", toggleAriaExpanded);
  });

