
//Canvas y sus medidas, ancho, alto, posición x e y del canvas

//////////////////////////////////////////////////////////////////////
let canvas , canvas_0;
let dimCanvas       = { 
                        'alto'    : 400 ,     'ancho'   : 600 , 
                        'x'       : 60,       'y'       : 50 , 
                        'xCentro' : 0,        'yCentro' : 0
                      };
let dimCanvas_0 = dimCanvas;

//Márgenes en la ventana general
let margenCanvas    = {'pie': 60 , 'izq': 10 , 'der': 20, 'cabe': 50  };


//Campo input de una Tx
//let txtIdTx ;

//Diccionario de datos
//////////////////////////////////////////////////////////////////////
let arbolTxsAddrs   = [{   
                        'idNivel'   : "0" ,       'io'        : '' , 
                        'nivel'     : 1 ,         'totRecibi' : 0, 
                        'angulo'    : 0 ,         'distancia' : 0,
                        'time'      : 0 , 
                        'rama'      : [ "tx1", "addr" , "tx2"] 
                      }];

let multiTxs        = [{ 
                        'id'        : 0, 
                        'rama'      : [ "tx1", "addr" , "tx2"], 
                      }];                      

let posiTxs         = [{    
                         'idTx'       : 0 ,        
                         'x'          : -2000,     
                         'y'          : -2000, 
                         'xCentro'    : -2100,     
                         'yCentro'    : -2050, 
                         'weight'     : 2,
                         'io'         : ''  ,         
                         'tagTx'      : "",     
                         'estado'     : 'inicial',
                         'color'      : {'r':77, 'g':77, 'b':77},
                         'bgColor'    : {'r':127, 'g':127, 'b':127},
                         'movido'     : false,
                         'blockHeight': 0,
                         'value'      : 0,
                         'numVin'     : 0,
                         'numVout'    : 0,
                         'blockTime'  : 0,
                         'fees'       : 0,
                      }];    

let posiAddrs       = [{
                         'idAddr'    : 0,   
                         'io'        : 'O'   ,      
                         'idTx1'     : "",        
                         'idTx2'     : "" ,
                         'tagAddr'   : "", 
                         'estado'    : 'inicial',
                         'x1'        : 0,         
                         'y1'        : 0,  
                         'x2'        : 0,         
                         'y2'        : 0, 
                         'angulo'    : 0 ,         
                         'distancia' : 0,
                         'ancho'     : 7,        
                         'color'     : {'r':77, 'g':77, 'b':77}, 
                         'bgColor'   : {'r':127, 'g':127, 'b':127},
                         'movido'    : false, 
                         'value'     : 0,
                         
                      }];               

let txOrigen        = [];  

let maxMinTx        = { 
                        'minX'    :999999999 ,    'maxX'    : 0, 
                        'minY'    :999999999 ,    'maxY'    : 0, 
                        'xCentro' : 0,            'yCentro' : 0 
                      };

let txsCirculoRojo  = [{
                          'idTx' : 0,
                          'x' : 0 , 'y' : 0 , 'radio' : 0 
                      }];

let txsPulsadas     = []; 
let txsSeleccionados;                   

//Instancias de clases
//////////////////////////////////////////////////////////////////////
let myConex           = new Conex();
let myCanvas          = new Canvas();
let myVentana         = new Ventana();
let ayudaVentana      = new Ventana();
let myBchain          = new Bchain();

//Array de índices entre arbolTxsAddrs y posiTxs, posiAddrs y MultiTxs                      
let indexArbolTxs   ;
let indexArbolAddrs ;
let indexArbolMulti ;

//Parametros
let radioSatelites    = 150;
let anchoTx           = 200;
let altoTx            = 100;
// let relAspectoTx      = anchoTx / altoTx;
let numLineasTx       = 5;
let margenIzqTx       = 20;

//Variables semaforo
let moviendoTx;
let mostrandoAyuda;
let muestraOpciones;
let mostrarRayado;
let mostrarSombra;
let mostarEliminar;
let mostarLineas;
let mostarInfo;
//let semaforos = {};
let aplicaZoom;

