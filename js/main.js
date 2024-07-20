import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = config.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function gerarExercicios() {
  let resposta = document.querySelector("#response");
  const prompt = capturarParametros();

  resposta.innerHTML = "Um momento...";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const textoFormatado = text.replace(/\n/g, '<br>');

  resposta.innerHTML = textoFormatado;
}

let botaoGerar = document.querySelector("button");

botaoGerar.addEventListener("click", () => {
  gerarExercicios();
})

function capturarParametros() {
  let quantidadeExercicios = document.querySelector("input").value;
  let linguagem = document.querySelector("#select-linguagens").value;
  console.log(quantidadeExercicios, linguagem);
  
  return `Gere para mim ${quantidadeExercicios} exercícios de ${linguagem} em ordem e com o gabarito no final`
}