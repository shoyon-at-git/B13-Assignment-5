// console.log("inside issue tracker page!!");
const issueCardContainer = document.getElementById("issue-card-container");
let all =[];
let filteredOpen = [];
let filteredClosed = []; 

const createSpans = (arr) =>{
    const htmlEl = arr.map(el => `<span class="bg-orange-300/90 px-1 border text-xs rounded-3xl">${el.toUpperCase()}</span>`);
    return htmlEl.join(" ");
};

const showSpinner = () => {
    document.getElementById("spinner").classList.remove("hidden");
};

const hideSpinner = () => {
    document.getElementById("spinner").classList.add("hidden");
};

const updateCount = (arr) =>{
    const updatedCount = arr.length;
    let count = document.getElementById("count");
    // console.log(count);
    // console.log(updatedCount);
    count.textContent = updatedCount;
};


const loadAll = async() =>{
    showSpinner();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch(url);
    const json = await res.json();
    all = json.data;
    // console.log(all);
    displayAll(json.data);
    updateCount(json.data);
    hideSpinner();
};

const displayAll = (infoArr) =>{
    issueCardContainer.innerHTML = "";
    infoArr.forEach(element => {
        // console.log(element.status);
        let borderColor = "border-purple-500";
        let statusImg = "assets/Closed- Status .png";
        if(element.status === "open"){
            borderColor = "border-green-500";
            statusImg = "assets/Open-Status.png";
        }
        let textPriority = "text-gray-400";
        let bgPriority = "bg-blue-100";
        if(element.priority.toLowerCase() === "medium"){
            textPriority = "text-[#F59E0B]";
            bgPriority = "bg-[#FFF6D1]";
        }
        else if(element.priority.toLowerCase() === "high"){
            textPriority = "text-red-500";
            bgPriority = "bg-red-100";
        }
        const newCard = document.createElement("div");
        newCard.className = `cursor-pointer shadow-sm rounded-md p-4 border-t-4
        ${borderColor}`;
        newCard.innerHTML = `
        <div class="flex justify-between mb-4">
            <img src="${statusImg}" alt="">
            <p class="px-6 rounded-3xl shadow-md ${bgPriority} ${textPriority}">${element.priority.toUpperCase()}</p>
        </div>
        <div class="space-y-2">
            <h2 class="font-semibold h-12  text-[14px]">${element.title}</h2>
            <p class="line-clamp-2 text-[#64748b]">${element.description}</p>
        </div>
        <div class="mt-3 mb-4 flex flex-wrap gap-2">
            ${createSpans(element.labels)}
        </div>
        <hr class ="border-gray-300">
        <div class ="p-4 pb-0 text-sm text-gray-500 space-y-2">
            <p>#${element.id} by ${element.author}</p>
            <p>${new Date(element.createdAt).toLocaleDateString()}</p>
        </div>
        `
        issueCardContainer.appendChild(newCard);
    });
};

loadAll();

document.getElementById("open-btn").addEventListener("click", ()=>{
    filteredOpen = all.filter(issue => issue.status.toLowerCase() ==="open");
    // console.log(filteredOpen);
    showSpinner();
    setTimeout(() => {
        displayAll(filteredOpen);
        updateCount(filteredOpen);
        hideSpinner();
    }, 200);
});
document.getElementById("closed-btn").addEventListener("click", ()=>{
    filteredClosed = all.filter(issue => issue.status.toLowerCase() ==="closed");
    // console.log(filteredClosed);
    showSpinner();
    setTimeout(() => {
        displayAll(filteredClosed);
        updateCount(filteredClosed);
        hideSpinner();
    }, 200);
});

const toggleButtons = (id) =>{
    const buttons = document.querySelectorAll("#all-btn, #open-btn, #closed-btn")
    // console.log(buttons);
    for(let button of buttons){
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline");
    }
    const selected = document.getElementById(id);
    selected.classList.add("btn-primary");
    selected.classList.remove("btn-outline");

    
};