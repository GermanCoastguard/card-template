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
              /* check card-image.parent attribute [aria-locked]
              if true ?false :true
              */

             const isLocked = clickedElement.parentElement.getAttribute("aria-locked");
             const elementsParent = clickedElement.parentElement;
             elementsParent.setAttribute("aria-locked", isLocked === "true" ? "false" : "true");

            //  elementsParent.setAttribute("aria-locked", "true");
            } else {
              // clickedElement.classList.toggle("PR");
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
            // el.classList.toggle("PS", false);
            // el.classList.toggle("PR", true);
            el.setAttribute("aria-mobile", "true")

        })
    }
});


window.addEventListener("resize", () => {
         /* offsetWidth is paired with 
               "parent-of-card-container" containerQuery in
                */
    if(parentOfCardContainer.offsetWidth > parentOfCardContainerOffsetWidth) {
        cardImages.forEach((el) => {
            // el.classList.toggle("PS", true);
            // el.classList.toggle("PR", false);
            el.setAttribute("aria-mobile", "false")
        })
    }
});

window.addEventListener("load", () => {
    if(parentOfCardContainer.offsetWidth < parentOfCardContainerOffsetWidth) {
        cardImages.forEach((el) => {
            el.setAttribute("aria-mobile", "true")
        })
    }
    // else {
    //   el.setAttribute("aria-mobile", "false")
    // }
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
    const grandparentElement = parentElement.parentElement; /* article */
    const grandparentsParentElement = grandparentElement.parentElement; /* card__text-column */
    const grandparentsParentsParentElement = grandparentsParentElement.parentElement;  /* card-container__card */
    const grandparentsParentsParentsParentElement = grandparentsParentsParentElement.parentElement;  /* card-container */
     /*This is a mess and i will fix this later on*/


    // Get the current value of the "aria-expanded" attribute of the parent element
    const isExpanded = parentElement.getAttribute("aria-expanded");
  
    // Toggle the value of the "aria-expanded" attribute of the parent and grandparent elements
    parentElement.setAttribute("aria-expanded", isExpanded === "true" ? "false" : "true");
    grandparentElement.setAttribute("aria-expanded", isExpanded === "true" ? "false" : "true");
    grandparentsParentsParentsParentElement.setAttribute("aria-expanded", isExpanded === "true" ? "false" : "true");
  }

  
  // Add an event listener to each clickable element
  const clickableElements = document.querySelectorAll(".clickable");
  clickableElements.forEach((element) => {
    element.addEventListener("click", toggleAriaExpanded);
  });

/* Fixing the delay Issue 
  card__image-column aria-expanded from false to true delay
  for any reason it is delayed
*/
  function toggleImageColumnAriaExpanded(clickedElement) {
    /* targeting the closest .card-container__card element > .card__image-column */
    const cardImageColumn = clickedElement.closest('.card-container__card').querySelector('.card__image-column');
    const isExpanded = cardImageColumn.getAttribute('aria-expanded') === 'true';
    cardImageColumn.setAttribute('aria-expanded', !isExpanded);
  }

  cardParagraphExpander.forEach((el) => {
    el.addEventListener("click", (event) => {
      const clickedElement = event.target;
      const elementsParent = clickedElement.parentElement;
      if (elementsParent.getAttribute("aria-expanded") === "false") {
        toggleImageColumnAriaExpanded(clickedElement);
       } else {
            setTimeout(() => {
                toggleImageColumnAriaExpanded(clickedElement);
              }, depandParagraphDuration);
        }
    });
  });



  
/* Observer Section */

  const cardImageColumn = document.querySelector('.card__image-column');
  const rem = 16;
  const cardButtonHeight = 2.5;
  const cardImageColumnHeight = cardImageColumn.offsetHeight + (rem *  cardButtonHeight);
  const cardContainerList = document.querySelectorAll(".card-container");
  const cardImageColumnList = document.querySelectorAll(".card__image-column");
  const globalContainer = document.querySelector(".parent-of-card-container");

  const cardObserverOptions = {
    root: null,
    // root: globalContainer,
    threshold: 0.1,
    rootMargin: "800px 0px 0px 0px",

  }

  /* Version 1  */

  // const cardObserver = new IntersectionObserver(function(entries, options) {
  //   entries.forEach(entry => {
  //     const firstElement = cardContainerList[0];
  //     const previousElement = entry.target.previousElementSibling;
  //     //  check if the first Element is intersected
  //     if(entry.isIntersecting && entry === firstElement) {
  //     return;
  //     }

  //     // if it is not the first Element , toggle aria-hidden to make the .card__image-column-btn--container[line 403 in card.css]  disappear(sorry for the trashy bem using , still learning)
  //     else if(entry.isIntersecting) {
  //       previousElement.setAttribute("aria-hidden", "true");
  //     }
            
  //     if(!entry.isIntersecting) {
  //       previousElement.setAttribute("aria-hidden", "false");
  //     }
  //   })
  // })


  /* Version 2 , modified by chatGPT */
  const cardObserver = new IntersectionObserver(function(entries, options) {
    entries.forEach(entry => {
      const firstElement = cardContainerList[0];
      const previousElement = entry.target.previousElementSibling;
      // Check if the first element is intersected
      if (entry.isIntersecting && entry === firstElement) {
        return;
      }
      // Set aria-hidden attribute based on intersection status
      const ariaHidden = entry.isIntersecting ? "true" : "false";
  
      // Set aria-hidden attribute on previous element
      if (previousElement) {
        previousElement.setAttribute("aria-hidden", !entry.isIntersecting ? "false" : ariaHidden);
      }
    })
  })


  cardContainerList.forEach(card => {
    cardObserver.observe(card, cardObserverOptions);
  })

