const form = document.querySelector('form');
const addressInp = document.querySelector('form #address');
const firstMessage = document.querySelector('#message-one');
const secondMessage = document.querySelector('#message-two');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  firstMessage.textContent = 'loading...';
  secondMessage.textContent = '';
  const address = addressInp.value;
  try {
    const response = await axios.get('/weather', {
      params: {
        address,
      },
    });
    const {
      formattedAddress,
      current: {
        temp_c,
        feelslike_c,
        humidity,
        condition: { text: status },
      },
    } = response.data;
    firstMessage.textContent = formattedAddress;
    secondMessage.textContent = `It's ${temp_c} celsius with ${humidity}% humidity and it feels like ${feelslike_c} celsius , it's mostly ${status} . `;
  } catch (error) {
    firstMessage.textContent = error.response.data.error;
    secondMessage.textContent = ``;
  }
});