//Semaforo de imprimir, solo true cuando cambia algo en el canvas NO UTILIZADO
//let imprimeUnaVez     = true;
let muestraPie;
let muestraVideo;



//Variables globales
let mouseXIni;
let mouseYIni;
let mouseXFin;
let mouseYFin;
let txEnMovimiento;           //Tx que se está moviendo (cuando solamente se mueva una Tx)
let idTxEnMovimiento;
let textoSize ;
let textoEspaciado;

//Inputs
let inputTx, botonBuscar, nombreApp, literalPie;
let canvasInputTx, canvasTrab;
let divAyuda;
//let divAyudaVideo;
let divOpciones;
let divGifAnimado;
let ventanaPie;

let botonRayado;
let botonSelec;
let botonCentra;
let botonSombra;
let botonElimina;
let botonLineas;
let botonInfo;
let textTx;
let textAddr;
let sliderTx;
let sliderAddr;
let botonImprimir;
let botonVideo;

//Informacion MouseOver
let estadoInfoTxAddr;
let ratonSobreElemento;
let elementoAnterior;


//Variables del zoom
let sf                = 1; // scaleFactor
let radioCirculoRojo  = 15

//Edit Tags
let inputTags  ;
let jj;
let buttonTag ;

//Paleta de 7 colores
let buttonColor1, buttonColor2, buttonColor3, buttonColor4, buttonColor5, buttonColor6, buttonColor7;
let anchoRectColor    = 35;

//Eliminar
let marcaParaEliminar;

//Area de trabajo
let estadoAreaSelec;




//Transación y Dirección de partida
let idTx ;
idTx                = "1d053e14643494a05e9a4279c42ec9f8924d52100e2e229c5e0174742d50e912";
//idTx                ='7e6070be5b6b7ac8ae300d9604cda631064f2d3125e2eeb7ba89718c38334506';
 

let imagenBg;

//Vídeos de Ayuda
let playing;
let literalAyuda;
let pantallaVideo;
let yPantallaVideo;
let botonPlay;
//Sitio de alojamiento de los vídeos
let sitioVideosAyuda ;
//let bAyudaDespImp ;
let videoTrab  ;


//Tratamiento del estado
let previousState;
let stateIndex = 0;
let state = [];


function preload()                                    {
  imagenBg = loadImage('https://b2p5.github.io/excabit/media/fondoPantalla.jpg');
}//fin function preload


