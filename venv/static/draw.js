function gen_html (harm, fair, auth, ingroup, purity, sex) {
    const widthVar = purity;
    const heightVar = 5 + 2*fair;
    const earHieght = ingroup == 0 ? 7 : 8*(ingroup);

    const happiness = -3*auth;
    const harmvar = harm;
    if (sex == "f"){sex = "pink"}else{sex="blue"}

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

    // var colorOptions = ["red", "green", "yellow", "blue", "orange", "green"]
    // var petInject = ``
    // var numPetals = (auth + 8)
    // var degreeIncr = 360/numPetals
    // var color = colorOptions[Math.floor(purity + 10) % 6]
    // var scale = (15 + harm)*.08
    // var center_color = colorOptions[Math.floor(ingroup + 10) % 6]
    
    // console.log("PETAL COLOR", color)
    // var center_scale = fair/2 + 1
    // var degreeAcc = 0

    // var petalPath = `M 0,0, C ${auth*60/3 + 10 },20 ${auth*60/3 + 10},${auth*60/3 + 10} 80,80 C 100,${auth*60/3 + 10} 100,20 0,0`
    
    // var centerPath = `M 0,20 C -20,20 -20,-20 0,-20 C 20,-20 20,20, 0,20`

    // for (var i = 0; i < numPetals; i++){
    //     petInject = petInject + `<svg style="grid-area:2/3;overflow:visible;" ><path fill="${color}" d="${petalPath}" transform="rotate(${degreeAcc}), scale(${scale})"> </svg>` + "\n";
    //     degreeAcc = degreeAcc + degreeIncr;
    // }
    // petInject = petInject + `<svg style="grid-area:2/3;overflow:visible;" ><path fill="${center_color}" d="${centerPath}" transform="scale(${center_scale})"></svg>`
    
    
    return `<svg style="grid-area:2/2;overflow:visible;" ><path fill="white" stroke="${sex}" stroke-width="3" d="${newpath}" transform="rotate(180)">
</svg>`;
}

function draw_glyphs(){
    countries = ["Russia", "Sweden", "Mongolia", "US", "Australia", "Spain", "Iran"]
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
        glyphF.innerHTML += gen_html(f_data.harm, f_data.fair, f_data.auth, f_data.ingroup, f_data.purity,"f");
        glyphM.innerHTML += gen_html(m_data.harm, m_data.fair, m_data.auth, m_data.ingroup, m_data.purity,"m");
    }
}    


draw_glyphs();

