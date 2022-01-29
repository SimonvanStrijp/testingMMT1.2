let graphOffset = 50
let buttonNext
let buttonBack
let currentYear
let selectYear
let maxYear = -1
let minYear = 1000000
let data
let selectedValue
let reCal = false
let pixSize = 10

let platformNintendo = 0
let platformSony = 0
let platformMicrosoft = 0
let bossScreenSize
let bossSizeNintendo = 1
let bossSizeSony = 1
let bossSizeMicrosoft = 1

let hpColor = "#AC3F33"
let hpHighlight = "#E57248"

let microsoftEye = "#E57248"
let sonyEye = "#E57248"
let nintendoEye = "#E57248"
let casingColor = "#1E1E28"

function preload() {
    data = loadJSON("json/gameSales.json")
}

function setup (){
    createCanvas (windowWidth-17,windowHeight-17); 
    print(data)

    bossScreenSize = map(.8, 0, 1920, 0, width)
    

    // create boolean for data
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Publisher == "Bethesda Softworks") {
            data.results[i].IsBroken = true
        }
        else {
            data.results[i].IsBroken = false
        }        
    }

    // set min and max year.
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Year>maxYear) {
            maxYear = data.results[i].Year
        } 
    }  
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Year<minYear) {
        minYear = data.results[i].Year
      } 
    } 

    //font styles
    textFont('Passion One')
    textSize(50)

    // functionality
    selectYear= createSelect()
    selectYear.option("-")
    selectYear.size(200,50)
    selectYear.position (width/2-100, height-100)
    
    //create options for dropdown
    for (let i = minYear; i < maxYear; i++) {
        selectYear.option(i)
    }
    selectYear.selected ("-")
   /* //buttons
        //Button next year
            buttonNext = createButton(">")
            buttonNext.size(50,25)
            buttonNext.position(width/2+60, height-25)
            buttonNext.mousePressed (nextYear)

        //Button previous year
            buttonBack = createButton("<")
            buttonBack.size(50,25)
            buttonBack.position(width/2-50-60, height-25)
            buttonBack.mousePressed (previousYear)*/
   selectYear.changed(countPlatforms) 
}

function draw (){
    background("#303844");
    fill("#316D91")
    beginShape()
        vertex(width/5*2, 0)
        vertex(width/5*4, 0)
        vertex(width/5*3, height)
        vertex(width/5, height)
    endShape(CLOSE)

    fill(0, 0, 0)
    textSize (25)
    textAlign(CENTER)
    text("Select a year", width/2, height-120)

    //boss size
    bossSizeNintendo = map(platformNintendo, 0, 1000, 0, 1)
    bossSizeSony = map(platformSony, 0, 1000, 0, 1)
    bossSizeMicrosoft = map(platformMicrosoft, 0, 1000, 0, 1)
   
    nintendoGraphic (width/2, height/3)  
    sonyGraphic (width/4, height/3*2) 
    microsoftGraphic (width/4*3, height/3*2) 

    
    
}    

function countPlatforms () {
    currentYear=selectYear.value()
    print("start counting")
    platformMicrosoft = 0
    platformNintendo = 0
    platformSony = 0

    microsoftEye = "#E57248"
    sonyEye = "#E57248"
    nintendoEye = "#E57248"
    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Platform == "Wii" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "WiiU" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "DS" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "SNES" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "GB" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "GBA" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "3DS" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "N64" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "GC" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "NES" && data.results[i].Year==currentYear)
            
            {
                platformNintendo ++
                if (data.results[i].IsBroken == true) {
                    nintendoEye = "#ACF9FF"
                }}
    }

    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Platform== "XB" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "X360" && data.results[i].Year==currentYear ||
            data.results[i].Platform== "XOne" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PC" && data.results[i].Year==currentYear) 
        {
            platformMicrosoft ++
            if (data.results[i].IsBroken == true) {
                sonyEye = "#ACF9FF"
            }}    
        
    }

    for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].Platform== "PS" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PS2" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PS3" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PS4" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PSP" && data.results[i].Year==currentYear||
            data.results[i].Platform== "PSV" && data.results[i].Year==currentYear) 
        {
            platformSony ++
            if (data.results[i].IsBroken == true) {
                microsoftEye = "#ACF9FF"
            }}    
    }
    print("nintendo" + platformNintendo)
    print("microsoft" + platformMicrosoft)
    print("Sony" + platformSony)
    print( data)

    
}


