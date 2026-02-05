const perguntas = [
    {pergunta:"Capital do Brasil?", alternativas:["RJ","Brasília","SP","BH"], correta:"Brasília"},
    {pergunta:"2+2?", alternativas:["3","4","5","6"], correta:"4"},
    {pergunta:"HTML é?", alternativas:["Banco","Marcação","SO","Jogo"], correta:"Marcação"}
    ];
    
    let indice=0;
    let respostas=new Array(perguntas.length).fill(null);
    let nome="",email="",link="";
    
    const inicio=document.getElementById("inicio");
    const quiz=document.getElementById("quiz");
    const resultado=document.getElementById("resultado");
    
    /* iniciar */
    btnIniciar.onclick=()=>{
    nome=nomeAluno.value;
    email=emailAluno.value;
    link=linkProva.value;
    
    if(!nome||!email||!link) return alert("Preencha tudo!");
    
    inicio.style.display="none";
    quiz.style.display="block";
    
    dadosTopo.textContent=`${nome} | ${email}`;
    mostrarPergunta();
    }
    
    /* mostrar */
    function mostrarPergunta(){
    let q=perguntas[indice];
    
    numeroQuestao.textContent=`Questão ${indice+1} de ${perguntas.length}`;
    pergunta.textContent=q.pergunta;
    
    progresso.style.width=((indice)/perguntas.length)*100+"%";
    
    alternativas.innerHTML="";
    
    q.alternativas.forEach(alt=>{
    let div=document.createElement("label");
    div.className="alternativa";
    div.innerHTML=`<input type="radio" name="resp">${alt}`;
    
    if(respostas[indice]===alt) div.classList.add("selecionada");
    
    div.onclick=()=>{
    respostas[indice]=alt;
    document.querySelectorAll(".alternativa").forEach(e=>e.classList.remove("selecionada"));
    div.classList.add("selecionada");
    }
    
    alternativas.appendChild(div);
    });
    }
    
    /* navegação */
    btnProxima.onclick=()=>{
    if(indice<perguntas.length-1){indice++;mostrarPergunta();}
    }
    
    btnAnterior.onclick=()=>{
    if(indice>0){indice--;mostrarPergunta();}
    }
    
    /* finalizar */
    btnFinalizar.onclick=()=>{
    quiz.style.display="none";
    resultado.style.display="block";
    resumoAluno.textContent=`${nome} (${email}) enviou a prova.`;
    }
    
    /* ver correção */
    btnVerResultado.onclick=()=>{
    let acertos=0;
    
    respostasUsuario.innerHTML=respostas.map((r,i)=>{
    if(r===perguntas[i].correta) acertos++;
    return `Questão ${i+1}: sua resposta "${r}" | correta "${perguntas[i].correta}"`;
    }).join("<br>");
    
    notaFinal.textContent=`Você acertou ${acertos} de ${perguntas.length}`;
    correcao.style.display="block";
    }
    