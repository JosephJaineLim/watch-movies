window.addEventListener('load', ()=>{
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjExZDQ1ZTU1ZTUyYzBmNThhYTQ0ZWI5Y2NkYzM1NSIsInN1YiI6IjY1MzU2ZjZmYWJkYWZjMDE0ZTdkZDMyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqNBGRsK56vOLa80R3TsPDurlxGwDRe6Y-rD7uVfBpQ'
    }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach((e,i) => {
        document.getElementById('results').innerHTML += `
        <div class="app__results_thumbnail" onclick="PlayVideo('${e['id']}')">
            <img src="https://image.tmdb.org/t/p/original/${e['poster_path']}" alt="${e['title']}">
        </div>
        `
        })
    })
    .catch(err => console.error(err));
})

document.getElementById('search-button').addEventListener('click',async()=>{
    const movie = document.getElementById('search-input').value;
    const api_key = 'eb11d45e55e52c0f58aa44eb9ccdc355';
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${api_key}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        ClearResults();
        if(result.results.length === 0)
        {
            document.getElementById('movie').innerHTML += `<h1>No results found.</h1>`
            return;
        }
        result.results.forEach((e,i) => {

            document.getElementById('results').innerHTML += `
            <div class="app__results_thumbnail" onclick="PlayVideo('${e['id']}')">
                <img src="https://image.tmdb.org/t/p/original/${e['poster_path']}" alt="${e['title']}">
            </div>
            `
        })
    }catch (error) {
        console.log('error: try again')
    }
})

const PlayVideo = (param) => {
    ClearResults();
    document.getElementById('movie').innerHTML = `
    <iframe id="iframe-embed" width="100%" height="500px" scrolling="no" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src="https://vidsrc.to/embed/movie/${param}"></iframe>
    `;
}

const ClearResults = () =>{
    document.getElementById('results').innerHTML = '';
    document.getElementById('movie').innerHTML = '';
}