
//Submit when pressing 'Enter'



//constants
const baseUrl = window.location.origin
const PostItemUrl = baseUrl + "/shoppinglist/items/"
const ItemUrl = baseUrl + "/shoppinglist/item/"

//on page load:

//attach eventlisteners:
//shoppinglist item event listeners
document.getElementById("list").childNodes.forEach(shoppinglistNode => {
    shoppinglistNode.addEventListener("click", expandItem);
    shoppinglistNode.firstChild.addEventListener("change", CheckItem);
    shoppinglistNode.lastChild.addEventListener("click", DeleteItem);
});

//AddItem event
document.getElementById("AddBtn").addEventListener("click", AddNewItem);

//TODO show more info when clicking on item
function expandItem()
{
    console.log(this.getAttribute("shoppingitem-id"));
}

//Event when deleting item
function DeleteItem()
{
    var id = this.parentElement.getAttribute("shoppingitem-id");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", ItemUrl + id)
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if(response.succes)
            {
                console.log("succesfully deleted");
            }
        }
    }
    xhr.send()
    this.parentElement.remove()
    
}

//Event when shopping-status changes
function CheckItem()
{
    var id = this.parentElement.getAttribute("shoppingitem-id")
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", ItemUrl + id);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4)
        {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if(response.succes)
            {
                console.log("succesfully changed status");
            }
        }
    }
    var data = JSON.stringify({
        shoppingstatus: this.checked
    });
    xhr.send(data);
}

//Adding a new item to the shoppinglist
function AddNewItem(){

    var Item = document.getElementById("item").value;
    var Amount = document.getElementById("amount").value;
    if(!Item){return;}

    var NewItem = document.createElement("li");
    var itemelement = document.createElement("strong");
    var amountelement = document.createElement("em");
    var checkboxelement = document.createElement("input");
    var deleteelement = document.createElement("input");


    itemelement.innerHTML = ` ${Item}: `;
    amountelement.innerText = `${Amount}x `;

  
    checkboxelement.type = "checkbox";
    checkboxelement.addEventListener("change", CheckItem);

    deleteelement.type = "button";
    deleteelement.addEventListener("click", DeleteItem)
    deleteelement.className = "deletebutton"
    deleteelement.value = "Delete"

    NewItem.appendChild(checkboxelement);
    NewItem.appendChild(itemelement);
    NewItem.appendChild(amountelement);
    NewItem.appendChild(deleteelement)
    document.getElementById("list").appendChild(NewItem);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", PostItemUrl);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4)
        {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if(response.succes)
            {
                NewItem.setAttribute("shoppingitem-id", response.id);
            }
        }
    }

    var data = JSON.stringify({
        name: Item,
        count: Amount
    });
    xhr.send(data);

    var emptylist = document.getElementById("emptylist")
    if (emptylist){
        emptylist.parentNode.removeChild(emptylist)
    }

    document.getElementById("item").value = '';
    document.getElementById("amount").value = '';


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
