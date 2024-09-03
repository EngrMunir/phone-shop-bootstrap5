const loadPhone = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}

const displayPhones = phones =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phones.forEach((phone)=>{
        console.log(phone)
        // 2 create a div
        const phoneCard= document.createElement('div');
        phoneCard.classList =`col-sm-6 col-md-4 col-lg-3`
        // ser inner html
        phoneCard.innerHTML=`
                   <div class="card">
                         <img src="${phone.image}" class="card-img-top" alt="phone-image" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                   </div>
                            `
        // 4 append child
        phoneContainer.appendChild(phoneCard)
    })
}

loadPhone();