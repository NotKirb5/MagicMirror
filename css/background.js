const fs = require('fs').promises
const sharp = require('sharp')







getbackgrounds().then(data => backgroundchange(data))

async function getbackgrounds(){
    try {
        const data = await fs.readdir('assets')
        return data
    }catch (err){
        console.error(err)
    }
}
/*
fs.readdir('assets',async (err,data)=> {
    if (err){
        console.error(err)
        return
    }
    console.log(data)
    const img = sharp('assets/' + data[0])

    const buffer = await img
        .modulate({brightness:.5})
        .toFormat('png')
        .toBuffer()

    const base64 = buffer.toString('base64');
    const mimetype = 'image/png';
    const dataurl = `data:${mimetype};base64,${base64}`;

    console.log(dataurl.slice(0,100) + '...')

})
*/
async function dimbg(bg){
    const img = sharp(bg)

    const buffer = await img
        .modulate({brightness:.5})
        .toFormat('png')
        .toBuffer()

    const base64 = buffer.toString('base64');
    const mimetype = 'image/png';
    const dataurl = `data:${mimetype};base64,${base64}`;
    return dataurl
}


async function backgroundchange(bgs){
    console.log(bgs)
    const randbackground = 'assets/' + bgs[Math.floor(Math.random()*bgs.length)]
    const dimmedbackground = await dimbg(randbackground)
    const csscontent = `
:root {
  --color-text: #999;
  --color-text-dimmed: #666;
  --color-text-bright: #fff;
  --color-background: rgba(201, 36, 36, 0);

  --font-primary: "Roboto Condensed";
  --font-secondary: "Roboto";

  --font-size: 20px;
  --font-size-small: 0.75rem;

  --gap-body-top: 60px;
  --gap-body-right: 60px;
  --gap-body-bottom: 60px;
  --gap-body-left: 60px;

  --gap-modules: 30px;

  
}

html{
  background-image: url("${dimmedbackground}");
  background-position: initial;
  background-size:cover;
  background-repeat:no-repeat;
  filter: brightness(100%)

}
`

fs.writeFile('custom.css',csscontent,'utf-8')

setTimeout(()=> {
    backgroundchange(bgs)
},300000)
}