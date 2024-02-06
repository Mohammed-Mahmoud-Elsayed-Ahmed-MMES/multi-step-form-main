const perInfo = document.querySelector('.one');
const selectPlan = document.querySelector('.two');
const addOns = document.querySelector('.three');
const summary = document.querySelector('.four');


// Moving between pages
perInfo.addEventListener('click', () => {
    window.location.href = '../index.html';
    perInfo.style.backgroundColor = 'var(--LightBlue)';  
    perInfo.style.color = 'black';  
});
selectPlan.addEventListener('click', () => {
    window.location.href = '../other pages/selectPlan.html';
    selectPlan.style.backgroundColor = 'var(--LightBlue)'; 
    selectPlan.style.color = 'black'; 
});
addOns.addEventListener('click', () => {
    window.location.href = '../other pages/addOne.html';
    addOns.style.backgroundColor = 'var(--LightBlue)';
    addOns.style.color = 'black';  
});
summary.addEventListener('click', () => {
    window.location.href = '../other pages/finishingUp.html';
    summary.style.backgroundColor = 'var(--LightBlue)'; 
    summary.style.color = 'black'; 
});

        // The code below is amazing because of 1- the way we use querySelectorAll with elements that is not array
        // And 2- the way of definning this variable checkbox because the change happens thanks to the input ((type:checkbox))
        // And 3- the addEventListener"change" and the way we used it with the input of ((type:checkbox))

        const month = document.querySelector('#one');
        const year = document.querySelector('#two');
        const checkbox = document.querySelector(".switch input");
        const price1 = document.querySelector(".boxes .o1 span");
        const price2 = document.querySelector(".boxes .t2 span");
        const price3 = document.querySelector(".boxes .th3 span");
        const smallText = document.querySelectorAll("#small");
        const boxOfPlans = document.querySelectorAll(".selectPlan .box");

        const addOnsSpan1 = document.querySelector(".addOns .rectangles #addOnsSpan1");
        const addOnsSpan2 = document.querySelector(".addOns .rectangles #addOnsSpan2");
        const addOnsSpan3 = document.querySelector(".addOns .rectangles #addOnsSpan3");

        const finishingUpH4 = document.querySelector(".finishingUp h4");
        const finishingUpSpan1 = document.querySelector(".finishingUp .first");
        const finishingUpSpan2 = document.querySelector(".finishingUp .second");
        const finishingUpSpan3 = document.querySelector(".finishingUp .third");

        // Check if there is a saved state in session storage
        const savedState = sessionStorage.getItem('checkboxState');
        if (savedState === "checked") {
            checkbox.checked = true;
            
            month.style.color = "var(--CoolGray)";
            year.style.color = "var(--MarineBlue)"; 

            boxOfPlans.forEach((element) => {
                element.style.paddingBottom = "15px";
            });

            smallText.forEach((element) => {
                element.style.visibility = "visible";
            });

            price1.innerHTML = "$90/yr";
            price2.innerHTML = "$120/yr";
            price3.innerHTML = "$150/yr";
            
        }

        // Add an event listener to the checkbox
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                month.style.color = "var(--CoolGray)";
                year.style.color = "var(--MarineBlue)"; 

                boxOfPlans.forEach((element) => {
                    element.style.paddingBottom = "15px";
                });

                smallText.forEach((element) => {
                    element.style.visibility = "visible";
                });

                price1.innerHTML = "$90/yr";
                price2.innerHTML = "$120/yr";
                price3.innerHTML = "$150/yr";

                // Save the state in session storage
                sessionStorage.setItem('checkboxState', 'checked');
            } else {
                month.style.color = "var(--MarineBlue)";
                year.style.color = "var(--CoolGray)";

                boxOfPlans.forEach((element) => {
                    element.style.paddingBottom = "0";
                });

                smallText.forEach((element) => {
                    element.style.visibility = "hidden";
                });

                price1.innerHTML = "$9/mo";
                price2.innerHTML = "$12/mo";
                price3.innerHTML = "$15/mo";

                // Remove the state from session storage
                sessionStorage.removeItem('checkboxState');
            }
            // Send message to the other HTML file
            const messageToFinish = {
                finishingUpH4Update: checkbox.checked
            };
            window.postMessage(messageToFinish, "../other pages/finishingUp.html");

            const message = {
                addOnsUpdate: checkbox.checked
            };
            window.postMessage(message, "../other pages/addOne.html");
        });

        


// Get all the box elements
        const boxes = document.querySelectorAll('.box');

        // Check if there is an activated box in local storage
        const activatedBox = sessionStorage.getItem('activatedBoxe');
        if (activatedBox) {
            // Remove the active class from all boxes
            boxes.forEach(box => box.classList.remove('activatedBox'));

            // Add the active class to the saved activated box
            document.querySelector(activatedBox).classList.add('activatedBox');
        }

        // Add event listener to each box
        boxes.forEach(box => {
            box.addEventListener('click', () => {
                // Remove the active class from all boxes
                boxes.forEach(b => b.classList.remove('activatedBox'));

                // Add the active class to the clicked box
                box.classList.add('activatedBox');

                // Save the activated box in local storage
                sessionStorage.setItem('activatedBoxe', `.${box.classList[1]}`);
            });
        });

        window.onmessage("message", function(event) {
            const message = event.data;
            if (message.messageToFinish) {
                finishingUpH4.innerHTML = "Yearly";
            }
        });
        

        window.addEventListener("message", function(event) {
            const message = event.data;
            if (message.addOnsUpdate) {
                const addOnsSpan1 = document.querySelector(".addOns .rectangles #addOnsSpan1");
                const addOnsSpan2 = document.querySelector(".addOns .rectangles #addOnsSpan2");
                const addOnsSpan3 = document.querySelector(".addOns .rectangles #addOnsSpan3");

                addOnsSpan1.innerHTML = "+$10/yr";
                addOnsSpan2.innerHTML = "+$20/yr";
                addOnsSpan3.innerHTML = "+$20/yr";
            }
        });
// function newAddOnsSpan(){
// 	addOnsSpan1.innerHTML = "+$10/yr";
//     addOnsSpan2.innerHTML = "+$20/yr";
//     addOnsSpan3.innerHTML = "+$20/yr";
// }

// if(month.style.color === "var(--CoolGray)" && year.style.color === "var(--MarineBlue)") {
// 	addOnsSpan1.innerHTML = "+$10/yr";
//     addOnsSpan2.innerHTML = "+$20/yr";
//     addOnsSpan3.innerHTML = "+$20/yr";
// }


