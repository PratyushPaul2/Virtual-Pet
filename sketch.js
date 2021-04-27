var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFed=database.ref('feedTime');
  lastFed.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDogButton=createButton("Feed the Dog");
  feedDogButton.position(700,95);
  feedDogButton.mousePressed(feedDog());


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val===0){
    foodObj.updateFoodStock(food_stock_val*0);
  }  else{
    foodObj=foodObj-1;
    database.ref('/').update({
      Food:foodS
    })
    dog.addImage(happyDog);
  }

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
