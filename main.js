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
// let api = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=pizza`

let article = document.querySelector(".article")
const apiKey = '1'
let button = document.getElementById('button')
let next= document.querySelector(".article")


button.addEventListener("click",()=>{
  next.style.display = 'block';
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
         let content = document.createElement("p");
         let iframe = document.createElement("iframe");
         let ingredient_list = document.createElement("ul");
         
         image.src = meal.strMealThumb;
         image.classList.add("img-style")

         //Looping through ingredeint to display in li form//
         ingredient_list = document.createElement("h2");
         ingredient_list.classList.add("ingredient_heading");
         ingredient_list.textContent = "Ingredeint you Will Need:";
         
         let  ingredient_found = true;
         for (i=1; i<=20; i++){
           let ingredient = meal[`strIngredient${i}`];
           console.log(ingredient)
           if(ingredient){
            let ingredientItem = document.createElement("li");
            ingredientItem.textContent = ingredient;
            ingredientItem.classList.add("list")
            ingredient_list.classList.add("ingredient_list")
            ingredient_list.appendChild(ingredientItem);
           } else if(!ingredient_found){
            let noIngredient = document.createElement('h2');
            noIngredient.textContent = "No Ingredients Found";
            ingredient_list.appendChild(noIngredient);
           }
        }
        
        

         heading.textContent = meal.strMeal;
         content.textContent = meal.strInstructions;
         content.classList.add("content-class");
       
        
         iframe.src = meal.strYoutube;
         iframe.src = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`;
         iframe.classList.add("iframe")


         article.appendChild(heading);
         article.appendChild(image);
         article.appendChild(ingredient_list); 
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

