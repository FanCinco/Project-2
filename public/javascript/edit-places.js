async function editFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="post-name"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/places/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-place').addEventListener('submit', editFormHandler);