function setup()                                      {


  //Pantalla de entrada
  canvasInputTx     = myCanvas.putCanvas_0 ();


  //Elementos de la primera página
  nombreApp         = createP('Explorador de la Cadena de Bitcoin ( excabit )');
  nombreApp.position(canvasInputTx.xCentro - 400 ,  canvasInputTx.yCentro - 80);
  nombreApp.addClass("nombreApp");


  inputTx           = createInput();
  inputTx.size(722);
  inputTx.position(canvasInputTx.xCentro - 400 ,  canvasInputTx.yCentro);
  inputTx.addClass("inputTx");
  inputTx.value( idTx);

  botonBuscar       = createButton('Go');
  botonBuscar.position(canvasInputTx.xCentro + 350 ,  canvasInputTx.yCentro);
  botonBuscar.addClass("botonBuscar");
  botonBuscar.mousePressed(getTx);

  literalPie         = createP(
                               'Tx de prueba. Puede seleccionar otro Tx.<br> ' +
                               'Resolución mínima de pantalla 1280*520 píxeles. <br> ' +
                               'En botón <b>Ayuda</b>, en la siguiente pantalla, tiene información sobre el manejo de excabit.' 
                              );
  literalPie.position(canvasInputTx.xCentro - 400 ,  canvasInputTx.yCentro + 37);
  literalPie.addClass("literalPie");

  
  //Inicializamos botones Ayuda y Opciones de Cabecera
  ///myBchain.contenidoAyuda(0 , 0);

  myVentana.oculta();
  ayudaVentana.oculta();

  ////////////document.getElementById("div_ayuda").style.visibility = 'visible';

  //Botones de pie de página
  botonRayado       = createButton('cuadrícula');
  botonRayado.addClass("botonRayado");
  botonSelec        = createButton('selec.');
  botonSelec.addClass("botonSelec");
  botonCentra       = createButton('centrar');
  botonCentra.addClass("botonCentra");
  botonSombra       = createButton('sombra');
  botonSombra.addClass("botonSombra");
  botonElimina      = createButton('eliminar');
  botonElimina.addClass("botonElimina");
  botonLineas       = createButton('alinear');
  botonLineas.addClass("botonLineas");
  botonInfo         = createButton('con info.');
  botonInfo.addClass("botonInfo");  
  botonImprimir       = createButton('imprimir');
  botonImprimir.addClass("botonImprimir");  
  botonVideo       = createButton('vídeo');
  botonVideo.addClass("botonVideo");   

  textTx            = createElement('h5', 'Tx: ');
  textTx.addClass("textTx");
  sliderTx          = createSlider(20, 300, anchoTx, 5);
  sliderTx.addClass("sliderTx");
  sliderTx.value(anchoTx);

  textAddr          = createElement('h5', 'Addr: ');
  textAddr.addClass("textAddr");
  sliderAddr        = createSlider(100, 400, radioSatelites, 5); 
  sliderAddr.addClass("sliderAddr");
  sliderAddr.value( radioSatelites);

  //Titles de los botones
  botonRayado.attribute('title' ,   "Muestra / Oculta la cuadrícula en el canvas. " );
  botonSelec.attribute('title' ,    "Selecciona todos los Txs o desselecciona Txs seleccionados. " );
  botonCentra.attribute('title' ,   "Centra el gráfico en pantalla. " );
  botonSombra.attribute('title' ,   "Añade / Elimina sombra en Txs y Addrs. " );
  botonElimina.attribute('title' ,  "Marca / Desmarce (botón rojo) todos los Txs para eliminar. " );
  botonLineas.attribute('title' ,   "Muestra / Oculta línea blanca de alineación entre cajas de Txs. " );
  botonInfo.attribute('title' ,     "Muestra / Oculta caja de información de Txs y Addrs. " );
  sliderTx.attribute('title' ,      "Aumenta / Reduce tamaño de la caja de Tx. " );
  sliderAddr.attribute('title' ,    "Aumenta / Reduce la distancia entre Txs.  " );
  botonImprimir.attribute('title' , "Imprime el canvas. " );
  botonVideo.attribute('title' ,    "Muestra controles para grabar vídeo. " );



  //Gif animado de descarga
  divGifAnimado     = createDiv('downloading...');
  divGifAnimado.addClass("divGifAnimado");
  divGifAnimado.position(myCanvas.dimCanvas.ancho - textWidth('downloading...' ) - 50, 99);
  divGifAnimado.hide(); 

  //Crea input para etiquetas
  inputTags         = createInput();
  buttonTag         = createButton('ok');
  buttonTag.addClass("buttonTag");

  buttonColor1      = createButton('-');
  buttonColor2      = createButton('-');
  buttonColor3      = createButton('-');
  buttonColor4      = createButton('-');
  buttonColor5      = createButton('-');
  buttonColor6      = createButton('-');
  buttonColor7      = createButton('-');
  buttonColor1.addClass("buttonColor");
  buttonColor2.addClass("buttonColor");
  buttonColor3.addClass("buttonColor");
  buttonColor4.addClass("buttonColor");
  buttonColor5.addClass("buttonColor");
  buttonColor6.addClass("buttonColor");
  buttonColor7.addClass("buttonColor7");


  myBchain.mueveFueraColorTag();


  divAyuda        = createElement('div') ;
  divAyuda.addClass("divAyuda");
  divAyuda.id("idDivAyuda");
  divAyuda.position(-20000 ,  -20000);

  literalAyuda    = createP('Vídeos de Ayuda');
  literalAyuda.addClass("literalAyuda");
  literalAyuda.id("idLiteralAyuda");
  literalAyuda.position(-20000 ,  -20000);

  botonPlay       = createButton('play');
  botonPlay.addClass("botonPlay");
  botonPlay.id("idBotonPlay");
  botonPlay.position(-20000 ,  -20000);



  //Inicializamos Arrays
  arbolTxsAddrs     = Array();
  posiTxs           = Array();
  posiAddrs         = Array();
  multiTxs          = Array();

  indexArbolTxs     = Array();
  indexArbolAddrs   = Array();
  indexArbolMulti   = Array();

  txsSeleccionados  = Array();
  txsPulsadas       = Array();

  //Semáforos
  moviendoTx        = false;
  mostrandoAyuda    = false;
  muestraOpciones   = false;
  mostrarRayado     = true;
  mostrarSombra     = false;
  marcaParaEliminar = false;
  mostarEliminar    = false;
  mostarLineas      = true;
  mostarInfo        = true;  
  muestraPie        = true;
  muestraVideo      = true;

  estadoInfoTxAddr  = true;  //De momento parado, no funciona bien
  ratonSobreElemento= 0;
  elementoAnterior  = 0;

  //Select Tx dentro de un área
  estadoAreaSelec   = 0;


  //Arrancamos instancia de captura de vídeo
  P5Capture.getInstance();

  sitioVideosAyuda = 'https://b2p5.github.io/excabit/media/videosAyuda/';
  yPantallaVideo   = 140;

  //Arranca Estado -- Ctrl + Z
  saveState();

  //frameRate(7);

}//fin function setup


