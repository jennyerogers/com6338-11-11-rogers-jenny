const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// start ftn to make poem html
const makePoemHTML = (poemData) => { //retrieve poem data

  const {0: { author, lines, title } } = poemData
  console.log(poemData)
  //should return HTML string that contains title in h2, then author in em in h3, and then paragraph tags
  const poemTitle = makeTag('h2')(title) 
  const authorTitle = pipe(makeTag('em'), makeTag('h3'))(`by ${author}`)
  //set stanzas
  const poemLine = lines.join("<br>").split("<br><br>") //should place <br> between each line of text inside the paragraph tag
  const poemStanza = poemLine.map(stanza => makeTag('p')(stanza.split('<br>').join('<br>')))

  return `${poemTitle}${authorTitle}${poemStanza.join('')}` //display
}

getPoemBtn.onclick = async function() { //Clicking "Get Poem" should render poem HTML to #poem

  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
