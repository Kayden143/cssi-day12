let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        document.querySelector('#app').innerHTML = "";
        renderData(snapshot.val());
    });
};

const renderData = (data) => {
    console.log(data);
    for (let key in data) {
        const note = data[key]
        const destination = document.querySelector('#app');

        destination.innerHTML += createCard(note);
    }
};

const createCard = (note) => {
    return `<div class = "column is-one-quarter">
                <div class = "card"> 
                    <header class="card-header"> 
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class = "card-content">
                        <div class = "content">
                            ${note.text}
                        </div>
                    </div>
                </div> 
            </div>`;
};