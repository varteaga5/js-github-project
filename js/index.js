function init(){
    // listens for form submitted
     formSubmitListener();
}
// listens for form submitted
function formSubmitListener() {
    const gitHubForm = document.querySelector('#github-form');
    gitHubForm.addEventListener('submit', clickedSubmit)
}
function clickedSubmit(e) {
    e.preventDefault();
    const inputText = document.querySelector('input#search')
    // get username
    // pass username to get fetch function
    requestUserName(inputText.value)
    e.target.reset();
}
// send request to git hub
async function requestUserName(userName) {
    
    await fetch(`https://api.github.com/search/users?q=${userName}`)
    .then(response => response.json())
    .then(displayUserInfo)

}
function displayUserInfo(dataObj) {
    dataObj.items.forEach(obj => {
        // select ul
        let ul = document.querySelector('#user-list')
        displayImg(obj.avatar_url, ul);
        displayUserName(obj.login, ul);
        displayURL(obj.url, ul);
        displayRepoLink(obj.login, ul)
    });
}
function displayImg(img, ul){
    // create img tag put in li 
    const imgTag = document.createElement('img')
    // grab avatar img and put in src att .avatar_url
    imgTag.src = img 
    imgTag.style.height = '150px'
    // add img to user-list
    ul.append(imgTag)
    
}
function displayUserName(login, ul){ 
    // grabs username .login
    const userName = 'User Name: '+ login;
    // put username in li
    const newLi = document.createElement('li')
    newLi.innerText = userName
    // add li to user-list
    ul.append(newLi)
}

function displayURL (url, ul){ 
    // create profile link li
    const urlLi = document.createElement('li')
    // grab profile link .url and assign to li
    urlLi.innerHTML = url
    // add li to user-list
    ul.append(urlLi)
}  
function displayRepoLink(login, ul){ 

    // grabs username .login
    const userName = `→${login}\'s repos←`;
    // put username in li
    const newLi = document.createElement('li')
    newLi.innerText = userName
    // adds class to li
    newLi.classList.add('repo')
    // adds id to li
    newLi.setAttribute('id',`${login}`)
    // add li to user-list
    ul.append(newLi)
    repoClickListener();
    ul.append(document.createElement('p'))
    ul.append(document.createElement('p'))
}
// listens for img clicked submitted
async function repoClickListener() {
    const repoLink = document.querySelectorAll('.repo');
    repoLink.forEach(element => element.addEventListener('click', clickedLink))
}
function clickedLink(e) {
    // grabs user name
    const userName = e.target.innerHTML.slice(1,-9);
    // calls fetch to get repos
    requestUserRepo(userName, e)
}

// send request to git hub to get repos
async function requestUserRepo(repoName,e) {
    
    await fetch(`https://api.github.com/users/${repoName}/repos`)
    .then(response => response.json())
    .then(data => displayRepoInfo(data,e))
}
function displayRepoInfo(arrOfObjs,e) {
    console.log('this is e ', e)
    // select repos-list ul
    const repoLi = document.querySelector('.repo')
    // iterate over arr
    arrOfObjs.forEach((obj) => {
    
        // use li with an id that was created in using login
        // use back ticks to interpolate name into the selector
        let name = e.target.id
        const uniqueLi = document.querySelector(`#${name}`)            
        // create li 
        const newLi = document.createElement('li')
        // put current value of the iteration in innertext of li
        newLi.innerText = obj.name;
        // add unique li to ul
        uniqueLi.append(newLi)
        // adds padding values from top, right, bottom, left
        uniqueLi.style.padding = "20px 0px 20px 0px";
    })

    }

document.addEventListener('DOMContentLoaded', init)