async function draw()                                 {
  
  //Seleccionar área
  if( estadoAreaSelec ){
    
    //Arranca el área
    if(estadoAreaSelec == 1 ){

      //Quitar Info, con Info no funciona
      if(mostarInfo){
        mostarInfo = false;
        botonInfo.html('sin info.');
      }//fin if(mostarInfo){
        
      mouseXFin   = mouseX;
      mouseYFin   = mouseY;

      myBchain.dibujaTxsAddrs();

      push();
      fill(200,200,200,100);
      stroke('gray');
      strokeWeight(0.7)
      rect ( mouseXIni , mouseYIni ,  mouseXFin -mouseXIni  ,  mouseYFin - mouseYIni );
      pop();

    }//fin  if(estadoAreaSelec == 1 


    //Finaliza el área
    if(estadoAreaSelec == 2 ){

      myBchain.txsDentroArea();
      myBchain.dibujaTxsAddrs();

      //Volvemos a estado 0 
      estadoAreaSelec = 0;

      //Mostramos info
      mostarInfo = true;
      botonInfo.html('con info.');
          
    }//fin  if(estadoAreaSelec == 2  




  }//fin if(estadoAreaSelec > 0

  //Mostrar información de TX y Addr
  if(estadoInfoTxAddr){

    if(mostarInfo) {

      ratonSobreElemento = myBchain.informacionTxAddr();

      if ( ratonSobreElemento != elementoAnterior ) {
        myBchain.dibujaTxsAddrs();

        //frameRate(35);

      }//fin if ( ratonSobreElemento != elementoAnterior 

      elementoAnterior = ratonSobreElemento;

    }//fin if(mostarInfo)

  }//fin estadoInfoTxAddr

  //Hacemos zoom del canvas
  if (aplicaZoom) {

    //Redimensiona alto, ancho y radio al centro de las cajas de Tx y radio círculo rojo
    radioCirculoRojo  *= sf;
    radioSatelites    *= sf
    sliderAddr.value( radioSatelites );
    
    altoTx               *=  sf;
    anchoTx              *=  sf;   
    //Actualizaos Slider
    sliderTx.value(anchoTx);     
    

    for(let i=0; i<posiTxs.length; i++) {

      //Posiciones x, y con zoom
      posiTxs[i].x         *=  sf;
      posiTxs[i].y         *=  sf;

      // Posiciones del centro con zoom
      posiTxs[i].xCentro    = int(posiTxs[i].x + (anchoTx / 2)) ;
      posiTxs[i].yCentro    = int(posiTxs[i].y + (altoTx  / 2)) ;

      //posiTxs[i].movido     = true;

      myBchain.recalculaZoomTxAddr( posiTxs[i], i );

    }//fin for(let i=0; i<posiTxs.length; i++)

      
    //Centrar antes de hacer zoom
    myBchain.centrarTxsAddrs();


    //Ocultamos ventana de ayuda
    ayudaVentana.oculta();
    mostrandoAyuda      = false;


    myBchain.dibujaTxsAddrs();

    aplicaZoom = false;
    
  }//fin if (aplicaZoom)

  
  //Movimiento de una Tx o Txs seleccionados
  if (moviendoTx){
    

    //Ocultamos ventana de ayuda
    ayudaVentana.oculta();
    mostrandoAyuda      = false;

    
    if( txsSeleccionados.length > 0 ){ 

      //Si hay varios Txs seleccionados
      myBchain.recalculaTxsSeleccionados( txsSeleccionados );

      myBchain.dibujaTxsAddrs();

    
    } else {    
      
      //Si solamente se mueve un Tx 
      myBchain.recalculaTxAddr(txEnMovimiento, idTxEnMovimiento);

      myBchain.dibujaTxsAddrs();

      if (mostarLineas) myBchain.dibujaLineasCentrado(idTxEnMovimiento);

    }//fin if( txsSeleccionados.length > 0


  }//fin if (moviendoTx)


}//fin async function draw()  




