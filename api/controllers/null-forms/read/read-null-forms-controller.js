module.exports = {
  friendlyName: 'Null Forms Controller', // Nome amigável para o método

  description: 'Controlador para manipulação de dados de formulários nulos.', // Descrição curta do propósito do método

  inputs: {
    id: {
      type: 'number',
      required: false,
      description: 'The ID of the user to look up.'
    }
  },

  exits: { // Saídas possíveis do método
    success: { // Sucesso na recuperação dos registros
      description: 'Retorna os registros solicitados ou todos se nenhum ID específico for fornecido.' // Mensagem de sucesso
    },
    notFound: { // Nenhum registro encontrado
      description: 'Nenhum registro encontrado com o ID fornecido.', // Mensagem explicativa
      responseType: 'notFound' // Indica que o recurso não foi encontrado
    },
    serverError: { // Erro interno no servidor
      description: 'Erro interno no servidor.', // Mensagem explicativa
      responseType: 'serverError' // Indica um erro do lado do servidor
    }
  },

  fn: async function(inputs, exits) { // Função principal do método
    try { // Bloco try-catch para tratamento de erros
      const id = inputs.id; // ID pode ser indefinido se não for fornecido
      const result = await sails.helpers.read.with({ // Tenta ler os dados do formulário nulo
        model: 'null_forms', // Modelo de dados a ser usado
        id: id? parseInt(id) : undefined // Garante que o ID, se fornecido, seja um número
      });

      if (!result) { // Verifica se os resultados foram encontrados
        throw 'notFound'; // Lança uma exceção indicando que o recurso não foi encontrado
      }
      return exits.success(result); // Retorna os resultados como JSON
    } catch (error) { // Tratamento de erro
      return exits.serverError({ // Retorna o erro com detalhes
        error: 'Error retrieving user(s): ' + error.message // Mensagem de erro detalhada
      });
    }
  }
};