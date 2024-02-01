const showDetails = document.querySelector(".showDetails");
const fullAddress = document.querySelector(".fullAddress");
const formattedAddress = document.querySelector(".formattedAddress");

let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "8a2e309063094a1cae075f183fa7b35a";

//API to get user address
const getUserCurrentAddress = async (latitude, longitude) => {
  let query = `${latitude},${longitude}`;
  let apiUrl = `${apiEndPoint}?key=${apiKey}&q=${query}&pretty=1`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const { city, state, postcode, country } = data.results[0].components;
    fullAddress.textContent = `User Address: ${city}, ${postcode}, ${state}, ${country}`;
    formattedAddress.textContent = `User full-Address: ${data.results[0].formatted}`;
  } catch (error) {
    console.log(error);
  }
};
document.querySelector(".geoBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        showDetails.textContent = `The latitude: ${latitude} & longitude: ${longitude}`;
        getUserCurrentAddress(latitude, longitude);
      },
      (error) => {
        showDetails.textContent = error.message;
      }
    );
  }
});
