const cepInput = document.getElementById('cep') as HTMLInputElement;
const ruaInput = document.getElementById('rua') as HTMLInputElement;
const bairroInput = document.getElementById('bairro') as HTMLInputElement;

interface Endereco {
  logradouro: string;
  bairro: string;
}

function buscaEndereco(cep: string): Promise<Endereco> {
  return new Promise((resolve, reject) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject('Erro ao buscar o CEP!');
        }
        return response.json(); 
      })
      .then(dados => {
        if (dados.erro) {
          reject('CEP não encontrado!');
        } else {
          resolve({
            logradouro: dados.logradouro,
            bairro: dados.bairro
          });
        }
      })
      .catch(() => {
        reject('Erro ao buscar o CEP!');
      });
  });
}

cepInput.addEventListener('blur', () => {
  const cep = cepInput.value;

  if (cep.length === 8) {
    buscaEndereco(cep)
      .then(dados => {
        ruaInput.value = dados.logradouro;
        bairroInput.value = dados.bairro;
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    alert('CEP inválido!');
  }
});
