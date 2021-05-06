package com.devsuperior.dsvendas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SellerService {

	@Autowired
	private SellerRepository repository;
	
	public List<SellerDTO> findAll(){
		List<Seller> result = repository.findAll();
		/* Entendendo o retorno:
		 *  .stream.map     :: converte a colecao original para uma nova colecao (que pode ser de qualquer tipo)
		 *  x -> new Bla(x) :: expressao lambda que diz que para cada x eu faco uma nova instancia da classe passando o x como parametro
		 *  .collect        :: converte o resultado em um List para satsfazer o tipo do retorno.
		 */
		return result.stream().map(seller -> new SellerDTO(seller)).collect(Collectors.toList());
	}
}
