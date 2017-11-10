(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const responseContainer2 = document.querySelector('#response-container-2');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        console.log(searchedForText);
        //debugger;
        const xhr = new XMLHttpRequest();
		xhr.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		xhr.onload=addImage;
		xhr.setRequestHeader('Authorization','Client-ID eeef0d0d14c0a96c8a3676900587542e2d9d08478fa8a13dcd5f5a62fd1f7471');
		xhr.send();
		const articleRequest = new XMLHttpRequest();
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=db280a4096e44d158684bccb5d390756`);
		articleRequest.send();
		articleRequest.onload = addArticles;

    });

    function addArticles() {
    	let HTMLContent = '';
    	const data = JSON.parse(this.responseText);
    	if(data) {
    		let FirstArticle = data.response.docs[0];
    		console.log(FirstArticle);
    		HTMLContent = `<div>
    			<span>${FirstArticle.headline.main}</span>
    			<p>${FirstArticle.snippet}</p>
    			<a href = "${FirstArticle.web_url}">click more details</a>
    		</div>`
    	} else {
    		HTMLContent="<div><span>NO Article </span></div>"
    	}
    	responseContainer.insertAdjacentHTML('afterend', HTMLContent);
    }

	
 	function addImage(){
		let HTMLContent='';
		const data =JSON.parse(this.responseText);
		console.log(data.results[0]);
		if(data && data.results &&  data.results[0] ){
			let FirstIMG = data.results[0];
			HTMLContent =`<figure> <img src= "${FirstIMG.urls.regular}" alt="${searchedForText}"> 
			<figcaption>${searchedForText} by ${FirstIMG.user.name} </figcaption>
			</figure>`;
		}else{
			HTMLContent="<div><span>NO IMAGE ARE RETURN </span></div>"
		}
		responseContainer.insertAdjacentHTML('afterbegin',HTMLContent);
	}

})();

