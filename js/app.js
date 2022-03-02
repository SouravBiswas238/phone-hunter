const getPhoneData = () => {
    const inputText = document.getElementById('input-field');
    const inputValue = inputText.value;
    let url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => searchReasulets(data.data.splice(0, 20)))


    inputText.value = '';
    singleDetail.textContent = '';

};
document.getElementById('singleDetail').style.display = 'none';

// showing search reasult
const searchReasulets = phones => {
    document.getElementById('errorMassege').style.display = 'none';

    if (phones.length == "") {
        document.getElementById('errorMassege').style.display = 'block';
    }
    const container = document.getElementById('search-reasult');
    container.textContent = '';

    phones?.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" id="singlePhoneDetails" onclick="singlePhonDetails('${phone.slug}')">
        <img src="${phone.image}" class="card-img-top my-card-image" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text d-flex justify-content-between">
        <a href="#" class="btn btn-outline-primary">${phone.brand}</a>
        <a href="#" class="btn btn-outline-primary">Details..</a>
        </p>
        </div>
        </div>
        `;
        container.appendChild(div);


        // console.log(phone.slug);
    });

};

// single phone detals
const singlePhonDetails = (singlePhone) => {
    // console.log(singlePhone);
    slugUrl = `https://openapi.programming-hero.com/api/phone/${singlePhone}`;
    fetch(slugUrl)
        .then(res => res.json())
        .then(data => singleLoding(data.data))
};
// loding new details
const singleLoding = (slug) => {

    console.log(slug)

    const singleDetail = document.getElementById('singleDetail');
    singleDetail.style.display = 'block';
    singleDetail.textContent = '';
    singleDetail.innerHTML = `
    <div class="row" id="details-parent">
       <div class="col-lg-3">
         <div class="d-flex justify-content-center">
            <img src="${slug.image}" alt="">
           </div>
        </div>
       <div class="col-lg-3 bg-light">
            <h1>Main Fetaures</h1>
           <p>Realsed:${slug.releaseDate ? slug.releaseDate : 'Relese Date not Found'}</p>
           <p>Storage:${slug.mainFeatures.storage}</p>
           <p>Display:${slug.mainFeatures.displaySize}</p>
           <p>Cipset:${slug.mainFeatures.chipSet}</p>
           <p>Memory:${slug.mainFeatures.memory}</p>
       </div>

       <div class="col-lg-3 bg-light" id="sensor-parent">
          <h3>Sensor<h3>

               <p>${slug.mainFeatures.sensors[0] ? slug.mainFeatures.sensors[0] : ''}</p>
               <p>${slug.mainFeatures.sensors[1] ? slug.mainFeatures.sensors[1] : ''}</p>
               <p>${slug.mainFeatures.sensors[2] ? slug.mainFeatures.sensors[2] : ''}</p>
               <p>${slug.mainFeatures.sensors[3] ? slug.mainFeatures.sensors[3] : ''}</p>
               <p>${slug.mainFeatures.sensors[4] ? slug.mainFeatures.sensors[4] : ''}</p>
               <p>${slug.mainFeatures.sensors[5] ? slug.mainFeatures.sensors[5] : ''}</p>
               <p>${slug.mainFeatures.sensors[6] ? slug.mainFeatures.sensors[6] : ''}</p>
             
       </div>
        <div class="col-lg-3 bg-light" id="others-parent">
          <h3>Others</h3>
         
            <p> Bluetooth: ${slug.others.Bluetooth}</p>
            <p>  GPS:  ${slug.others.GPS}</p>
            <p> NFC:  ${slug.others.NFC}</p>
            <p> Radio:  ${slug.others.Radio}</p>
            <p> USB:  ${slug.others.USB}</p>
            <p>  WLAN:  ${slug.others.WLAN}</p>
        </div>
    </div>
     `;

}


//  sumons code
/*

// slice function 
const sliceShow = (arrayType) => {
    const parentDiv = document.getElementById('parent')
    parentDiv.innerHTML = ''

    arrayType.forEach(phone => {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
         <div class=" flex justify-center items-center">
         <div class="text-center p-3">
        <img src="${phone.image}" alt="">
        <span class="block">${phone.brand}</span>
        <span class="block">${phone.phone_name}</span>
         <button id="details" class="bg-[rgb(29,78,216)] px-4 py-2 text-white text-xl" onclick="detailsShow('${phone.slug}')">Details</button>
           </div>
          </div>
 
    `;
        parentDiv.appendChild(newDiv)
    })
}


// displayData function
const displayData = (phones) => {
    // console.log(phones)
    if (phones.length < 20) {
        sliceShow(phones)
    } else {
        const sliceArr = phones.slice(0, 20)
            // console.log(sliceArr)
        sliceShow(sliceArr)
    }


}

const detailsShow = (detailsId) => {
    const url = https://openapi.programming-hero.com/api/phone/${detailsId};

    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

}

const displayDetails = (slug) => {
    console.log(slug.mainFeatures)
        // console.log(slug.mainFeatures.sensors)

    const detailsParent = document.getElementById('details-parent')
    const newDetailsDiv = document.createElement('div')
    detailsParent.innerHTML = ''
    newDetailsDiv.innerHTML = `
    <div class="row " id="details-parent">
       <div class="col-md-3 bg-red-50 ">
         <div class="flex justify-center items-center">
            <img src="${slug.image}" alt="">
           </div>
        </div>
       <div class="col-md-3 bg-blue-400">
            <h1>Main Fetaures</h1>
           <p>Realsed:${slug.releaseDate}</p>
           <p>Storage:${slug.mainFeatures.storage}</p>
           <p>Display:${slug.mainFeatures.displaySize}</p>
           <p>Cipset:${slug.mainFeatures.chipSet}</p>
           <p>Memory:${slug.mainFeatures.memory}</p>
       </div>

       <div class="col-md-3 bg-green-400" id="sensor-parent">
          <h1>Sensor<h1>
                <p>${slug.mainFeatures.sensors[0]}</p>
                <p>${slug.mainFeatures.sensors[1]}</p>
                <p>${slug.mainFeatures.sensors[2]}</p>
                <p>${slug.mainFeatures.sensors[3]}</p>
                <p>${slug.mainFeatures.sensors[4]}</p>
                <p>${slug.mainFeatures.sensors[5]}</p>
               <p>${slug.mainFeatures.sensors[6]}</p>
       </div>
        <div class="col-md-3 bg-yellow-400" id="others-parent">
          <h1>others</h1>
        </div>
    </div>
     `;
    //  sensor sytem 
    // const sensorArr = slug.mainFeatures.sensors;
    // const sensorParent = document.getElementById('sensor-parent')
    // sensorParent.innerHTML = ''
    // sensorArr.forEach(sensor => {
    //     const newSensorEl = document.createElement('div');

    //     newSensorEl.innerHTML = `

    //         <p>${sensor}</p>

    //         `
    //     sensorParent.appendChild(newSensorEl)
    // })
    */