function nextYear () {
    selectedValue = selectYear.value()
    selectYear.value() (selectedValue+1)
    //currentYear = currentYear + 1
    print("next" + selectYear)
}

function previousYear () {
    selectedValue = selectYear.value([value])()
    selectYear.value (selectedValue-1)
    //currentYear = currentYear - 1
    print("back" + selectYear)
}

function nintendoBar (x,y) {
    bossName = "Nintendo"
    noStroke()
    fill(hpColor)
        beginShape()
            vertex(x, y)
            vertex(x+platformNintendo+10, y)
            vertex(x+platformNintendo, y+25)
            vertex(x-10, y+25)
        endShape(CLOSE)
        fill(hpHighlight)
        beginShape()
            vertex(x, y)
            vertex(x+platformNintendo+10, y)
            vertex(x+platformNintendo+5, y+5)
            vertex(x-2, y+5)
        endShape(CLOSE)
        beginShape()
            vertex(x+platformNintendo+5, y)
            vertex(x+platformNintendo+10, y)
            vertex(x+platformNintendo, y+25)
            vertex(x+platformNintendo-5, y+25)
        endShape(CLOSE)

        textSize(30)
        textAlign (LEFT)
        fill("black")
        text(bossName+ " " + platformNintendo, x+3, y+20,)
        fill("white")
        text(bossName+ " " + platformNintendo, x, y+18,)
    }

    function sonyBar (x,y) {
        bossName = "Sony"
        noStroke()
        fill(hpColor)
            beginShape()
                vertex(x, y)
                vertex(x+platformSony+10, y)
                vertex(x+platformSony, y+25)
                vertex(x-10, y+25)
            endShape(CLOSE)
            fill(hpHighlight)
            beginShape()
                vertex(x, y)
                vertex(x+platformSony+10, y)
                vertex(x+platformSony+5, y+5)
                vertex(x-2, y+5)
            endShape(CLOSE)
            beginShape()
                vertex(x+platformSony+5, y)
                vertex(x+platformSony+10, y)
                vertex(x+platformSony, y+25)
                vertex(x+platformSony-5, y+25)
            endShape(CLOSE)
    
            textSize(30)
            fill("black")
            text(bossName+ " " + platformSony, x+3, y+20,)
            fill("white")
            text(bossName+ " " + platformSony, x, y+18,)
        }

    function microsoftBar (x,y) {
        bossName = "Microsoft"
        noStroke()
        fill(hpColor)
            beginShape()
                vertex(x, y)
                vertex(x+platformMicrosoft+10, y)
                vertex(x+platformMicrosoft, y+25)
                vertex(x-10, y+25)
            endShape(CLOSE)
            fill(hpHighlight)
            beginShape()
                vertex(x, y)
                vertex(x+platformMicrosoft+10, y)
                vertex(x+platformMicrosoft+5, y+5)
                vertex(x-2, y+5)
            endShape(CLOSE)
            beginShape()
                vertex(x+platformMicrosoft+5, y)
                vertex(x+platformMicrosoft+10, y)
                vertex(x+platformMicrosoft, y+25)
                vertex(x+platformMicrosoft-5, y+25)
            endShape(CLOSE)
    
            textSize(30)
            fill("black")
            text(bossName+ " " + platformMicrosoft, x+3, y+20,)
            fill("white")
            text(bossName+ " " + platformMicrosoft, x, y+18,)
        }