//Eventos => doble click,  mousedown
///////////////////////////////////////////////////////////////

window.addEventListener("dblclick", async function(e) {
       
  for(let i=0; i<posiTxs.length; i++) {

    let idTxADesplegar = myBchain.estaDentroTx ( posiTxs[i] );
        
    if ( idTxADesplegar ){
    
      //Comprobar si es un UTXO
      let esUnMultiTx = false;
      if(idTxADesplegar.substring(0, 8) == 'Multi Tx'){
        esUnMultiTx = true;
      }//fin if(idTxADesplegar.substring(0, 8) == 'Multi Tx'

  
      //Si no es un UTXO
      if( !esUnMultiTx ){

        //Ocultamos ventana de ayuda
        mostrandoAyuda      = false;

        //Cambiamos color Tx pinchada
        posiTxs[i].bgColor = {'r':232, 'g':132, 'b':32};


        await myBchain.getDatos    ( idTxADesplegar, i );
              myBchain.putTxsAddrs ( idTxADesplegar );
              myBchain.dibujaTxsAddrs();

              divGifAnimado.hide();

        if ( !txsPulsadas.includes(idTxADesplegar) ) txsPulsadas.push(idTxADesplegar);     

      }//fin if(!esUnMultiTx)
      
      //Hemos encontrado un Tx y salimos del bucle for
      break;

    }//fin if ( idTxADesplegar )
    
  }// fin de for(let i=0; i<allTx.length; i++
    
});  //fin window.addEventListener("dblclick",         ===>  Despliega Txs hijos

window.addEventListener("mousedown",      function(e) {

    for(let i=0; i<posiTxs.length; i++) {

      txEnMovimiento = myBchain.estaDentroTx (  posiTxs[i] );
          
      if ( txEnMovimiento ){

        //Semaforos
        moviendoTx          = true;


        //Indice de la Tx en movimiento
        idTxEnMovimiento = i;
        
        //recogemos la posición inicial del mouse
        mouseXIni   = mouseX;
        mouseYIni   = mouseY;
      
        //Ponemos semaforo de movido = true
        posiTxs[i].movido = true;

        //Hemos encontrado un Tx y salimos del bucle for
        break;

      }//fin if ( txEnMovimiento )

    }// fin de for(let i=0; i<allTx.length; i++

    
});  //fin window.addEventListener("mousedown",        ===>  Mueve un Tx o Txs seleccionados

