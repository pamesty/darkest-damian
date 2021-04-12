//----------------------------DOM----------------------------//
//Mostrar y ocultar atributos de heroe
const mostrar=()=>{
    document.querySelector(`#infoHero`).style.display = ``;
}
const ocultar=()=>{
    document.querySelector(`#infoHero`).style.display = `none`;
}
//-----------------------------------------------------------//
//Heroes
//mostrar skills
const showContent=(hero,entidad,storage,turno,skillID)=>{
    //Orden de atque
    position = turno;

    //nombre y estadisticas
    let healthPoint = localStorage.getItem(storage);
    let statsHero = document.querySelector(`#statsHero`);
    statsHero.innerText=`${healthPoint}`;
    let nameHero = document.querySelector(`#nameHero`);
    nameHero.innerText=`${entidad.name}`;

    //portrait
    let portrait=document.querySelector(`#portraitHero`);
    portrait.innerHTML=`<img src="assets/images/chapters/portraits/${hero}.png">`;
    
    //quitar todas las selecciones
    let select1=document.querySelector(`#position1`);
    select1.classList.remove("columna-hover");
    let select2=document.querySelector(`#position2`);
    select2.classList.remove("columna-hover");
    let select3=document.querySelector(`#position3`);
    select3.classList.remove("columna-hover");
    //agregar nueva seleccion
    let selected=document.querySelector(`#position${turno}`);
    selected.classList.add("columna-hover");
}
//$('#skillCruzado').hide();
$('#skillBarbara').hide();
$('#skillArbalestera').hide();

showContent('cruzado', cruzado, 'hpHero1', 1); //eleccion incial
//showContent('barbara', barbara, hpHero2, 2);
//showContent('arbalestera', arbalestera, hpHero3, 3);

//-----------------------------------------------------------//
//Enemy
//mostrar contenido de enemigo
const showContentEnemy=(name,position,columna,defend)=>{
    let hP = localStorage.getItem(position);
    let nameEnemy = document.querySelector(`#nameEnemy`);
    nameEnemy.innerText = `${name.name}`;
    let hpEnemy = document.querySelector(`#hpEnemy`);
    hpEnemy.innerText="HP:" + hP;
    //variables de objetivo
    objetivoName = name.name;
    objetivoPosition = name;
    defendName = defend;

    //quitar todas las selecciones
    removeSelectEnemy();
    //agregar la nueva
    let selected=document.querySelector(`#enemy${columna}`);
    selected.classList.add("columnaN2-hover");
}
const removeSelectEnemy=()=>{
    let select1=document.querySelector(`#enemy1`);
    select1.classList.remove("columnaN2-hover");
    let select2=document.querySelector(`#enemy2`);
    select2.classList.remove("columnaN2-hover");
    let select3=document.querySelector(`#enemy3`);
    select3.classList.remove("columnaN2-hover");
}
//showContentEnemy(esqueletoEscudero.name,'hpEnemy1');
const showEnemy=()=>{
    document.querySelector(`#statsEnemy`).style.display = ``;
}
const hideEnemy=()=>{
    document.querySelector(`#statsEnemy`).style.display = `none`;
}
//Boton de combate
const showButton=()=>{
    document.querySelector('#buttonCombat').style.display = ``;
}
const hideButton=()=>{
    document.querySelector('#buttonCombat').style.display = `none`;
}
hideButton();

//-----------------------------------------------------------//
//-------------------------animacion-------------------------//
//funciones de animacion
const mostrarAnimaciones=()=>{
    //esconder unidades
    $('#position1').hide();
    $('#position2').hide();
    $('#position3').hide();
    $('#enemy1').hide();
    $('#enemy2').hide();
    $('#enemy3').hide();
    //mostrar unidades seleccionadas
    $('.animacionHero').show();
    $('.animacionEnemy').show();
}
const ocultarAnimaciones=()=>{
    $('.animacionHero').hide();
    $('.animacionHeroEfecto').hide();
    $('.animacionEnemy').hide();
    $('#position1').show();
    $('#position2').show();
    $('#position3').show();
    $('#enemy1').show();
    $('#enemy2').show();
    $('#enemy3').show();
}
const animacionDeAtaque=()=>{
    //animacion heroe
    $('.animacionHero').animate({
       'margin-left': '150',
   }, 600, ()=>{
       $('.animacionHero').animate({
           'margin-left': '210',
        }, 1000);
    });

     //animacion heroe efecto
     $('.animacionHeroEfecto').animate({
        /*filter: opacity(.5),*/
    }, 600,()=>{
        $('.animacionHeroEfecto').delay(500,()=>{
            $('.animacionHeroEfecto').animate({
                /*opacity: '0',*/
            }, 900);
        });
    });

   //animacion enemigo
   $('.animacionEnemy').animate({
       'margin-right': '-50',
   }, 700);
   $('.animacionEnemy').animate({
       'margin-right': '-90',
   }, 1000);
   
   //animacion background
   $('.battle').animate({
      'background-size': '2300',
   },1000);
       $('.battle').animate({
          'background-size': '1600',
       },1000, function(){
           ocultarAnimaciones();
       });
}
//-----------------------------------------------------------//
//-----------------------heroes-skills-----------------------//
const skillAnimation=(skill, chapter, animHeroe, classHero, animSkill, classAnim, style)=>{ 
        //audio
       $(`${skill}`).get(0).play();
        //esconder unidades
        mostrarAnimaciones();
        //posicion de ataque
        $('.animacionHero').empty().append(`<img ${style} class="${classHero}" src="assets/images/chapters/${chapter}/animacion/${animHeroe}.png"/>`);
        $('.animacionHeroEfecto').empty().append(`<img class="${classAnim}" src="assets/images/chapters/${chapter}/animacion/${animSkill}.png"></img>`);        
        //posicion de defensa enemigo
        enemyDefend(defendName);
        //animacion heroe
        animacionDeAtaque();
}
//barbaraSkill2animacion('#barbaraSkill2', 'barbara', 'helion_attack', 'animacion-barbara-skill-1-body', 'animacion_attack', 'animacion-barbara-skill-1-anim')

