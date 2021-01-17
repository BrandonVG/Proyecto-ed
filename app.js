var entrada = document.querySelector("#entrada");
var boton = document.querySelector("#boton");
var resultados = document.querySelector("#resultado");
var resutado2 = document.querySelector("#resultado2");
class Nodo{
    constructor(valor){
        this.valor = valor;
        this.hijoizq = null;
        this.hijoder = null;
    }
}
class Arbol {
    constructor(){
        this.raiz = null
    }
    crear(nodo){
        this.raiz = nodo;
    }
    preOrder(nodo,fn){
        if (nodo == null){
            return;
        }
        else{
            fn.call(null,nodo);
            this.preOrder(nodo.hijoizq,fn);
            this.preOrder(nodo.hijoder,fn);
        }
    }
    postOrder(nodo,fn){
        if (nodo == null){
            return;
        }
        else{
            this.postOrder(nodo.hijoizq,fn);
            this.postOrder(nodo.hijoder,fn);
            fn.call(null,nodo);
        }
    }
}
var arbol = new Arbol();
boton.addEventListener("click",()=>{
    var expresion = entrada.value;
    var vector = expresion.split("");
    var vector2 = [];
    vector.forEach(e => {
        let nodo = new Nodo(e);
        vector2.push(nodo);
    });
    for (let j = 0; j < vector2.length; j++){
        for (let i = 0; i< vector2.length; i++){
            if (vector2[i].valor == "^" && vector2[i].hijoizq == null && vector2[i].hijoder == null){
                vector2[i].hijoizq = vector2[i-1];
                vector2[i].hijoder = vector2[i+1];
                vector2.splice(i+1,1);
                vector2.splice(i-1,1);
            }
        }
    }
    for (let j = 0; j < vector2.length; j++){
        for (let i = 0; i < vector2.length; i++){
            if (vector2[i].valor == "/" || vector2[i].valor == "*" && vector2[i].hijoizq == null && vector2[i].hijoder == null){
                vector2[i].hijoizq = vector2[i-1];
                vector2[i].hijoder = vector2[i+1];
                vector2.splice(i+1,1);
                vector2.splice(i-1,1);
            }
        }
    }
    for (let j = 0; j < vector2.length; j++){
        for (let i = 0; i < vector2.length; i++){
            if (vector2[i].valor == "+" || vector2[i].valor == "-" && vector2[i].hijoizq == null && vector2[i].hijoder == null){
                if(vector2[i+1] != undefined && vector[i-1] != undefined){
                    vector2[i].hijoizq = vector2[i-1];
                    vector2[i].hijoder = vector2[i+1];
                    vector2.splice(i+1,1);
                    vector2.splice(i-1,1);
                }
            }
        }
    }
    arbol.crear(vector2[0]);
    var vrespreOrder = [];
    var vrespostOrder = [];
    arbol.preOrder(arbol.raiz,(nodo)=> vrespreOrder.push(nodo.valor));
    arbol.postOrder(arbol.raiz,(nodo)=>vrespostOrder.push(nodo.valor));
    resultados.textContent = "";
    resultados.textContent = `PreOrder: ${vrespreOrder}`;
    resultado2.textContent="";
    resultado2.textContent= `PostOrder: ${vrespostOrder}`
});