window.addEventListener("click",          function(e) {

  //shiftKey + click   ===> SELECCIONA
  if (e.shiftKey) {

    for(let i=0; i<posiTxs.length; i++) {

      let idTxSeleccionado = myBchain.estaDentroTx ( posiTxs[i] );
          
      if ( idTxSeleccionado ) {


        //Ocultamos ventana de ayuda
        mostrandoAyuda      = false;
        ayudaVentana.oculta();


        let seleElemen = txsSeleccionados.indexOf(idTxSeleccionado);
        
        if ( seleElemen == -1 ){ 
          txsSeleccionados.push(idTxSeleccionado);
          posiTxs[i].color  = {'r':255,  'g':77,  'b':77};
          posiTxs[i].weight = 4;

        } else {
          txsSeleccionados.splice( seleElemen, 1 );
          posiTxs[i].color  = {'r':77,  'g':77,  'b':77};
          posiTxs[i].weight = 2;

        }//fin if (!seleElemen)

        if(txsSeleccionados.length > 0){
          botonSelec.html('unSelec.');
        }else{
          botonSelec.html('selec.');
          
        }//fin if(txsSeleccionados.length > 0

        myBchain.dibujaTxsAddrs();

      }//fin if (( idTxSeleccionado ) && 

    }//fin for(let i=0; i<posiTxs.length; i
    
  }//fin if (e.shiftKey)

}); //fin window.addEventListener("click",             ===>  shiftKey -> SELECCIONA

window.addEventListener("click",          function(e) {


  if ( ( keyIsPressed == true) && 
    ( key === 'i' || key === 'I' )
  ){ 


    //Tx
    //////////////////////////////////////////////////////////////////////
    let idTxOver;

    for(let i=0; i<posiTxs.length; i++) {

      idTxOver = myBchain.estaDentroTx ( posiTxs[i] );
      if ( idTxOver ){

        //Ocultamos ventana de ayuda
        mostrandoAyuda      = false;
        ayudaVentana.oculta();        


        //Muestra ventana con info de Tx
        myBchain.muestraVentanaTx (idTxOver , i);

        return;

      }//fin if ( idTxOver )

    }// fin de for(let i=0; i<posiTxs.length; i++)  

    
    //Addr
    //////////////////////////////////////////////////////////////////////
    let idAddrOver;

    for(let i=0; i<posiAddrs.length; i++) {

      idAddrOver = myBchain.estaDentroAddr ( posiAddrs[i] );
      if ( idAddrOver ){

        //Muestra ventana con info de Tx
        myBchain.muestraVentanaAddr (idAddrOver , i);

        return;

      }//fin if ( idAddrOver )

    }// fin de for(let i=0; i<posiTxs.length; i++)  
    

  }//fin if ( ( keyIsPressed == true)

});  //fin window.addEventListener("click",  + i o I   ===> i o I  INFORMACION 

window.addEventListener("wheel",          function(e) {

  if (mostrandoAyuda) return;
  aplicaZoom        = true;

  myBchain.mueveFueraColorTag();
    
  if (e.deltaY > 0){
    sf = 1.03;
  }else if (e.deltaY < 0){
    sf = 0.97;
  }if (e.deltaY == 0){
    aplicaZoom        = false;
  }//fin if (e.deltaY > 0)

});// fin window.addEventListener("wheel",             ===> wheel ZOOM

window.addEventListener("click",          function(e) {
  
  //ctrl + click  ===> TAG
  if (e.ctrlKey) {
    
    // imprimeUnaVez     = true;
    // marcaParaEliminar = false;

    myBchain.mueveFueraColorTag();

    for(let i=0; i<posiTxs.length; i++) {

      let txEditTag = myBchain.estaDentroTx (    posiTxs[i] );

      if(txEditTag){

        //Quitar Info, con Info no funciona
        if(mostarInfo){
          mostarInfo = false;
          botonInfo.html('sin info.');
        }//fin if(mostarInfo){


        txtTag = myBchain.editTagTx ( txEditTag );

        break;

      }//fin if(txEditTag)

    }//fin for(let i=0; i<posiTxs.length; i++)
    
  }//fin if (e.ctrlKey) 

});  //fin window.addEventListener("click",            ===>  ctrlKey TAG

