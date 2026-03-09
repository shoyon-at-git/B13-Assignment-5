// console.log("inside issue tracker page!!");
const issueCardContainer = document.getElementById("issue-card-container");
let all =[];
let filteredOpen = [];
let filteredClosed = [];

const createSpans = (arr) =>{
    let bgColor = "";
    let textColor = "";
    let border = "";
    const htmlEl = arr.map(el =>{
        const lowerLabel = el.toLowerCase();

        if (lowerLabel === "bug") {
            bgColor = "bg-red-200";
            textColor = "text-red-700";
            border = "border-red-500"
        } 
        else if (lowerLabel === "enhancement") {
            bgColor = "bg-green-200";
            textColor = "text-green-700" ; 
            border = "border-green-500"
     } 
        else if (lowerLabel === "good first issue") {
            bgColor = "bg-yellow-200";
            textColor = "text-yellow-700";
            border = "border-yellow-500"
        } 
        else if (lowerLabel === "documentation") {
            bgColor = "bg-blue-200";
            textColor = "text-blue-700";
            border = "border-blue-500";

        } 
        else if (lowerLabel === "help wanted") {
            bgColor = "bg-orange-200";
            textColor = "text-orange-700";
            border = "border-orange-500";
        }
    return `<span class="${bgColor} ${textColor} px-2 py-[6px] border ${border} text-xs rounded-[100px]">${el.toUpperCase()}</span>`});
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
        <div onclick="loadIssueDetails(${element.id})">
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

const loadIssueDetails = async(id) =>{
    // console.log(id);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const json = await res.json();
    displayDetails(json.data);
};
const displayDetails =(details) =>{
    // console.log(details);
    const detailsContainer = document.getElementById("details-container");
    // console.log(detailsContainer);
        let textPriority = "text-red-700";
        let bgPriority = "bg-blue-500";
        if(details.priority.toLowerCase() === "medium"){
            textPriority = "text-gray-700";
            bgPriority = "bg-yellow-300";
        }
        else if(details.priority.toLowerCase() === "high"){
            textPriority = "text-white";
            bgPriority = "bg-red-500";
        }
    detailsContainer.innerHTML=`
    <div class="space-y-6">
            <h1 class="text-xl font-bold">${details.title}</h1>

            <div class="text-sm text-gray-500">
                <span class="btn btn-success rounded-3xl h-6">
                    ${details.status === "open" ? "Opened" : "Closed"}
                </span>
                <span class="">
                    ${details.status === "open" ? "Opened" : "Closed"}
                </span> by <strong>${details.author}</strong>
                 ${new Date(details.createdAt).toLocaleDateString()}
            </div>

            

            <div class="flex items-center gap-2 flex-wrap">
                ${createSpans(details.labels)}
            </div>

            <p class="text-gray-500">
                ${details.description}
            </p>
            <div class="flex gap-16 lg:gap-20 my-10 bg-gray-100 py-4 px-3 rounded-md">
                <div class="space-y-2">
                <p class="text-gray-700">Asssignee:</p>
                <p class="text-sm lg:text-xl font-semibold lg:font-bold">${!details.assignee ? "Assignnee not Found" : details.assignee}</p>
                </div>
                <div class = "space-y-1">
                <p class="text-gray-700">Priority:</p>
                <p class = "${bgPriority} w-fit px-2 lg:px-4 py-[2px] lg:py-1 ${textPriority} text-center rounded-3xl">${details.priority.toUpperCase()}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById("details_modal").showModal();
};

const searchInput = document.getElementById("input-search");
searchInput.addEventListener("keydown", (e)=>{
    if(e.key ==="Enter"){
        const buttons = document.querySelectorAll("#all-btn, #open-btn, #closed-btn")
        // console.log(buttons);
        for(let button of buttons){
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline");
    }
        const inputValue = searchInput.value.trim().toLowerCase();
        // console.log(inputValue);
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`
        // console.log(url);
        showSpinner();
        fetch(url)
            .then(res => res.json())
            .then(data=>{
                displayAll(data.data);
                updateCount(data.data);
                hideSpinner();
            });
    }
});
