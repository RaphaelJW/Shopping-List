
//Submit when pressing 'Enter'
/*
var input = document.getElementById("NewItem");
input.addEventListener("keyup", (event) => {
        var code = event.code;
        if (code === 13) {
            console.log('Enter')
            document.getElementById("AddBtn").click();
        }
    })
*/
const PostItemUrl = "http://localhost:3000/shoppinglist/items"

//Adding a new item to the shoppinglist
function AddNewItem(){
    var Item = document.getElementById("item").value;
    var Amount = document.getElementById("amount").value;
    if(!Item){return;}
    var NewItem = document.createElement("li");
    var itemelement = document.createElement("strong");
    var amountelement = document.createElement("em");
    var deletebutton = document.createElement("button")
    itemelement.innerHTML = `${Item}: `;
    amountelement.innerText = `${Amount}x`;
    NewItem.appendChild(itemelement);
    NewItem.appendChild(amountelement);
    NewItem.appendChild(deletebutton)
    document.getElementById("list").appendChild(NewItem);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", PostItemUrl);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4)
        {
            console.log(JSON.parse(xhr.responseText));
        }
    }

    var data = JSON.stringify({
        item: Item,
        amount: Amount
    });
    xhr.send(data);

    /*
    Shoppinglist.push(NewItem);
    console.log(Shoppinglist);
    var ShoppinglistElement = document.getElementById("list");
    ShoppinglistElement.innerHTML = "";
    Shoppinglist.forEach(element => {
        var node = document.createElement("li");
        node.innerHTML = element;
        ShoppinglistElement.appendChild(node);
    });
    document.getElementById("NewItem").value = '';
    
    var ListString = JSON.stringify(Shoppinglist)
    localStorage.setItem("storedlist", ListString)
    */
}
