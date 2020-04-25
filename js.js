/*fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        const list = document.querySelector('#list')

        json.forEach(item=> {
            const li = document.createElement('li')
            li.textContent= item.title

            list.appendChild(li)
    });
    })*/
    /*fetch('http://localhost:3000/list')
        .then(response => response.json())
        .then(data => console.log("data", data))*/

        fetch('http://localhost:3000/list')
        .then(response => response.json())
        .then(data => {
            const list = document.querySelector('#list')

            data.forEach(item => {
                const li = document.createElement('li')
                li.textContent = item.text
                li.setAttribute('data-number', item.id)
                //li.setAttribute('data-color', item.color) 
                if(item.done) li.classList.add('done')
                list.appendChild(li)
            });
        })    
        .then(()=>{
            const todoItems = document.querySelectorAll("li")

            todoItems.forEach(li => {
                li.addEventListener('click',() => {
                    const desc = document.createElement('div')
                    desc.className = 'desc'
                    const id = li.getAttribute('data-number')
                    const color = li.getAttribute('data-color')

                    if(li.querySelector('.desc')) return

                    fetch(`http://localhost:3000/list/${id}`)
                    .then(response => response.json())
                    .then((data)=>{
                        desc.textContent= data.description
                        desc.style.backgroundColor = data.color
                        li.appendChild(desc)
                    })
                })
            })
        })  