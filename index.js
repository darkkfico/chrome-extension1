const inputEl = document.getElementById("input-el")
const saveBtnEl = document.getElementById("save-btn")
const saveTabEl = document.getElementById("tab-btn")
const deleteBtnEl = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const deleteOneEL = document.getElementById("delete-one")
const hiddenInputEl = document.getElementById("hidden-input")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listITems = ""
    for(let i = 0; i < leads.length; i++){
        listITems +=
        `
        <li>
            <a target="_blank" href="${leads[i]}">
            ${leads[i]}
            </a>
        </li>

        `
    }
    ulEl.innerHTML = listITems
}

saveBtnEl.addEventListener("click" , function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    render(myLeads)
})

deleteBtnEl.addEventListener("dblclick" , function(){
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

saveTabEl.addEventListener("click" , function(){
    chrome.tabs.query({active: true, currentWindow: true} , function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteOneEL.addEventListener("click", function() {
    hiddenInputEl.style.display = "block";
})
hiddenInputEl.addEventListener("input" , function(){
    const leadToDelete = hiddenInputEl.value.trim();

    // Check if the lead exists in the list
    const index = myLeads.indexOf(leadToDelete);
    if (index !== -1) {
        myLeads.splice(index, 1); // Remove the lead
        localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Update local storage
        render(myLeads); // Re-render the list
    } else {
        alert("URL not found in the list.");
    }

    // Clear the input and hide it again
    hiddenInputEl.value = "";
    hiddenInputEl.style.display = "none";
})



