const loadPhone = async (searchText)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}

const displayPhones = phones =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent=''
    // display all button 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length>12){
        showAllContainer.classList.remove('d-none')
    }else{
        showAllContainer.classList.add('d-none')
    }
    phones = phones.slice(0,12)

    phones.forEach((phone)=>{
        console.log(phone)
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
                      <a href="#" class="btn btn-primary">Buy Now</a>
                    </div>
                   </div>
                            `
        // 4 append child
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

// handle search button
const handleSearch =()=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText)
}

const toggleLoadingSpinner = (isLoading)=>{
    if(isLoading){
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.remove('d-none')
    }else{
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.add('d-none')
    }
}