const baseUrl = window.location.origin
const PostItemUrl = baseUrl + "/shoppinglist/items/"
const ItemUrl = baseUrl + "/shoppinglist/item/"
const userid = document.getElementById("userid").getAttribute("user-id")

//Add eventlistener to add button
document.getElementById("AddBtn").addEventListener("click", AddNewItem)

//Add eventlisteners to the items
document.getElementById("list").childNodes.forEach(shoppinglistNode => {
    //shoppinglistNode.firstChild.addEventListener("change", CheckItem);
    shoppinglistNode.lastChild.addEventListener("click", DeleteItem);
});

//adding an item to the list
function AddNewItem(){

    var Item = document.getElementById("item").value;
    var Amount = document.getElementById("amount").value;
    if(!Item){return;}
    if(!Amount){Amount=1;}

    //aanmaken van pagina elementen
    var NewItem = document.createElement("li");
    var itemelement = document.createElement("strong");
    var amountelement = document.createElement("em");
    var checkboxelement = document.createElement("input");
    var deleteelement = document.createElement("input");


    itemelement.innerHTML = ` ${Item}: `;
    amountelement.innerText = `${Amount}x `;

  
    checkboxelement.type = "checkbox";
    //checkboxelement.addEventListener("change", CheckItem);

    deleteelement.type = "button";
    deleteelement.addEventListener("click", DeleteItem)
    deleteelement.className = "deletebutton"
    deleteelement.value = "Delete"

    NewItem.appendChild(checkboxelement);
    NewItem.appendChild(itemelement);
    NewItem.appendChild(amountelement);
    NewItem.appendChild(deleteelement)
    document.getElementById("list").appendChild(NewItem);

    //Toevoegen aan database
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
        count: Amount,
        user: userid
    });
    xhr.send(data);

    var emptylist = document.getElementById("emptylist")
    if (emptylist){
        emptylist.parentNode.removeChild(emptylist)
    }

    document.getElementById("item").value = '';
    document.getElementById("amount").value = '';
}

//Delete item
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
    
    
    if(!document.getElementById('list').firstChild){
        emptylistelement = document.createElement('li');
        emptylistelement.id = 'emptylist'
        emptylistelement.innerText = 'Er staan geen items op uw lijstje'

        document.getElementById('list').appendChild(emptylistelement)
    }
}