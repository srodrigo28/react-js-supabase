import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tdpvfocnhwbinnfcjxrr.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcHZmb2NuaHdiaW5uZmNqeHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1ODA5NjcsImV4cCI6MjAyODE1Njk2N30.YXLICxBQjXkJwnVdAULNG93_5KQnkH6HtIV6kv6J-SI';

const supabase = createClient(supabaseUrl, supabaseKey);

function Cliente() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [descricao, setDescricao] = useState('');
  const [quantidade, setquantidade] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    Listar();
  }, []);

  const Listar = async () => {
    const { data, error } = await supabase.from('financeiro').select('*');
    if (error) {
      console.error('Erro ao buscar itens:', error.message);
      return;
    }
    setData(data);
  };

  const Adicionar = async () => {
    await supabase.from('financeiro').insert(
        [ { descricao: descricao, valor: valor, quantidade: quantidade } ]
    );
    setDescricao('');
    setValor('');
    setquantidade('');
    Listar();
  };

  const Delete = async (id) => {
    const { error } = await supabase.from('financeiro').delete().eq('id', id);

    if (error) {
      console.error('Erro ao excluir item:', error.message);
      return;
    }else{
        setData(data.filter(item => item.id !== id));
        alert("Sucesso");
    }
  };

  const Alterar = async (id, descricao) => {
    const { data, error } = await supabase
      .from('financeiro')
      .update({ descricao: descricao, quantidade: quantidade, valor: valor })
      .eq('id', id);
    if (error) {
      console.error('Erro ao atualizar item:', error.message);
      return;
    }
    setData(data);
    setEditItem(null);
    setNewName('');
  };

  const handleEdit = (id, descricao, valor) => {
    setId(id);
    setDescricao(descricao);
    setValor(valor)
  };

  return (
    <div className='container'>
      
      <h1 className='mt-4 mb-4 text-center'>React Crud Supabase</h1>

      <input
        type="text"
        value={descricao}
        placeholder='descrição'
        className='form-control'
        onChange={(e) => setDescricao(e.target.value)}
      />
      <div className="row mt-2 mb-2">
        <div className="col-3">
          <input
            type="text"
            value={quantidade}
            placeholder='Qtd'
            className='form-control'
            onChange={(e) => setquantidade(e.target.value)}
          />
        </div>
        <div className="col">
          
        <input
            type="text"
            placeholder='valor'
            value={valor}
            className='form-control'
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
      </div>
      
      <button className='btn btn-primary w-100 mb-3 mt-3' onClick={Adicionar}>Adicionar</button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>QTD</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className='overflow-auto'>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.descricao}</td>
              <td>{item.quantidade}</td>
              <td>{item.valor}</td>
              <td className='d-flex gap-1'>
                <button className='btn btn-primary' onClick={() => Alterar(item.id, item.descricao, item.valor)}>Edit</button>
                <button className='btn btn-danger' onClick={() => Delete(item.id)}>X</button>  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default Cliente;