function nintendoGraphic (x,y) {
    fill("red")
    ellipse(x, y, 10)
    push()
        noStroke()
        translate(x, y)
        scale(bossScreenSize+bossSizeNintendo)
        print(bossScreenSize+bossSizeNintendo)
        fill(30,30,50)
        rectMode(RADIUS)
        rect(0, -30, 30, 50)


        fill(230, 240, 255)
        //face
        beginShape()
            vertex(-30, -100)
            vertex(30, -100)
            vertex(35, -50)
                //mouth
                vertex(15, -70)
                vertex(0, -50)
                vertex(-20, -65)
            vertex(-35, -50)
        endShape(CLOSE)

        //jaw
        beginShape()
            vertex(-30, 150)
            vertex(30, 150)
            vertex(45, 0)
                //mouth
                vertex(30, 20)
                vertex(15, 0)
                vertex(0, 20)
                vertex(-20, -5)
                vertex(-30, 20)
            vertex(-45, 0)
        endShape(CLOSE)

    // eyes    
        fill(nintendoEye)
        beginShape()
            vertex(-28, -90)
            vertex(-20, -89)
            curveVertex(-22, -85)
        endShape(CLOSE)
        beginShape()
            curveVertex(28, -92)
            curveVertex(16, -90)
            curveVertex(22, -83)
        endShape(CLOSE)

        fill(190, 190, 210)
            beginShape()
                vertex(35, 	150)
                vertex(40, 200)
                vertex(-40, 200)
                vertex(-35, 150)
            endShape(CLOSE)
    pop()

    nintendoBar (x-100,y-150)
}

function sonyGraphic (x,y) {
    push()
        noStroke()
        translate(x, y)
        scale(bossScreenSize+bossSizeSony)
       fill(20,20,20)
        beginShape()
            vertex(200, -100)
            vertex(180, 10)
            vertex(-180, 10)
            vertex(-160, -100)
        endShape(CLOSE)

        //face
        fill(sonyEye)
        ellipse(160, -47, 15,)
        ellipse(-140, -47, 15,)
        fill(20, 20, 20)
        ellipse(160, -47, 10,)
        ellipse(-140, -47, 10,)

        //Casing
        fill(casingColor)
        beginShape()
            vertex(220, -100)
            vertex(211, -50)
            vertex(-189, -50)
            vertex(-180, -100)
        endShape(CLOSE)

        //teeth
        fill(200, 200, 150)
        beginShape()
            vertex(100, -25)
            vertex(110, -25)
            vertex(105, -40)
        endShape(CLOSE)
        beginShape()
            vertex(-100, -25)
            vertex(-110, -25)
            vertex(-105, -40)
        endShape(CLOSE)
        beginShape()
            vertex(-90, -25)
            vertex(-80, -25)
            vertex(-85, -45)
        endShape(CLOSE)

        //case bottom
        fill(casingColor)
        beginShape()
            vertex(208, -30)
            vertex(200, 10)
            vertex(-200, 10)
            vertex(-193, -30)
        endShape(CLOSE)
    pop()

    sonyBar (x-100,y-150)
}

function microsoftGraphic (x,y) {
    push()
        noStroke()
        translate(x, y)
        scale(bossScreenSize+bossSizeMicrosoft)

        //screenCase
        fill(60, 60, 100)
        beginShape()
            vertex(150, -160)
            vertex(-150, -160)
            vertex(-160, 70)
            vertex(160, 70)
        endShape(CLOSE)

        //screen
        fill(casingColor)
        beginShape()
            vertex(140, -150)
            vertex(-140, -150)
            vertex(-150, 50)
            vertex(150, 50)
        endShape(CLOSE)

        
        fill(microsoftEye)
        ellipse(140, 60, 15)
        fill(casingColor)
        ellipse(140, 60, 8)


        //eye
        microsoftEyes (110,-10)
        microsoftEyes (-110, -10)

        //mouth
        fill(0, 0, 0)
        beginShape()
            vertex(0, 20)
            vertex(30, 0)
            vertex(-30, 0)
        endShape(CLOSE)
    pop()
    microsoftBar (x-100,y-150)  
}
   

function microsoftEyes (x,y) {
    fill(0, 0, 0)
    ellipse(x, y, 50, 70)

    fill(255, 255, 255)
    ellipse(x+15, y+15, 7)
    ellipse(x+6, y+25, 10)
    ellipse(x-12, y-17, 15)

}

// to do:
//* viewport opdelen in 2/3 en 1/3. onderste derde is een interface voor de verschillende jaren
//* jaren animeren.
//      - huidige jaar data onthouden.
//      - nieuw jaar data vergelijken. 
//      - kijken of er opgeteld moet worden of afgetrokken
//      - binnen 1 sec van oude value naar nieuwe value
//      - checken wat de hoogste waarde is, dat invullen als bovenste waarde. 