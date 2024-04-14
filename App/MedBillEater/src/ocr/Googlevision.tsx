const API_KEY = 'Add Your own google vision api key'; 
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

function generateBody(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION', // Changed to DOCUMENT_TEXT_DETECTION
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

async function callGoogleVisionAsync(image: string) {
  return new Promise((resolve, reject) => {
    const body = generateBody(image);
    fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => resolve(res))
      .catch(error => reject(error));
     
  });
  
}

export { callGoogleVisionAsync };