window.addEventListener("click",          function(e) {
  
  //alt + click   ===> COLOR
  if (e.altKey) {

    // imprimeUnaVez     = true;
    // marcaParaEliminar = false;
    

    myBchain.mueveFueraColorTag();

    for(let i=0; i<posiTxs.length; i++) {

      let txEditColor = myBchain.estaDentroTx ( posiTxs[i] );

      if(txEditColor){

        //Quitar Info, con Info no funciona
        if(mostarInfo){
          mostarInfo = false;
          botonInfo.html('sin info.');
        }//fin if(mostarInfo){


        txtTag = myBchain.editColorTx ( txEditColor );

        break;

      }//fin if(txEditColor)

    }//fin for(let i=0; i<posiTxs.length; i++)
    
  }//fin if (e.altKey) 

});  //fin window.addEventListener("click",            ===>  altKey COLOR

window.addEventListener("mousedown",      function(e) {
           
  // d/D + mousedown  ===> Eliminar
  if ( ( keyIsPressed == true) && 
             ( key === 'd' || key === 'D' )
           ){

      //Ocultamos ventana de ayuda
      mostrandoAyuda      = false;
      ayudaVentana.oculta();

      myBchain.muestraOcultaElimina();


  }//fin if ( ( keyIsPressed == true)

});  //fin window.addEventListener("mousedown",        ===>  Círculo para ELIMINAR

window.addEventListener("click",          function(e) {
  
  //Elimina Txs y Addrs definitivamente
  if(marcaParaEliminar)                               { 

    // imprimeUnaVez = true;

    myBchain.eliminaTxAddr();

        
  }//fin if(marcaParaEliminar)
  

});  //fin window.addEventListener("click",            ===>  ELIMINA

window.addEventListener("click",          function(e) {

  if ( ( keyIsPressed == true) && 
      ( key === 'p' || key === 'P' )
    ){ 

    //OJO repetido en clase lin. 1630
    muestraPie        = false;
    myBchain.dibujaTxsAddrs();

    let today = new Date();
    let date = today.getDate()  + '-' + (today.getMonth()+1)+ '-' + (today.getFullYear()).toString().substr(-2)+' ' +
               today.getHours() + ":" +  today.getMinutes() + ":" + today.getSeconds();

    saveCanvas(canvas, date+ ' ' + idTx, 'png');

    muestraPie        = true;
    myBchain.dibujaTxsAddrs();

    // imprimeUnaVez = false;

  }//fin if ((e.key == 'p')|| (e.key == 'P'))
    
});// fin window.addEventListener("wheel",             ===> p o P  IMPRIMIR

window.addEventListener("mousedown",      function(e) {

  if ( ( keyIsPressed == true) && 
    ( key === 'z' || key === 'Z' )
  ){   

    
    if(estadoAreaSelec == 0 ){
      mouseXIni   = mouseX;
      mouseYIni   = mouseY;
      estadoAreaSelec = 1;

    }//fin if(estadoAreaSelec == 0

  }//fin if ( ( keyIsPressed == true


});// fin window.addEventListener("wheel",             ===>  AREA PARA SELECCIONAR

window.addEventListener("click",          function(e) {

  if ( ( keyIsPressed == true) && 
      ( key === 'v' || key === 'V' )
    ){ 

      myBchain.controlesGrabaVideo();

  }//fin if ( keyIsPressed == true) ((e.key == 'v')|| (e.key == 'V'))
    
});// fin window.addEventListener("wheel",             ===> v o V  VIDEO

window.addEventListener("click",          function(e) {

  if ( ( keyIsPressed == true) && 
      ( key === 'm' || key === 'M' )
    ){ 

      //   V 2   myBchain.intersecionTxs();

  }//fin if ( keyIsPressed == true)( key === 'm' || key === 'M' )
    
});// fin window.addEventListener("wheel",             ===> m o M  MOVER Txs automaticamente


