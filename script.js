window.addEventListener("load", () => {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      var IP = data.ip;
      console.log(data.ip);

      const currentip = document.getElementById("gfg");

      currentip.innerHTML = `
        <span id="gfg">${IP}</span>
        `;
      const Address = document.getElementById("Adress");

      Address.innerHTML = `
        <span id="Adress">${IP}</span>`;
      getDetails(IP);
    })
    .catch((error) => {
      console.log("error occured");
    });
});

const btn = document.getElementById("get-started");
const homePage = document.getElementById("home-page");
const detailPage = document.getElementById("detail-Page");


btn.addEventListener("click", () => {
  homePage.style.display = "none";
  detailPage.style.display = "block";
});
const frame = document.getElementById("map");
const info = document.getElementById("info");

function getDetails(ID) {
   
  // fetch(`http://ip-api.com/json/${ID}`)
  fetch(`https://ipapi.co/${ID}/json/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
       console.log(data.region)

       const latitude=document.getElementById("lat");
       latitude.innerText=`${data.latitude}`
       
       const citym=document.getElementById("city");
       citym.innerHTML=`${data.city}`
       const orgm=document.getElementById("org");
       orgm.innerHTML=`${data.org}`
       const longm=document.getElementById("long");
       longm.innerHTML=`${data.longitude}`
       const regm=document.getElementById("region");
       regm.innerHTML=`${data.region}`
       const hostm=document.getElementById("host");
       hostm.innerHTML=`${data.country_name
       }`

       const mapm=document.getElementById("map");
       mapm.innerHTML=`
       <div class="your-location">Your Current Location</div> 

       <iframe id="iframe" src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&output=embed" 
       width="100%" height="677px" 
       frameborder="0" style="border:0"></iframe>`
        
      
       const time=document.getElementById("time");
       time.innerHTML=`${data.timezone}`
       const pin=document.getElementById("pin");
       pin.innerHTML=`${data.postal}`

    //    let timeDate = new Date().toLocaleString(`${data.countrycode}`, { timeZone: `${data.timezone}` });
     
    //    console.log(timeDate);
    let timez=new Date().toLocaleString();
    const date=document.getElementById("date");
    date.innerHTML=`${timez}`
    console.log(timez)
      //  const zip=data.zip;
       const zip=data.postal;
     noOfPostOffices(zip);
    
    // const searchInput=document.getElementById("input").value;
    // searchInput.addEventListener("input",()=>{
    //     console.log(searchInput)
    //     // filterPostOffice(searchInput);
    // })
      

    })
    .catch((error) => {
      console.log("error occured");
    });


}
 function noOfPostOffices(pin){

    console.log(pin)
const pincode = pin; // Replace with the actual pincode
const pincodeApiUrl = `https://api.postalpincode.in/pincode/${pin}`;

fetch(pincodeApiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the response data here to get post office information
    const postOffice=data[0].PostOffice;
    const totalPostOffice=data[0].PostOffice.length;
    console.log(data[0].PostOffice[0]);
    const totalpin=document.getElementById("totalpin");
    totalpin.innerHTML=`${totalPostOffice}`
    for(i=0;i<totalPostOffice;i++){
   const card=document.getElementById("card");
   const cards=document.getElementById("cards");
   const div=document.createElement("div")
  div.className="card"; 
  
  div.innerHTML=`<p>Name : <span id="name">${data[0].PostOffice[i].Name}</span></p>
  <p>Branch Type : <span id="branch">${postOffice[i].BranchType}</span></p>
  <p>Delivery Status : <span id="status">${postOffice[i].DeliveryStatus}</span></p>
  <p>District : <span id="district">${postOffice[i].District}</span></p>
  <p>Division : <span id="div">${postOffice[i].Division}</span></p>
  `   
   cards.appendChild(div);
    }
  })
  .catch(error => {
    console.error("Error fetching post offices:", error);
  });
 }
 
 function filterPostOffice(searchInput){
    function filterPostOffices(query) {
        // Clear previous results
        searchInput.innerHTML = '';
      
        // Filter post offices based on the query
        const filteredOffices = postOffices.filter((office) =>
          office.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          office.branch.toLowerCase().includes(searchInput.toLowerCase())
        );
      
        // Display filtered post offices
        filteredOffices.forEach((office) => {
          const li = document.createElement('li');
          li.textContent = `${office.name} - ${office.branch}`;
          officeResults.appendChild(li);
        });
      }
 }