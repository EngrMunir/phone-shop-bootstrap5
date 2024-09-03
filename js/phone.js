const loadPhone = async (searchText='13',isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent=''
    // display all button 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('d-none')
    }else{
        showAllContainer.classList.add('d-none')
    }

    // display only 12 phone if not show all
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    phones.forEach((phone)=>{
        // console.log(phone)
        // 2 create a div
        const phoneCard= document.createElement('div');
        phoneCard.classList =`col-sm-6 col-md-4 col-lg-3`
        // ser inner html
        phoneCard.innerHTML=`
                   <div class="card">
                         <img src="${phone.image}" class="card-img-top" alt="phone-image" >
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text fw-bold">${phone.brand}</p>
                      <button onClick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                   </div>
                            `
        // 4 append child
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// 
const handleShowDetail =async(id)=>{
    console.log('show details button clicked',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data =await res.json()
    const phone =data.data;
    showDetails(phone)
}

const showDetails = (phone) => {
    console.log(phone)
    // Set the modal title
    document.getElementById('exampleModalLabel').innerText = phone.name;

    // Set the modal body content
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <img src="${phone.image}" alt="photo"/>
        <p><strong>Brand:</strong> ${phone.brand}</p>
        <p><strong>Release Date:</strong> ${phone.releaseDate ? phone.releaseDate : 'Not Available'}</p>
        <p><strong>Storage:</strong>${phone?.mainFeatures?.storage}</p>
        <p><strong>Display:</strong>${phone?.mainFeatures?.displaySize}</p>
        <p><strong>Chip set:</strong>${phone?.mainFeatures?.chipSet}</p>
        <p><strong>Memory:</strong>${phone?.mainFeatures?.memory}</p>
        <p><strong>GPS:</strong>${phone?.others?.GPS}</p>
    `;

    // Show the modal using Bootstrap's modal function
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
}

// handle search button
const handleSearch =(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        
        loadingSpinner.classList.remove('d-none')
    }else{
        loadingSpinner.classList.add('d-none')
    }
}

// handle show all
const handleShowAll =()=>{
    handleSearch(true)
}

loadPhone();