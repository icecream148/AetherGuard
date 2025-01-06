document.getElementById('aqiForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  fetch('/get_aqi', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          latitude: latitude,
          longitude: longitude
      })
  })
  .then(response => response.json())
  .then(data => {
      const resultDiv = document.getElementById('result');
      if (data.error) {
          resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      } else {
          resultDiv.innerHTML = `<p>AQI: ${data.data[0].aqi}</p>`;
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});