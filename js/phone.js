// fetch data
const loadPhone = async (searchText="13",isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones,isShowAll);
}
// display data
const displayPhone = (phones,isShowAll) => {
    const container = document.getElementById("products-container");
    container.textContent = ''

    const showAll = document.getElementById("show-all-btn")
    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove("hidden")
    }
    else if(phones.length === 0){
        alert("No Data Available")
    }
    else{
        showAll.classList.add("hidden")
    }

    
    if(!isShowAll){
        phones = phones.slice(0,12)
    }
    phones.forEach(phone => {
        const div = document.createElement("div")
        div.classList = "card bg-gray-100 shadow-xl"
        div.innerHTML = `
        <figure class="px-10 pt-10">
                      <img src=${phone.image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions">
                        <button onclick="handleShowDetails('${phone.slug}');" id="show-datails-btn" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `
        container.appendChild(div)
    });
    toggleLoadingSpinner(false)
}
// search text
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchText = document.getElementById("input-field").value;
    loadPhone(searchText,isShowAll)
}
// toggle spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spiner")
    if(isLoading){
        loadingSpinner.classList.remove("hidden")
    }
    else{
        loadingSpinner.classList.add("hidden")
    }
}

// show all
const handleShowAll = () => {
    handleSearch(true)
}
// show details button
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}
// show modals
const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById("show-details-container")
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p class="text-2xl font-medium"><span>name:</span> ${phone?.name}</p>
    <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span>Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p><span>Slug:</span> ${phone?.slug}</p>
    <p><span>Released Date:</span> ${phone?.releaseDate}</p>
    <p><span>Brand:</span> ${phone?.brand}</p>
    <p><span>GPS:</span> ${phone?.others?.GPS || "No GPS"}</p>
    `
    show_datails_modal.showModal()
}
loadPhone()