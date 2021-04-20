

// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

var alternateMapping = [
    document.getElementById("arg0"),
    document.getElementById("arg1"),
    document.getElementById("arg2"),
    document.getElementById("arg3"),
    document.getElementById("arg4")
]

console.log("altMapping:", alternateMapping);

function makeBlink(id){
    console.log(id, "in makeBlink")
    var elem = document.getElementById(id.slice(1, id.length));
    console.log("makeBlink() call elem: ", elem);
    elem.classList.add('blink');
    setTimeout(e=>{
        elem.classList.remove('blink');
    }, 4000);
}

function openKey(){
    var par = document.querySelector('.key')
    var key = document.querySelector(".folded");
    if (key == null){
        key = document.querySelector(".unfold");
        key.classList.remove("unfold");
        par.style.zIndex = "-10";
        key.classList.add("folded");
    } else {
        key.classList.remove("folded");
        par.style.zIndex = "1000";
        key.classList.add("unfold");
    }
    
}

function clear_popups(){
    if (document.body.getElementsByClassName('popup')[0] != null){
        popup = document.body.getElementsByClassName('popup');
        // console.log(popup[0]);
        document.body.removeChild(popup[0]);
    }
}



function show_stats(country){
    clear_popups();
    console.log(country.children[1]);
    nodeContent = country.children[1].innerHTML;
    newnode = document.createElement('div');
    newnode.classList.add('card');
    newnode.classList.add('popup');
    newnode.innerHTML += "<p onclick='clear_popups()' class='x'>x<p>"
    newnode.innerHTML += nodeContent;
    newnode.style = 'padding: 20px; position: fixed; top: 33%; left: 60%; display: inline; background: white;';
    document.body.appendChild(newnode);
    newnode.style.animation = 'fillout .2s linear';
}

function gen_html (harm, fair, auth, ingroup, purity, sex) {
    const widthVar = 1.5*purity;
    const heightVar = 5 + 2.5*fair;
    const earHieght = ingroup == 0 ? 7 : 8*(ingroup);

    const happiness = -2.5*auth;
    const harmvar = harm;
    if (sex == "f"){sex = "red"}else{sex="blue"}

    newpath = `
        M 0,0 
        C ${-widthVar},30 ${-widthVar},50 0,80 
        C 30,${80 + heightVar} 50,${80 + heightVar} 80,80 
        C ${80 + widthVar},50 ${80 + widthVar},30 80,0 
        C 50,${-heightVar} 30,${-heightVar} 0,0 

        M 0,80 
        C 0,${80 + earHieght/3} 0,${80 + 2*(earHieght/3)} 10,${ 80 + earHieght} 
        C 20,${80 + 2*(earHieght/3)} 20,${80 + (earHieght/3)} 30,${80 - heightVar/(earHieght + 1)} 

        M 80,80 

        C 80,${80 + earHieght/3} 80,${80 + 2*(earHieght/3)} 70,${80 + earHieght}
        C 60,${80 + 2*(earHieght/3)} 60,${80 + (earHieght/3)} 50,${80 - heightVar/(earHieght + 1)}

        M 20,50
        C 23,55 28,55 30,50
        C 28,45 23,45 20,50

        M 60,50
        C 58,55 53,55 50,50
        C 53,45 58,45 60,50

        M 45,40
        L 35,40
        L 40,35
        L 45,40

        M 65,25
        C 50,${25 - happiness} 30,${25 - happiness} 15,25

        M 30,60
        L 15,${60 - harmvar}

        M 50,60
        L 65,${60 - harmvar}
    `
    
    return `<svg style="grid-area:2/2;overflow:visible;" ><path fill="white" stroke="${sex}" stroke-width="3" d="${newpath}" transform="rotate(180)">
</svg>`;
}

function draw_glyphs(mapping=['harm', 'fair', 'auth', 'ingroup', 'purity']){
    // mapping = (typeof mapping !== 'undefined') ?  mapping : ['harm', 'fair', 'auth', 'ingroup', 'purity']
    countries = ['Australia', 'Belgium', 'China', 'France', 'Hungary', 'Iran', 'Japan', 'Korea', 'Latvia', 'Mongolia', 'Netherlands', 'Poland', 'Russia', 'Serbia', 'Spain', 'Sweden', 'Turkey', 'UK', 'US']
    //countries = ["Russia", "Sweden", "Mongolia", "US", "Australia", "Spain", "Iran"]
    for (var i = 0; i < countries.length; i++) {
        
        var glyphF = document.getElementById(`${countries[i]}-f-glyph`);
        var glyphM = document.getElementById(`${countries[i]}-m-glyph`);
        
        var f_data = {
            "harm": Number(document.getElementById(`${countries[i]}-f-harm`).innerText),
            "fair": Number(document.getElementById(`${countries[i]}-f-fair`).innerText),
            "auth": Number(document.getElementById(`${countries[i]}-f-auth`).innerText),
            "ingroup": Number(document.getElementById(`${countries[i]}-f-ingroup`).innerText),
            "purity": Number(document.getElementById(`${countries[i]}-f-purity`).innerText)
        }
        var m_data = {
            "harm": Number(document.getElementById(`${countries[i]}-m-harm`).innerText),
            "fair": Number(document.getElementById(`${countries[i]}-m-fair`).innerText),
            "auth": Number(document.getElementById(`${countries[i]}-m-auth`).innerText),
            "ingroup": Number(document.getElementById(`${countries[i]}-m-ingroup`).innerText),
            "purity": Number(document.getElementById(`${countries[i]}-m-purity`).innerText)
        }
        console.log(countries[i])
        glyphF.innerHTML += gen_html(f_data[mapping[0]], f_data[mapping[1]], f_data[mapping[2]], f_data[mapping[3]], f_data[mapping[4]],"f");
        glyphM.innerHTML += gen_html(m_data[mapping[0]], m_data[mapping[1]], m_data[mapping[2]], m_data[mapping[3]], m_data[mapping[4]],"m");
    }
}    


if (alternateMapping[0]){ // checking for a non-null alternate mapping
    var newMapping = []
    alternateMapping.forEach(e => {
        newMapping.push(e.innerText.trim());
    })
    draw_glyphs(newMapping);
} else {
    draw_glyphs();
}