//Deshacer efectos de presionar raton
/////////////////////////////////////////////////////////////////////////////

window.addEventListener("mouseup",        function(e) {

  myBchain.desactivaDraw();

  //Levanta click en seleccionar Area
  if(estadoAreaSelec == 1 ){
    mouseXFin   = mouseX;
    mouseYFin   = mouseY;
    estadoAreaSelec = 2;

  }// fin if(estadoAreaSelec == 1


});  //fin window.addEventListener("mouseup",          ===> Deshacer click , dblclick, mousedown etc




//Funciones => windowResized,   mouseReleased, getTx muestraAyuda,  
///////////////////////////////////////////////////////////////

function mouseReleased()                              {

  //Igual que addEventListener("mouseup",

  myBchain.desactivaDraw();

  //Levanta click en seleccionar Area
  if(estadoAreaSelec == 1 ){
    mouseXFin   = mouseX;
    mouseYFin   = mouseY;
    estadoAreaSelec = 2;

  }// fin if(estadoAreaSelec == 1

}  //fin function mouseReleased()                      ===> Deshacer click , dblclick, mousedown etc

function windowResized()                              {
  resizeCanvas( windowWidth - margenCanvas.der, windowHeight - margenCanvas.pie );
  canvas.position( margenCanvas.izq, margenCanvas.cabe );   


  //Ocultamos ventana de ayuda
  myVentana.oculta();  
  ayudaVentana.oculta();
  mostrandoAyuda      = false;

  myBchain.dibujaTxsAddrs();

}//fin function windowResized


function getTx()                                      {


  //Ocultamos ventana de ayuda
  myVentana.oculta();  
  ayudaVentana.oculta();
  mostrandoAyuda      = false;  
    
  //Recoge valor del Tx original de la primera pantalla
  idTx = inputTx.value();

  //Lo ponemos en txtIdTx
  document.getElementById("txtIdTx").innerHTML = idTx ;

  //Mostramos cabecera, logo, título, Tx, ayuda
  document.getElementById("container").style.visibility = 'visible';
  
  //Escondemos inputTx, nombreApp y botonBuscar de la primera pantalla
  inputTx.position(-20000, -20000);
  botonBuscar.position(-20000, -20000);
  nombreApp.position(-20000, -20000);
  literalPie.position(-20000, -20000);

  background(222);

  //Cambia a canvas de trabajo
  canvasTrab = myCanvas.putCanvas();
  
  //Rastrea si nos colocamos sobre algún elemento
  //canvasTrab.mouseOver( mouseOverTxAddr );

  //Ancho, alto y radio de los Tx
  myBchain.putAnchoAlto(200, 100, 250);

  //posiTxs de arranque, original o inicial
  myBchain.putTxInicial(idTx);
  myBchain.dibujaTxsAddrs();



}//fin function getTx()

function muestraAyuda(video , origen)   {

  if (origen == 'cabecera'){
    myBchain.muestraAyuda(video);

  }else if (origen == 'contenidoAyuda'){
    mostrandoAyuda  = !mostrandoAyuda;
    myBchain.muestraAyuda(video);

  }

  

  // if (video){
  //   mostrandoAyuda  = false;
  //   myBchain.muestraAyuda(video);

  // }else{
  //   myBchain.muestraAyuda('presentacionExcabit.mp4');

  // }


}//fin function muestraAyuda




////////////////////////////////////////////////////////////////////////////////////////
////////Tratamiento del estado -- Solo salva la imagen, no los datos
////////////////////////////////////////////////////////////////////////////////////////
function keyPressed(e) {
    // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
    if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
      undoToPreviousState();
    }
}

function undoToPreviousState() {
  if (!state || !state.length || stateIndex === 0) {
    return;
  }

  stateIndex--;
  
  background(200);
  image(state[stateIndex], 0, 0);
}

function mousePressed() {
  saveState();
}

function saveState() {
  stateIndex++;

  loadPixels();
  state.push(get())
}


