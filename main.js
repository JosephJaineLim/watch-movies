window.addEventListener('load', ()=>{
    Home()
})

let counter = 1;
let pageSelected = 'Home'
window.addEventListener('scrollend', () => {
    if(Math.round(window.innerHeight+window.scrollY) >= document.body.scrollHeight - 1000 && pageSelected === 'Home'){
        counter++;
        Home()
    }
})

document.getElementById('app__search').addEventListener('submit',(e)=>{
    pageSelected = 'Search';
    e.preventDefault();
    
    const movie = document.getElementById('search-input').value;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}`,options)
    .then(response => response.json())
    .then(response => {
        ClearResults();
        if(response.results.length === 0)
        {
            document.getElementById('movie').innerHTML = `<h1>No Results Found.</h1>`
            return
        }
        const resultsElement = document.getElementById('results');
        response.results.forEach(e => {
            const resultsThumbnail = document.createElement('div');
            resultsThumbnail.className = 'app__results_thumbnail'
            resultsThumbnail.onclick = () => PlayVideo(`${e['id']}`)

            const image = document.createElement('img')
            image.src =`https://image.tmdb.org/t/p/original/${e['poster_path']}`
            image.alt = `${e['title']}`

            const para = document.createElement('p')

            para.innerText = `${e['title']} (${e['release_date'].split('-')[0]})`

            resultsThumbnail.appendChild(image)
            resultsThumbnail.appendChild(para)
            resultsElement.appendChild(resultsThumbnail)
        })
    })
    .catch(err => document.getElementById('movie').innerHTML = `<h1>Error: Try Again</h1>`);
})

const PlayVideo = (param) => {
    pageSelected = 'Movie'
    ClearResults();
    document.getElementById('movie').innerHTML = `
        <iframe id="iframe-embed" width="100%" height="500px" scrolling="no" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src="https://vidsrc.to/embed/movie/${param}"></iframe>
    `;
}

const ClearResults = () =>{
    document.getElementById('results').innerHTML = '';
    document.getElementById('movie').innerHTML = '';
    document.getElementById('notice').innerHTML = '';
}

const Home = () => {
    pageSelected = 'Home'
    
    fetch(`https://api.themoviedb.org/3/discover/movie?page=${counter}&sort_by=popularity.desc`, options)
    .then(response => response.json())
    .then(response => {
        const resultsElement = document.getElementById('results');
        response.results.forEach((e,i) => {
            const resultsThumbnail = document.createElement('div')
            resultsThumbnail.className = 'app__results_thumbnail';
            resultsThumbnail.onclick = () => PlayVideo(`${e['id']}`)

            const image = document.createElement('img')
            image.src = `https://image.tmdb.org/t/p/original/${e['poster_path']}`
            image.alt = `${e['title']}`

            const para = document.createElement('p')

            para.innerText = `${e['title']} (${e['release_date'].split('-')[0]})`

            resultsThumbnail.appendChild(image)
            resultsThumbnail.appendChild(para)
            resultsElement.appendChild(resultsThumbnail)
        })
    })
    .catch(err => document.getElementById('movie').innerHTML = `<h1>Error: Try Again</h1>`);

    document.getElementById('notice').innerHTML = '<p>⬇️ Scroll down to load more movies. ⬇️</p>'
}
 
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjExZDQ1ZTU1ZTUyYzBmNThhYTQ0ZWI5Y2NkYzM1NSIsInN1YiI6IjY1MzU2ZjZmYWJkYWZjMDE0ZTdkZDMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqNBGRsK56vOLa80R3TsPDurlxGwDRe6Y-rD7uVfBpQ'
    }
};
