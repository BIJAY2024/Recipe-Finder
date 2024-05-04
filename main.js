// Search meal by name
// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// List all meals by first letter
// www.themealdb.com/api/json/v1/1/search.php?f=a

// Lookup full meal details by id
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Lookup a single random meal
// www.themealdb.com/api/json/v1/1/random.php

// Lookup a selection of 10 random meals (only available to Paypal supporters)
// www.themealdb.com/api/json/v1/1/randomselection.php

// List all meal categories
// www.themealdb.com/api/json/v1/1/categories.php
let article = document.querySelector(".article")
const apiKey = '1'
// let api = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=pizza`
let button = document.getElementById('button')


button.addEventListener("click",()=>{
  var text = document.getElementById("search").value.toLowerCase()
  console.log(text);

 if (text!== ''){
  let api = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${text}`

  fetch(api)
  .then((response)=>{
    return response.json()
  }).then((data)=>{
      if (!data.meals) {
          throw new Error("Please input another Meal");
        }
    
        else{
         let meal = data.meals[0];
         alert("Successful in finding the data");
         console.log(meal);
  
         article.innerHTML = " ";
  
         let heading = document.createElement("h1");
         let image = document.createElement("img");
         let content = document.createElement("p")
         let iframe = document.createElement("iframe")
         
         image.src = meal.strMealThumb;
         image.style.width ="40%";


         heading.textContent = meal.strMeal;
         content.textContent = meal.strInstructions;

         iframe.src = meal.strYoutube;
         iframe.src = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`;

         iframe.width = "560";
         iframe.height = "560";
         iframe.allowFullscreen = true;

         article.appendChild(heading);
         article.appendChild(image);
         article.appendChild(content);
         article.appendChild(iframe);
         console.log(meal.strMeal);
        } 
        article.classList.add("title")
      })
  .catch((error)=>{
      alert('error finding the meal:'+ error.message);
  })
 
 }
})

