const elList = document.querySelector(".users__list");
const loaded = document.querySelector(".loader");
let token = localStorage.getItem("token");

if (!token) {
  location.replace("login.html");
}

setTimeout(() => {
  loaded.style.opacity = "0";
  setTimeout(() => {
    loaded.style.display = "none";
  }, 1000);
}, 2000);

function renderUsersToDom(arr, node) {
  node.innerHTML = "";
  arr.forEach(
    ({ id, name, username, email, address, phone, website, company }) => {
      let { street, suite, city, zipcode, geo } = address;
      let { Companyname, catchPhrase, bs } = company;
      let template = `
            <li onclick='getPosts(${id})' class="animate__animated animate__bounceInDown animate__delay-2s users-list__item">
                <span class="users-list__id">${id}</span>
                <h2 class="users-list__name">${name}</h2>
                <h3 class="users-list__username">${username}</h3>
                <a class="animate__animated animate__shakeX animate__repeat-2 animate__delay-3s users-list__link" href="mailto:${email}">${email}</a>
                <address class="users-list__address">
                <p class="users-list__address-street">${street}</p>
                <p class="users-list__address-suite">${suite}</p>
                <p class="users-list__address-city">${city}</p>
                <p class="users-list__address-zipcode">${zipcode}</p>
                </address>
                <div class="users-list__socials">
                <a class="animate__animated animate__bounce animate__delay-3s animate__repeat-2 users-list__geo-location" href="https://www.google.com/maps/place/${geo.lat}, ${geo.lng}" target="_blank"></a>
                <a class="animate__animated animate__headShake animate__delay-4s animate__repeat-2 users-list__socials-tel" href="tel:${phone}"></a>
                <a class="animate__animated animate__heartBeat animate__delay-5s animate__repeat-2  users-list__socials-site" href="https://${website}" target="_blank"></a>
                </div>
                <div class="users-list__company">
                <span class="users-list__company-name">Company name: ${company.name}</span>
                <span class="users-list__company-catch">Catch: ${catchPhrase}</span>
                <span class="users-list__company-bs">Bs: ${bs}</span>
                </div>
            </li>
        `;
      node.insertAdjacentHTML("beforeend", template);
    }
  );
}

function renderPostsDom(arr, node) {
  node.innerHTML = "";
  arr.forEach(({ id, title, body }) => {
    let template = `
          <li class="animate__animated animate__fadeInUpBig animate__delay-1s posts-list__item" onclick='getComments(${id})'>
            <h3 class="posts-list__item-name">${title}</h3>
            <p class="posts-list__item-desc"><span class="posts-list__item-span">desc: </span>${body}</p>
          </li>`;
    node.insertAdjacentHTML("beforeend", template);
  });
}

function renderCommentsDom(arr, node) {
  node.innerHTML = "";
  arr.forEach(({ name, email, body }) => {
    let template = `
          <li class="animate__animated animate__fadeInDown comments-list__item">
            <h2 class="comments-list__item-name">${name}</h2>
            <a class="animate__animated animate__bounceIn animate__repeat-1 animate__delay-1s comments-list__item-email" href="mailto:${email}" class="email">${email}</a>
            <p class="comments-list__item-desc">${body}</p>
          </li>`;
    node.insertAdjacentHTML("beforeend", template);
  });
}

async function getUsers() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await res.json();
    renderUsersToDom(data, elList);
  } catch (error) {
    console.log(error);
  }
}

getUsers();

async function getPosts(id) {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    let data = await res.json();
    renderPostsDom(data, postsList);
  } catch (error) {
    console.log(error);
  }
}

async function getComments(id) {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    let data = await res.json();
    renderCommentsDom(data, commentsList);
  } catch (error) {
    console.log(error);
  }
}
