function onUserClick(user) {
  console.log(user);
  var myNode = document.getElementById("selecteduser");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  const selectedUserDiv = document.getElementById('selecteduser');
  const userDiv = document.createElement('div');
  userDiv.id = 'user';
  const profileDiv = document.createElement('div');
  profileDiv.id = 'profile';
  const detailsDiv = document.createElement('div');
  detailsDiv.id = 'details';
  const nameDiv = document.createElement('div');
  nameDiv.id = 'name';
  nameDiv.innerHTML = `${user.first_name} ${user.last_name}`
  const emailDiv = document.createElement('div');
  emailDiv.id = 'email';
  emailDiv.innerHTML = user.email;
  const imageElement = document.createElement('img');
  imageElement.src = user.avatar;
  detailsDiv.append(nameDiv);
  detailsDiv.append(emailDiv);
  profileDiv.append(imageElement);
  userDiv.append(profileDiv);
  userDiv.append(detailsDiv);
  selectedUserDiv.append(userDiv);
}










function getUsers(elementId) {
  // ENABLE
  var apiUrl = 'https://reqres.in/api/users?per_page=50';
  getData(apiUrl).then(data => {
    const listOfUsers = data.data;
    const usersListDiv = document.getElementById(elementId);
    listOfUsers.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.id = 'user';
      const profileDiv = document.createElement('div');
      profileDiv.id = 'profile';
      const detailsDiv = document.createElement('div');
      detailsDiv.id = 'details';
      const nameDiv = document.createElement('div');
      nameDiv.id = 'name';
      nameDiv.innerHTML = `${user.first_name} ${user.last_name}`
      const emailDiv = document.createElement('div');
      emailDiv.id = 'email';
      emailDiv.innerHTML = user.email;
      const imageElement = document.createElement('img');
      imageElement.src = user.avatar;
      imageElement.style.cursor = 'pointer';
      imageElement.onclick = () => onUserClick(user);
      detailsDiv.append(nameDiv);
      detailsDiv.append(emailDiv);
      profileDiv.append(imageElement);
      userDiv.append(profileDiv);
      userDiv.append(detailsDiv);
      usersListDiv.append(userDiv);
    })
    // DIABLE
  }).catch(err => {
    console.log(err);
  });
}

function postData(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    // cache: '',
    // credentials: '',
    // headers: '',
    // integrity: '',
    // keepalive: '',
    // mode: '',
    // redirect: '',
    // referrer: '',
    // referrerPolicy: '',
    // signal: '',
    // window: '',
  })
    .then(response => response.json()); // parses JSON response into native Javascript objects 
}

function getData(url = '', headers = {}) {
  return fetch(url, {
    method: 'GET',
    // headers: '',
  }).then(response => {
    return response.json();
  });
}
