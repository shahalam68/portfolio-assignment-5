// var https = require('https');

function getItemList() {
    let searchKey = document.getElementById("input-field").value;
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
    fetch(url)
        .then(res => res.json()).then(res => {
            console.log(res.meals);
            updateItemList(res.meals);
        })
        .catch(function () {

        });
}

function updateItemList(data) {
    console.log(data);
    if (data == null) {
        document.getElementById("alert").innerHTML = "No Item Available";
    } else {
        document.getElementById("alert").innerHTML = '';
    }
    var elem = document.getElementById('item-list');
    elem.innerHTML = '';

    data.forEach(element => {
        let e = document.createElement('div');
        e.className = "item";
        e.innerHTML = `  
            <img src="${element.strMealThumb}" alt="">
            <h5>${element.strMeal}</h5>
        `;
        e.addEventListener('click',() => {
           getSingleItem(element.idMeal);

        })
        elem.appendChild(e);
    });
}

function getSingleItem(id) {
   console.log(id);
    var url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json()).then(res => {
            console.log(res);
            itemDetails(res.meals[0]);
        })
        .catch(function () {

        });
}


function itemDetails(data){
    var elem = document.getElementById('item-list');
    elem.innerHTML = '';
    
    elem = document.getElementById('search');
    elem.innerHTML = '';

    document.getElementById("single-item").innerHTML = ` 
    <img src="${data.strMealThumb}" class="img-fluid" alt="Responsive image">
    <h2 >${data.strMeal}</h2>
    <h4>Ingredients</h4>
    <ul id="ind-list" class="fa-ul">

    </ul>
`

     var div = document.getElementById("ind-list");
     for(let i=1;i<=20;i++) {
        let e = document.createElement('li');
        const  txt = data['strIngredient'+i];
        e.innerHTML =  `<span class="fa-li"><i class="fas fa-check-square"></i></span>${txt}`;
        if(txt != '')  div.appendChild(e);
     }

}