//--------------posiciones-de-defensa-enemigos---------------//
const enemyDefend=(a)=>{
    switch (a) {
        case 'esqueletoEscudero':
            $('.animacionEnemy').empty().append('<img src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_defend.png"/>');
            break;
        case 'esqueletoGuerrero':
            $('.animacionEnemy').empty().append('<img src="assets/images/enemys/ruinas/esqueletoGuerrero/skeleton_defend.png"/>');
            break;
        default:
            $('.animacionEnemy').empty().append('<img src="assets/images/enemys/ruinas/esqueletoArbalestero/arbalist_defend.png"/>');
            break;
    }
}

//-----------------------------------------------------------//
//--------------------enemy-attack---------------------------//
const enemyAnimation=(song,monster,animEnemy, classEnemy, animSkill, classAnim, style)=>{
    //audio
    $(`${song}`).get(0).play();
    //esconder unidades
    mostrarAnimaciones();
    //posicion normal
    $('.animacionEnemy').empty().append('<img src="assets/images/enemys/ruinas/esqueletoEscudero/skeleton_defender_defend.png"/>');
    $('.animacionEnemy').animate({ 
        right: '810',
    },200, ()=>{
        //posicion de ataque
        $('.animacionEnemy').empty().append(`<img ${style} class="${classEnemy}" src="assets/images//enemys/ruinas/${monster}/${animEnemy}.png"/>`);
        $('.animacionHeroEfecto').empty().append(`<img class="${classAnim}" src="assets/images//enemys/ruinas/${monster}/${animSkill}.png"></img>`);        
        //animacion enemy
        $('.animacionEnemy').animate({
            right: '880',
        }, 600, ()=>{
            $('.animacionEnemy').animate({
               right: '900',
            }, 1400);
        });
    })
    
    //animacion enemigo efecto
    $('.animacionEnemyEfecto').animate({
        /*filter: opacity(.5),*/
    }, 600,()=>{
        $('.animacionEnemyEfecto').delay(500,()=>{
            $('.animacionEnemyEfecto').animate({
                /*opacity: '0',*/
            }, 900);
        });
    });

    //animacion heroe
    $('.animacionHero').animate({
        left: '-470',
    }, 1600);
    /*
    $('.animacionHero').animate({
        left: '-490',
    }, 1000);
    */
   
    //animacion background
    $('.battle').animate({
        'background-size': '2300',
    },1000);
        $('.battle').animate({
            'background-size': '1600',
        },1000, function(){
            ocultarAnimaciones();

           // $('.animacionEnemy').empty().append(`<img class='lenght' style= "height: 410px width: 40px float: right position: relative; right: 720px"src="assets/images/otros/caos_entropico.gif" alt="entropia">`);
            
            //$('.animacionHero')
            
            //$('.animacionEnemyEfecto')
        });
   
      //posicion de defensa enemigo
      //heroDefend('cruzado');
}
//enemyAnimation('esqEscuderoSkill1','esqueletoEscudero','sk_shield','animacion-sk-escudero-skill-1-body','','animacion-sk-escudero-skill-1-anim', `style= 'height: px'`)
//---------------posiciones-de-defensa-heroes----------------//
const heroDefend=(a)=>{
    switch (a){
        case 'cruzado':
            $('.animacionHero').empty().append('<img style= "height: 490px" class="animacion-hero-enemy" src="assets/images/chapters/cruzado/animacion/crusader_defend.png">');
            break;
        case 'barbara':
            $('.animacionHero').empty().append('<img src="assets/images/chapters/barbara/animacion/hellion_defend.png">');
            break;
        case 'arbalestera':
            $('.animacionHero').empty().append('<img src="assets/images/chapters/arbalestera/animacion/arbalestera_defend.png">');
            break;
        default:
            break;
    }
}






//camibar escenario
const cambiarEscenario=()=>{
    $('#battle-hall').remove('.battle');
    $('#battle-hall').add('.map');
}