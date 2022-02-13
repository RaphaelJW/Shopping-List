
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


//Adding a new item to the shoppinglist
function AddNewItem(){
    var Item = document.getElementById("item").value;
    var Amount = document.getElementById("amount").value;
    if(!Item){return;}
    var NewItem = document.createElement("li")
    var itemelement = document.createElement("strong")
    var amountelement = document.createElement("em")
    itemelement.innerHTML = `${Item}: `
    amountelement.innerText = `${Amount}x`
    NewItem.appendChild(itemelement)
    NewItem.appendChild(amountelement)
    document.getElementById("list").appendChild(NewItem)
    console.log(typeof Amount)
    console.log(amountelement)
    

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
